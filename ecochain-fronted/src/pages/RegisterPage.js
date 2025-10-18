import React from 'react';
// 1. Importe 'useNavigate' junto com o 'Link'
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthForm.css';
import Button from '../ui/Button';

function RegisterPage() {
  // 2. Inicialize o hook para podermos usá-lo
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Cadastro simulado com sucesso! Redirecionando...');
    
    // 3. Adicione esta linha para redirecionar o usuário para o dashboard
    navigate('/dashboard'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">E</div>
          <h2>EcoChain</h2>
        </div>
        <h3 className="auth-title">Crie sua conta</h3>
        <p className="auth-subtitle">Comece sua jornada sustentável conosco.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Button type="primary" size="large">Criar Conta</Button>
        </form>
        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;