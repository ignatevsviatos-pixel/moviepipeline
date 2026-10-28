import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          Хуйня ебаная
        </Link>

        <nav className="header-nav">
          <Link to="/" className="header-link active">
            Главная
          </Link>

          <a href="#" className="header-link">
            Фильмы
          </a>

          <a href="#" className="header-link">
            Сериалы
          </a>
        </nav>

        <div className="header-search">
          {children}
        </div>

        <div className="header-profile">
  {user ? (
    <>
      <Link to="/profile" className="profile-link">
        <span className="profile-icon">◉</span>
        <span>{user.username}</span>
      </Link>

      <button
        className="logout-button"
        type="button"
        onClick={handleLogout}
      >
        Выйти
      </button>
    </>
  ) : (
    <Link to="/login" className="login-button">
      Войти
    </Link>
  )}
</div>
      </div>
    </header>
  );
};

export default Header;