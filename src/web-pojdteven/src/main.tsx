import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import setClientConfig from './utils/helpers/setClientConfig.ts';
import { Toaster } from './components/ui/toaster.tsx';

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     retry: 3,
  //     staleTime: 10 * 1000, // 10s
  //     gcTime: 300_000, // 5min
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //     refetchOnMount: false,
  //   },
  // },
});

setClientConfig();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
      {/*<ReactQueryDevtools position='right' buttonPosition='bottom-left' />*/}
    </QueryClientProvider>
  </StrictMode>
);
