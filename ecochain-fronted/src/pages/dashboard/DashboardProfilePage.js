import React, { useState } from 'react'; 
import '../../style/FormPage.css';
import Button from '../../ui/Button';

function DashboardProfilePage() {
  // Um "estado" para guardar os dados do formulário
  const [formData, setFormData] = useState({
    companyName: "Sua Empresa LTDA",
    cnpj: "00.000.000/0001-00",
    website: "https://www.suaempresa.com",
    address: "Rua Exemplo, 123, Belém, PA",
  });

  // Função para atualizar o estado quando o usuário digita
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Função para o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Dados do formulário para enviar:", formData);
    alert("Dados salvos! (Verifique o console do navegador)");
  };

  return (
    <div className="form-page">
      <h1>Perfil da Empresa</h1>
      <p className="welcome-subtitle">Mantenha os dados da sua empresa sempre atualizados.</p>

      <div className="form-card">
        {/* Conecte o formulário à função handleSubmit */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="companyName">Nome da Empresa</label>
            {/* Conecte cada input ao estado */}
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <input
              type="text"
              id="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              value={formData.website}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Endereço</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
          <Button type="primary" size="large">Salvar Alterações</Button>
        </form>
      </div>
    </div>
  );
}

export default DashboardProfilePage;