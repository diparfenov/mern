const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator"); //
const User = require("../models/User");
const router = Router();

// /api/auth/register

//Создаем router для регитсраиции
router.post(
  "/register",
  [
    //валидируем данные в массиве
    check("email", "Invalid email").isEmail(),
    check("password", "Minimum password length - 6 characters").isLength({
      options: { min: 6 },
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req); //ошибки из валидации

      if (!errors.isEmpty()) {
        //если они есть выкидываем ошибку
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid registration data",
        });
      }
      const { email, password } = req.body; //с фронта получаем email и password

      const candidate = await User.findOne({ email: email }); //ищем в БД юзера с таким емайлом

      if (candidate) {
        //если такой юзер есть в БД выкидываем ошибку
        return res.status(400).json({ message: "This user already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 4); //хэшируем пароль

      const user = new User({ email: email, password: hashedPassword }); //создаем нового пользователя
      await user.save(); //сохраняем новго пользователя в БД

      res.status(201).json({ message: "User has been created!" }); //выдаем сообщение что Юзер был создан
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong, try again",
      }); //если в целом что-то не так выдаем ошибку
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Please enter a email").normalizeEmail().isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid authorization data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email: email });

      if (user) {
        //если такой юзер есть в БД выкидываем ошибку
        return res.status(400).json({ message: "User is not a found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password, try again" });
      }

      //формируем токен
      const token = jwt.sign(
        { userId: user.id }, //данные которые будут захэшированы
        config.get("jwtSecret"), //дополнительное секретое слово
        { expiresIn: "1h" } //время действия токена
      );

      //выдаем успешный результат, status не указываем потому что он по умолчанию status(200)
      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong, try again",
      }); //если в целом что-то не так выдаем ошибку
    }
  }
);

module.exports = router;
