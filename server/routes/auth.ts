import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db';
import authMiddleware from '../middleware/auth';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Заполни все поля',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: 'Имя пользователя должно содержать минимум 3 символа',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Пароль должен содержать минимум 6 символов',
      });
    }

    const existingUser = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = $1 OR username = $2
      `,
      [email.toLowerCase(), username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Пользователь с таким email или именем уже существует',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
      `,
      [username, email.toLowerCase(), passwordHash]
    );

    const user = result.rows[0];

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Ошибка сервера',
    });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Заполни все поля',
      });
    }

    const result = await pool.query(
      `
      SELECT id, username, email, password_hash, created_at
      FROM users
      WHERE email = $1
      `,
      [email.toLowerCase()]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Неверный email или пароль',
      });
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordValid) {
      return res.status(401).json({
        message: 'Неверный email или пароль',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Ошибка сервера',
    });
  }
});


router.post('/logout', (_req, res) => {
  res.clearCookie('token');

  return res.json({
    message: 'Вы вышли из аккаунта',
  });
});


router.get('/me', authMiddleware, async (req, res) => {
  
	try {
    const result = await pool.query(
      `
      SELECT id, username, email, created_at
      FROM users
      WHERE id = $1
      `,
      [req.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        message: 'Пользователь не найден',
      });
    }

    return res.json({ user });
  } catch {
    return res.status(401).json({
      message: 'Недействительная авторизация',
    });
  }
});

export default router;