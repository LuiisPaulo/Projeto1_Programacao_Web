document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormBtn = document.getElementById('clearForm');
    const clearListBtn = document.getElementById('clearList');
    const searchInput = document.getElementById('search');

    function loadUsers() {
        userList.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach((user, index) => {
            const li = document.createElement('li');
            const userId = index + 1; // Adiciona 1 ao index para começar com ID 1
            li.innerHTML = `ID: ${userId} - ${user.date} - ${user.name} (${user.email}) <button class="delete" data-id="${userId}">Excluir</button>`;
            userList.appendChild(li);
        });
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userId = users.length + 1; // Gera o próximo ID numerando de 1 em 1
        user.id = userId;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }

    function clearList() {
        if (confirm("Você tem certeza que deseja excluir todos os itens?")) {
            localStorage.removeItem('users');
            loadUsers();
        }
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();
        const user = { name: username, email: email, date: date };
        saveUser(user);
        clearForm();
    });

    clearFormBtn.addEventListener('click', clearForm);

    clearListBtn.addEventListener('click', clearList);

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const userId = parseInt(e.target.getAttribute('data-id'));
            if (confirm(`Você tem certeza que deseja excluir o usuário ID: ${userId}?`)) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const filteredUsers = users.filter(user => user.id !== userId);
                localStorage.setItem('users', JSON.stringify(filteredUsers));
                loadUsers();
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue));
        userList.innerHTML = '';
        filteredUsers.forEach((user, index) => {
            const li = document.createElement('li');
            const userId = index + 1; // Adiciona 1 ao index para começar com ID 1
            li.innerHTML = `ID: ${userId} - ${user.date} - ${user.name} (${user.email}) <button class="delete" data-id="${userId}">Excluir</button>`;
            userList.appendChild(li);
        });
    });

    loadUsers();
});

