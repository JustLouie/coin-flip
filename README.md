# CoinFlip

Frontend application built with **Vite**, **React**, and **TypeScript**.
The project includes **Mock Service Worker (MSW)** for API mocking during development.

---

# Overview

This project provides a modern frontend architecture using:

* **Vite** for fast development and optimized builds
* **React** for UI development
* **TypeScript** for type safety
* **MSW (Mock Service Worker)** for API mocking
* **Tailwind** for styling

The project is structured to support scalable frontend architecture with a clear separation between:

* UI components
* business logic
* API communication
* state management

---

# Requirements

Before running the project, ensure the following tools are installed:

| Tool              | Version |
| ----------------- | ------- |
| Node.js           | 18+     |
| npm / pnpm / yarn | latest  |

Check installed versions:

```bash
node -v
npm -v
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies.

### Using npm

```bash
npm install
```

### Using pnpm

```bash
pnpm install
```

### Using yarn

```bash
yarn install
```

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

```env
VITE_MOCK_API=true
```

> Note: Environment variables used by Vite must start with `VITE_`.

---

# Running the Project

Start the development server:

```bash
npm run dev
```

or

```bash
pnpm dev
```

or

```bash
yarn dev
```

The application will start at:

```
http://localhost:5173
```

The server automatically reloads when files change.

---

# Building for Production

To build the project for production:

```bash
npm run build
```

The optimized production build will be generated in the `dist/` folder.

---

# Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This runs a local server serving the compiled application.

---

# Available Scripts

| Script    | Description                  |
| --------- | ---------------------------- |
| `dev`     | Start development server     |
| `build`   | Build project for production |
| `preview` | Preview production build     |
| `lint`    | Run ESLint                   |

---

# Project Structure

```
project-root
│
├── public/
│   ├── mockServiceWorker.js
│   └── assets
│
├── src/
|   ├── assets/
│   │   Local assets, Imagees or similar files
│   │
|   ├── constants/
│   │   Constant variable in the project
│   │
│   ├── components/
│   │   Reusable UI components
│   │
|   ├── contexts/
│   │   Context APIs
│   │
│   ├── pages/
│   │   Application pages
│   │
│   ├── modules/
│   │   Modules are Functional Components split into sections.
│   │
│   ├── hooks/
│   │   Custom React hooks and React Queries or mutations
│   │
│   ├── services/
│   │   API communication layer
│   │
│   ├── mocks/
│   │   MSW API mock handlers
│   │
│   ├── providers/
│   │   Some third-party providers, like React query or Tailwing theme provider
│   │
│   ├── lib/
│   │   Utility helper functions and logics
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── vite.config.ts
├── package.json
└── README.md
```

---

# Architecture Overview

The application follows a layered architecture:

### UI Layer

Located in:

```
src/components
src/modules
src/pages
```

Responsible for rendering UI and handling user interactions.

---

### API Layer

Located in:

```
src/services
```

Contains functions responsible for communication with backend services.

Example:

```ts
export const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}
```

---

### Business Logic

Located in:

```
src/lib/utils.ts
src/hooks
```

Contains reusable logic and helper functions.

---

# Mock API (MSW)

The project uses **Mock Service Worker (MSW)** to simulate API responses during development.

This allows frontend development without requiring a running backend.

Mock handlers are located in:

```
src/mocks/handlers.ts
```

Example handler:

```ts
import { http, HttpResponse } from "msw"

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" }
    ])
  })
]
```

The service worker file is located in:

```
public/mockServiceWorker.js
```

To regenerate the worker:

```bash
npx msw init public/ --save
```

---

# Troubleshooting

### Clear dependencies

If you experience dependency issues:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

### Port already in use

If port `5173` is busy:

Stop the existing process or change the port in:

```
vite.config.ts
```

Example:

```ts
server: {
  port: 3000
}
```

---

# Recommended Development Tools

Recommended editor setup:

* **VS Code**
* **ESLint Extension**
* **Prettier Extension**
* **TypeScript Extension**

---

# License

This project is licensed under the MIT License.

---

# Author

Project developed and maintained by the Giorgi.
