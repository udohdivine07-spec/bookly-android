# Bookly standalone migration

Bookly is packaged as a real Android application using Capacitor and the existing Android project. The APK contains the Bookly frontend inside Android assets, so it does not depend on AppDeploy branding or an AppDeploy web page to launch.

## Migrated product capabilities

- Customer and service-provider account profiles
- Remembered local session and account switching
- Provider discovery and service search
- Provider profiles and service lists
- Appointment date/time selection and booking requests
- Provider booking approval, decline and completion flow
- Provider dashboard and revenue/profit view
- Expense tracking
- Profile and business settings
- Bookly launcher icon and app name

## Backend

`backend/server.js` contains the standalone HTTP API migration for authentication, profiles, providers, bookings, booking decisions, expenses, messages and dashboard data. It persists data to `backend/bookly-data.json` when run as a Node service.

## Android build

GitHub Actions builds `app-debug.apk` from the repository root. The generated APK is a standalone Bookly Android package and is not an AppDeploy APK.
