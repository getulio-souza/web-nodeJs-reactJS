/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./index.css";
import api from "../../../services/api";
import moment from "moment";
 
interface ITask {
  id?: number;
  title: string;
  description: string;
  finished: boolean;
  create_at: Date;
  updated_at: Date;
}

const Detail: React.FC = () => {

  // const history = useHistory()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [task, setTask] = useState<ITask>()

  function goBack() {
    navigate(-1)
    // history.goBack()
  }
  
  //funcao para consumir a API no backend
  async function findTask() {
    try {
      const response = await api.get<ITask>(`tasks/${id}`)
      console.log(response.data)
      setTask(response.data)
    } catch (error) {
      console.error('erro ao fazer fetch da tarefa:', error)
    }
  }

  useEffect(() => {
    findTask()
  }, [id])

  return (
    <div className="container">
      <br/>
      <div className="task-header">
        <h1>Detalhes da tarefa</h1>
        <Button variant="dark" size="sm" onClick={goBack}>Voltar</Button>
      </div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {task?.title}
          </Card.Title>
          <Card.Text>
            {task?.description}
              <br/>
            {task?.finished ? "Finalizado" : "Pendente"}
            <br />
            <strong>Data de Cadastro:</strong>
            {moment(task?.create_at).format("DD/MM/YYYY")}
            <br />
            <strong>Data de Atualização:</strong>
            {moment(task?.updated_at).format("DD/MM/YYYY")}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Detail