import React from 'react';
import '../style/BenefitsSection.css';
// Importando os ícones que vamos usar
import { FaShieldAlt, FaChartLine, FaRecycle, FaUsers } from 'react-icons/fa';

const benefitsData = [
  {
    icon: <FaShieldAlt />,
    title: 'Confiança do Consumidor',
    description: 'Aumente a confiança do seu cliente com certificados de autenticidade imutáveis e verificáveis.',
  },
  {
    icon: <FaChartLine />,
    title: 'Acesso a Novos Mercados',
    description: 'Destaque-se em mercados que exigem comprovação de práticas ESG (Ambiental, Social e Governança).',
  },
  {
    icon: <FaRecycle />,
    title: 'Valorização da Marca',
    description: 'Associe sua marca à sustentabilidade e inovação, agregando valor ao seu produto.',
  },
  {
    icon: <FaUsers />,
    title: 'Engajamento Comunitário',
    description: 'Fortaleça laços com comunidades produtoras e demonstre seu compromisso social.',
  },
];

function BenefitsSection() {
  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-content">
        <div className="benefits-header">
          <h2 className="section-title">Benefícios</h2>
          <p className="section-subtitle">
            Criando valor para toda a cadeia produtiva sustentável na Amazônia
          </p>
        </div>
        <div className="benefits-grid">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <div className="benefit-text">
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;