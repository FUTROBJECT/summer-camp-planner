# Summer Camp Planner 2026 🏕️

A web app to plan your family's summer camp schedule. Built for St. Louis area families, featuring New City School camps and other local options.

## Features

- **Multi-child support** — Track schedules for multiple kids with color-coded tabs
- **Auto-save** — Your selections persist in your browser's local storage
- **Cost tracking** — Real-time totals for camp fees and extended day
- **Share** — Copy your plan as text to share with family
- **Mobile-friendly** — Works great on phones and tablets
- **Installable** — Add to your home screen like an app (PWA)

## Camps Included

- New City School Day Camp & Specialty Camps
- Gifted Resource Council (GRC)
- Burr Oak (John Burroughs)
- Mrs. Roam's Art Camp
- SuperNinja Gymnastics
- SLU Soccer Camp
- Humane Society Kids for Critters
- STL Zoo Camp

## Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:5173
```

## Deploy to Vercel (Recommended)

### Option 1: One-Click Deploy

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import your GitHub repo
4. Click "Deploy" — that's it!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project directory)
vercel

# Follow prompts, then your site is live!
```

## Deploy to Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git" → Select your repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click Deploy!

## Deploy to GitHub Pages

```bash
# Add to package.json scripts:
# "deploy": "npm run build && npx gh-pages -d dist"

npm run deploy
```

## Customization

### Add More Camps

Edit `src/App.jsx` and add to the `EXTERNAL_CAMPS` array:

```javascript
{
  id: 'uniqueid',
  name: 'Full Camp Name',
  shortName: 'Short Name',
  url: 'https://campwebsite.com',
  cost: 300,
  costNote: '$300/week',
  regDate: 'Jan 15',
  location: 'City, MO',
  color: 'blue', // purple, emerald, pink, red, blue, orange, cyan, green
  weeks: [2, 3, 4] // Week IDs (0-12) when this camp runs
}
```

### Change Default Child Settings

In `src/App.jsx`, modify the initial state:

```javascript
const [kids, setKids] = useState(savedData?.kids || [
  { id: 1, name: 'Your Child', grade: 4, color: 0 }
]);
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide Icons
- LocalStorage for persistence

## License

MIT — Feel free to fork and customize for your school or community!

---

Made with ☀️ for summer planning
