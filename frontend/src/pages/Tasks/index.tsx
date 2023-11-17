import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import moment from "moment";
import '../Tasks/index.css'

export interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  function formatDate(date: Date) {
    return moment(date).format("DD/MM/YYYY")
  }

  function newTask() {
    navigate("/tarefas/cadastro")
  }

  function editTask(id: number) {
    navigate(`/tarefas/cadastro/${id}`)
  }

  function viewTask(id: number) {
    navigate(`/tarefas/${id}`)
  }

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response.data);
    setTasks(response.data);
  }

  async function finishedTask(id: number) {
    await api.patch(`/tasks/${id}`)
    loadTasks();
  }

  async function deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  }

  return (
    <div className="container" style={{maxWidth: '820px'}}>
      <div className="task-header">
        <h1>Página de Tarefas</h1>
        <Button variant="dark" size="sm" onClick={newTask}>
          Nova Tarefa
        </Button>
      </div>
      
      <Table striped bordered hover style={{marginTop: "10px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data de atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{formatDate(task.updated_at)}</td>
              <td>{task.finished ? "Finalizado" : "Pendente"}</td>
              <td>
                <Button size="sm" disabled={task.finished} variant="primary" className="me-1" onClick={()=> editTask(task.id)}>Editar</Button>
                <Button size="sm" variant="success" className="me-1" onClick={()=> finishedTask(task.id)}>Finalizar</Button>
                <Button size="sm" variant="warning" className="me-1" onClick={()=> viewTask(task.id)}>Visualizar</Button>
                <Button size="sm" disabled={task.finished} variant="danger" className="me-1" onClick={()=> deleteTask(task.id)}>Remover</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Tasks;
