import logo from "../assets/mylogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href=""
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-8"
              alt="HashWarden Logo"
            />
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                HashWarden
            </div>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <div className="hover:underline">
                Contact: dinztest04@gmail.com
              </div>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          TEAM © 2025 <a href="" className="hover:underline">OCANISME™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
