import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function Deco() {
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  return (
    <section className="bg-white py-16" id="deco">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        
        {/* Desktop Layout */}
        <div className="relative max-w-[1200px] mx-auto hidden lg:block">
          {/* Step 1 - Top Right */}
          <div className="absolute -top-12 right-0 max-w-[300px]">
            <div className="bg-white/0 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentText.process.steps[0].title}</h3>
              <p className="text-gray-800">{currentText.process.steps[0].description}</p>
            </div>
          </div>

          {/* Central Image */}
          <div className="mx-auto">
            <img 
              src="/expl.avif" 
              alt="Décoration mousse"
              width="600"
              height="469"
              className="w-[600px] h-[469px] rounded-xl object-cover mx-auto"
            />
          </div>

          {/* Step 2 - Middle Left */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 max-w-[300px]">
            <div className="bg-white/0 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentText.process.steps[1].title}</h3>
              <p className="text-gray-800">{currentText.process.steps[1].description}</p>
            </div>
          </div>

          {/* Step 3 - Bottom Right */}
          <div className="absolute -bottom-12 right-0 max-w-[300px]">
            <div className="bg-white/0 p-4 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{currentText.process.steps[2].title}</h3>
              <p className="text-gray-800">{currentText.process.steps[2].description}</p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Image on top */}
          <div className="mx-auto">
            <img 
              src="/expl.avif" 
              alt="Décoration mousse"
              width="600"
              height="469"
              className="w-full max-w-[400px] rounded-xl object-cover mx-auto"
            />
          </div>

          {/* Steps below image */}
          <div className="space-y-6">
            {currentText.process.steps.map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-800">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}