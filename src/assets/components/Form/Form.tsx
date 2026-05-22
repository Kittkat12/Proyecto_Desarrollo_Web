import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Form.scss';

import { useTaskStore } from '../../../store/taskStore';
import { useGoalStore } from '../../../store/goalStore';
import { useMenuStore } from '../../../store/menuStore';

type FormTaskAndGoalProps = {
  onAdd?: () => void
}

function FormTaskAndGoal({ onAdd }: FormTaskAndGoalProps) {
  const addTask = useTaskStore((state: any) => state.addTask);
  const addGoal = useGoalStore((state: any) => state.addGoal);
  const isActiveInMenu = useMenuStore((state: any) => state.menu.active);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duedate, setDuedate] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (name && description && duedate) {
    const newItem = {
      name,
      description,
      duedate
    };

    if (isActiveInMenu === 'tasks') {
      await addTask(newItem as any);
    } else {
      await addGoal(newItem as any);
    }

    setName('');
    setDescription('');
    setDuedate('');

    if (onAdd) {
      onAdd();
    }
  }
};

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTaskName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTaskDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTaskDueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={duedate}
            onChange={(event) => setDuedate(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isActiveInMenu === 'tasks' ? 'Add Task' : 'Add Goal'}
        </Button>
      </Form>
    </div>
  );
}

export default FormTaskAndGoal;