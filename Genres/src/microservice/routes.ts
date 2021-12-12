//////////////////////////////////////////////////////////////////////////////////////////////////
// Microservice router requirements
//////////////////////////////////////////////////////////////////////////////////////////////////
import { Router,  Request, Response } from 'express';
import { FacadeMicroservice } from './facade';

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * microservice router controller
 */
export const controller  = {
	/**greetings
	 *
	 * test method from microservice
	 */
	greetings : (req: Request, res: Response) => {
		FacadeMicroservice.greet(req.body)
		.then((data) => {
			res.status(200).json(data)
		})
		.catch((err) => {
			res.status(500).send(err)
		})
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * microservice router
 */
export const microservice: Router = Router()
microservice.post('/greeting', controller.greetings)

export default microservice