import express from "express";
import cors from "cors";
import students from "./students.js";
import todolist from "./todolist.js";
import cars from "./cars.js";
import users from "./users.js"; // must be an array

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

app.get("/api/users", (req, res) => {
    res.json(users);
});

app.post("/api/addUsers", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({ message: "User added successfully", user: newUser });
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});