import Button from '../common/Button';
import './HeroSection.css';

function HeroSection() {
  const handleLearnMore = () => {
    alert('Saiba Mais clicado!');
  };

  const handleSignUp = () => {
    alert('Cadastre-se clicado!');
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          🌱 COP 30 Belém 2025 • Blockchain para Sustentabilidade
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          EcoChain – <span className="highlight">Certificação Sustentável</span> baseada em Blockchain
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Transparência e confiança para a bioeconomia amazônica
        </p>

        {/* Hero Buttons */}
        <div className="hero-buttons">
          <Button size="large" onClick={handleLearnMore}>
            Saiba Mais
          </Button>
          <Button type="outline" size="large" onClick={handleSignUp}>
            Cadastre-se
          </Button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <div className="stat-number">100%</div>
            <div className="stat-label">Transparente</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Economia de Energia</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🌐</div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">Verificação Contínua</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;