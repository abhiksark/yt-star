import Head from 'next/head';
import Link from 'next/link';

const ContactUs = () => {
  // Placeholder function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your form submission logic here
    alert('Form submitted! We will be in touch.');
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Head>
        <title>Contact Us - Top YouTubers Community</title>
        <meta name="description" content="Get in touch with the Top YouTubers Community team." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-10 pb-20">
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-10 lg:p-14 border border-gray-200 max-w-2xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">Contact Us</h1>
          <p className="text-md lg:text-lg text-gray-600 leading-relaxed mb-6">
            Have questions or feedback? Fill out the form below, and we&apos;ll get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-900 block mb-2">Your Name</label>
              <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2">Your Email</label>
              <input type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-900 block mb-2">Message</label>
              <textarea id="message" name="message" rows="4" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Send Message</button>
          </form>
          {/* Optionally, link back to the homepage or other relevant page */}
          <div className="text-center mt-6">
            <Link href="/">
              <a className="text-blue-600 hover:underline">Return to Homepage</a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ContactUs;
