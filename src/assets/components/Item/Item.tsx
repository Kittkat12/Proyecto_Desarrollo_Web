import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './Item.scss'

import { useTaskStore } from '../../../store/taskStore'
import { useGoalStore } from '../../../store/goalStore'
import { useMenuStore } from '../../../store/menuStore'

import type { task } from '../../../store/taskStore'
import type { Goal } from '../../../store/goalStore'

function Item(props: task | Goal) {
  const { removeTask } = useTaskStore.getState()
  const { removeGoal } = useGoalStore.getState()
  const isActiveInMenu = useMenuStore((state) => state.menu.active)

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (isActiveInMenu === 'tasks') {
      removeTask(props as task)
    } else {
      removeGoal(props as Goal)
    }
  }

  return (
    <Card className="item-card">
      <Card.Body className="item-body">
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Text>Fecha límite: {props.dueDate}</Card.Text>

        <Button onClick={(e) => handleRemove(e)}>Eliminar</Button>
      </Card.Body>
    </Card>
  )
}

export default Item