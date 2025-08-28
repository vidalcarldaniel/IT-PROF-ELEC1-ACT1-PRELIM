import express from "express";
import cors from "cors";
import students from "./students.js";
import todolist from "./todolist.js";
import cars from "./cars.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({ message: "Hello, from backend!" });
});

app.get("/api/students", (req, res) => {
    res.json(students);
});

app.get("/api/todolist", (req, res) => {
    res.json(todolist);
});

app.get("/api/cars", (req, res) => {
    res.json(cars);
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});