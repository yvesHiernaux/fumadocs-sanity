## Fumadocs Sanity

This is an example for using Sanity with Fumadocs.

- Draft Mode (Live Preview)
- Studio

### Setup

Initialize the project:

```bash
pnpm i
```

Create a new project on Sanity, and create a `.env` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="The Project ID"

# it should be 'production' by default
NEXT_PUBLIC_SANITY_DATASET="production"
```

Then, run `pnpm sanity manage`, go to the API tab. Under the **Tokens** section, create and obtain a token with **viewer** permission.

Create a `.env.local` file to store it:

```
SANITY_API_READ_TOKEN="token here"
```

Run development server:

```bash
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

### Learn More

To learn more about Next.js and Fumadocs, take a look at the following
resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Fumadocs](https://fumadocs.vercel.app) - learn about Fumadocs
