# MiniTube

A responsive YouTube search PWA using the official YouTube Data API v3 and Netlify Functions.

## Deploy on Netlify

1. Upload these project files to a GitHub repository (keep the folder structure).
2. In Netlify, import that repository.
3. Build command: leave blank / No build command.
4. Publish directory: `.`.
5. Ensure the Functions directory is `netlify/functions` (already configured in `netlify.toml`).
6. In Netlify project configuration, add an environment variable:
   - Key: `YOUTUBE_API_KEY`
   - Value: your YouTube Data API v3 key
7. Trigger a new deploy after adding the variable.

Never put the API key in `index.html`, JavaScript, GitHub, or this README.

## Test

Open:
`https://YOUR-SITE.netlify.app/.netlify/functions/search?q=hello`

A successful response is JSON containing an `items` array. Then open the site and search normally.

## Notes

- Video playback uses YouTube's embedded player. Some videos may not allow embedding.
- YouTube API quota and usage limits still apply.
- The service worker caches the app shell only, not search results or API responses.
