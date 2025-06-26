import React, { useEffect, useState, useRef } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import icpLogo from "../assets/icplogo.svg";

const Navbar = () => {
  const [authClient, setAuthClient] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const dropdownRef = useRef(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileNavOpen(false);
    }
  };

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      if (await client.isAuthenticated()) {
        setPrincipal(client.getIdentity().getPrincipal());
      }
    });
  }, []);

  const login = async () => {
    if (!authClient) return;
    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        setPrincipal(authClient.getIdentity().getPrincipal());
      },
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setPrincipal(null);
    setMenuOpen(false);
    setMobileNavOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayPrincipal = principal ? `${principal.toText().slice(0, 4)}...${principal.toText().slice(-3)}` : "";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 shadow-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-500 bg-clip-text text-transparent animate-gradient">
          HashWarden
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileNav} className="text-gray-700 dark:text-gray-200 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          <button onClick={() => scrollToSection("hero-section")} className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">HOME</button>
          <button onClick={() => scrollToSection("stack")} className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">TECH</button>
          <button onClick={() => scrollToSection("pricing-section")} className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">PRICING</button>
          {!principal ? (
            <button onClick={login} className="text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400">LOGIN</button>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <img
                src={icpLogo}
                alt="ICP User"
                onClick={toggleMenu}
                className="w-8 h-8 rounded-full cursor-pointer border-2 border-white dark:border-gray-600"
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-2 text-sm">
                  <div className="px-4 py-2 text-gray-800 dark:text-gray-200 font-medium border-b dark:border-gray-700">{displayPrincipal}</div>
                  <button onClick={logout} className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <span className="mr-2">↩</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700 dark:text-gray-200">
          <button onClick={() => scrollToSection("hero-section")} className="block w-full text-left">HOME</button>
          <button onClick={() => scrollToSection("stack")} className="block w-full text-left">TECH</button>
          <button onClick={() => scrollToSection("pricing-section")} className="block w-full text-left">PRICING</button>
          {!principal ? (
            <button onClick={login} className="block w-full text-left">LOGIN</button>
          ) : (
            <div className="pt-2 border-t dark:border-gray-700" ref={dropdownRef}>
              <div className="text-sm text-gray-800 dark:text-gray-200 mb-2">{displayPrincipal}</div>
              <button onClick={logout} className="w-full text-left text-red-600 hover:underline">Sign Out</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
