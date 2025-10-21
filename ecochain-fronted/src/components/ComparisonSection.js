import React from 'react';
import '../style/ComparisonSection.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const comparisonData = [
  {
    feature: 'Transferibilidade',
    nft: { text: 'Sim', icon: <FaTimesCircle className="icon-red" /> },
    vc: { text: 'Não', icon: <FaCheckCircle className="icon-green" /> },
    reason: 'Certificados não devem ser transferíveis'
  },
  {
    feature: 'Especulação',
    nft: { text: 'Alta', icon: <FaTimesCircle className="icon-red" /> },
    vc: { text: 'Zero', icon: <FaCheckCircle className="icon-green" /> },
    reason: 'Certificados têm propósito, não são commodities'
  },
  {
    feature: 'Verificação',
    nft: { text: 'Limitada', icon: <FaTimesCircle className="icon-red" /> },
    vc: { text: 'Completa', icon: <FaCheckCircle className="icon-green" /> },
    reason: 'Verificação criptográfica padrão W3C'
  },
  {
    feature: 'Privacidade',
    nft: { text: 'Pública', icon: <FaTimesCircle className="icon-red" /> },
    vc: { text: 'Seletiva', icon: <FaCheckCircle className="icon-green" /> },
    reason: 'Controle granular sobre dados compartilhados'
  },
  {
    feature: 'Sustentabilidade',
    nft: { text: 'Questionável', icon: <FaTimesCircle className="icon-red" /> },
    vc: { text: 'Alta', icon: <FaCheckCircle className="icon-green" /> },
    reason: 'Foco em impacto ambiental real'
  }
];

function ComparisonSection() {
  return (
    <section className="comparison-section">
      <div className="comparison-content">
        <h2 className="section-title">Por que não usamos NFTs tradicionais?</h2>
        <p className="section-subtitle">
          Nossos certificados são Soul-Bound Tokens (SBTs) e Credenciais Verificáveis (VCs), não NFTs especulativos. Veja a diferença:
        </p>

        <div className="comparison-card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Característica</th>
                  <th className="nft-traditional">NFTs Tradicionais</th>
                  <th className="vc-sbt">VCs / SBTs</th>
                  <th>Por quê?</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.feature}</td>
                    <td><span className="cell-content">{row.nft.icon} {row.nft.text}</span></td>
                    <td><span className="cell-content">{row.vc.icon} {row.vc.text}</span></td>
                    <td>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComparisonSection;