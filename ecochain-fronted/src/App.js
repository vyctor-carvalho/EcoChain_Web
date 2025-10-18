import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Componentes da Página Inicial (agora em /src/components/)
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ValuesSection from './components/ValuesSection';
import HowItWorksSection from './components/HowItWorksSection';
import TechnologySection from './components/TechnologySection';
import ComparisonSection from './components/ComparisonSection';
import BenefitsSection from './components/BenefitsSection';
import PartnersSection from './components/PartnersSection';

// Componentes de UI (agora em /src/components/)
import Header from './ui/Header';
import Footer from './ui/Footer';

// Páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DashboardHomePage from './pages/DashboardHomePage';
import DashboardProfilePage from './pages/DashboardProfilePage';


// Componente que junta as seções da Página Inicial
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
        {/* Rota da Página Inicial (renderiza com Header e Footer) */}
        <Route path="/" element={
          <>
            <Header />
            <main><HomePage /></main>
            <Footer />
          </>
        } />

        {/* Rotas de Autenticação (sem Header e Footer) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        {/* Rota do Dashboard (usa DashboardPage como layout) */}
        <Route path="/dashboard" element={<DashboardPage />}>
          {/* Sub-rotas que serão renderizadas dentro do <Outlet> */}
          <Route index element={<DashboardHomePage />} />
          <Route path="perfil" element={<DashboardProfilePage />} />
          {/* <Route path="configuracoes" element={<... />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;