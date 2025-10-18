import React from 'react';
import '../style/AboutSection.css';
import Button from '../ui/Button';
import aboutImage from '../assets/amazonia.jpg';

function AboutSection() {
  const handleKnowMore = () => {
    alert('Clicou em "Conheça a nossa história"');
  };

  return (
    <section id="about" className="about-section">
      <div className="about-content">
        <div className="about-image-container">
          <img src={aboutImage} alt="Floresta amazônica e tecnologia" className="about-image" />
        </div>
        <div className="about-text-container">
          <h2 className="about-title">Sobre a EcoChain</h2>
          <h3 className="about-subtitle">Tecnologia blockchain para certificações práticas sustentáveis na Amazônia</h3>
          <p className="about-description">
            Preparando-nos para a COP 30 em Belém (2025) como marco estratégico para a sustentabilidade global.</p>
          <p className="about-description">
            O EcoChain é uma plataforma inovadora que utiliza tecnologia blockchain para certificar práticas sustentáveis na Amazônia, promovendo transparência e confiança na bioeconomia regional.
          </p>
          <Button type="primary" size="medium" onClick={handleKnowMore}>
            Conheça a nossa história
          </Button>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;