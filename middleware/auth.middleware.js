//middleware - функция, которая позволяет перехватывать какие-то данные

const jwt = require("jsonwebtoken");
const config = require("config");

//next - продолжение выполнения запроса
module.exports = (req, res, next) => {
  //специальный метод в RestApi, который говорит, что сервер доступен
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    //получеаям строку в виде "Bearer TOKEN" и достаем оттуда только TOKEN
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not yet authorizated" });
    }

    //раскодируем токен с указаним секретного ключа
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //передаем в req в поле user раскодированный токен
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Not yet authorizated" });
  }
};
