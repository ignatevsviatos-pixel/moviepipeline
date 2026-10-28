import { Router } from "express";
import {pool} from "../db";
import authMiddleware from "../middleware/auth";
console.log('FAVORITES ROUTER LOADEDf');
const router = Router();

router.post("/:movieId", authMiddleware, async (req, res) => {
	console.log("POST FAVORITE:", req.params.movieId);
	try {
		const movieId = Number(req.params.movieId);
		
		if (!Number.isInteger(movieId)) {
			return res.status(400).json({
				message: "Некорректный ID фильма"
		})
	};

		const result = await pool.query(
			`
			INSERT INTO favorites (user_id, movie_id)
			VALUES ($1, $2)
			ON CONFLICT (user_id, movie_id) DO NOTHING
			RETURNING *
			`,
			[req.userId, movieId]
		);

		return res.json({ favorite: result.rows[0] });
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Ошибка сервера',
		});
	}
})

router.get("/", authMiddleware, async (req, res) => {
	try{
		const result = await pool.query(
			`
			SELECT movie_id
			FROM favorites
			WHERE user_id = $1
			`,
			[req.userId]
		)
		const favorite = result.rows

		return res.json({favorite})
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Ошибка сервера'
	});
	}
})

router.delete("/:movieId", authMiddleware, async (req, res) => {
	try {
		const movieId = Number(req.params.movieId);
		
		if (!Number.isInteger(movieId)) {
			return res.status(400).json({
				message: "Некорректный ID фильма"
		})
	};

		const result = await pool.query(
			`
			DELETE FROM favorites
			WHERE user_id = $1 AND movie_id = $2
			RETURNING * 
			`,
			[req.userId, movieId]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				message: "Фильм не найден в избранном"
			});
		}

		return res.json({ favorite: result.rows[0] });
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({
			message: 'Ошибка сервера'
		});
	}
})

export default router;
