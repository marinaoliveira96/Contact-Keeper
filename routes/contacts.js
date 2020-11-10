const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @routes  GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const contatcts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contatcts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @routes  POST api/auth
// @desc    Add new contact
// @access  Purivate
router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newConctact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
        //esse user temos acesso por causa do auth middleware
      });
      //salva no banco de dados
      const contact = await newConctact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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
