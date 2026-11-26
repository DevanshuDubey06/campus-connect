# Campus Connect – Team Work Updates

> A beautiful, fully responsive web application for collecting daily work updates from Campus Connect team members, integrated with Google Sheets.

---

## 🌴 Overview

**Campus Connect** is a national initiative by MyGov (Ministry of Electronics & Information Technology, Government of India) in collaboration with LNCT Group of Colleges, Bhopal.

**Event:** 04 December 2026 | 02:00 PM – 04:00 PM | LNCT Group of Colleges, Bhopal

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure Google Sheets API

See [`google-apps-script/SETUP.md`](./google-apps-script/SETUP.md) for full instructions.

Then update `.env.local`:

```env
GOOGLE_SHEETS_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | Framework (App Router) |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Google Apps Script | Backend / Google Sheets API |

---

## 📁 Project Structure

```
Campus Connect/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   ├── globals.css         # Global styles
│   └── api/
│       └── submit/
│           └── route.ts    # API route → Google Sheets
├── components/
│   ├── HeroSection.tsx     # Landing hero with event details
│   ├── WorkUpdateForm.tsx  # Work update submission form
│   ├── SuccessMessage.tsx  # Post-submission success screen
│   ├── FloatingParticles.tsx
│   ├── StarField.tsx
│   ├── PalmTree.tsx
│   └── Footer.tsx
├── google-apps-script/
│   ├── Code.gs             # Google Apps Script (paste into editor)
│   └── SETUP.md            # Deployment instructions
├── .env.local              # Environment variables (not committed)
├── .env.example            # Environment template
└── README.md
```

---

## 📊 Google Sheets Column Structure

| S.No. | Timestamp | Full Name | Enrollment No. | College | Branch | Semester | Department | Date | Work Title | Description | Hours | Status | Remarks |
|-------|-----------|-----------|----------------|---------|--------|----------|------------|------|------------|-------------|-------|--------|---------|

---

## 🎨 Design

Inspired by **GTA VI / Vice City** aesthetics:
- Sunset pink, orange, and purple gradients
- Tropical palm trees
- Glassmorphism cards
- Framer Motion animations
- Official Campus Connect & MyGov branding

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `GOOGLE_SHEETS_API_URL` | Google Apps Script Web App URL |

---

## 📝 License

Built for Campus Connect – LNCT Group of Colleges, Bhopal × MyGov India.
