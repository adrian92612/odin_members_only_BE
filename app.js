import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// connect to MongoDB
const mongoDB = process.env.DB_URL;
mongoose.set("strictQuery", false);
const main = async () => await mongoose.connect(mongoDB);
main().catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => res.send("TEST"));

app.post("/sign-up", (req, res, next) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
