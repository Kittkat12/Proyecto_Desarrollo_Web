import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss';

function FormTaskAndGoal() {
  return (
    <div className="form-container">
      <Form>
        <Form.Group className="mb-3" controlId="formTaskName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTaskDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTaskDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Goal
        </Button>
      </Form>
    </div>
  );
}

export default FormTaskAndGoal;