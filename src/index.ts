import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import { AppDataSource } from './data-source';

//comunicacao com o banco de dados
AppDataSource.initialize().then(async () => {

  const app = express();
  
  app.use(bodyParser.json());
  app.use(routes);
  app.listen(3333);
})