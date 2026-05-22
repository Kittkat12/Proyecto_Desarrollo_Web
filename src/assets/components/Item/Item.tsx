import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './Item.scss'

function Item(props: any) {
  return (
    <Card className="item-card">
      <Card.Body className="item-body">
        <Card.Title>{props.name}</Card.Title>

        <Card.Text>{props.description}</Card.Text>

        <Card.Text>
          Due Date: {props.duedate}
        </Card.Text>

        <Button variant="info" onClick={props.onDelete}>
          Eliminar
        </Button>
      </Card.Body>
    </Card>
  )
}

export default Item