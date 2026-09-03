import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter } from 'react-router-dom';

import { App } from './app/App';

window.global = window;

const queryClient = new QueryClient();

// Start MSW worker and then render the app
async function startApp() {
  if (process.env['NODE_ENV'] === 'development') {
    try {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        onUnhandledRequest: 'bypass',
      });
    } catch (error) {
      console.warn(
        '>>> MSW not available. Make sure to install msw: npm install -D msw'
      );
      console.warn('>>> Then run: npm run msw:init');
    }
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <StrictMode>
      <HashRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HashRouter>
    </StrictMode>
  );
}

startApp();
