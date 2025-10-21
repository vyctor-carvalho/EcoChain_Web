import React from 'react';
import '../style/TechnologySection.css';
import { FaBolt, FaFileContract, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const techData = [
  {
    icon: <FaBolt />,
    title: 'Polygon Network',
    description: 'Utilizamos a rede Polygon com Proof-of-Stake para baixo consumo energético e alta eficiência.',
    features: [
      'Proof-of-Stake (PoS) - 99.95% menos energia que Bitcoin',
      'Transações rápidas (< 2 segundos)',
      'Taxas baixas (< $0.01 por transação)',
      'Compatível com Ethereum'
    ],
    color: 'purple'
  },
  {
    icon: <FaFileContract />,
    title: 'Credenciais Verificáveis',
    description: 'Nossos certificados são Soul-Bound Tokens (SBTs) e Credenciais Verificáveis (VCs), não NFTs tradicionais.',
    features: [
      'Soul-Bound Tokens (SBTs) não transferíveis',
      'Credenciais Verificáveis (W3C padrão)',
      'Verificação criptográfica',
      'Privacidade preservada'
    ],
    color: 'green'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Arquitetura Híbrida',
    description: 'Segurança garantida com hash on-chain e dados sensíveis off-chain.',
    features: [
      'Hash on-chain para integridade',
      'Dados sensíveis off-chain (IPFS)',
      'Criptografia de ponta a ponta',
      'Auditoria transparente'
    ],
    color: 'blue'
  }
];

function TechnologySection() {
  return (
    <section id="technology" className="technology-section">
      <div className="technology-content">
        <h2 className="section-title">Tecnologia Blockchain</h2>
        <p className="section-subtitle">
          Tecnologia blockchain sustentável e segura para certificação de práticas ambientais
        </p>

        <div className="tech-grid">
          {techData.map((card, index) => (
            <div key={index} className="tech-card">
              <div className={`tech-icon-wrapper icon-${card.color}`}>
                {card.icon}
              </div>
              <h3 className="tech-card-title">{card.title}</h3>
              <p className="tech-card-description">{card.description}</p>
              <ul className="tech-features-list">
                {card.features.map((feature, i) => (
                  <li key={i}>
                    <FaCheckCircle className="check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechnologySection;