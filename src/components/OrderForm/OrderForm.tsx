import React, { useState, useContext, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';
import prices from '../../content/prices.json';
import weeks from '../../content/weeks.json';

type Step = 1 | 2 | 3 | 4;
type Frequency = 'monthly' | 'bimonthly' | 'once';
type ContainerCount = '1' | '2' | '3';
type PaymentType = 'monthly' | 'annual';

interface OrderSummary {
  postalCode: string;
  frequency: Frequency;
  containerCount: ContainerCount;
  paymentType: PaymentType;
  price: number;
}

export function OrderForm() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [postalCode, setPostalCode] = useState<string>('');
  const [postalCodeError, setPostalCodeError] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [containerCount, setContainerCount] = useState<ContainerCount | null>(null);
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  useEffect(() => {
    const state = location.state as { postalCode?: string } | null;
    if (state?.postalCode) {
      setPostalCode(state.postalCode);
      setCurrentStep(2);
    }
  }, [location]);

  const validatePostalCode = (code: string) => {
    return true || weeks.week4.includes(code);
  };

  const calculatePrice = (): number => {
    if (!frequency || !containerCount || !paymentType) return 0;

    const plan = paymentType === 'monthly' ? 'monthly' : 'annual';
    const planPrices = prices[plan];
    const containerPrices = planPrices[containerCount];
    const visitFrequency = frequency === 'monthly' ? '12' : '6';

    return containerPrices[visitFrequency];
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (validatePostalCode(postalCode)) {
        setCurrentStep(2);
        setPostalCodeError(false);
      } else {
        setPostalCodeError(true);
      }
    } else if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step);
    }
  };

  const handleVerify = () => {
    if (postalCode && frequency && containerCount && paymentType) {
      setShowSummary(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-[120px]">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center justify-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step <= currentStep ? 'bg-[#FFD300]' : 'bg-gray-200'
                    }`}
                  >
                    {step}
                  </div>
                </div>
                {index < 3 && (
                  <div className="flex-1 mx-2">
                    <div
                      className={`h-1 ${
                        step < currentStep ? 'bg-[#FFD300]' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Postal Code */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentText.orderForm.steps.postalCode.title}
              </h2>
              <div>
                <input
                  type="text"
                  placeholder={currentText.orderForm.steps.postalCode.placeholder}
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    setPostalCodeError(false);
                  }}
                  className={`w-full p-4 border-2 rounded-lg text-left ${
                    postalCodeError
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                />
                {postalCodeError && (
                  <p className="mt-2 text-red-500">
                    {currentText.orderForm.steps.postalCode.errorMessage}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Frequency */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentText.orderForm.steps.frequency.title}
              </h2>
              <div className="grid gap-4">
                {currentText.orderForm.steps.frequency.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFrequency(option.value as Frequency)}
                    className={`p-4 border-2 rounded-lg text-left ${
                      frequency === option.value
                        ? 'border-[#FFD300] bg-[#FFD300]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Container Count */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentText.orderForm.steps.containers.title}
              </h2>
              <div className="grid gap-4">
                {currentText.orderForm.steps.containers.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setContainerCount(option.value as ContainerCount)}
                    className={`p-4 border-2 rounded-lg text-left ${
                      containerCount === option.value
                        ? 'border-[#FFD300] bg-[#FFD300]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Payment Type */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentText.orderForm.steps.payment.title}
              </h2>
              <div className="grid gap-4">
                {currentText.orderForm.steps.payment.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setPaymentType(option.value as PaymentType)}
                    className={`p-4 border-2 rounded-lg text-left ${
                      paymentType === option.value
                        ? 'border-[#FFD300] bg-[#FFD300]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <button
              onClick={goToPreviousStep}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentText.orderForm.navigation.back}
            </button>
          )}
          {currentStep < 4 && (
            <button
              onClick={goToNextStep}
              className="ml-auto flex items-center gap-2 bg-[#FFD300] text-gray-900 px-6 py-2 rounded-lg hover:bg-[#FFD300]/90"
            >
              {currentText.orderForm.navigation.next}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {currentStep === 4 && (
            <button
              onClick={handleVerify}
              className="ml-auto flex items-center gap-2 bg-[#FFD300] text-gray-900 px-6 py-2 rounded-lg hover:bg-[#FFD300]/90"
            >
              {currentText.orderForm.navigation.verify}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSummary(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{currentText.orderForm.summary.title}</h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{currentText.orderForm.summary.fields.postalCode}</span>
                  <span className="font-medium">{postalCode}</span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{currentText.orderForm.summary.fields.frequency}</span>
                  <span className="font-medium">
                    {currentText.orderForm.steps.frequency.options.find(opt => opt.value === frequency)?.label}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{currentText.orderForm.summary.fields.containers}</span>
                  <span className="font-medium">
                    {currentText.orderForm.steps.containers.options.find(opt => opt.value === containerCount)?.label}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{currentText.orderForm.summary.fields.paymentType}</span>
                  <span className="font-medium">
                    {currentText.orderForm.steps.payment.options.find(opt => opt.value === paymentType)?.label}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{currentText.orderForm.summary.fields.price}</span>
                  <span className="font-bold text-xl">
                    {calculatePrice()}€
                    {paymentType === 'monthly' && frequency !== 'once' ? '/mois' : ''}
                    {paymentType === 'annual' ? '/an' : ''}
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => {
                    window.open('https://buy.stripe.com/example', '_blank');
                  }}
                  className="w-full bg-[#FFD300] text-gray-900 py-3 rounded-lg hover:bg-[#FFD300]/90 transition duration-300 font-medium"
                >
                  {currentText.orderForm.summary.confirmButton}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}