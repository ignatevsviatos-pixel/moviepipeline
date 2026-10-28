import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await login(email, password);
			navigate('/');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Ошибка входа'
      );
		} finally {

      setLoading(false);
		}
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Вход</h1>

        <p className="auth-subtitle">
          Войди в свой аккаунт
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              required
            />
          </label>

          <label>
            Пароль

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="auth-footer">
          Нет аккаунта?{' '}
          <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;