import React, { useContext } from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function Footer() {
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/">
              <img 
                src="/wize.png" 
                alt={`${currentText.global.companyName} Logo`}
                className="h-120 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm">
              {currentText.footer.description}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentText.footer.sections.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>{currentText.global.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>{currentText.global.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>
                  {currentText.global.address.street}<br />
                  {currentText.global.address.postalCode} {currentText.global.address.city}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentText.footer.sections.quickLinks}</h3>
            <ul className="space-y-2">
              {currentText.navigation.menuItems.map((item, index) => (
                <li key={index}>
                  <Link to={`/#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-[#FFD300] transition duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{currentText.footer.sections.social}</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-[#FFD300] transition duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="bg-gray-800 p-2 rounded-full hover:bg-[#FFD300] transition duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} {currentText.global.companyName}. {currentText.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}