# Simple React + Node Express Web Application

A lightweight full-stack web application designed for quick testing and containerization.

## Features

- **Frontend**: React (Vite) with interactive state counter and API test forms.
- **Backend**: Node.js + Express with JSON endpoints and static file serving.
- **Docker**: Multi-stage `Dockerfile` creating an optimized single container for both frontend & backend.
- **Docker Compose**: Included `docker-compose.yml` for quick startup.

---

## Project Structure

```
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx         # Main UI component
│   │   ├── index.css       # Styles
│   │   └── main.jsx        # Entrypoint
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── index.js            # Express API & static server
│   └── package.json
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml       # Docker compose configuration
├── .dockerignore
└── package.json            # Root workspace scripts
```

---

## Running with Docker

### Option 1: Using Docker CLI
```bash
# Build the Docker image
docker build -t test-web-app .

# Run the container
docker run -p 5000:5000 test-web-app
```

### Option 2: Using Docker Compose
```bash
docker compose up --build
```

Open your browser and navigate to: **[http://localhost:5000](http://localhost:5000)**

---

## Local Development (Without Docker)

1. **Install dependencies**:
   ```bash
   npm run install:all
   ```

2. **Start Backend**:
   ```bash
   npm run dev:server
   ```
   Backend runs on `http://localhost:5000`.

3. **Start Frontend (in another terminal)**:
   ```bash
   npm run dev:client
   ```
   Frontend runs on `http://localhost:3000` (with proxy to backend configured).

---

## CI Pipeline (GitHub Actions & GHCR)

The repository includes a GitHub Actions workflow in [`.github/workflows/ci.yml`](.github/workflows/ci.yml) that:
1. Triggers on pushes and pull requests to `main`.
2. Authenticates to GitHub Container Registry (`ghcr.io`) using the built-in `GITHUB_TOKEN`.
3. Builds both **frontend** (`client/Dockerfile`) and **backend** (`server/Dockerfile`) in parallel using a matrix strategy.
4. Pushes container artifacts to GHCR with commit SHA and `latest` tags:
   - `ghcr.io/<owner>/<repo>/frontend:latest`
   - `ghcr.io/<owner>/<repo>/backend:latest`

---

## API Endpoints

- `GET /api/message` - Returns backend health status and server timestamp.
- `POST /api/echo` - Accepts `{ "text": "..." }` and returns reversed text with timestamp.
# test
# test
