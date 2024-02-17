import Head from 'next/head';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Head>
        <title>Privacy Policy - Top YouTubers Community</title>
        <meta name="description" content="Understand how the Top YouTubers Community collects, uses, and protects your data." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-10">
        <article className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">Privacy Policy</h1>
          <section className="text-md lg:text-lg text-gray-600 leading-relaxed space-y-4">
            <p>Your privacy is important to us. It is the Top YouTubers Community&apos;s policy to respect your privacy regarding any information we may collect from you across our website.</p>
            
            <h2 className="text-2xl font-semibold">1. Information Collection and Use</h2>
            <p>We collect information to provide better services to all our users – from figuring out basic stuff like which language you speak, to more complex things like which videos you might like.</p>
            
            <h2 className="text-2xl font-semibold">2. Log Data</h2>
            <p>We want to inform you that whenever you visit our website, we collect information that your browser sends to us, known as Log Data. This Log Data may include information such as your computer&apos;s Internet Protocol (`&quot;`IP`&quot;`) address, browser version, pages of our website that you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
            
            <h2 className="text-2xl font-semibold">3. Cookies</h2>
            <p>Cookies are files with a small amount of data that is commonly used as an anonymous unique identifier. These are sent to your browser from the website that you visit and are stored on your computer&apos;s hard drive.</p>
            <p>Our website uses these `&quot;`cookies`&quot;` to collect information and to improve our service. You have the option to either accept or refuse these cookies, and know when a cookie is being sent to your computer. If you choose to refuse our cookies, you may not be able to use some portions of our service.</p>

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

export default PrivacyPolicy;
