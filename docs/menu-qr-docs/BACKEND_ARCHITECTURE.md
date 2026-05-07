# Backend Architecture Documentation: Menu QR

This document outlines the architecture, data models, and service interactions of the backend ecosystem for the Menu QR platform. The backend consists of two primary services: the main Cloudflare Workers API (`menu-qr-cloudflare-hono`) and the optional AI parsing microservice (`menu-ai-service`).

## 1. System Overview

### 1.1 Core API (`menu-qr-cloudflare-hono`)
- **Runtime**: Cloudflare Workers (Edge Computing)
- **Framework**: Hono (Lightweight web framework for the Edge)
- **Database**: Neon Serverless Postgres
- **ORM**: Drizzle ORM
- **Cache / Rate Limiting**: Cloudflare KV
- **File Storage**: Cloudflare R2
- **Email Delivery**: Resend API

### 1.2 AI Microservice (`menu-ai-service`)
- **Runtime**: Python 3.11+
- **Framework**: FastAPI
- **Capabilities**: Vision LLM (via OpenRouter), OCR (EasyOCR/PaddleOCR/Google Vision), PDF processing.

## 2. Core API Architecture (Hono)

The Hono backend is structured into modular feature sets (`src/modules/*`), promoting separation of concerns.

### 2.1 Request Lifecycle
1. **Cloudflare Edge Entry**: Request hits the nearest Cloudflare PoP.
2. **Global Middleware**:
   - **CORS**: Enforces `allowedOrigins`.
   - **Rate Limiting**: Cloudflare KV checks IP constraints (e.g., 1000 req/min general, 100 req/min auth).
   - **Logging**: Captures request metrics.
3. **Route Matching**: Hono matches the endpoint.
4. **Auth Middleware** (if applicable): Validates JWT from the `Authorization` header.
5. **Controller & Validation**: `@hono/zod-validator` ensures the incoming request body/params match expected schemas.
6. **Service Logic**: Executes business rules.
7. **Data Access (Drizzle)**: Queries Neon Postgres via HTTP or WebSocket connections optimized for serverless.

### 2.2 Authentication Flow
The system avoids passwords, reducing friction and security overhead.
- **Magic Link**: User inputs email -> Backend creates token, sends via Resend -> User clicks link -> Backend exchanges token for JWT.
- **Google OAuth**: Validates OAuth callback, upserts user record, and issues JWT.
- **JWT Strategy**: Short/Medium-lived JWTs are signed with `JWT_SECRET`. State is maintained entirely on the client after issuance.

## 3. Database Schema (Drizzle ORM + Neon)

The relational schema is designed for multi-tenancy.

- **`users`**: Central identity. Stores email, OAuth provider info, and hashed auth tokens (for magic link verification).
- **`businesses`**: The tenant model. Contains `slug` (unique identifier for public URLs), type, and onboarding status. Belongs to a user.
- **`menus`**: Collections of food offerings. Tied to a business.
- **`categories`**: Groupings within a menu (e.g., "Starters", "Mains").
- **`menu_items`**: The actual products. Includes price, currency, description, and tags. Linked to a category.
- **`table_qr_codes`**: Represents physical tables. Linked to a business/menu, used to route the QR code scan to the correct analytics bucket and table context.
- **`analytics_events`**: High-volume table tracking anonymous views and clicks on public menus.

*Note: Bulk creation endpoints atomicize the creation of Menus -> Categories -> Items into single database transactions to ensure consistency.*

## 4. AI Microservice Architecture (Python FastAPI)

This service abstracts the heavy lifting of parsing messy real-world menus (images/PDFs) into structured JSON.

### 4.1 Processing Modes
- **Vision (Primary)**: Sends the image to a Vision LLM (e.g., `openai/gpt-4-vision` via OpenRouter). Best for complex layouts.
- **OCR (Fallback/Offline)**: Uses EasyOCR or PaddleOCR to extract raw text, which is then structured via a cheaper text-based LLM or regex rules.
- **Hybrid**: The service orchestrates a smart fallback. It tries Vision first; if the confidence score is below `HYBRID_CONFIDENCE_THRESHOLD`, it falls back to OCR and merges the results.

### 4.2 Endpoint Flow (`/parse/image` or `/parse/pdf`)
1. **Ingestion**: Accepts `multipart/form-data`.
2. **Preprocessing**: Validates image, converts PDFs to images using `pdf2image` / `pypdf`.
3. **Execution**: Routes to the specified strategy (`services/vision.py`, `services/ocr/`).
4. **Structuring**: Enforces a strict Pydantic model (`models.py`) output:
   ```json
   { "category": "Drinks", "items": [{ "n": "Cola", "p": 3.5, "c": "USD" }] }
   ```
5. **Response**: Returns the sanitized JSON back to the Hono backend or directly to the Next.js client.

## 5. Storage and CDN Strategy

- **Static Assets (R2)**: Menu item images, restaurant logos, and parsed PDFs are uploaded directly to Cloudflare R2 via a secure Hono endpoint.
- **Delivery**: Assets are served directly via a public-facing Cloudflare Worker route (`/assets/*`), leveraging Cloudflare's global CDN caching automatically.
- **Analytics KV**: Short-term rate limits and potentially real-time view counters are stored in KV for sub-millisecond access before being aggregated into Postgres.
