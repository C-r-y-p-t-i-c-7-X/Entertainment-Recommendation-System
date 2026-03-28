import '../styles/globals.css';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Pages where footer should NOT show
  const noFooter = router.pathname.startsWith('/[mediaType]');

  return (
    <>
      <Component {...pageProps} />
      {!noFooter && <Footer />}
    </>
  );
}
