var express = require('express');
var router = express.Router();

const DATABASE = process.env.DATABASE;
var GoalSchema = require('../models/goal');

let goals = [
  { id_: 1, name: 'Goal 1', description: 'Description for Goal 1', duedate: '2024-08-01' },
  { id_: 2, name: 'Goal 2', description: 'Description for Goal 2', duedate: '2024-08-02' },
  { id_: 3, name: 'Goal 3', description: 'Description for Goal 3', duedate: '2024-08-03' }
];

router.get('/getGoals', async function(req, res, next) {
  const db = req.db;

  try {
    if (DATABASE === 'MONGODB') {
      let response = await GoalSchema.find({});
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
        FROM goals
      `);

      return res.status(200).json(response);
    }

    return res.status(500).json({
      error: 'Invalid DATABASE env variable'
    });

  } catch (err) {
    res.status(500).json({
      error: err.message || "Error fetching goals"
    });
  }
});

router.post('/addGoal', async function(req, res, next) {
  const db = req.db;

  if (req.body && req.body.name && req.body.description && req.body.duedate) {
    try {
      req.body.duedate = new Date(req.body.duedate);

      if (DATABASE === 'MONGODB') {
        let goal = new GoalSchema(req.body);
        let response = await goal.save();

        return res.status(200).json(response);
      }

      if (DATABASE === 'MYSQL') {
        const [response] = await db.query(
          'INSERT INTO goals (name, description, duedate) VALUES (?, ?, ?)',
          [req.body.name, req.body.description, req.body.duedate]
        );

        return res.status(200).json(response);
      }

      return res.status(500).json({
        error: 'Invalid DATABASE env variable'
      });

    } catch (err) {
      return res.status(500).json({
        error: err.message || "Error adding goal"
      });
    }

  } else {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }
});

router.delete('/removeGoal/:id', async function(req, res, next) {
  const db = req.db;

  if (req.params && req.params.id) {
    let id = req.params.id;

    try {
      if (DATABASE === 'MONGODB') {
        await GoalSchema.findByIdAndDelete(id);

        return res.status(200).json({
          message: "Goal removed successfully"
        });
      }

      if (DATABASE === 'MYSQL') {
        const [response] = await db.query(
          'DELETE FROM goals WHERE id = ?',
          [id]
        );

        return res.status(200).json(response);
      }

      return res.status(500).json({
        error: 'Invalid DATABASE env variable'
      });

    } catch (err) {
      return res.status(500).json({
        error: err.message || "Error removing goal"
      });
    }

  } else {
    return res.status(400).json({ error: 'Please provide a valid goal id' });
  }
});

module.exports = router;