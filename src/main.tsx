/// <reference types="vite/client" />
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

// Create router instance
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Get root element
const rootElement = document.getElementById('root')!
const root = createRoot(rootElement)

// Render app
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

