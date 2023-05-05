const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = Router();

// /api/auth/register

//Создаем router для регитсраиции
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body; //с фронта получаем email и password

        const candidate = await User.findOne({ email: email }); //ищем в БД юзера с таким емайлом

        if (candidate) {
            //если такой юзер есть в БД выкидываем ошибку
            return res
                .status(400)
                .json({ message: "This user already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 4); //хэшируем пароль

        const user = new User({ email: email, password: hashedPassword }); //создаем нового пользователя
        await user.save(); //сохраняем новго пользователя в БД

        res.status(201).json({ message: "User has been created!" }); //выдаем сообщение что Юзер был создан
    } catch (error) {
        res.status(500).json({ message: "Something went wrong, try again" }); //если в целом что-то не так выдаем ошибку
    }
});

// /api/auth/login
router.post("/login", async (req, res) => {});

module.exports = router;
