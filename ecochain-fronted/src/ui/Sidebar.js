import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/Sidebar.css';
import { FaHome, FaUser, FaCog, FaClipboardList, FaCertificate, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('access_token');
    // Redireciona para a página de login
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">E</div>
        <span>EcoChain Dashboard</span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end>
          <FaHome />
          <span>Início</span>
        </NavLink>
        <NavLink to="/dashboard/processo">
          <FaClipboardList />
          <span>Processo de Certificação</span>
        </NavLink>
        <NavLink to="/dashboard/certificado">
          <FaCertificate />
          <span>Meu Certificado</span>
        </NavLink>
        <NavLink to="/dashboard/perfil">
          <FaUser />
          <span>Perfil da Empresa</span>
        </NavLink>
        <NavLink to="/dashboard/configuracoes">
          <FaCog />
          <span>Configurações</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;