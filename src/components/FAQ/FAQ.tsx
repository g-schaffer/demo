import React, { useState, useContext } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {currentText.faq.title}
        </h2>

        <div className="space-y-4">
          {currentText.faq.questions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleQuestion(index)}
              >
                <span className="font-semibold text-gray-800">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#FFD300]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#FFD300]" />
                )}
              </button>

              <div
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 py-4 opacity-100'
                    : 'max-h-0 py-0 opacity-0'
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}