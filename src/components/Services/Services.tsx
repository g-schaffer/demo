import React, { useContext } from 'react';
import { Truck, Droplets, Timer, Shield } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

const icons = [
  <Truck className="h-8 w-8 text-[#FFD300]" />,
  <Droplets className="h-8 w-8 text-[#FFD300]" />,
  <Timer className="h-8 w-8 text-[#FFD300]" />,
  <Shield className="h-8 w-8 text-[#FFD300]" />
];

export function Services() {
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  return (
    <section className="py-16 px-4 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {currentText.services.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentText.services.items.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col"
            >
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {icons[index]}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}