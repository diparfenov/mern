const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  //откуда ссылка
  from: { type: String, required: true },
  //куда будет вести ссылка
  to: { type: String, required: true, unique: true },
  //код с которым нужно будет взаимодействовать
  code: { type: String, required: true, unique: true },
  //дата
  date: { type: Date, default: Date.now },
  //кол-во кликов
  clicks: { type: Number, default: 0 },
  //владелец
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("Link", schema);
