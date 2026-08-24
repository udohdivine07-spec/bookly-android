# Bookly — standalone migration

This repository is the standalone migration target for the final AppDeploy Bookly version `1787571736295`.

The source of truth for the UI/functionality is the AppDeploy snapshot: customer/provider onboarding, provider discovery, profiles, services, bookings, approval/decline/reschedule, calendar, messages, finance, expenses, reviews, notifications and realtime sync.

The Android wrapper should package the built Bookly web frontend locally. The backend is intentionally separated from AppDeploy so the APK does not depend on an AppDeploy-hosted frontend.
