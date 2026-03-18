# SOTR-APP Waiting List Site.  

A beautiful waiting list registration site for the SOTR-APP mobile app - a revolutionary Bitcoin payment routing platform for Africa.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Google Fonts** - Nunito & Poppins

## Design System

The site uses the same "Bitcoin Africa" design direction as the main BitKwa site:

- **Colors:**
  - Sahara Gold (#D98E04) - Primary accent
  - Ubuntu Brown (#5C3B1E) - Headings
  - Savanna Sand (#F4E4C1) - Backgrounds
  - Forest Green (#256F3A) - Success states
  - African Sunset (#E75815) - CTAs
  - Night Black (#0C0C0C) - Main text
  - Warm Grey (#6B6B6B) - Secondary text

- **Typography:**
  - Nunito - Primary font (friendly, community vibe)
  - Poppins - Display font (headlines, strong sections)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Features

- ✅ Beautiful, modern UI matching BitKwa design system
- ✅ Responsive design (mobile-first)
- ✅ Waiting list registration form
- ✅ User type selection (User/Merchant)
- ✅ Form validation and error handling
- ✅ Success/error states
- ✅ Feature highlights section
- ✅ How it works section

## Project Structure

```
site-waitinglist/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home/waiting list page
│   └── globals.css     # Global styles
├── components/
│   ├── Button.tsx      # Reusable button component
│   ├── Card.tsx        # Card component
│   └── WaitingListForm.tsx  # Waiting list form component
└── public/             # Static assets
```

## Next Steps

- [ ] Connect form to backend API
- [ ] Add email verification
- [ ] Implement analytics tracking
- [ ] Add social sharing features
- [ ] Add countdown timer for launch
- [ ] Add referral system

## License

© 2025 SOTR-APP. All rights reserved.

