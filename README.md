```markdown
# SavvyDrop – Smart Price Drop Tracker

**Catch the best deals before they're gone.**  
Track product prices across e-commerce sites and get instant alerts when prices drop — so you always buy smarter.

[Live Demo](#) <!-- Add your Vercel/Netlify link when deployed -->  

## 🎯 Features

- 🔍 **Track Any Product** — Paste URLs from Jumia, Amazon, AliExpress, Mytek, Noon, Shein, and many more
- 📈 **Interactive Price History** — Beautiful charts showing trends, all-time lows & fake discounts
- 🔔 **Instant Smart Alerts** — Email / browser notifications the moment your target price is reached
- 🔐 **Secure Google Sign-in** — Easy & safe authentication with Google OAuth
- ⏰ **Automated Daily Scans** — Background cron jobs check your tracked products every day
- 🌍 **Multi-Region Friendly** — Works great with Tunisian & international stores (Jumia TN, etc.)
- 📧 **Clean Email Alerts** — Powered by Resend — beautiful drop notifications

## 🛠️ Tech Stack

- **Next.js 15 / 16** — App Router, Server Actions, React Server Components
- **Firecrawl** — JavaScript rendering, anti-bot bypass, AI-powered structured extraction
- **Supabase** — PostgreSQL, Auth (Google), Row Level Security, pg_cron scheduled jobs
- **Resend** — Modern transactional emails
- **shadcn/ui** + **Tailwind CSS** — Beautiful, customizable UI components
- **Recharts** — Smooth, interactive price history charts
- **Lucide React** — Clean icon set
- Vercel — Easy deployment & edge functions

## 📋 Prerequisites

- Node.js 18+ or 20+
- Supabase account (free tier works)
- Firecrawl API key (https://firecrawl.dev)
- Resend API key (https://resend.com)
- Google OAuth credentials (Client ID + Secret)

## 🔍 How SavvyDrop Works

1. Paste any product URL → Firecrawl extracts name, price, image, currency instantly
2. Product saved to Supabase (RLS protected per user)
3. Daily cron job (pg_cron) triggers `/api/cron/check-prices`
4. Firecrawl re-checks all tracked products
5. If price dropped → save history + send beautiful email via Resend
6. You see real-time charts & get notified → buy at the lowest price!


## 🤝 Contributing

Love the project? Contributions welcome!

## 📄 License

MIT License — see [LICENSE](./LICENSE)

Built with passion in Tunisia  
Made for deal hunters everywhere 🚀

Star ⭐ if you like it — happy dropping!
```

Good luck with SavvyDrop — it's going to be awesome! 🔔