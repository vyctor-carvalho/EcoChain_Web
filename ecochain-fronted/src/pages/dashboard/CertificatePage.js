import React from 'react';
import '../../style/CertificatePage.css';
import { FaCertificate, FaDownload, FaShareAlt, FaQrcode } from 'react-icons/fa';
import Button from '../../ui/Button';

function CertificatePage() {
  const certificateId = "EC-2025-XYZ-123";
  const issueDate = "19/10/2025";
  const expiryDate = "19/10/2026";

  return (
    <div className="my-certificate">
      <h1>Meu Certificado</h1>
      <p className="welcome-subtitle">Seu selo de compromisso com a sustentabilidade.</p>

      <div className="certificate-display">
        <div className="certificate-header">
          <FaCertificate />
          <h2>Certificado de Sustentabilidade</h2>
        </div>
        <div className="certificate-body">
          <p>Este certificado atesta que a empresa</p>
          <h3 className="company-name">Sua Empresa LTDA</h3>
          <p>cumpriu com os critérios de sustentabilidade e boas práticas ESG exigidos pela EcoChain.</p>
          <div className="certificate-details">
            <div>
              <span>ID do Certificado</span>
              <strong>{certificateId}</strong>
            </div>
            <div>
              <span>Data de Emissão</span>
              <strong>{issueDate}</strong>
            </div>
            <div>
              <span>Data de Validade</span>
              <strong>{expiryDate}</strong>
            </div>
          </div>
        </div>
        <div className="certificate-footer">
          <span>Verificável via Blockchain</span>
        </div>
      </div>

      <div className="certificate-actions">
        <Button size="large"><FaDownload /> Baixar PDF</Button>
        <Button size="large" type="outline"><FaShareAlt /> Compartilhar</Button>
        <Button size="large" type="outline"><FaQrcode /> Ver QR Code</Button>
      </div>
    </div>
  );
}

export default CertificatePage;