import Head from 'next/head';
import Link from 'next/link';

const TermsOfUse = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Head>
        <title>Terms of Use - Top YouTubers Community</title>
        <meta name="description" content="Read the terms of use for the Top YouTubers Community website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-10">
        <article className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">Terms of Use</h1>
          <section className="text-md lg:text-lg text-gray-600 leading-relaxed space-y-4">
            <p>Welcome to the Top YouTubers Community. By accessing our website, you agree to these terms of use. Please read them carefully.</p>
            
            <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
            <p>The following terms and conditions govern all use of the Top YouTubers Community website and all content, services, and products available at or through the website.</p>
            
            <h2 className="text-2xl font-semibold">2. Privacy Policy</h2>
            <p>Our Privacy Policy, which also governs your visit to our site, can be found at [Privacy Policy Link]. Please review our Privacy Policy for information on how we collect, use, and share your information.</p>
            
            <h2 className="text-2xl font-semibold">3. Communication</h2>
            <p>By creating an account on our website, you agree to subscribe to newsletters, marketing or promotional materials, and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send.</p>

            {/* Include additional sections as needed */}
          </section>
          {/* Consider adding a navigation link back to the home page or contact page for inquiries */}
          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:underline">Return to Homepage</Link>
          </div>
        </article>
      </main>
    </div>
  );
};

export default TermsOfUse;
