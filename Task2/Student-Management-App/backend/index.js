import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/studentModel.js";
import studentsRoute from "./routes/studentsRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing req body
app.use(express.json());

// Middleware for Handling CORS POLICY
// Option 1: Allow Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get("/", (req, res) => {
  console.log(req.body);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/students", studentsRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listenning to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
