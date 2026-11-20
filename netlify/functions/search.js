
exports.handler = async function (event) {
    try {
        const query = event.queryStringParameters?.q;

        if (!query) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "اكتب اسم الفيديو أولاً"
                })
            };
        }

        const API_KEY = process.env.YOUTUBE_API_KEY;

        if (!API_KEY) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "مفتاح YouTube API غير موجود"
                })
            };
        }

        const url = new URL(
            "https://www.googleapis.com/youtube/v3/search"
        );

        url.search = new URLSearchParams({
            part: "snippet",
            q: query,
            type: "video",
            maxResults: "10",
            key: API_KEY
        });

        const response = await fetch(url);
        const data = await response.json();

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "حدث خطأ أثناء البحث"
            })
        };
    }
};
