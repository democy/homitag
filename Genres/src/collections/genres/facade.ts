import { genresQueries } from './queries';
import { PG_CLIENT } from '../../databases';
import { GenresData } from './interfaces'
import { log } from '../../log';

const GenresFacade = {
	create: async ( GenresData: GenresData[]) => {
		try {
			await PG_CLIENT.query(genresQueries.createGenres(GenresData));
			return GenresData;
		} catch (err) {
			log.error('Error in creating a new genres:', (err as any).stack);
			throw err;
		}
	},

	findAllGenres: async () => {
		try {
			const { rows } = await PG_CLIENT.query(genresQueries.findAllGenres());
			return rows;
		} catch (err) {
			log.error('Error in retrieving all genres:', (err as any).stack);
			throw err;
		}
	},
	

	findOne: async (genresId: string) => {
		try {
			const { rows } = await PG_CLIENT.query(genresQueries.findOne(genresId));
			return rows;
		} catch (err) {
			log.error('Error in retrieving a genres:', (err as any).stack);

			throw err;
		}
	},

	delete: async (genresId: string) => {
		try {
			await PG_CLIENT.query('BEGIN');
			// One more query to delete genres from genress_to_trailers
			await PG_CLIENT.query(genresQueries.deleteGenres(genresId));
			await PG_CLIENT.query('COMMIT')

			return true;
		} catch (err) {
			log.error('Error in deleting a genres:', (err as any).stack);
			await PG_CLIENT.query('ROLLBACK')
			throw err;
		}
	}
}
export { GenresFacade };