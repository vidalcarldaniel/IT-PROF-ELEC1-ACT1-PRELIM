import axios from 'axios';

const app = document.querySelector('#app');

async function fetchMessage() {
  try {
    const response = await axios.get('http://localhost:3000/api/message');
    app.innerHTML = `<h2>${response.data.message}</h2>`;
  } catch (error) { 
    app.innerHTML = `<p> Failed to fetch API</p>`;
    console.error(error);
  }
}

async function fetchStudents() {
  try {
    const response = await axios.get("http://localhost:3000/api/students");
    const students = response.data;
    let studentsHtml = "<h3>Students List</h3><ul>";
    students.forEach(student => {
      studentsHtml += `
        <li>
          <strong>${student.name}</strong> (${student.username})<br>
          📧 ${student.email}<br>
          🎓 ${student.course} - ${student.year}<br>
          📍 ${student.address}
        </li><br>`;
    });
    studentsHtml += "</ul>";
    app.innerHTML += studentsHtml;
  } catch (error) {
    app.innerHTML += "<h3>Error fetching students</h3>";
    console.error(error);
  }
}

async function fetchTodolist() {
  try {
    const response = await axios.get("http://localhost:3000/api/todolist");
    const todos = response.data;
    let todoHtml = "<h3>Todo List</h3><ul>";
    todos.forEach(todo => {
      todoHtml += `<li>${todo.title} - ${todo.completed ? "✅ Done" : "❌ Pending"}</li>`;
    });
    todoHtml += "</ul>";
    app.innerHTML += todoHtml;
  } catch (error) {
    app.innerHTML += "<h3>Error fetching todolist</h3>";
    console.error(error);
  }
}

async function fetchCars() {
  try {
    const response = await axios.get("http://localhost:3000/api/cars");
    const cars = response.data;
    let carsHtml = "<h3>Cars List</h3><ul>";
    cars.forEach(car => {
      carsHtml += `<li>${car.name} - $${car.price}</li>`;
    });
    carsHtml += "</ul>";
    app.innerHTML += carsHtml;
  } catch (error) {
    app.innerHTML += "<h3>Error fetching cars</h3>";
    console.error(error);
  }
}

fetchMessage();
fetchStudents();
fetchTodolist();
fetchCars();