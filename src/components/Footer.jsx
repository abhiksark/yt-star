// Importing necessary icons from a library such as react-icons for better accessibility and SVG support
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm p-4">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4 text-center lg:text-left">
          {/* Footer Links */}
          <a href="about" className="hover:text-blue-200 transition-colors duration-300">About</a>
          <a href="ContactUs" className="hover:text-blue-200 transition-colors duration-300">Contact Us</a>
          <a href="#" className="hover:text-blue-200 transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-blue-200 transition-colors duration-300">Terms of Use</a>
        </div>
        <div className="flex justify-center items-center flex-col lg:flex-row lg:justify-between text-center lg:text-left">
          <div>
            <p>
              &copy; {new Date().getFullYear()} Top YouTubers Community. All rights reserved.
            </p>
          </div>
          {/* Social Media Icons - Added with a modern touch using react-icons */}
          <div className="flex mt-4 lg:mt-0 space-x-4">
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaFacebookF className="h-5 w-5" />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:scale-125 transition-transform duration-300">
              <FaInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
