import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componente de Proteção
import ProtectedRoute from './components/ProtectedRoute';

// Componentes da UI
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

// Páginas Públicas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Layout e Páginas do Dashboard
import DashboardPage from './pages/DashboardPage';
import DashboardHomePage from './pages/dashboard/DashboardHomePage';
import ProfilePage from './pages/DashboardProfilePage';
import ProcessCertificationPage from './pages/dashboard/ProcessCertificationPage';
import CertificatePage from './pages/dashboard/CertificatePage';
import SettingsPage from './pages/dashboard/SettingsPage';

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={
          <>
            <Header />
            <main><HomePage /></main>
            <Footer />
          </>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="processo" element={<ProcessCertificationPage />} />
            <Route path="certificado" element={<CertificatePage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="configuracoes" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;