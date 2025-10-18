import React from 'react';
import '../style/ValuesSection.css';
import { FaAward, FaLeaf, FaLightbulb, FaUsers } from 'react-icons/fa';

function ValuesSection() {
  return (
    <section id="values" className="values-section">
      <div className="values-content">
        <h2 className="section-title">Nossos Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon-wrapper icon-green">
              <FaAward />
            </div>
            <h3 className="value-title">Credibilidade</h3>
            <p className="value-description">Certificação baseada em dados verificáveis e auditoria independente.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-wrapper icon-green">
              <FaLeaf />
            </div>
            <h3 className="value-title">Sustentabilidade</h3>
            <p className="value-description">Promovendo práticas ambientalmente responsáveis na Amazônia.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-wrapper icon-blue">
              <FaLightbulb />
            </div>
            <h3 className="value-title">Inovação</h3>
            <p className="value-description">Tecnologia blockchain de ponta para soluções sustentáveis.</p>
          </div>
          <div className="value-card">
            <div className="value-icon-wrapper icon-purple">
              <FaUsers />
            </div>
            <h3 className="value-title">Inclusão Social</h3>
            <p className="value-description">Incluindo comunidades locais no desenvolvimento econômico.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValuesSection;