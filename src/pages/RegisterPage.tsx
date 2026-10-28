import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await fetch(
        'http://localhost:3001/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ошибка регистрации');
      }

      navigate('/');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Ошибка регистрации'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Регистрация</h1>

        <p className="auth-subtitle">
          Создай аккаунт, чтобы сохранять фильмы
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Имя пользователя

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Например, TheGrederc"
              minLength={3}
              required
            />
          </label>

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
              placeholder="Минимум 6 символов"
              minLength={6}
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
            {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div className="auth-footer">
          Уже есть аккаунт?{' '}
          <Link to="/login">Войти</Link>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;