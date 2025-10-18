import React from 'react';
// 1. Importe 'useNavigate' junto com o 'Link'
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthForm.css';
import Button from '../ui/Button';

function LoginPage() {
  // 2. Inicialize o hook para podermos usá-lo
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Login simulado com sucesso! Redirecionando...');
    
    // 3. Substitua o alerta antigo por esta linha que redireciona o usuário
    navigate('/dashboard'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">E</div>
          <h2>EcoChain</h2>
        </div>
        <h3 className="auth-title">Bem-vindo de volta!</h3>
        <p className="auth-subtitle">Faça login para continuar.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Button type="primary" size="large">Entrar</Button>
        </form>
        <p className="auth-switch">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;