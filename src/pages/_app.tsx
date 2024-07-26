import React, { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@/components/Layout';
import Modal from '@/components/DialogsModal';
import ModalContextProvider from '@/context/modalContext';
import darkModeStore from '@/context/themeContext';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  const { isDarkMode } = darkModeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const renderContent = () => {
    switch (pageProps.layoutType) {
      case 'removeLayout':
        return <Component {...pageProps} />;
      default:
        return (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        {renderContent()}
        <Modal />
      </ModalContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
