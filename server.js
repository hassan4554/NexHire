const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const routes = require("./Routes/index.routes");
const cors = require("cors");
const { passport } = require("./Configs/passport.config");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB();

app.use(passport.initialize());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/", routes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

async function connectDB() {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@database.5eqdz.mongodb.net/nexHire`
    )
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(`error connecting DB: ${err}`));
}

app.listen(3000, () => console.log("listening on port 3000"));
