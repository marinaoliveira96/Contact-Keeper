const express = require('express');
const router = express.Router();

// @routes  GET api/auth
// @desc    Get loggoed in user
// @access  Private
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @routes  POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;
