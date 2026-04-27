import { useRef } from 'react'
import type React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './Form.scss'

import { useTaskStore } from '../../../store/taskStore'
import { useGoalStore } from '../../../store/goalStore'
import { useMenuStore } from '../../../store/menuStore'

type FormTaskAndGoalProps = {
  onAdd?: () => void
}

function FormTaskAndGoal({ onAdd }: FormTaskAndGoalProps) {
  const inputRefName = useRef<HTMLInputElement>(null)
  const inputRefDescription = useRef<HTMLTextAreaElement>(null)
  const inputRefDueDate = useRef<HTMLInputElement>(null)

  const isActiveInMenu = useMenuStore((state) => state.menu.active)
  const addTask = useTaskStore((state) => state.addTask)
  const addGoal = useGoalStore((state) => state.addGoal)

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    const name = inputRefName.current?.value
    const description = inputRefDescription.current?.value
    const dueDate = inputRefDueDate.current?.value

    if (name && description && dueDate) {
      if (isActiveInMenu === 'tasks') {
        addTask({
          id: Date.now(),
          name,
          description,
          dueDate,
        })
      } else {
        addGoal({
          id: Date.now(),
          name,
          description,
          dueDate,
        })
      }

      if (inputRefName.current) {
        inputRefName.current.value = ''
      }

      if (inputRefDescription.current) {
        inputRefDescription.current.value = ''
      }

      if (inputRefDueDate.current) {
        inputRefDueDate.current.value = ''
      }
    }

    if (onAdd) {
      onAdd()
    }
  }

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" ref={inputRefName} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} ref={inputRefDescription} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha</Form.Label>
          <Form.Control type="date" ref={inputRefDueDate} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar
        </Button>
      </Form>
    </div>
  )
}

export default FormTaskAndGoal