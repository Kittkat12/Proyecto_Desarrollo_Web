import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './Item.scss'

function Item() {
  return (
    <Card className="item-card">
      <Card.Body className="item-body">
        <Card.Title>Nombre</Card.Title>
        <Card.Text>Descripción 1</Card.Text>
        <Card.Text>Descripción 2</Card.Text>
        <Card.Text>Due Date: 22/05/2026</Card.Text>
        <Button variant="info">Eliminar</Button>
      </Card.Body>
    </Card>
  )
}

export default Item