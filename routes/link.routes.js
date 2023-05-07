const { Router } = require("express");
const config = require("config");
const shortid = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const router = Router();

//Добавляем middlware в роуты для проверки
router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    //получаем ссылку
    const { from } = req.body;

    //делаем короткий id
    const code = shortid.generate();

    //проверяем есть лм на сервере уже такая ссылка
    const existing = await Link.findOne({ from: from });

    //если есть отправляем в res ее
    if (existing) {
      return res.json({ link: existing });
    }

    //иначе, сформировывыем сокращенныю ссылку
    const to = baseUrl + "/t" + code;

    const link = new Link({ code, to, from, owner: req.user.userId });

    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    //поле userId мы добавили при создание jwt токена
    links = await Link.findMany({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
