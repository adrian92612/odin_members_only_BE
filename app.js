import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import morgan from "morgan";
import * as controller from "./controllers/authController.js";
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
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.session());

// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     });
//   })
// );

app.get("/", (req, res, next) => res.send("TEST"));

app.post("/sign-up", controller.signup_post);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
