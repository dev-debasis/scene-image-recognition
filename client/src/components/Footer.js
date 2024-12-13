import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">© 2024 Debasis Khamari</p>
        <div className="flex items-center space-x-4">
        <a
              href="https://linkedin.com/in/debasis-khamari-"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://x.com/debasiskhamari7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-square-x-twitter"></i>
            </a>
            <a
              href="https://facebook.com/DebasisKhamariOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-facebook"></i>{" "}
            </a>
            <a
              href="https://github.com/dev-debasis"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-github"></i>
            </a>
            <a
              href="https://discord.gg/9XWk4p6W7M"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa-brands fa-discord"></i>
            </a>

            <a href="mailto:debasiskhamari7@gmail.com">
              <i class="fa-solid fa-envelope"></i>{" "}
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
