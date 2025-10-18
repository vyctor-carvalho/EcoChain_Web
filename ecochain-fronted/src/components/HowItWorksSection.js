import React from 'react';
import '../style/HowItWorksSection.css';
import { FaUserPlus, FaTasks, FaSatelliteDish, FaUsers, FaCertificate } from 'react-icons/fa';

const stepsData = [
  { icon: <FaUserPlus />, title: 'Cadastro', description: 'Produtores, empresas e auditores se cadastram na plataforma.', color: 'blue' },
  { icon: <FaTasks />, title: 'Autoavaliação ESG', description: 'Autoavaliação de critérios ambientais, sociais e de governança.', color: 'green' },
  { icon: <FaSatelliteDish />, title: 'Verificação por Satélite', description: 'Verificação automatizada por dados de satélite (INPE + MapBiomas).', color: 'purple' },
  { icon: <FaUsers />, title: 'Auditoria Social', description: 'Auditoria independente de aspectos sociais e de governança.', color: 'orange' },
  { icon: <FaCertificate />, title: 'Certificado Digital', description: 'Emissão de certificado digital como Soul-Bound Token (SBT).', color: 'teal' }
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-content">
        <h2 className="section-title">Como Funciona</h2>
        <p className="section-subtitle">
          Um processo transparente e tecnologicamente avançado para certificação sustentável
        </p>
        <div className="timeline-container">
          {stepsData.map((step, index) => (
            <div key={index} className="step-item">
              <div className="step-icon-wrapper">
                <div className={`step-icon icon-${step.color}`}>
                  {step.icon}
                </div>
                <div className="step-number-badge">{index + 1}</div>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
