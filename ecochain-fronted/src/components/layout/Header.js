import { useState } from 'react';
import Button from '../common/Button';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    alert('Login clicado!');
  };

  const handleSignUp = () => {
    alert('Cadastro clicado!');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">E</div>
          <span className="logo-text">EcoChain</span>
        </div>

        {/* Menu Desktop */}
        <nav className="desktop-nav">
          <a href="#home">Início</a>
          <a href="#about">Sobre</a>
          <a href="#how-it-works">Como Funciona</a>
          <a href="#technology">Tecnologia</a>
          <a href="#contact">Contato</a>
        </nav>

        {/* Botões do Header */}
        <div className="header-buttons">
          <Button type="outline" size="small" onClick={handleLogin}>
            Entrar
          </Button>
          <Button size="small" onClick={handleSignUp}>
            Cadastrar
          </Button>
        </div>

        {/* Botão Menu Mobile */}
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="#home">Início</a>
          <a href="#about">Sobre</a>
          <a href="#how-it-works">Como Funciona</a>
          <a href="#contact">Contato</a>
        </div>
      )}
    </header>
  );
}

export default Header;