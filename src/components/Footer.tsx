import React from 'react';
import {FaLinkedin, FaInstagram, FaTiktok, FaYoutube} from 'react-icons/fa';
import {FaBluesky} from 'react-icons/fa6';

const Footer = () => {
  const socialLinks = [
    { icon: FaInstagram, href: 'https://www.instagram.com/weeklydevsbrew/', label: 'Instagram' },
    { icon: FaBluesky, href: 'https://bsky.app/profile/weeklydevsbrew.bsky.social', label: 'Bluesky' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/the-weekly-dev-s-brew', label: 'LinkedIn' },
    { icon: FaTiktok, href: 'https://www.tiktok.com/@the.weekly.devs.b?_t=ZT-8u3rjY4d8pi&_r=1', label: 'TikTok' },
    { icon: FaYoutube, href: 'https://www.youtube.com/channel/UC7aHZVHaVcHpu3m8vWstVxg', label: 'YouTube' },
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