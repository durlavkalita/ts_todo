"use strict";
const btn = document.getElementById("btn");
const todoInput = document.getElementById("todoInput");
const todoForm = document.querySelector("form");
const todoList = document.querySelector("ul");
const todos = readTodos();
todos.forEach(createTodo);
// btn.addEventListener("click", function() {
//   alert('button clicked');
//   console.log(todoInput.value);
// });
function readTodos() {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON == null)
        return [];
    return JSON.parse(todosJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
        text: todoInput.value,
        completed: false
    };
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodos();
    todoInput.value = "";
}
function createTodo(todo) {
    const newLi = document.createElement("li");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = todo.completed;
    checkBox.addEventListener("change", function () {
        todo.completed = checkBox.checked;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkBox);
    todoList.append(newLi);
}
todoForm.addEventListener("submit", handleSubmit);
