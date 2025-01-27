const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Disable Add button if input is empty
addButton.disabled = todoInput.value.trim() === '';

addButton.addEventListener('click', () => {
  const taskText = todoInput.value.trim();
  if (taskText !== '') {
    createTask(taskText);
    todoInput.value = '';
    addButton.disabled = true; // Disable the button after adding a task
    todoInput.focus(); // Focus on the input after adding task
  }
});

// Enable/Disable Add button based on input value
todoInput.addEventListener('input', () => {
  addButton.disabled = todoInput.value.trim() === '';
});

// Handle Enter key for adding tasks
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();  // Prevent form submission
    if (!addButton.disabled) {
      addButton.click();
    }
  }
});

function createTask(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <div>
      <button class="edit" aria-label="Edit task">Edit</button>
      <button class="delete" aria-label="Delete task">Delete</button>
    </div>
  `;

  // Add event listener for delete button
  const deleteButton = li.querySelector('.delete');
  deleteButton.addEventListener('click', () => {
    todoList.removeChild(li);
  });

  // Add event listener for edit button
  const editButton = li.querySelector('.edit');
  editButton.addEventListener('click', () => {
    const taskSpan = li.querySelector('.task-text');
    const newText = prompt('Edit your task:', taskSpan.textContent);
    if (newText !== null && newText.trim() !== '') {
      taskSpan.textContent = newText.trim();
    }
  });

  // Add event listener for toggling completion
  li.querySelector('.task-text').addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  todoList.appendChild(li);
}
