import React, { useState } from 'react'; // ALTERADO: Importa o useState
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthForm.css';
import Button from '../ui/Button';
import { FaArrowLeft } from 'react-icons/fa';
import authService from '../api/auth/auth_service';

function LoginPage() {
  const navigate = useNavigate();

  // NOVO: Estados para controlar os inputs, erros e carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ALTERADO: A função agora é assíncrona para chamar a API
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros antigos
    setLoading(true); // Ativa o estado de carregamento

    try {
      const data = await authService.loginUser({ email, password });
      console.log('Login bem-sucedido:', data);
      navigate('/dashboard'); // Redireciona em caso de sucesso
    } catch (err) {
      // Pega a mensagem de erro da API ou usa uma padrão
      const errorMessage = err.response?.data?.message || 'Email ou senha inválidos.';
      setError(errorMessage);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
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
            {/* ALTERADO: Conecta o input ao estado 'email' */}
            <input 
              type="email" 
              id="email" 
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            {/* ALTERADO: Conecta o input ao estado 'password' */}
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* NOVO: Exibe a mensagem de erro, se houver */}
          {error && <p className="auth-error">{error}</p>}

          {/* ALTERADO: O botão agora mostra o status de carregamento */}
          <Button type="primary" size="large" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="auth-switch">
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;