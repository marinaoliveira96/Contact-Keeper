const express = require('express');
const router = express.Router();

// @routes  GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @routes  POST api/auth
// @desc    Add new contact
// @access  Purivate
router.post('/', (req, res) => {
  res.send('Add contacts');
});

// @routes  PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @routes  DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
