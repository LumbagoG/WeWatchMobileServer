const {check, validationResult} = require('express-validator'),
                       {Router} = require('express'),
                         bcrypt = require('bcryptjs'),
                         config = require('config'),
                            jwt = require('jsonwebtoken'),
                           User = require('../models/User'),
                         router = Router();


// /api/auth/register
router.post(
  '/register',
  [
    check('login', 'Некорректный email').notEmpty(),
    check('email', 'Некорректный email').isEmail().notEmpty(),
    check('password', 'Минимальная длина пароля 6 символов')
      .isLength({ min: 6 }).notEmpty()
  ],
  async (req, res) => {
    try {

      //errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректны данные при регистрации'
        });
      }

      //data to frontend
      const {login, email, password} = req.body;

      //checking for user existence
      const candidateLogin = await User.findOne({ login });
      const candidateEmail = await User.findOne({ email });
      if ((candidateLogin || candidateEmail) || (candidateLogin && candidateEmail)) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      //hashing
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ login, email, password: hashedPassword });

      //saving user to mongodb
      await user.save();

      //confirmation of success
      res.status(201).json({ message: 'Пользователь создан' });

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' + `${e}` });
    }
  }
);

// /api/auth/login
router.post(
  '/login',
  [
    check('login', 'Введите login').exists().notEmpty(),
    check('password', 'Введите пароль').exists().notEmpty()
  ],
  async (req, res) => {
    try {

      //errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему'
        });
      }

      //data to frontend
      const {login, password} = req.body;

      //checking to existing user 
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      //checking password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' + `${e}`});
      }

      //generation user token
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );
      
      //dispatch to frontend data
      res.json({ token, userId: user.id });

    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  }
);


module.exports = router;