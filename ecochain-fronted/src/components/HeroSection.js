import Button from '../ui/Button';
import '../style/HeroSection.css';
import { FaShieldAlt, FaBolt, FaGlobeAmericas } from 'react-icons/fa'; 

function HeroSection() {
  const handleLearnMore = () => {
    alert('Saiba Mais clicado!');
  };

  const handleSignUp = () => {
    alert('Cadastre-se clicado!');
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          🌱 COP 30 Belém 2025 • Blockchain para Sustentabilidade
        </div>

        <h1 className="hero-title">
          EcoChain – <span className="highlight">Certificação Sustentável</span> baseada em Blockchain
        </h1>

        <p className="hero-subtitle">
          Transparência e confiança para a bioeconomia amazônica
        </p>

        <div className="hero-buttons">
          <Button size="large" onClick={handleLearnMore}>
            Saiba Mais
          </Button>
          <Button type="outline" size="large" onClick={handleSignUp}>
            Cadastre-se
          </Button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon"><FaShieldAlt /></div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Transparente</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaBolt /></div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Economia de Energia</div>
          </div>
          {/* ===== A CORREÇÃO ESTÁ AQUI ===== */}
          <div className="stat-card">
            <div className="stat-icon"><FaGlobeAmericas /></div>
            <div className="stat-number">24 / 7</div> {/* Título curto e direto */}
            <div className="stat-label">
              Verificação contínua <br /> 24 horas por dia
            </div> 
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;