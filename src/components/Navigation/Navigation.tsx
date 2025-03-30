import React, { useState, useContext, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage } = useContext(LanguageContext);
  const currentText = text[language];

  const sectionLinks = [
    { id: 'hero', label: currentText.navigation.menuItems[0] },
    { id: 'services', label: currentText.navigation.menuItems[1] },
    { id: 'deco', label: currentText.navigation.menuItems[2] },
    { id: 'tarifs', label: currentText.navigation.menuItems[3] },
    { id: 'faq', label: currentText.navigation.menuItems[4] },
    { id: 'contact', label: currentText.navigation.menuItems[5] },
  ];

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      scrollToSection(id, false);
    }
  }, [location]);

  const scrollToSection = (id: string, updateHash = true) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      if (updateHash) {
        window.history.pushState(null, '', `#${id}`);
      }
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderClick = () => {
    setIsMenuOpen(false);
    navigate('/order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#FFD300] p-2"
            >
              {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>

          {/* Logo - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex items-center">
            <img 
              src="/wize.png" 
              alt={`${currentText.global.companyName} Logo`}
              className="h-16 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {sectionLinks.map((section, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(section.id)}
                className="text-gray-700 hover:text-[#FFD300] font-bold text-lg"
              >
                {section.label}
              </button>
            ))}

            <button 
              onClick={handleOrderClick}
              className="bg-[#FFD300] text-gray-900 px-6 py-2 rounded-lg hover:bg-[#FFD300]/90 transition-colors duration-300 font-bold text-lg"
            >
              {currentText.navigation.ctaButton}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-gray-700 hover:text-[#FFD300] font-bold"
            >
              <Languages className="h-5 w-5" />
              <span className="uppercase">{language === 'fr' ? 'EN' : 'FR'}</span>
            </button>
          </div>

          {/* Mobile Logo - Shown on mobile, hidden on desktop */}
          <div className="md:hidden flex items-center">
            <img 
              src="/wize.png" 
              alt={`${currentText.global.companyName} Logo`}
              className="h-16 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {sectionLinks.map((section, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(section.id)}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-[#FFD300] font-bold text-lg"
                >
                  {section.label}
                </button>
              ))}

              <button 
                onClick={handleOrderClick}
                className="block w-full text-center px-3 py-3 bg-[#FFD300] text-gray-900 rounded-lg hover:bg-[#FFD300]/90 transition-colors duration-300 font-bold text-lg"
              >
                {currentText.navigation.ctaButton}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-3 text-gray-700 hover:text-[#FFD300] font-bold"
              >
                <Languages className="h-5 w-5" />
                <span className="uppercase">{language === 'fr' ? 'EN' : 'FR'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}