import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/AuthForm.css';
import Button from '../ui/Button';
import { FaArrowLeft } from 'react-icons/fa';
import authService from '../api/auth/auth_service';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // --- MUDANÇA PRINCIPAL AQUI ---
      // Remove todos os caracteres que não são dígitos (pontos, barras, traços)
      const sanitizedCnpj = cnpj.replace(/\D/g, '');

      // Cria o objeto com o CNPJ já limpo
      const userData = { 
        name, 
        cnpj: sanitizedCnpj, // Usa a variável com o CNPJ limpo
        email, 
        password 
      };

      await authService.registerUser(userData);
      
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      navigate('/login');

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Não foi possível realizar o cadastro. Verifique os dados.';
      setError(errorMessage);
    } finally {
      setLoading(false);
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
        <h3 className="auth-title">Crie sua conta</h3>
        <p className="auth-subtitle">Comece sua jornada sustentável conosco.</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome da Empresa</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="cnpj">CNPJ</label>
            <input 
              type="text" 
              id="cnpj" 
              name="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00" // Adicionado um placeholder para guiar o usuário
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
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
            <input 
              type="password" 
              id="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <Button type="primary" size="large" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </form>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;