import React from 'react';
import { NavLink } from 'react-router-dom'; // NavLink é especial para menus
import '../style/Sidebar.css'; // Caminho corrigido para a pasta style
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">E</div>
        <span>EcoChain Dashboard</span>
      </div>
      <nav className="sidebar-nav">
        {/* 'end' garante que a home só fica ativa na rota exata */}
        <NavLink to="/dashboard" end>
          <FaHome />
          <span>Início</span>
        </NavLink>
        <NavLink to="/dashboard/perfil">
          <FaUser />
          <span>Meu Perfil</span>
        </NavLink>
        <NavLink to="/dashboard/configuracoes">
          <FaCog />
          <span>Configurações</span>
        </NavLink>
      </nav>
      <div className="sidebar-footer">
        <p>© 2025 EcoChain</p>
      </div>
    </aside>
  );
}

export default Sidebar;