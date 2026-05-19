# Add yourself to Founders Hub

## Steps

1. Add your photo to `content/residents/images/` (jpg, jpeg, png, or webp; square crop recommended, min 800x800).
2. Add an entry to `residents.json`:

   ```json
   {
     "name": "Your Name",
     "company": "Your Company",
     "title": "Your Role",
     "linkedin": "https://www.linkedin.com/in/your-handle",
     "twitter": "https://x.com/your-handle",
     "image": "your-photo.jpg"
   }
   ```

3. Open a PR. CI will validate your entry and the build will resize your image automatically.

## Fields

| Field      | Required | Notes                                                              |
| ---------- | -------- | ------------------------------------------------------------------ |
| `name`     | Yes      | Full name as you want it displayed                                 |
| `company`  | Yes      | Company name                                                       |
| `title`    | Yes      | Your role (e.g. "CEO & Co-Founder")                                |
| `linkedin` | No       | Full URL (`https://www.linkedin.com/in/...`). Omit if you have none |
| `twitter`  | No       | Full URL (`https://x.com/...` or `https://twitter.com/...`)        |
| `image`    | Yes      | Filename only (no path). Must exist in `images/`                   |

The list is sorted alphabetically by first name at build time — order in the JSON doesn't matter.
