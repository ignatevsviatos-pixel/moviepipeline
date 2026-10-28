import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../widgets/header';
import './profile.css';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
			
      <main className="profile-page">
        <div className="profile-container">
          <p className="profile-loading">Загрузка профиля...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : 'Неизвестно';

  return (
		<>
		<Header />
    <main className="profile-page">
      <div className="profile-container">
        <h1>Профиль</h1>

        <section className="profile-card">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </section>

        <section className="profile-details">
          <div className="profile-detail">
            <span className="profile-detail-label">Имя пользователя</span>
            <span className="profile-detail-value">{user.username}</span>
          </div>

          <div className="profile-detail">
            <span className="profile-detail-label">Email</span>
            <span className="profile-detail-value">{user.email}</span>
          </div>

          <div className="profile-detail">
            <span className="profile-detail-label">Дата регистрации</span>
            <span className="profile-detail-value">{createdAt}</span>
          </div>
        </section>

        <section className="profile-sections">
          <div className="profile-section-placeholder">
            <h3>Избранное</h3>
            <p>Здесь будут сохранённые фильмы.</p>
          </div>

          <div className="profile-section-placeholder">
            <h3>История просмотров</h3>
            <p>Здесь будет история просмотренных фильмов.</p>
          </div>
        </section>
      </div>
    </main>
		</>
  );
};

export default ProfilePage;