import express from 'express';
import bodyParser from 'body-parser';
import { QueryFailedError } from 'typeorm';
import 'reflect-metadata';

import { initializeDataSource } from './app/data-source';
import { generate } from './app/generators';
import { initializeItemRoutes } from './app/routes';

(async () => {
  console.log('Initializing data source .. ');
  await initializeDataSource();
  console.log('ok');
  console.log('Generating database .. ');
  await generate();
  console.log('ok');

  const app = express();

  app.use('/api/openapi', express.static('libs/api-interfaces/openapi'));

  app.use(bodyParser.json());

  initializeItemRoutes(app);

  app.use((err, req, res, next) => {
    if (err instanceof QueryFailedError) {
      res.status(400).json({
        message: err.message,
      });
    } else {
      res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });
    }
  });

  const port = process.env.port || 3333;
  const server = app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/api');
  });
  server.on('error', console.error);
})();
