import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './Menu.scss'

import { useMenuStore } from '../../../store/menuStore'

function Menu() {
  const active = useMenuStore((state) => state.menu.active)
  const setActive = useMenuStore((state) => state.setActive)

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#tasks" className="brand-title">
          Tareas
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            activeKey={active}
            onSelect={(selectedKey) => setActive(selectedKey || 'tasks')}
          >
            <Nav.Link
              eventKey="tasks"
              href="#tasks"
              className="custom-nav-link"
            >
              Tareas
            </Nav.Link>

            <Nav.Link
              eventKey="goals"
              href="#goals"
              className="custom-nav-link"
            >
              Metas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu