import { useEffect } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './App.scss'

import Menu from './assets/components/Menu/Menu'
import FormComponent from './assets/components/Form/Form'
import Item from './assets/components/Item/Item'
import AddingMobileButton from './assets/components/addingmobilebutton/addingmobilebutton'

import { useTaskStore } from './store/taskStore'
import { useGoalStore } from './store/goalStore'
import { useMenuStore } from './store/menuStore'

function App() {
  const tasks = useTaskStore((state) => state.tasks)
  const goals = useGoalStore((state) => state.goals)
  const activeMenu = useMenuStore((state) => state.menu.active)

  useEffect(() => {
    useTaskStore.getState().setTasks([
      {
        id: 1,
        name: 'Tarea 1',
        description: 'Descripción de la tarea 1',
        dueDate: '2024-12-31',
      },
      {
        id: 2,
        name: 'Tarea 2',
        description: 'Descripción de la tarea 2',
        dueDate: '2024-11-30',
      },
    ])

    useGoalStore.getState().setGoals([
      {
        id: 1,
        name: 'Meta 1',
        description: 'Descripción de la meta 1',
        dueDate: '2025-01-31',
      },
      {
        id: 2,
        name: 'Meta 2',
        description: 'Descripción de la meta 2',
        dueDate: '2025-02-28',
      },
    ])

    useMenuStore.getState().setActive('tasks')
  }, [])

  return (
    <>
      <Menu />

      <Container className="main-container">
        <Row>
          <Col md={4}>
            <FormComponent />
          </Col>

          <Col md={8}>
            <div className="items-container">
              {activeMenu === 'tasks' &&
                tasks.map((task) => (
                  <Item key={task.id} {...task} />
                ))}

              {activeMenu === 'goals' &&
                goals.map((goal) => (
                  <Item key={goal.id} {...goal} />
                ))}
            </div>
          </Col>
        </Row>

        <div className="d-md-none overlapping-div">
          <AddingMobileButton />
        </div>
      </Container>
    </>
  )
}

export default App