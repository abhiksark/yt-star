import Link from 'next/link';


const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4 lg:p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
      <div>
        {/* Wrap the heading text with Link to enable navigation */}
        <Link href="/">
          <a className="hover:underline"> {/* Added a hover effect for better UX */}
            <h1 className="text-2xl lg:text-3xl font-bold">Top YouTubers Community</h1>
          </a>
        </Link>
        <p className="text-md lg:text-lg mt-2">Discover, connect, and engage with your favorite creators</p>
      </div>
      {/* Sleek search bar with a refined appearance */}
      <div className="w-full lg:w-auto">
        <input
          type="text"
          placeholder="Search YouTubers..."
          className="w-full lg:w-64 px-4 py-2 rounded-lg text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}
        />
      </div>
    </header>
  );
};

export default Header;
