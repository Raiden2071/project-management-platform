import React from 'react';
import { AppProviders } from './app/providers';
import { HomePage } from './pages/home/HomePage';
import './App.css';

function App() {
  return (
    <AppProviders>
      <HomePage />
    </AppProviders>
  );
}

export default App;
