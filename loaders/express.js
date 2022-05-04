import express from 'express';
import bodyParser from 'body-parser';
import config from '../config';
import morganBody from 'morgan-body';
import useAllRoutes from '../api/routes';

export default async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  morganBody(app);
  useAllRoutes(app);

  app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));

  return app;
}