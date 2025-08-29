import axios from 'axios';
import JSConfetti from 'js-confetti';

// ====== CREATE ROOT CONTAINERS ======
const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

const userFormDiv = document.createElement('div');
userFormDiv.id = 'userForm';
document.body.appendChild(userFormDiv);

const usersListDiv = document.createElement('div');
usersListDiv.id = 'usersList';
document.body.appendChild(usersListDiv);

// ====== INIT CONFETTI ======
const jsConfetti = new JSConfetti();

// ====== API FETCHES ======
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

async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:3000/api/users");
    const users = response.data;
    let usersHtml = "<h3>Users List</h3><ul>";
    users.forEach(user => {
      usersHtml += `<li><strong>${user.name}</strong> - ${user.email}</li>`;
    });
    usersHtml += "</ul>";
    usersListDiv.innerHTML = usersHtml;
  } catch (error) {
    usersListDiv.innerHTML = "<h3>Error fetching users</h3>";
    console.error(error);
  }
}

// ====== USERS FORM ======
function renderUserForm() {
  userFormDiv.innerHTML = `
    <h3>Add User</h3>
    <form id="addUserForm">
      <input type="text" id="name" placeholder="Enter name" required/>
      <input type="email" id="email" placeholder="Enter email" required/>
      <button id="addUserBtn" type="submit">Add User</button>
    </form>
    <div id="formMessage" style="text-align: center; margin-top: 2%;"></div>
  `;

  const form = document.querySelector('#addUserForm');
  const formMessage = document.querySelector('#formMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;

    try {
      const response = await axios.post("http://localhost:3000/api/addUsers", { name, email });

      formMessage.innerHTML = `<p style="color:green;">${response.data.message}</p>`;
      form.reset();
      fetchUsers();

      // 🎉 Trigger confetti with emojis
      jsConfetti.addConfetti({
        emojis: ['🎉', '🙌', '🎊', '🥳', '🎈'],
        emojiSize: 40,
        confettiNumber: 50,
      });

    } catch (error) {
      console.error(error);
      formMessage.innerHTML = `<p style="color:red;">Failed to add user</p>`;
    }
  });
}

// ====== INITIAL LOAD ======
fetchMessage();
fetchStudents();
fetchTodolist();
fetchCars();
renderUserForm();
fetchUsers();