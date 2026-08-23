# Bookly API

Small Node.js API used as the clean backend foundation for Bookly.

## Endpoints
- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/bookings`
- `POST /api/bookings`
- `GET /api/expenses`
- `POST /api/expenses`
- `GET /api/dashboard`

Run locally with `npm run backend:start`.

The Android client keeps a local fallback for offline/demo use; production deployment should point `BOOKLY_API_URL` at a hosted instance of this API and move persistence to a managed database/auth provider.
