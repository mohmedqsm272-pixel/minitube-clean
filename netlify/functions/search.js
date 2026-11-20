exports.handler = async function (event) {
  const query = (event.queryStringParameters && event.queryStringParameters.q || "").trim();

  if (!query) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Please enter a search term." })
    };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "YouTube API key is missing on the server. Add YOUTUBE_API_KEY in Netlify environment variables, then redeploy." })
    };
  }

  try {
    const params = new URLSearchParams({
      part: "snippet",
      q: query,
      type: "video",
      maxResults: "10",
      safeSearch: "moderate",
      key: apiKey
    });
    const response = await fetch("https://www.googleapis.com/youtube/v3/search?" + params.toString());
    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Could not contact YouTube. Please try again." })
    };
  }
};
