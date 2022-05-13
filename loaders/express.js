import express from 'express';
import bodyParser from 'body-parser';
import morganBody from 'morgan-body';
import passport from 'passport';
import { passportConfig } from '../middleware/passport';
import config from '../config';
import useAllRoutes from '../api/routes';

export default async () => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  morganBody(app);
  passportConfig(passport);
  useAllRoutes(app);

  app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));

  return app;
}