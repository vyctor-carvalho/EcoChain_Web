import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/DashboardHomePage.css';
import { FaClipboardList, FaCertificate, FaArrowRight } from 'react-icons/fa';

function DashboardHomePage() {
  const companyName = "Sua Empresa"; // Exemplo
  const certificationStatus = "Certificado"; // Exemplo

  return (
    <div className="dashboard-home">
      <h1>Olá, {companyName}!</h1>
      <p className="welcome-subtitle">Bem-vindo ao seu painel de controle EcoChain.</p>

      <div className="status-card">
        <div className="status-icon">
          <FaCertificate />
        </div>
        <div className="status-text">
          <span>Status da Certificação</span>
          <strong>{certificationStatus}</strong>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Ações Rápidas</h2>
        <div className="actions-grid">
          <Link to="/dashboard/processo" className="action-card">
            <div className="action-icon">
              <FaClipboardList />
            </div>
            <h3>Processo de Certificação</h3>
            <p>Acompanhe ou inicie sua certificação.</p>
            <span className="action-link">
              Acessar <FaArrowRight />
            </span>
          </Link>

          <Link to="/dashboard/certificado" className="action-card">
            <div className="action-icon">
              <FaCertificate />
            </div>
            <h3>Meu Certificado</h3>
            <p>Visualize e compartilhe seu selo digital.</p>
            <span className="action-link">
              Ver Certificado <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHomePage;