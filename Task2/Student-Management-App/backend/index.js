import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Student } from "./models/studentModel.js";

const app = express();

// Middleware for parsing req body

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  return res.status(234).send("Welcome To MERN Stack Tutorial");
});

// Route for Save a new Student (dddddd)

app.post("/students", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.secondName ||
      !req.body.birthYear
    ) {
      return res.status(400).send({
        message: "Send all required fields: name, secondName, birthYear",
      });
    }
    const newStudent = {
      name: req.body.name,
      secondName: req.body.secondName,
      birthYear: req.body.birthYear,
    };

    const student = await Student.create(newStudent);

    return res.status(201).send(student);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

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
