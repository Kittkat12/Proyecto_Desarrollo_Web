import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './App.scss'
import Menu from './assets/components/Menu/Menu'
import FormComponent from './assets/components/Form/Form'
import Item from './assets/components/Item/Item'
import AddingMobileButton from './assets/components/addingmobilebutton/addingmobilebutton'

function App() {
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
              <Item />
              <Item />
            </div>
          </Col>

          <div className="d-md-none overlapping-div">
            <AddingMobileButton />
          </div>
        </Row>
      </Container>
    </>
  )
}

export default App