import { GenresData } from './interfaces';
import * as format from 'pg-format';

const genresQueries = {
	createGenres: (GenresData: GenresData[]) => {
		return format(
			'INSERT INTO genres(genres_name, genres_description) VALUES %L',
			GenresData.map((d) => [ d.name,d.description])
		)
	},


	findAllGenres: () => {
		return `SELECT * from genres`
	},

	findOne: (genresId: string) => {
		return {
			text: `SELECT * from genres WHERE genres_id = $1`,
			values: [genresId]
		};
	},

	findByGenresLocation: (lat: number, lng: number) => {
		return {
			text: `SELECT * FROM genres WHERE coordinates @> point ($1,$2)`,
			values: [ lat, lng]
		};
	},

	update: (genresId: string, GenresData: any) => {
		let setQueryPart = ``;
		Object.keys(GenresData).forEach((key, index) => {
			setQueryPart += ` ${key}=$${index + 1}`
			if (Object.keys(GenresData).length !== (index + 1)) {
				setQueryPart += ','
			}
		});

		return {
			text: `UPDATE genres SET ${setQueryPart} where genres_id='${genresId}' RETURNING *`,
			values: Object.keys(GenresData).map((key) => GenresData[key])
		};
	},

	deleteGenres: ( genresId: string) => {
		return {
			text: 'DELETE FROM genres WHERE genres.genres_id = $1',
			values: [ genresId]
		};
	}

}

export { genresQueries }