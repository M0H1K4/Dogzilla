import  express  from "express";
import { Student } from "../models/studentModel.js";

const router = express.Router()

// Route for Save a new Student (dddddd)
router.post("/", async (req, res) => {
  try {
    if (!req.body.name || !req.body.secondName || !req.body.birthYear) {
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

// Route for Get All STUDENT from DB
router.get("//:id", async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    return res.status(200).json(student);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for Get one STUDENT By ID
router.get("/", async (req, res) => {
  try {
    const students = await Student.find({});

    return res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route for updating a Student

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.name || !req.body.secondName || !req.body.birthYear) {
      return res.status(400).send({
        message: "Send all requried fields: name, secondName, birthYear",
      });
    }

    const { id } = req.params;

    const result = await Student.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.status(200).send({ message: "Student Updated successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// ROute for Delete a Student
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Student.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).send({ message: "Student Deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

export default router;