import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/Navigation/Navigation';
import { Footer } from '../components/Footer/Footer';

export function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}