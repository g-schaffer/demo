import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import text from '../../content/text.json';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const { language } = useContext(LanguageContext);
  const currentText = text[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 px-4 bg-white" id="contact">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          {currentText.contact.title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                {currentText.contact.subtitle}
              </h3>
              <p className="text-gray-600 mb-8">
                {currentText.contact.description}
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFD300]/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-[#FFD300]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{currentText.contact.form.fields.phone}</p>
                  <p className="text-gray-600">{currentText.global.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFD300]/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-[#FFD300]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{currentText.contact.form.fields.email}</p>
                  <p className="text-gray-600">{currentText.global.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFD300]/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-[#FFD300]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Adresse</p>
                  <p className="text-gray-600">
                    {currentText.global.address.street}<br />
                    {currentText.global.address.postalCode} {currentText.global.address.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-xl">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {currentText.contact.form.fields.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {currentText.contact.form.fields.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                {currentText.contact.form.fields.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD300] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {currentText.contact.form.fields.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD300] focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FFD300] text-gray-900 py-3 rounded-lg hover:bg-[#459968] transition duration-300 flex items-center justify-center gap-2 font-medium"
            >
              {currentText.contact.form.submitButton}
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}