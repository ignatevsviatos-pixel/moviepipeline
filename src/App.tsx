import './App.css'
import Home from './pages/Home'
import MoviePage from './pages/MoviePage'
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import ProfilePage from './pages/ProfilePage'
import { FavoritesProvider } from './context/FavoriteContext'


function App() {
  return (
	<AuthProvider>
		<FavoritesProvider>
			<BrowserRouter>
				<Routes>
					<Route index element={<Home />} />
					<Route path='/movie/:id' element={<MoviePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/profile' element={<ProfilePage />} />
				</Routes>
			</BrowserRouter>
		</FavoritesProvider>
	</AuthProvider>)
}

export default App
