interface Todo{
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const todoInput = document.getElementById("todoInput")! as HTMLInputElement;
const todoForm = document.querySelector("form")! as HTMLFormElement;
const todoList = document.querySelector("ul")!;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

// btn.addEventListener("click", function() {
//   alert('button clicked');
//   console.log(todoInput.value);
// });

function readTodos(): Todo[] {
  const todosJSON = localStorage.getItem("todos");
  if (todosJSON == null) return [];
  return JSON.parse(todosJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleSubmit(e: SubmitEvent) {
  e.preventDefault();
  const newTodo: Todo = {
    text: todoInput.value,
    completed: false
  };
  todos.push(newTodo);
  createTodo(newTodo);
  saveTodos();
  todoInput.value = "";
}

function createTodo(todo: Todo) {
  const newLi = document.createElement("li");
  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.checked = todo.completed;
  checkBox.addEventListener("change", function(){
    todo.completed = checkBox.checked;
    saveTodos();
  });
  newLi.append(todo.text);
  newLi.append(checkBox);
  todoList.append(newLi);
}

todoForm.addEventListener("submit", handleSubmit);