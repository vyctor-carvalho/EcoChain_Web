import React from 'react';
import '../style/Footer.css';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column logo-column">
          <div className="logo">
            <div className="logo-icon">E</div>
            <span className="logo-text">EcoChain</span>
          </div>
          <p className="footer-description">
            Rastreabilidade e confiança para a bioeconomia da Amazônia.
          </p>
        </div>

        <div className="footer-column links-column">
          <h4 className="footer-heading">Navegação</h4>
          <a href="#home" className="footer-link">Início</a>
          <a href="#about" className="footer-link">Sobre</a>
          <a href="#how-it-works" className="footer-link">Como Funciona</a>
           <a href="#partners" className="footer-link">Parcerias</a>
          <a href="#contact" className="footer-link">Contato</a>
        </div>

        <div className="footer-column social-column">
          <h4 className="footer-heading">Siga-nos</h4>
          <div className="social-icons">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EcoChain. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;