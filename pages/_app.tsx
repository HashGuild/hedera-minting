import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Layout from '../components/global/Layout';
import { HashConnectWrapper } from '../context/HashConnectWrapper';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
    attribute="class"
    storageKey="nightwind-mode"
    defaultTheme="system" // default "light"
    >
    <HashConnectWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </HashConnectWrapper>
    </ThemeProvider>
 );
}

export default MyApp;
