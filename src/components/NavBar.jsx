// components/NavBar.js
import { SearchIcon, BellIcon, MenuIcon } from '@heroicons/react/outline'; // Example icons, adjust imports based on your setup

const NavBar = () => {
  return (
    <nav className="bg-red-600 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="md:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
        {/* <div>
          <img src="/your-logo-path.svg" alt="Logo" className="h-8" /> 
        </div> */}
      </div>
      
      {/* Search Bar - hidden on smaller screens */}
      <div className="hidden md:flex items-center space-x-2">
        <input type="text" placeholder="Search" className="p-2 rounded bg-white text-black" />
        <button className="p-2 rounded bg-gray-100 text-black">
          <SearchIcon className="h-5 w-5" />
        </button>
      </div>
      
      {/* Right-side Icons */}
      <div className="flex items-center space-x-4">
        <button>
          <BellIcon className="h-6 w-6" />
        </button>
        {/* Other icons or profile picture */}
      </div>
    </nav>
  );
};

export default NavBar;
