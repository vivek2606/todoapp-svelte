document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    let todos = [];

    // Function to render the todos
    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            if (todo.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('toggle-btn');
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => toggleTodo(index));

            const textSpan = document.createElement('span');
            textSpan.textContent = todo.text;
            textSpan.style.flex = '1';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => deleteTodo(index));

            li.appendChild(checkbox);
            li.appendChild(textSpan);
            li.appendChild(deleteBtn);

            list.appendChild(li);
        });
    }

    // Function to add a todo
    function addTodo(text) {
        todos.push({ text, completed: false });
        renderTodos();
    }

    // Function to toggle a todo
    function toggleTodo(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }

    // Function to delete a todo
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text !== '') {
            addTodo(text);
            input.value = '';
        }
    });

    // Expose functions for testing
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            addTodo,
            toggleTodo,
            deleteTodo,
            getTodos: () => todos,
            setTodos: (newTodos) => { todos = newTodos; }
        };
    }
});