import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Seu amigo já instalou e configurou isso
import '../style/AuthForm.css';
import Button from '../ui/Button';
import { FaArrowLeft } from 'react-icons/fa';

function LoginPage() {
  const navigate = useNavigate();
  
  // 1. Cria um "estado" para guardar o que o usuário digita
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Função para atualizar o estado a cada letra digitada
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função chamada ao clicar em "Entrar"
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // 2. Constrói a URL completa usando a variável do .env
      const apiUrl = `${process.env.REACT_APP_API_URL}/auth/login`;

      // 3. Usa o Axios para ENVIAR os dados do formulário para o backend
      const response = await axios.post(apiUrl, {
        email: formData.email,
        password: formData.password,
      });

      // 4. O backend deve devolver um 'access_token' se o login for válido
      const { access_token } = response.data;

      if (access_token) {
        // 5. Salva o token REAL no localStorage
        localStorage.setItem('access_token', access_token);
        alert('Login realizado com sucesso!');
        navigate('/dashboard'); // Redireciona para o dashboard
      } else {
        alert('Ocorreu um erro inesperado. O token não foi recebido.');
      }

    } catch (error) {
      // Se o backend retornar um erro (ex: senha errada), ele será capturado aqui
      console.error("Erro no login:", error.response?.data?.message || error.message);
      alert('Falha no login. Verifique seu email e senha.');
    }
  };

  return (
    <div className="auth-container">
      <Link to="/" className="back-to-home">
        <FaArrowLeft />
        <span>Voltar ao Início</span>
      </Link>

      <div className="auth-card">
        {/* ... o resto do seu JSX continua igual ... */}
        <div className="auth-logo">
          <div className="logo-icon">E</div>
          <h2>EcoChain</h2>
        </div>
        <h3 className="auth-title">Bem-vindo de volta!</h3>
        <p className="auth-subtitle">Faça login para continuar.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // 'name' é importante para a função handleInputChange
              required
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password" // 'name' é importante
              required
              onChange={handleInputChange}
              value={formData.password}
            />
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