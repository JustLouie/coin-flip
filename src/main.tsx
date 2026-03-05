import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import ThemeProvider from '@/providers/ThemeProvider';
import QueryClientProvider from './providers/QueryClient'
import GameProvider from './contexts/GameProvider';

import './index.css'

// Wrap react render function with mock api worker.
const renderWithMswWorker = async () => {
  if (import.meta.env.VITE_MOCK_API === 'true') {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider>
        <ThemeProvider >
          <GameProvider>
            <App />
          </GameProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}


renderWithMswWorker()