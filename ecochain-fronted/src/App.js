import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout
import Header from './ui/Header';
import Footer from './ui/Footer';

// Seções da Página Inicial
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ValuesSection from './components/ValuesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TechnologySection from './components/TechnologySection';
import ComparisonSection from './components/ComparisonSection';
import BenefitsSection from './components/BenefitsSection';
import PartnersSection from './components/PartnersSection';

// Novas Páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Componente que agrupa as seções da página inicial
function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <HowItWorksSection />
      <TechnologySection />
      <ComparisonSection />
      <BenefitsSection />
      <PartnersSection />
    </>
  );
}

// Componente principal que gerencia as rotas
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rotas para Login e Cadastro (não mostram Header nem Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />

          {/* Rota principal que mostra a Página Inicial completa */}
          <Route path="/*" element={
            <>
              <Header />
              <main>
                <HomePage />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;