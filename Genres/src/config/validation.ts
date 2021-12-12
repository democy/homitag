import * as JOI from 'joi';

const validationSchema = {
	createGenres: {
		body: {
			// name: JOI.string().regex(/^[a-z][a-z0-9-_.@' ]*$/i).required()
			// .options({
			// 	language: {
			// 		string: {
			// 			regex: {
			// 				base: 'must contains alphanumeric characters and start with a character!'
			// 			}
			// 		}
			// 	}
			// }),
			name: JOI.string(),
			description: JOI.string(),
		}
	},
	getGenres: {
		params: {
			genres_id: JOI.string().required()
		}
	},

	// DELETE /api/v1/genres-api/genres/:genres_id
	deleteGenres: {
		params: {
			genres_id: JOI.string().required()
		}
	}
	
}

export { validationSchema };