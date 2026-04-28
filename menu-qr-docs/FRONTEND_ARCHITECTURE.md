# Frontend Architecture Documentation: Menu QR

This document provides an in-depth architectural overview of the `menu-qr-frontend` application, a Next.js 15 web platform designed for restaurants to create and manage digital QR code menus.

## 1. Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **State Management**: Zustand (Client state), React Query (Server state / Caching via `@tanstack/react-query`)
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **UI Components**: Radix UI (Unstyled accessible primitives), Framer Motion (Animations)
- **Forms & Validation**: React Hook Form, Zod
- **Internationalization**: `next-intl`
- **Mapping & QR**: `leaflet` / `react-leaflet`, `qrcode.react`
- **PDF Generation**: `jspdf`, `html2canvas`
- **Analytics**: PostHog (`posthog-js`)

## 2. Core Application Structure

The application heavily utilizes the **Next.js App Router** with nested layouts and route groups.

```text
src/app/
├── [locale]/                 # Dynamic route segment for i18n
│   ├── (auth)/               # Route group for authentication pages
│   │   ├── login/            # Magic link / Google OAuth login
│   │   └── signup/           # User registration
│   ├── (dashboard)/          # Protected route group for restaurant owners
│   │   ├── analytics/        # Business analytics and insights
│   │   ├── menus/            # Menu editor and management
│   │   ├── onboarding/       # 5-step wizard for new businesses
│   │   └── tables/           # QR code generation and management
│   ├── p/[slug]/             # Public-facing digital menu
│   └── layout.tsx            # Locale-specific root layout
└── layout.tsx                # Global root layout
```

### 2.1 Route Groups and Access Control
- `(auth)`: Publicly accessible but redirects to the dashboard if a valid session exists.
- `(dashboard)`: Protected routes. Middleware or layout-level checks ensure the user has a valid JWT before rendering.
- `p/[slug]`: Fully public routes intended for end-customers scanning a QR code.

## 3. Data Fetching and API Integration

All interactions with the backend API (`menu-qr-cloudflare-hono`) are centralized in `lib/api.ts`.

### Architecture of API Layer
1. **API Client Setup**: A wrapper around native `fetch` or Axios that automatically injects the `Authorization: Bearer <token>` header.
2. **Error Handling**: Standardized interception of 401 errors to trigger automatic logout, and generic error parsing.
3. **React Query Hooks**: Used across components to fetch data (e.g., `useQuery` for fetching menus, `useMutation` for creating/updating menus). This handles caching, background refetching, and optimistic updates.

## 4. State Management

### 4.1 Global Client State (Zustand)
Zustand is used for cross-component client-side state that doesn't belong in the URL or server cache. Examples include:
- UI State (e.g., sidebar toggles, active modals).
- Multi-step form state (e.g., the 5-step Onboarding flow data before final submission).

### 4.2 Server State (React Query)
Server state is managed via `@tanstack/react-query`.
- **Invalidation**: When a user updates a menu item, the relevant query key (e.g., `['menus', businessId]`) is invalidated to fetch fresh data.
- **Optimistic UI**: For rapid interactions (like toggling an item's active status), React Query updates the local cache immediately before the server confirms.

## 5. Form Handling

Forms are built using `react-hook-form` and validated against `zod` schemas.

```tsx
// Example Pattern
const schema = z.object({ name: z.string().min(2), price: z.coerce.number() });
const form = useForm({ resolver: zodResolver(schema) });
```

This ensures strong typing from the form inputs down to the API request payload, sharing schemas where possible.

## 6. Internationalization (i18n)

Routing and translations are handled by `next-intl`.
- **Locale Strategy**: Path-based routing (`/en/dashboard`, `/fr/dashboard`, `/ar/dashboard`).
- **Translation Files**: Stored in `messages/{locale}.json`.
- **Middleware**: Intercepts requests to the root `/` and redirects to the user's preferred language based on `Accept-Language` headers or saved cookies.

## 7. AI Menu Scanning Integration

The frontend supports an advanced AI menu ingestion feature.
1. **User Uploads File**: A user uploads an image (`.jpg`, `.png`, `.webp`) or PDF.
2. **Processing Target**: 
   - Proxied via `MENU_AI_SERVICE_URL` (Python FastAPI backend) if configured, allowing hybrid OCR + Vision extraction.
   - Falls back directly to OpenRouter API (GPT-4 Vision) from the client/Next.js edge functions.
3. **Reconciliation**: The unstructured data is returned as structured JSON, which is then mapped into the React Hook Form state of the Menu Editor for the user to review and refine before saving.

## 8. QR Code Generation & PDF Export

QR codes for tables are generated on the client side using `qrcode.react`.
- **Customization**: Users can define table numbers and styling.
- **Export**: To allow owners to print these, the DOM node containing the QR code is captured using `html2canvas` and exported to a PDF format using `jspdf`.

## 9. Analytics

`posthog-js` is integrated for user behavioral analytics.
- **Tracking Setup**: Initialized in the root layout or via a dedicated AnalyticsProvider.
- **Key Events**: `page_view`, `menu_view` (critical for business owners), `menu_created`, `table_qr_generated`.
