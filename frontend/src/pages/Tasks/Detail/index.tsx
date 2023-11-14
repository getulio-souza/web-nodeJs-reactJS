import React, { useEffect, useState} from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import api from "../../../services/api";
import moment from "moment";


interface ITask {
  id: number;
  title: string;
  description: string;
  finished: string;
  create_at: string;
  updated_at: string;
}

const Detail: React.FC = () => {

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const [task, setTask] = useState<ITask>()

  function back() {
    navigate(-1)
  }
  
  //funcao para consumir a API no backend
  async function findTask() {
    const response = await api.get<ITask>(`tasks/${id}`)
    setTask(response.data)
  }

  useEffect(() => {
    findTask()
  }, [id])

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1>Detalhes da tarefa</h1>
        <Button variant="dark" size="sm">Voltar</Button>
      </div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{task?.title}</Card.Title>
          <Card.Text>
            {task?.description}
              <br/>
            {task?.finished ? "Finalizado" : "Pendente"}
            <br />
            <strong>Data de Cadastro</strong>
            {moment(task?.create_at).format("DD/MM/YYYY")}
            <br />
            <strong>Data de Atualização</strong>
            {moment(task?.updated_at).format("DD/MM/YYYY")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Detail