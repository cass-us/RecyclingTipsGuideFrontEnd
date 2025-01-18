import React from 'react';

const FooterSection = () => {
  return (
    <footer className="bg-green-300 opacity-80 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm">&copy; 2025 TeamTech'z IT Solutions. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Facebook
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Twitter
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Instagram
          </a>
          <a href="/contact-us" className="hover:underline">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
