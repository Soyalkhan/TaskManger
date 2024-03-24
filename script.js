let inputBox = document.querySelector(".inputBox");
let AddTaskBtn = document.querySelector(".addTaskBTN");
let DeleteAll = document.querySelector(".dltall");
var ul = document.querySelector(".list");
let RemoveEachTask = document.querySelectorAll(".taskDelete");
let dataList = [];
let id = 1;

const AddTask = () => {
  if (inputBox.value === "") {
    alert("enter some task!");
  } else {
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    let task = {
      id: id,
      content: inputBox.value,
      completed: false // Adding a completed property
    };
    tasks.push(task);
    id++;
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    inputBox.value = "";
    showTasks();
  }
};

const showTasks = () => {
  let tasksData = localStorage.getItem("Tasks");
  let tasks = [];

  // Check if tasksData is null or not
  if (tasksData !== null) {
    tasks = JSON.parse(tasksData);
  } else {
    console.log("No tasks found in localStorage.");
  }

  ul.innerHTML = "";

  // Ensure tasks is an array before using forEach
  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.dataset.taskId = task.id;

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      
      checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        updateLocalStorage(tasks);
        updateTaskDisplay(li, task);
      });

      let label = document.createElement("label");
      label.appendChild(document.createTextNode(task.content));
      if (task.completed) {
        li.style.textDecoration = "line-through";
      }

      let btn = document.createElement("button");
      btn.className = "taskDelete";
      btn.innerHTML = "x";

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(btn);
      ul.appendChild(li);
    });
  } else {
    console.error("Tasks is not an array:", tasks);
  }
};




const updateTaskDisplay = (li, task) => {
  if (task.completed) {
    li.style.textDecoration = "line-through"; // Apply line-through style if task is completed
  } else {
    li.style.textDecoration = "none"; // Remove line-through style if task is not completed
  }
};


const updateLocalStorage = (task) => {
  localStorage.setItem("Tasks", JSON.stringify(task));
};

const taskDeleteFn = (event) => {
  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  const li = event.target.closest("li");
  const taskId = parseInt(li.dataset.taskId);//converting cause by default its string.

  console.log("Task ID:", taskId); 

  const index = tasks.findIndex((task) => task.id === taskId);
  console.log("Index:", index);

  if (index !== -1) {
    tasks.splice(index, 1);
    // localStorage.setItem("Tasks", JSON.stringify(tasks));
    updateLocalStorage(tasks); // Update local storage after task deletion
    console.log("Task deleted successfully");
  } else {
    console.log("Task not found in tasks array:", taskId);
  }

  li.remove();
};

const TrashAll = () => {
  ul.innerHTML = "";
  localStorage.clear();
};

// const renderTaskList =() =>{
//     let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
//     ul.innerHTML =""
//     tasks.forEach(EachTask => {
//         let li = document.createElement("li");
//         li.innerText = EachTask;
//         let span = document.createElement("button");
//         span.className = "taskDelete" ;
//         span.innerHTML = "x"
//         li.appendChild(span)
//         ul.appendChild(li)
//     });
// }

AddTaskBtn.addEventListener("click", AddTask);
window.addEventListener("load", showTasks);
ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("taskDelete")) {
    // Call taskDeleteFn when a delete button is clicked
    taskDeleteFn(event);
  }
});
DeleteAll.addEventListener("click", TrashAll);
