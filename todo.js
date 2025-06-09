
  let todos = [];

  function showMessage(text, color = "#4caf50") {
  const msg = document.getElementById("messageBox");
  msg.textContent = text;
  msg.style.color = color; 
  msg.classList.add("show");

  setTimeout(() => {
    msg.classList.remove("show");
    msg.style.color = ""; 
  }, 2000);
}

  function updateCount() {
    document.getElementById("total-count").textContent = `Total Todos: ${todos.length}`;
  }

  function saveToLocal() {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }

  function loadFromLocal() {
    const data = localStorage.getItem("myTodos");
    if (data) {
      todos = JSON.parse(data);
    }
  }

  function renderTodos() {
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      if (todo.completed) li.classList.add("completed");

      const content = document.createElement(todo.editing ? "input" : "span");
      content.className = todo.editing ? "edit-input" : "";
      content.value = todo.text;
      content.textContent = todo.text;

      if (todo.editing) {
        content.focus();
        content.addEventListener("keyup", (e) => {
          if (e.key === "Enter") saveEdit(index, content.value);
        });
      }

      const btns = document.createElement("div");
      btns.className = "buttons";

      const completeBtn = document.createElement("button");
      completeBtn.textContent = todo.completed ? "Undo" : "Complete";
      completeBtn.className = "btn-complete";
      completeBtn.onclick = () => {
  toggleComplete(index);
  const isNowCompleted = todos[index].completed;
  if (isNowCompleted) {
    showMessage("✅ Todo marked as complete", "#4caf50"); // Green
  } else {
    showMessage("↩️ Todo marked as incomplete", "#ff9800"); // Orange
  }
};


      const editBtn = document.createElement("button");
      editBtn.textContent = todo.editing ? "Save" : "Edit";
      editBtn.className = "btn-edit";
      editBtn.onclick = () => {
        if (todo.editing) {
          saveEdit(index, content.value);
          showMessage("Todo updated ✏️", "#ffc107");
        } else {
          startEdit(index);
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "btn-delete";
      deleteBtn.onclick = () => {
        deleteTodo(index);
        showMessage("Todo deleted ❌", "#f44336");
      };

      btns.appendChild(completeBtn);
      btns.appendChild(editBtn);
      btns.appendChild(deleteBtn);

      li.appendChild(content);
      li.appendChild(btns);
      list.appendChild(li);
    });

    updateCount();
    saveToLocal(); 
  }

  function addTodo() {
    const input = document.getElementById("todoText");
    const text = input.value.trim();
    if (text === "") return;
    todos.push({ text, completed: false, editing: false });
    input.value = "";
    showMessage("Todo added ✅");
    renderTodos();
  }

  function toggleComplete(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
  }

  function startEdit(index) {
    todos[index].editing = true;
    renderTodos();
  }

  function saveEdit(index, newText) {
    if (newText.trim() !== "") {
      todos[index].text = newText.trim();
    }
    todos[index].editing = false;
    renderTodos();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
  }

  // Load and render on page load
  window.onload = function () {
    loadFromLocal();
    renderTodos();
  };
