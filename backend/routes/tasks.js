var express = require('express');
var router = express.Router();

const DATABASE = process.env.DATABASE;
var TaskSchema = require('../models/task');

let tasks = [
  { id_: 1, name: 'Task 1', description: 'Description for Task 1', duedate: '2024-07-01' },
  { id_: 2, name: 'Task 2', description: 'Description for Task 2', duedate: '2024-07-02' },
  { id_: 3, name: 'Task 3', description: 'Description for Task 3', duedate: '2024-07-03' }
];

router.get('/getTasks', async function(req, res, next) {
  const db = req.db;

  try {
    if (DATABASE === 'MONGODB') {
      let response = await TaskSchema.find({});
      return res.status(200).json(response);
    }

    if (DATABASE === 'MYSQL') {
      const [response] = await db.query(`
        SELECT
          id,
          name,
          description,
          duedate,
          created_at,
          updated_at
        FROM tasks
      `);

      return res.status(200).json(response);
    }

    return res.status(500).json({
      error: 'Invalid DATABASE env variable'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message || "Error fetching tasks"
    });
  }
});

router.post('/addTask', async function(req, res, next) {
  const db = req.db;

  if (req.body && req.body.name && req.body.description && req.body.duedate) {
    try {
      req.body.duedate = new Date(req.body.duedate);

      if (DATABASE === 'MONGODB') {
        let task = new TaskSchema(req.body);
        let response = await task.save();

        return res.status(200).json(response);
      }

      if (DATABASE === 'MYSQL') {
        const [response] = await db.query(
          'INSERT INTO tasks (name, description, duedate) VALUES (?, ?, ?)',
          [req.body.name, req.body.description, req.body.duedate]
        );

        return res.status(200).json(response);
      }

      return res.status(500).json({
        error: 'Invalid DATABASE env variable'
      });

    } catch (err) {
      return res.status(500).json({
        error: err.message || "Error adding task"
      });
    }

  } else {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
});

router.delete('/removeTask/:id', async function(req, res, next) {
  const db = req.db;

  if (req.params && req.params.id) {
    let id = req.params.id;

    try {
      if (DATABASE === 'MONGODB') {
        await TaskSchema.findByIdAndDelete(id);

        return res.status(200).json({
          message: "Task removed successfully"
        });
      }

      if (DATABASE === 'MYSQL') {
        const [response] = await db.query(
          'DELETE FROM tasks WHERE id = ?',
          [id]
        );

        return res.status(200).json(response);
      }

      return res.status(500).json({
        error: 'Invalid DATABASE env variable'
      });

    } catch (err) {
      return res.status(500).json({
        error: err.message || "Error removing task"
      });
    }

  } else {
    return res.status(400).json({ error: 'Please provide a valid task id' });
  }
});

module.exports = router;