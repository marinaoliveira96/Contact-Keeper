const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { check, validationResult } = require('express-validator');

const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/User');

// @routes  POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      // se o usuário não existir cria um novo com o model
      user = new User({
        name,
        email,
        password,
      });

      //hash password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // salva o usuário no banco de dados
      await user.save();

      // pegar o id do user
      const payload = {
        user: {
          id: user.id,
        },
      };

      //gerar o token
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //o token inclui o id do usuario
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
