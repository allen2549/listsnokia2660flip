let items = []; // Array para armazenar os itens

function addItem() {
    const itemTitle = document.getElementById('item').value;
    const itemValue = document.getElementById('value').value;
    const todoList = document.getElementById('todoList');
    
    if (itemTitle === "") {
        alert("Digite o título do item antes de adicionar.");
        return;
    }

    const newItem = {
        title: itemTitle,
        value: itemValue
    };

    items.push(newItem);

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${newItem.title} - ${newItem.value}</span>
        <button onclick="toggleComplete(this)">✅</button>
    `;

    todoList.appendChild(listItem);
    document.getElementById('item').value = "";
    document.getElementById('value').value = "";
}

function toggleComplete(button) {
    const listItem = button.parentNode;
    listItem.classList.toggle('completed');
}

function removeItem() {
    const todoList = document.getElementById('todoList');
    const completedItems = document.querySelectorAll('.completed');

    completedItems.forEach(item => {
        const index = Array.from(todoList.children).indexOf(item);
        items.splice(index, 1);
        todoList.removeChild(item);
    });
}