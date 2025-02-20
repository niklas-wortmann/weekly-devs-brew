import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaDiscord, href: '#', label: 'Discord' }
  ];

  return (
    <footer className="bg-primary dark:bg-primary/90 text-white py-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-bebas text-3xl mb-4">THE WEEKLY DEVS BREW</h2>
          <p className="text-secondary mb-6">Join our brewing community</p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-primary-accent transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} The Weekly Devs Brew. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;