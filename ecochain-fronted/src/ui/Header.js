import { useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import Button from './Button';
import '../style/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo agora é um link para a página inicial */}
        <Link to="/" className="logo-link">
          <div className="logo">
            <div className="logo-icon">E</div>
            <span className="logo-text">EcoChain</span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="desktop-nav">
          <a href="/#home">Início</a>
          <a href="/#about">Sobre</a>
          <a href="/#how-it-works">Como Funciona</a>
          <a href="/#benefits">Benefícios</a>
          <a href="/#partners">Parcerias</a>
          {/* O link de Contato ainda não tem uma seção, vamos remover por agora */}
          {/* <a href="/#contact">Contato</a> */}
        </nav>

        {/* Botões do Header agora usam Link */}
        <div className="header-buttons">
          <Link to="/login">
            <Button type="outline" size="small">Entrar</Button>
          </Link>
          <Link to="/cadastro">
            <Button size="small">Cadastrar</Button>
          </Link>
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
          <a href="/#home">Início</a>
          <a href="/#about">Sobre</a>
          <a href="/#how-it-works">Como Funciona</a>
          <a href="/#benefits">Benefícios</a>
          <a href="/#partners">Parcerias</a>
          {/* <a href="/#contact">Contato</a> */}
        </div>
      )}
    </header>
  );
}

export default Header;