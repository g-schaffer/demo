import React, { useState, useContext } from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';
import prices from '../../content/prices.json';

type PlanType = 'monthly' | 'annual' | 'oneTime';
type VisitFrequency = '12' | '6';
type ContainerCount = '1' | '2' | '3';

export function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [selectedFrequency, setSelectedFrequency] = useState<VisitFrequency | null>(null);
  const [selectedContainers, setSelectedContainers] = useState<ContainerCount | null>(null);
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const currentText = text[language];

  const resetSelections = () => {
    setSelectedPlan(null);
    setSelectedFrequency(null);
    setSelectedContainers(null);
  };

  const getPrice = () => {
    if (!selectedPlan || !selectedContainers || (selectedPlan !== 'oneTime' && !selectedFrequency)) {
      return null;
    }

    const planPrices = prices[selectedPlan];
    const containerPrices = planPrices[selectedContainers];
    const frequency = selectedPlan === 'oneTime' ? '12' : selectedFrequency!;

    return {
      price: containerPrices[frequency],
      savings: 'savings' in containerPrices ? containerPrices.savings : undefined
    };
  };

  const priceData = getPrice();

  const handleReservation = () => {
    navigate('/order');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative py-8 md:py-16 overflow-hidden" id="tarifs">
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, #FFE97F 0%, #FFD300 100%)`,
          backgroundSize: '100% 100%'
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
          {currentText.pricing.title}
        </h2>

        <div className="bg-white rounded-xl p-4 md:p-8 shadow-lg">
          {/* Step 1: Plan Selection */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 flex items-center gap-2">
              <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                1
              </span>
              <span className="leading-tight">{currentText.pricing.steps.plan.title}</span>
            </h3>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {currentText.pricing.steps.plan.options.map((label, index) => {
                const types = ['monthly', 'annual', 'oneTime'];
                const type = types[index];
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPlan(type as PlanType);
                      if (type === 'oneTime') {
                        setSelectedFrequency('12');
                      }
                    }}
                    className={`relative p-2 md:p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedPlan === type
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {selectedPlan === type && (
                      <div className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-full">
                        <Check className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    )}
                    <span className="font-medium text-gray-900 text-sm md:text-base">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Frequency Selection */}
          {selectedPlan && selectedPlan !== 'oneTime' && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 flex items-center gap-2">
                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  2
                </span>
                <span className="leading-tight">{currentText.pricing.steps.frequency.title}</span>
              </h3>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                {currentText.pricing.steps.frequency.options.map((label, index) => {
                  const value = index === 0 ? '12' : '6';
                  return (
                    <button
                      key={value}
                      onClick={() => setSelectedFrequency(value as VisitFrequency)}
                      className={`relative p-2 md:p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedFrequency === value
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {selectedFrequency === value && (
                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-full">
                          <Check className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      )}
                      <span className="font-medium text-gray-900 text-sm md:text-base">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Container Count Selection */}
          {((selectedPlan === 'oneTime') || (selectedPlan && selectedFrequency)) && (
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-gray-900 flex items-center gap-2">
                <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                  {selectedPlan === 'oneTime' ? '2' : '3'}
                </span>
                <span className="leading-tight">{currentText.pricing.steps.containers.title}</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {currentText.pricing.steps.containers.options.map((label, index) => {
                  const count = (index + 1).toString() as ContainerCount;
                  return (
                    <button
                      key={count}
                      onClick={() => setSelectedContainers(count)}
                      className={`relative p-2 md:p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedContainers === count
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {selectedContainers === count && (
                        <div className="absolute -top-2 -right-2 bg-gray-900 text-white p-1 rounded-full">
                          <Check className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      )}
                      <span className="font-medium text-gray-900 text-sm md:text-base">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price Display */}
          {priceData && (
            <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-gray-900">
                    {priceData.price}€
                  </span>
                  <span className="text-gray-600 text-sm md:text-base">
                    {selectedPlan === 'monthly' && '/mois'}
                    {selectedPlan === 'annual' && '/an'}
                  </span>
                </div>
                {priceData.savings && (
                  <p className="text-green-600 font-semibold mb-4 text-sm md:text-base">
                    {priceData.savings}
                  </p>
                )}
                <button 
                  onClick={handleReservation}
                  className="w-full md:w-auto bg-gray-900 text-white px-6 md:px-8 py-2 md:py-3 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {currentText.pricing.ctaButton}
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Reset Button */}
          {selectedPlan && (
            <button
              onClick={resetSelections}
              className="mt-4 text-gray-600 hover:text-gray-900 text-xs md:text-sm font-medium"
            >
              {language === 'fr' ? 'Recommencer' : 'Start over'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}