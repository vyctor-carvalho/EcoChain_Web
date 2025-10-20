import React, { useState } from 'react'; // 1. Importe o useState
import '../../style/FormPage.css';
import Button from '../../ui/Button';

function SettingsPage() {
  // 2. Crie um "estado" para guardar as senhas
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // 3. Crie a função para atualizar o estado ao digitar
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setPasswords(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // 4. Crie a função para o envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("A nova senha e a confirmação não são iguais!");
      return;
    }
    console.log("Dados para alterar a senha:", {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });
    alert("Solicitação de alteração de senha enviada! (Verifique o console)");
  };

  return (
    <div className="form-page">
      <h1>Configurações da Conta</h1>
      <p className="welcome-subtitle">Gerencie suas credenciais de acesso e segurança.</p>

      <div className="form-card">
        {/* 5. Conecte o formulário à função handleSubmit */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="currentPassword">Senha Atual</label>
            {/* 6. Conecte cada input ao estado */}
            <input
              type="password"
              id="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nova Senha</label>
            <input
              type="password"
              id="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Nova Senha</label>
            <input
              type="password"
              id="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <Button type="primary" size="large">Alterar Senha</Button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;