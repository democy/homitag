import moment = require('moment');
import { log } from '../log';
import { Pool, types } from 'pg';

// Force conversion to UTC using moment
types.setTypeParser(1114, (str: any) => moment.utc(str).format())

const config: any = {
	user: process.env.PG_USER || 'homitag',
	database: process.env.PG_DATABASE || 'homitag_analytics_test',
	password: process.env.PG_PASSWORD || 'homitag',
	host: process.env.PG_HOST || 'localhost',
	port: Number(process.env.PG_PORT) || 5432
};

if (process.env.SSL_MODE) {
	config['ssl'] = {
        require: true,
        rejectUnauthorized: false
    }
}

const PG_CLIENT = new Pool(config);
PG_CLIENT.connect()
	.then(() => { log.debug('postgres database connected') })
	.catch((err:any) => { log.error('postgres database could not connect',err) })

export { PG_CLIENT }