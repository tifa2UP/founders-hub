# Add yourself to Founders Hub

## Steps

1. Add your photo to `content/residents/images/` (jpg, jpeg, png, or webp; square crop recommended, min 800x800).
2. Add an entry to `residents.json`:

   ```json
   {
     "slug": "your-name",
     "name": "Your Name",
     "company": "Your Company",
     "title": "Your Role",
     "linkedin": "https://www.linkedin.com/in/your-handle",
     "twitter": "https://x.com/your-handle",
     "website": "https://your-site.com",
     "companyUrl": "https://your-company.com",
     "bio": "A short optional bio about what you are building.",
     "image": "your-photo.jpg"
   }
   ```

3. Open a PR. CI will validate your entry and the build will resize your image automatically.

## Fields

| Field        | Required | Notes                                                               |
| ------------ | -------- | ------------------------------------------------------------------- |
| `slug`       | Yes      | Stable profile URL using lowercase ASCII and hyphens (`your-name`)  |
| `name`       | Yes      | Full name as you want it displayed                                  |
| `company`    | Yes      | Company name                                                        |
| `title`      | Yes      | Your role (e.g. "CEO & Co-Founder")                                 |
| `linkedin`   | No       | Full URL (`https://www.linkedin.com/in/...`). Omit if you have none  |
| `twitter`    | No       | Full URL (`https://x.com/...` or `https://twitter.com/...`)          |
| `website`    | No       | Full URL for your personal website                                  |
| `companyUrl` | No       | Full URL for your company website                                   |
| `bio`        | No       | A short, factual profile. Omit it rather than using placeholder copy |
| `image`      | Yes      | Filename only (no path). Must exist in `images/`                     |

The list is sorted alphabetically by first name at build time — order in the JSON doesn't matter.

Each resident is published at `/residents/<slug>`. Keep the slug stable after
publishing so existing links and search results continue to work.
