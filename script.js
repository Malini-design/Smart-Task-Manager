let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();


function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    input.value = "";

    displayTasks();
}

function displayTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            filter === "completed" && !task.completed ||
            filter === "pending" && task.completed
        ) {
            return;
        }

        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button onclick="editTask(${index})">✏️</button>
            <button onclick="deleteTask(${index})">❌</button>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    displayTasks(type);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        saveTasks();
        displayTasks();
    }
}