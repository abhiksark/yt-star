// components/Footer.js

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white text-sm p-4">
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {/* Footer Links */}
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact Us</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </div>
          <div className="flex justify-center items-center flex-col lg:flex-row lg:justify-between">
            <div>
              <p>
                &copy; {new Date().getFullYear()} Bitwise Builder. All rights reserved.
              </p>
            </div>
            {/* Social Media Icons - Example placeholders */}
            {/* <div className="flex mt-4 lg:mt-0">
              <a href="#" className="ml-2">
                <img src="/icons/facebook.svg" alt="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="ml-2">
                <img src="/icons/twitter.svg" alt="Twitter" className="h-6 w-6" />
              </a>
              <a href="#" className="ml-2">
                <img src="/icons/instagram.svg" alt="Instagram" className="h-6 w-6" />
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  