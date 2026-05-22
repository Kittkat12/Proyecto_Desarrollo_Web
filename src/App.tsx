import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

import './App.scss'

import Menu from './assets/components/Menu/Menu'
import FormTaskAndGoal from './assets/components/Form/Form'
import Item from './assets/components/Item/Item'
import AddingMobileButton from './assets/components/addingmobilebutton/addingmobilebutton'

import { useTaskStore, initializeTasks } from './store/taskStore'
import { useGoalStore, initializeGoals } from './store/goalStore'
import { useMenuStore } from './store/menuStore'

function App() {
  const tasks = useTaskStore((state: any) => state.tasks)
  const goals = useGoalStore((state: any) => state.goals)
  const isActiveInMenu = useMenuStore((state: any) => state.menu.active)

  const removeTask = useTaskStore((state: any) => state.removeTask)
  const removeGoal = useGoalStore((state: any) => state.removeGoal)
  useEffect(() => {
    initializeTasks()
    initializeGoals()
  }, [])

  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <div className="App">
      <Menu />

      <Container>
        <Row>
          <Col className="d-none d-md-block">
            <FormTaskAndGoal />
          </Col>

          <Col>
            <div className="d-md-none overlapping-div" onClick={handleOpenModal}>
              <AddingMobileButton />
            </div>

            <Row>
              {isActiveInMenu === 'tasks' ? (
                <div key="tasks" className="scrolling">
                  {tasks.map((task: any) => (
                <Item
                  key={task._id}
                  {...task}
                  onDelete={() => removeTask(task)}
                  />
                  ))}
                </div>
              ) : (
                <div key="goals" className="scrolling">
                  {goals.map((goal: any) => (
                  <Item
                  key={goal._id}
                  {...goal}
                  onDelete={() => removeGoal(goal)}
                  />
                ))}
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar tarea</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormTaskAndGoal onAdd={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default App
