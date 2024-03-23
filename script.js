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
      content: inputBox.value
    };
    tasks.push(task);
    id++;
    localStorage.setItem("Tasks", JSON.stringify(tasks));
    inputBox.value = "";
    showTasks();
  }
};

const showTasks = () => {
  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  ul.innerHTML = "";
  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = task.content; // to show data
    li.dataset.taskId = task.id; // Set the task ID as a data attribute
    let btn = document.createElement("button");
    let checkbox = document.createElement("input");
    checkbox.type ="checkbox"
    checkbox.className = "isCompleted";
    
    btn.className = "taskDelete";
    btn.innerHTML = "x";
    
    li.appendChild(btn);
    ul.appendChild(checkbox);
    ul.appendChild(li);
  });
};

const taskDeleteFn = (event) => {
  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  const li = event.target.closest("li");
  const taskId = parseInt(li.dataset.taskId);//converting cause by default its string.

  console.log("Task ID:", taskId); // Debugging

  const index = tasks.findIndex((task) => task.id === taskId);
  console.log("Index:", index); // Debugging

  if (index !== -1) {
    tasks.splice(index, 1);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
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
