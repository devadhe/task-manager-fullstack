const themeBtn = document.getElementById("themeBtn");

const API = "http://localhost:5000/api/tasks";

const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");

let editId = null;

/* Load Tasks */
async function loadTasks() {

  const res = await fetch(API);
  const tasks = await res.json();

  list.innerHTML = "";

  tasks.forEach(task => {

    const div = document.createElement("div");
    div.className = "task";

  const cleanStatus = task.status.trim().toLowerCase();

const statusClass =
  cleanStatus === "completed" ? "completed" : "pending";


    div.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>

    <span class="status ${statusClass}">
  ${cleanStatus === "completed" ? "Completed" : "Pending"}
</span>


      <div class="actions">
        <button onclick="editTask('${task._id}','${task.title}','${task.description}','${task.status}')">✏️</button>

        <button class="delete-btn"
          onclick="deleteTask('${task._id}')">×</button>
      </div>
    `;

    list.appendChild(div);

  });

}

/* Add / Update Task */
form.addEventListener("submit", async (e) => {

  e.preventDefault();

 const task = {
  title: document.getElementById("title").value,
  description: document.getElementById("description").value,
  status: document.getElementById("status").value
};


  if (editId) {

    // UPDATE
    await fetch(API + "/update/" + editId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    editId = null;

  } else {

    // ADD
    await fetch(API + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
  }

form.reset();
status.value = "Pending"; // Reset to default only for new task
loadTasks();


});

/* Edit Task */
function editTask(id, title, desc, statusVal) {

  titleInput = document.getElementById("title");
  descInput = document.getElementById("description");
  statusInput = document.getElementById("status");

  titleInput.value = title;
  descInput.value = desc;
  statusInput.value = statusVal;

  editId = id;
}

/* Delete Task */
async function deleteTask(id) {

  await fetch(API + "/delete/" + id, {
    method: "DELETE"
  });

  loadTasks();

}

/* First Load */
loadTasks();
/* Dark Mode Toggle */
themeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
  }

});
