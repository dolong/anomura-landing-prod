<p align="center">
  <img src="https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666471426/Anomura-Web-Assets/Loop_llqg3q.gif" alt="Anomura" width="100%" />
</p>

<h1 align="center">Anomura: The Cove Awaits You</h1>

<p align="center">
  <a href="https://anomuragame.com">anomuragame.com</a>
</p>

## The project

Anomura is a pixel-art, on-chain game world built around hermit crabs. Players become guardians of the universe, restoring balance and harmony to the cove and collecting rewards along the way. Each Anomura is a collectible crab made of swappable parts and equipment, and the world spans themed biomes: the Pond, the Sky, the Snow, the Lava fields, and the Void.

This repo is the project's public face: the landing site, the crab viewer, the inventory, and the API that serves crab and equipment metadata.

<p align="center">
  <img src="https://res.cloudinary.com/deepsea/image/upload/f_auto/v1666470309/Anomura-Web-Assets/shop_mycfky.gif" alt="The Anomura shop" width="80%" />
</p>

## What's in the code

The site is a single long, scroll-driven scene. As you descend, parallax layers, ambient underwater audio, and animated sections (crab anatomy, the shop, the roadmap, the team) move at speeds tuned per screen size.

| Area | Where | What it does |
| --- | --- | --- |
| Landing scene | `client/pages/index.js`, `client/containers/home/` | Scroll-linked parallax sections, lazy-loaded with `next/dynamic` |
| Biomes | `client/containers/anomura/` | Pond, Sky, Snow and Lava areas |
| The Void | `client/pages/the-void/` | A standalone experience with its own soundscape |
| Crab viewer | `client/pages/imageviewer/` | View any Anomura by id, browse equipment, or randomize a crab |
| Inventory | `client/pages/inventory/`, `client/components/inventory/` | Wallet-gated view of a player's crabs and items |
| API | `client/pages/api/` | Crab, Anomura and equipment metadata, auth, and on-demand revalidation |
| Data | `client/prisma/schema.prisma` | Postgres via Prisma: whitelist, quests, rewards and pending reward claims |
| Contracts | `smart_contract/` | Hardhat project with the test `Transactions` contract |

### Stack

- **Next.js 12 + React 17** for pages, API routes, and incremental static regeneration
- **Tailwind CSS, Sass and CSS Modules** for styling, plus **NES.css** for the pixel UI
- **Recoil** for shared state such as scroll position and audio
- **ethers / web3 / Web3Modal / WalletConnect / Unstoppable Domains** for wallet connection, with **NextAuth** sessions
- **Prisma + PostgreSQL** for player and reward data
- **Cloudinary** for art assets, **Vercel** for hosting and analytics

## Running it locally

```bash
cd client
npm install
npm run dev
```

The landing page runs without any configuration. The inventory, gallery and API routes need a `.env` with `DATABASE_URL` (and `SHADOW_DATABASE_URL` for migrations) plus the auth and wallet keys they use.

```bash
npm run prisma:generate    # regenerate the Prisma client
npm run migrate:postgres   # apply migrations using .env.development
```

## Made by

<p align="center">
  <img src="https://anomura-landing-prod.vercel.app/img/home/team/Long_x5_01.png" alt="Long" width="200" />
  <br />
  <b>Long</b>
</p>
