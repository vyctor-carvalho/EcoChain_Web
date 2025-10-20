import React from 'react';
import '../../style/ProcessCertificationPage.css';
import { FaCheckCircle, FaRegCircle, FaFileUpload } from 'react-icons/fa';
import Button from '../../ui/Button';

function ProcessCertificationPage() {
  const steps = [
    { name: 'Preenchimento do formulário de adesão', completed: true },
    { name: 'Envio de documentação (CNPJ, Contrato Social)', completed: true },
    { name: 'Análise de critérios ESG', completed: false },
    { name: 'Auditoria (se aplicável)', completed: false },
    { name: 'Emissão do certificado na blockchain', completed: false },
  ];

  return (
    <div className="certification-process">
      <h1>Processo de Certificação</h1>
      <p className="welcome-subtitle">Acompanhe cada etapa para obter seu selo de sustentabilidade EcoChain.</p>

      <div className="process-card">
        <h2>Etapas da Certificação</h2>
        <ul className="steps-list">
          {steps.map((step, index) => (
            <li key={index} className={step.completed ? 'completed' : ''}>
              <div className="step-icon">
                {step.completed ? <FaCheckCircle /> : <FaRegCircle />}
              </div>
              <span>{step.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="upload-card">
        <h2>Envio de Documentos</h2>
        <p>A próxima etapa requer o envio dos seguintes documentos para análise.</p>
        <div className="upload-area">
          <FaFileUpload />
          <p>Arraste e solte seus arquivos aqui ou</p>
          <Button type="outline">Selecione os arquivos</Button>
        </div>
      </div>
    </div>
  );
}

export default ProcessCertificationPage;