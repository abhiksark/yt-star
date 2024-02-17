import Head from 'next/head';
import Link from 'next/link';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Head>
        <title>About - Top YouTubers Community</title>
        <meta name="description" content="Learn more about the Top YouTubers Community and what we offer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-10 pb-20">
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-14 border border-gray-200">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">About Us</h1>
          <p className="text-md lg:text-lg text-gray-600 leading-relaxed mb-6">
            Welcome to the <strong>Top YouTubers Community</strong>! Our platform is dedicated to helping viewers discover, connect, and engage with their favorite educational content creators on YouTube. Whether you&apos;re looking for tutorials, course reviews, or insights into the latest tech trends, our community has something for everyone.
          </p>
          <p className="text-md lg:text-lg text-gray-600 leading-relaxed mb-6">
            Our mission is to create a space where learning and passion for knowledge thrive. We believe in the power of digital education and its ability to transform lives. Through our curated lists, featured videos, and creator spotlights, we aim to bring you closer to the content that inspires and educates.
          </p>
          {/* Optionally, add more sections or call-to-action buttons */}
          <div className="text-center mt-10">
            <Link href="/">
              <a className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white transition duration-150 ease-in-out">
                Return Home
              </a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
