import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../Hero/Hero';
import { Services } from '../Services/Services';
import { About } from '../About/About';
import { Deco } from '../Deco/Deco';
import { Pricing } from '../Pricing/Pricing';
import { FAQ } from '../FAQ/FAQ';
import { Contact } from '../Contact/Contact';

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="accueil">
        <Hero />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="comment">
        <Deco />
      </section>
      <section id="tarifs">
        <Pricing />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </motion.div>
  );
}