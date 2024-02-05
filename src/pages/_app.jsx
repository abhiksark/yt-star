import { useEffect, useRef } from 'react'
import { DefaultSeo } from 'next-seo';
import SEO from './next-seo.config'
import Footer from '@/components/Footer'; // Make sure the path is correct
import Header from '@/components/Header'; // Make sure the path is correct

import '@/styles/tailwind.css'
import 'focus-visible'

import { Analytics } from '@vercel/analytics/react'

function usePrevious(value) {
  let ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default function App({ Component, pageProps, router }) {
  let previousPathname = usePrevious(router.pathname)

  return (
    <>
      <DefaultSeo {...SEO} />
      <div className="relative min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
        <Analytics />
      </div>
    </>
  )
}
