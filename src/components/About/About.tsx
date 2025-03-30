import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function About() {
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  return (
    <section className="relative">
      {/* Desktop Version */}
      <div className="hidden lg:block">
        <div className="relative">
          <img 
            src="/camion.png"
            alt="Service"
            className="w-full h-[440px] object-cover"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  {currentText.about.title}
                </h2>
                <div className="space-y-6 text-gray-900">
                  {currentText.about.description.map((paragraph, index) => (
                    <p key={index} className="text-lg">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden">
        <div className="relative h-[800px]">
          <img 
            src="camionv.png"
            alt="Service mobile"
            className="absolute top-0 left-0 w-full h-[800px] object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#FFD300] px-4 py-12">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {currentText.about.title}
              </h2>
              <div className="space-y-6 text-gray-900">
                {currentText.about.description.map((paragraph, index) => (
                  <p key={index} className="text-lg">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}