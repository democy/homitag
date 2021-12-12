import chaiHttp = require('chai-http');
import { request, expect, use } from 'chai';
import { server, app } from '../../src/bin/server';

use(chaiHttp)

// 	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 	/**
// 	 * Collections API - Standard
// 	 */
// 	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('homitag - Standard: ', (): void => {
	it('get all genres', (done) => {
			request(server)
			.get(`${app.locals.baseUri}/genres`).then( data => {
				expect(data.status).to.equal(200)
				done()
			}).catch(err => {done(err)})
		});


	it('should add a genres ', (done: Function): void => {
		request(server)
			.post(`${app.locals.baseUri}/genres`).send(
				{
			"name": "test test 1",
			"description": "circle"
		 }
			).then(data => {
			expect(data.status).to.equal(200);
			describe('Delete a genres', () => {
				it('should return 404 because of id not found', (done) => {
					const genres_id = 221234
					request(server)
					.del(`${app.locals.baseUri}/genres/${genres_id}`).then(data => {
						expect(data.status).to.equal(404)
						done();
					}).catch(err => {done(err)})
				});

			});
			done();
		}).catch(err => {
			done(err);
		})
	});
});