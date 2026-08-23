# Bookly rebuild

Bookly is being rebuilt as a clean standalone mobile-first app with Hatchable providing the live app/backend foundation and GitHub keeping the source and Android build workflow.

## Product flow
- Separate onboarding screen with swipeable stories
- Final Get Started opens authentication
- Already have an account opens authentication
- Real email-code authentication via Hatchable
- Customer and business-owner experiences are separate
- Settings with light/dark mode
- Profile photo and editable profile
- Seller earnings and profit/loss dashboard

## Important rule
The Android app must render Bookly's own UI. It must never redirect users to a Hatchable website as the product experience.
