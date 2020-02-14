import * as express from 'express';

import { schemeRouter } from './routes/scheme.routes';

export const server = express();

server.use(express.json());
server.use('/api/schemes', schemeRouter);
