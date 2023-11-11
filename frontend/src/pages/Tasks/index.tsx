import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import api from "../../services/api";

interface ITask {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    console.log(response.data);
    setTasks(response.data);
  }

  return (
    <div className="container">
      <br />
      <h1>Página de Tarefas</h1>
      <br />
      <Table striped bordered hover>
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
              <td>{task.updated_at}</td>
              <td>{task.finished ? "Finalizado" : "Pendente"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Tasks;
