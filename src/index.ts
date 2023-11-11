import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import routes from './routes';
import * as cors from "cors"

//comunicacao com o banco de dados
AppDataSource.initialize().then(async () => {

  const app = express();
  
  app.use(cors());
  app.use(bodyParser.json());
  app.use(routes);
  app.listen(3333);
})