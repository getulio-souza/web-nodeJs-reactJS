import { Router, request, response, Request, Response } from 'express';

const routes = Router();

routes.get("/home", (request: Request, response: Response) => {
  return response.json({ message: "Hello turma!" })
});

export default routes;