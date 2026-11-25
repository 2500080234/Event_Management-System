# EventHub — Event Booking & Package Management (React + Vite)

Pick an event package, customize it with add-ons, watch the total update live, and book it.
Built with **React 18, Vite, React Router, Bootstrap 5 and jsPDF**. All data is stored in the browser's **localStorage** (no backend).

## Modules

| Module | Routes | What it does |
|---|---|---|
| **Public** | `/`, `/events/:key`, `/booking/confirmation/:id`, `/about`, `/contact`, `/custom-request` | Search 9 event packages by keyword and maximum base price, customize pricing, book as a guest, download a PDF, submit custom requests |
| **User** | `/signup`, `/login`, `/my-bookings` (protected) | Create account, log in, view booking history and total spend, download confirmation PDFs, cancel pending bookings. Booking form is pre-filled for logged-in users |
| **Admin** | `/admin/login`, `/admin/dashboard` (protected) | Booking totals by status, confirmed booking value, upcoming confirmed events, users and custom request counts. Search, filter and manage bookings and requests |

The admin sign-in page hides the demo credentials. For local testing, use the existing constants in `src/context/AuthContext.jsx`.

Route protection: `ProtectedRoute` only admits the matching role — a user can't open the admin dashboard and an admin can't open My Bookings.

## localStorage keys

| Key | Holds |
|---|---|
| `eventhub_users` | Registered customers `{name, email, phone, password, joined}` |
| `eventhub_session` | Current login: `{type:"user", email}` or `{type:"admin"}` |
| `eventhub_bookings` | All bookings |
| `eventhub_requests` | Custom event requests |

## Demo limitations

- Bookings, accounts and requests are held in this browser profile for this site. Data does not sync to other browsers or devices and can be cleared through browser settings.
- Admin authentication is client-side and the demo credentials are inspectable in the application bundle. Demo customer passwords are stored in plain text. Use sample data only.
- Contact form submission and booking status changes send no email or payment. Confirmed booking value is the sum of confirmed bookings' prices.
- A confirmation PDF reflects the displayed booking status at the time of download. The receipt uses rendered text, which preserves the rupee symbol and supported customer-name characters but is not selectable.
- Photos and the site font are served from the app. Installing packages with npm requires registry access unless the packages are cached.

## Run locally

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview
```

## Project structure

```
src/
  main.jsx, App.jsx          entry + route table
  style.css                  site styling
  context/AuthContext.jsx    signup / login / adminLogin / logout (localStorage)
  components/                Layout (navbar, footer), ProtectedRoute, PageHero
  data/events.js             packages, prices, add-ons  <- edit prices here
  pages/                     Home, EventDetails, Confirmation, About, Contact,
                             CustomRequest, Login, Signup, MyBookings,
                             AdminLogin, AdminDashboard, NotFound
  utils/storage.js           localStorage helpers, formatters, ID generators
vercel.json                  SPA rewrite so deep links / refresh work on Vercel
```

## Deploy to Vercel

1. Push this project to GitHub (`git add -A && git commit -m "Convert to React + Vite" && git push`).
2. On vercel.com: **Add New → Project → Import** the GitHub repo.
3. Vercel auto-detects **Vite** (Build: `npm run build`, Output: `dist`). Click **Deploy**.
4. Open the deployed URL and test: signup → book → My Bookings → `/admin/login`.

`vercel.json` makes every route fall back to `index.html`, so refreshing `/my-bookings` or `/admin/dashboard` won't 404.

## Images and package pricing

The home venue, anniversary, engagement and corporate images are newly generated. The other six photos are bundled copies of the original Unsplash images. Base prices were reduced by 35%, rounded to the nearest rupee. Existing booking totals and add-on prices are retained.

## Editing packages

Edit `src/data/events.js`: change `basePrice`, add-on `price`, or add a new object to `EVENTS` — the home page, package page and booking flow update automatically.
