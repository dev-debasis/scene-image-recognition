import React from "react";
const Navbar = () => {
  return (
    <nav className="p-4 shadow-md text-[#136D86] text-xs font-medium">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-8 mr-2 ml-5" /> {/* Add margin-left */}
          <span className="text-base font-bold text-white">TEXTIFY AI</span>
        </div>
        <ul className="flex items-center space-x-6 mr-5"> {/* Add margin-right */}
          <li><a href="#home" className="hover:underline">HOME</a></li>
          <li><a href="#about" className="hover:underline">ABOUT</a></li>
          <li className="relative group">
            <span className="hover:underline cursor-pointer">LANGUAGES</span>
            <ul className="absolute bg-white text-blue-600 shadow-lg rounded-lg p-2 hidden group-hover:block">
              <li><a href="#en" className="block px-4 py-2 hover:bg-blue-100">English (en)</a></li>
              <li><a href="#es" className="block px-4 py-2 hover:bg-blue-100">Spanish (es)</a></li>
              <li><a href="#fr" className="block px-4 py-2 hover:bg-blue-100">French (fr)</a></li>
            </ul>
          </li>
          <li><a href="#tool" className="hover:underline">TOOL</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
