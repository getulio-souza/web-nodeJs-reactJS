import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import api from '../../../services/api';
import './index.css'

interface ITask {
  title: string;
  description: string;
}

//componente que sera exibido para o usuario

const Form: React.FC = () => {

  const [model, setModel] = useState<ITask>({
    title: "",
    description: ""
  })

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    findTask()
  }, [id])

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [event.target.name]: event.target.value
    })
  }

  function callBackend() {
    navigate(-1)
  }

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    const response = await api.post("/tasks", model)
    callBackend()
    console.log(model)
  }

  //carregando dados de uma tarefa existente
  async function findTask(id?: number) {
    const response = await api.get(`/tasks/${id}`)
    setModel({
      title: response.data.title,
      description: response.data.description
    })
  }

  return (
    <div className='container'>
      <div className='task-header'>
        <h1>Nova tarefa</h1>
        <Button
          variant='dark'
          size='sm'
          onClick={callBackend}
        >
          Voltar
        </Button>
      </div>
      <BootstrapForm onSubmit={onSubmit}>
        <BootstrapForm.Group>
          <BootstrapForm.Label>Titulo</BootstrapForm.Label>
          <BootstrapForm.Control type='text' name='title' onChange={(e: ChangeEvent<HTMLInputElement>)=> updateModel(e)} />
        </BootstrapForm.Group>
        <BootstrapForm.Group>
          <BootstrapForm.Label>Description</BootstrapForm.Label>
          <BootstrapForm.Control type='text' name='description'/>
        </BootstrapForm.Group>
        <Button variant='dark' size='sm' type='submit' style={{marginTop:'10px'}}>Salvar</Button>
      </BootstrapForm>
    </div>
  )
}

export default Form