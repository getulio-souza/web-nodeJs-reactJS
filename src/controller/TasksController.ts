import { AppDataSource } from "../data-source";
import { Tasks } from "../entity/Tasks";
import { Request, Response } from 'express'

const repository = AppDataSource.getRepository(Tasks);

export const getTasks = async (request: Request, response: Response) => {
  const tasks = await repository.find();
  return response.json(tasks)
}

//endpoint que vai receber os dados
export const saveTask = async (request: Request, response: Response) => {
  //aqui salvamos as tarefas no corpo da requisicao
  const task = await repository.save(request.body)
  return response.json(task)
}

export const getTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await repository.findOneBy({ id: parseInt(id) })
  return response.json(task)
}

export const updateTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await repository.update(id, request.body)

  //checa se algum registro foi alterado
  if (task.affected == 1) {
    const taskUpdated = await repository.findOneBy({ id: parseInt(id) })
    return response.json(taskUpdated)
  } else {
    return response.status(404).json({message: "Tarefa nao encontrada"})
  }
}

//metodo para encerrar a tarefa

export const finishedTask = async (request: Request, response: Response) => {
  const { id } = request.params
  const task = await repository.update(id, { finished: true })
  
  if (task.affected == 1) {
    const taskUpdated = await repository.findOneBy({ id: parseInt(id) })
    return response.json(taskUpdated)
  } else {
    return response.status(404).json({message: "Tarefa nao encontrada"})
  }
}

//metodo para deletar tarefa

export const deleteTask = async (request: Request, response: Response) => {
  const { id } = request.params;
  const task = await repository.delete(id)

  if (task.affected == 1) {
    return response.status(200).json({message:"Tarefa excluida com sucesso"})
  } else {
    return response.status(404).json({message: "Tarefa nao encontrada"})
  }
}