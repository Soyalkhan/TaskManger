let inputBox = document.querySelector(".inputBox");
let AddTaskBtn = document.querySelector(".addTaskBTN");
let DeleteAll = document.querySelector(".dltall");
var ul = document.querySelector(".list");
let taskDeleteBtn = document.querySelector(".taskDelete");
let dataList = [];

const AddTask = () => {
    if(inputBox.value === ""){
        alert("enter some task!");
    }else{
        let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
        console.log(tasks);
        tasks.push(inputBox.value)
        localStorage.setItem("Tasks",JSON.stringify(tasks));
        inputBox.value = ""
        renderTaskList();
    }

};

const showTasks = () => {};

const taskDelete = () => {};

const TrashAll = () => {
    ul.innerHTML ="";
  localStorage.clear();
};

const renderTaskList =() =>{
    let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    ul.innerHTML =""
    tasks.forEach(EachTask => {
        let li = document.createElement("li");
        li.innerText = EachTask;
        let span = document.createElement("button");
        span.className = "taskDelete" ;
        span.innerHTML = "x"
        li.appendChild(span)
        ul.appendChild(li)
    });
}

AddTaskBtn.addEventListener("click", AddTask);
window.addEventListener("load", showTasks);

DeleteAll.addEventListener("click", TrashAll);
