import { useEffect, useRef } from 'react';
import Footer from '@/components/Footer'; // Adjust the path as needed
import Header from '@/components/Header'; // Adjust the path as needed

import '@/styles/tailwind.css'; // Ensure this path is correct for your Tailwind CSS file
import 'focus-visible';

import { Analytics } from '@vercel/analytics/react';

function usePrevious(value) {
  let ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname);

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
        <Analytics /> {/* Make sure you have set up Vercel Analytics correctly if you're using this */}
      </div>
    </>
  );
}
