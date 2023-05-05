const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use({ fn: "/api/auth" }, require("./routes/auth.routes"));

const PORT = config.get("port") || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true, <-- не рабоатет
        });
        app.listen(PORT, () =>
            console.log(`App has been started on port: ${PORT}...`)
        );
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit({ code: 1 }); //завершить процесс node
    }
};

start();
