import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Função para registrar uma nova empresa.
 * @param {object} userData - Os dados do usuário para registro.
 * @param {string} userData.name - O nome da empresa.
 * @param {string} userData.cnpj - O CNPJ da empresa.
 * @param {string} userData.email - O email para login.
 * @param {string} userData.password - A senha para login.
 * @returns {Promise<object>} A resposta da API.
 */
const registerUser = async (userData) => {
  const { name, cnpj, email, password } = userData;

  // Monta o corpo da requisição exatamente como o backend espera
  const requestBody = {
    name,
    cnpj,
    authLogin: {
      email,
      password,
    },
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/enterprise/register`, requestBody);
    return response.data; // Retorna os dados da resposta em caso de sucesso
  } catch (error) {
    // Em caso de erro, loga o erro e o relança para ser tratado no componente
    console.error("Erro no registro:", error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * Função para autenticar um usuário.
 * @param {object} credentials - As credenciais de login.
 * @param {string} credentials.email - O email do usuário.
 * @param {string} credentials.password - A senha do usuário.
 * @returns {Promise<object>} A resposta da API contendo os tokens.
 */
const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    
    // Se o login for bem-sucedido, a API retorna os tokens
    if (response.data.access_token) {
      // Opcional: Salvar os tokens no localStorage para manter o usuário logado
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
    }
    
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Criamos um objeto para exportar todas as funções do serviço
const authService = {
  registerUser,
  loginUser,
};

export default authService;