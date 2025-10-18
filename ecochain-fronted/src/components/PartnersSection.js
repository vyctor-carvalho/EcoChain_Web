import React from 'react';
import '../style/PartnersSection.css';
// Importando ícones relevantes para parcerias
import { FaUniversity, FaHandsHelping, FaSeedling, FaFlask } from 'react-icons/fa';

const partnersData = [
  {
    icon: <FaUniversity />,
    title: 'Instituições de Pesquisa',
    description: 'Colaboramos com universidades e centros de pesquisa para validar e aprimorar nossas metodologias.',
  },
  {
    icon: <FaHandsHelping />,
    title: 'Cooperativas e Associações',
    description: 'Trabalhamos diretamente com produtores locais para garantir uma transição justa e sustentável.',
  },
  {
    icon: <FaSeedling />,
    title: 'Empresas Sustentáveis',
    description: 'Firmamos parcerias com empresas comprometidas com a sustentabilidade e a bioeconomia.',
  },
  {
    icon: <FaFlask />,
    title: 'Laboratórios e Auditores',
    description: 'Nossa rede conta com auditores independentes que garantem a veracidade das informações.',
  },
];

function PartnersSection() {
  return (
    <section id="partners" className="partners-section">
      <div className="partners-content">
        <div className="partners-header">
          <h2 className="section-title">Parcerias Estratégicas</h2>
          <p className="section-subtitle">
            Construindo um futuro mais verde com empresas e instituições que confiam na nossa tecnologia.
          </p>
        </div>
        <div className="partners-grid">
          {partnersData.map((partner, index) => (
            <div key={index} className="partner-card">
              <div className="partner-icon">{partner.icon}</div>
              <div className="partner-text">
                <h3 className="partner-title">{partner.title}</h3>
                <p className="partner-description">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;