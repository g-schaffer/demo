import React, { useState, useContext } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';
import weeks from '../../content/weeks.json';

export function Hero() {
  const [postalCode, setPostalCode] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const currentText = text[language];

  const handleVerification = () => {
    if (weeks.week4.includes(postalCode)) {
      navigate('/order', { state: { postalCode } });
    } else {
      setShowError(true);
    }
  };

  return (
    <section 
      id="hero"
      className="pt-24 pb-12 px-4 min-h-screen flex items-center"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
          {currentText.hero.title}
        </h1>
        
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl max-w-md mx-auto relative">
          {/* Wavy Circle */}
          <div className="absolute -top-8 -right-8 w-24 h-24">
            <div className="absolute inset-0 bg-[#FFD300] rounded-full animate-[wave_4s_ease-in-out_infinite] flex flex-col items-center justify-center text-gray-900">
              <span className="text-xs font-medium">{currentText.hero.priceTag.prefix}</span>
              <span className="text-2xl font-bold">{currentText.hero.priceTag.amount}</span>
              <span className="text-xs font-medium">{currentText.hero.priceTag.suffix}</span>
            </div>
          </div>

          <style>{`
            @keyframes wave {
              0%, 100% {
                border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
              }
              50% {
                border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
              }
            }
          `}</style>

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {currentText.hero.form.title}
          </h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={currentText.hero.form.placeholder}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FFD300] focus:border-transparent ${
                showError ? 'border-red-500' : 'border-gray-300'
              }`}
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
                setShowError(false);
              }}
            />
            {showError && (
              <p className="text-red-500 text-sm">
                {currentText.hero.form.errorMessage}
              </p>
            )}
            <button 
              onClick={handleVerification}
              className="w-full bg-[#FFD300] text-gray-900 py-2 rounded-lg hover:bg-[#459968] transition duration-300 flex items-center justify-center gap-2"
            >
              {currentText.hero.form.button}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}