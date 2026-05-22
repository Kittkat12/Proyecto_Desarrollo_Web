import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import './Menu.scss'

import { useMenuStore } from '../../../store/menuStore'

function Menu() {
  const setActive = useMenuStore((state: any) => state.setActive)

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand
          href="#tasks"
          className="brand-title"
          onClick={() => setActive('tasks')}
        >
          Tareas
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#tasks"
              className="custom-nav-link"
              onClick={() => setActive('tasks')}
            >
              Tareas
            </Nav.Link>

            <Nav.Link
              href="#goals"
              className="custom-nav-link"
              onClick={() => setActive('goals')}
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