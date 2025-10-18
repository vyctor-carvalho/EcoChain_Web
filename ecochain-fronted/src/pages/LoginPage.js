import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthForm.css';
import Button from '../ui/Button';
import { FaArrowLeft } from 'react-icons/fa';

function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // --- INÍCIO DA SIMULAÇÃO DE LOGIN ---
    // No futuro, aqui você fará a chamada para o seu backend.
    // Se o backend retornar sucesso e um token...

    // 1. Crie um token falso
    const fakeToken = 'exemplo_de_token_jwt_simulado';

    // 2. Salve o token no localStorage
    localStorage.setItem('access_token', fakeToken);

    // --- FIM DA SIMULAÇÃO ---

    alert('Login simulado com sucesso! Redirecionando...');
    navigate('/dashboard'); // Redireciona para o dashboard
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-to-home">
        <FaArrowLeft />
        <span>Voltar ao Início</span>
      </Link>

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