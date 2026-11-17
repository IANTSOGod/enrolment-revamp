# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## Production environment

Place the production `.env` file beside `compose.prod.yml` on the server. Compose
uses it to populate the frontend container's environment. Recreate the container
after changing the file:

```bash
docker compose -f compose.prod.yml up -d --force-recreate frontend
```

The frontend is a static Vite build: `VITE_*` values used by browser code are
embedded when the image is built and are not changed by runtime container
variables. Supply those values during the image build if the browser app needs
to use them; runtime variables are available to the container (for example via
`printenv`) but not to the already-built JavaScript.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
