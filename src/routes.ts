import { Router, request, response, Request, Response } from 'express';
import { getTasks, getTask, saveTask, updateTask, finishedTask, deleteTask } from './controller/TasksController';

const routes = Router();

routes.get("/home", (request: Request, response: Response) => {
  return response.json({ message: "Hello turma!" })
});

routes.get("/tasks", getTasks)
routes.post("/tasks", saveTask)
routes.get("/tasks/:id", getTask)
routes.put("/tasks/:id", updateTask)
routes.patch("/tasks/:id", finishedTask)
routes.delete("/tasks/:id", deleteTask)

export default routes;