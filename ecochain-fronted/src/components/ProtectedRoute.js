import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Verifica se o token de acesso existe no localStorage
  const token = localStorage.getItem('access_token');

  // Se o token existe, permite o acesso à página solicitada (Outlet)
  // Se não, redireciona para a página de login
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;