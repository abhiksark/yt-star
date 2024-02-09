// components/Header.js

const Header = () => {
  return (
    <header className="bg-red-600 text-white p-4 lg:p-6 flex flex-col lg:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Top YouTubers Community</h1>
        <p className="text-md lg:text-lg mt-2">Discover, connect, and engage with your favorite creators</p>
      </div>
      {/* Optional: Include a search bar or filter options here */}
      {/* <div className="w-full lg:w-auto">
        <input
          type="text"
          placeholder="Search YouTubers..."
          className="w-full lg:w-auto px-4 py-2 rounded-lg text-black"
        />
      </div> */}
    </header>
  );
};

export default Header;
