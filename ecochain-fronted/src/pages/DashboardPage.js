import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet é a área de conteúdo dinâmico
import Sidebar from '../components/Sidebar'; // Caminho para a pasta components
import '../style/DashboardPage.css'; // CSS específico para este layout

function DashboardPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> {/* O conteúdo (Início, Perfil, etc.) será renderizado aqui */}
      </main>
    </div>
  );
}

export default DashboardPage;