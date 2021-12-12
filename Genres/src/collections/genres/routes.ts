import { Request, Response, NextFunction, Router} from 'express';
import * as JOI from 'joi';

import { GenresFacade } from './facade';
import { validationSchema } from '../../config/validation';
import { log } from '../../log';

/**
 * Genres Router
 */
export function genresRouter(): Router {
	const router = Router();

	// POST /api/v1/genres-api/genres
	router.post('/', async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const validated = JOI.validate({ body: req.body}, validationSchema.createGenres);
			const {name,description} = req.body as any
			if (validated.error === null) {
					const GenresObj = [{
						name: name,
						description: description
					}]
					const genresdata = await GenresFacade.create(GenresObj);
					res.status(200).json({ data: genresdata,  error: null, message: 'Genres has been created successfully!' });
			} else {
				log.warn({message: validated.error.details[0].message, statusCode: 400, detail: validated.error.details[0], repo: 'genres-api',  path: '/api/v1/genres-api/genres'});
				res.status(400).json({ data: null, error: true,  message: validated.error.details[0].message });
			}
		} catch (err) {
			log.error({message: 'Error in creating a new genres!', statusCode: 500, detail: err, repo: 'genres-api',  path: '/api/v1/genres-api/genres/'});
		}
	}),
	
	// GET /api/v1/genres-api/genres/:genres_id
	router.get('/:genres_id', async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const validated = JOI.validate({ params: req.params }, validationSchema.getGenres);
			if (validated.error === null) {
				const genres = await GenresFacade.findOne(req.params.genres_id);
				if (genres.length > 0) {
					res.status(200).json({ data: genres, error: null, message: 'Genres has been retrieved successfully!' });
				} else {
					log.warn({message: 'Genres does not found!', statusCode: 404, detail: true, repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
					res.status(404).json({ data: null, error: true, message: 'Genres does not found!' });
				}
			} else {
				log.warn({message: validated.error.details[0].message, statusCode: 400, detail: validated.error.details[0], repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
	  			res.status(400).json({ data: null, error: true,  message: validated.error.details[0].message });
			}
		} catch (err) {
			log.error({message: 'Error in getting a genres!', statusCode: 500, detail: err, repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
			res.status(500).json({ data: null, error: err, message: 'Error in getting a genres!' });
		}
	}),

	// GET /api/v1/genres-api/genres/
	router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
		try {
			const genres =  await GenresFacade.findAllGenres()
			res.status(200).json({ data: genres, error: null, message: ' genres has been retrieved successfully!' });
		} catch (err) {
			log.error({message: 'Error in retrieving genres!', statusCode: 500, detail: err, repo: 'genres-api',  path: '/api/v1/genres-api/genres'});
			res.status(500).json({ data: null, error: err, message: 'Error in retrieving genres!' });
		}
	}),

	// DELETE /api/v1/genres-api/genres/:genres_id
	router.delete('/:genres_id', async (req: Request, res: Response, _next: NextFunction) => {
		try {
			const validated = JOI.validate({ params: req.params }, validationSchema.deleteGenres);
			if (validated.error === null) {
				const genres = await GenresFacade.findOne(req.params.genres_id);
				if (genres.length > 0) {
					const genresData = await GenresFacade.delete(req.params.genres_id);
					res.status(200).json({ data: genresData, error: null, message: 'Genres has been deleted successfully!' });
				} else {
					log.warn({message: 'Genres does not found!', statusCode: 404, detail: true, repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
					res.status(404).json({ data: null, error: true, message: 'Genres does not found!' });
				}
			} else {
				log.warn({message: validated.error.details[0].message, statusCode: 400, detail: validated.error.details[0], repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
	  			res.status(400).json({ data: null, error: true,  message: validated.error.details[0].message });
			}
		} catch (err) {
			log.error({message: 'Error in deleting a genres!', statusCode: 500, detail: err, repo: 'genres-api',  path: '/api/v1/genres-api/genres/:genres_id'});
			res.status(500).json({ data: null, error: err, message: 'Error in deleting a genres!' });
		}
	})

	return router;
}