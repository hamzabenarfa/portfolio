# System Overview: Menu QR

The **Menu QR** platform is a modern SaaS solution tailored for the HORECA (Hotel, Restaurant, Café) industry, allowing businesses to easily digitize their menus and generate table-specific QR codes. 

This document serves as the high-level entry point into the system's architecture. For deeper technical details, please refer to the dedicated frontend and backend architecture documents.

## System Architecture

The ecosystem relies on a decoupled, microservices-oriented architecture designed for edge deployment, global scale, and specialized AI processing.

```mermaid
graph TD
    %% Frontend Layer
    Client([End User / Customer])
    Owner([Restaurant Owner])
    
    subgraph "Frontend Layer"
        NextJS[Next.js 15 Frontend<br/>(menu-qr-frontend)]
    end
    
    %% Backend Layer
    subgraph "Core Backend"
        HonoAPI[Hono API on Cloudflare Workers<br/>(menu-qr-cloudflare-hono)]
    end
    
    %% AI Processing Layer
    subgraph "AI Microservice"
        FastAPI[Python AI Service<br/>(menu-ai-service)]
    end
    
    %% Data & Storage Layer
    subgraph "Data & Storage"
        Postgres[(Neon Postgres)]
        KV[(Cloudflare KV)]
        R2[(Cloudflare R2)]
    end

    %% External Services
    Resend[Resend API]
    Google[Google OAuth]
    OpenRouter[OpenRouter / Vision LLM]

    %% Connections
    Client -- Scans QR / Views Menu --> NextJS
    Owner -- Manages Business --> NextJS
    
    NextJS -- REST API calls --> HonoAPI
    NextJS -. Proxies AI scans .-> FastAPI
    
    HonoAPI -- Auth Emails --> Resend
    HonoAPI -- OAuth --> Google
    HonoAPI -- SQL Queries --> Postgres
    HonoAPI -- Analytics / Rate Limits --> KV
    HonoAPI -- Media Uploads --> R2
    
    FastAPI -- Image/Text inference --> OpenRouter
```

## Key Components

### 1. The Frontend (`menu-qr-frontend`)
A highly responsive, internationalized (i18n) React application built on Next.js 15. It handles two completely distinct user journeys:
- **The Dashboard**: A protected area where restaurant owners manage their digital presence, menus, categories, and generate PDFs of their QR codes.
- **The Public View**: Extremely fast, SEO-friendly public pages where customers interact with the menu.
- **Docs**: [Frontend Architecture](./FRONTEND_ARCHITECTURE.md)

### 2. The Core Backend (`menu-qr-cloudflare-hono`)
A serverless API designed to run at the edge using Cloudflare Workers and Hono. 
- It handles authentication via magic links and OAuth.
- It interfaces with a serverless Neon Postgres database via Drizzle ORM.
- It leverages Cloudflare's edge primitives (KV caching, R2 object storage) to ensure sub-millisecond response times for global customers scanning QR codes.
- **Docs**: [Backend Architecture](./BACKEND_ARCHITECTURE.md)

### 3. The AI Engine (`menu-ai-service`)
An optional but highly recommended Python microservice that transforms raw, unstructured physical menus (images or PDFs) into structured JSON data.
- Built with FastAPI.
- Employs a hybrid extraction strategy: utilizing powerful Vision LLMs for complex layouts and falling back to local OCR (EasyOCR/PaddleOCR) when necessary or to reduce costs.
- Integrates seamlessly with the frontend's menu editor, allowing restaurants to digitize a 50-item menu in seconds rather than hours.

## Deployment Strategy

- **Frontend**: Best deployed to Vercel for optimal Next.js performance and edge rendering.
- **Core Backend**: Deployed via `wrangler` to Cloudflare Workers. Database migrations are handled simultaneously via Drizzle.
- **AI Service**: Containerized via Docker and deployed to any container orchestration platform (e.g., AWS ECS, DigitalOcean App Platform, Fly.io) to provide a persistent, scalable compute layer for the OCR and Python dependencies.
