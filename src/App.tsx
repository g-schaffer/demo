import React, { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { LanguageContext } from './contexts/LanguageContext';
import { routes } from './routes/routes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  const [language, setLanguage] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'chatway';
    script.src = 'https://cdn.chatway.app/widget.js?id=ViTVYOi6SCVV';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('chatway');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LanguageContext.Provider>
  );
}

export default App;