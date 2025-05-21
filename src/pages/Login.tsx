import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { School } from 'lucide-react';
import Button from '../components/shared/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAppStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div 
          className="bg-primary-500 rounded-t-lg p-8 flex flex-col items-center"
          style={{ backgroundColor: '#F7D32F' }}
        >
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4">
            <School className="w-10 h-10 text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Centro Infantil</h1>
          <p className="text-white/80">Sistema de Gestión</p>
        </div>
        
        <div className="bg-white rounded-b-lg p-8 shadow-md">
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Correo Electrónico</label>
              <input
                id="email"
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              <a href="#" className="text-primary-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;