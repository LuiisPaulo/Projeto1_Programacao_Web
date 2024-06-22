document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormBtn = document.getElementById('clearForm');
    const clearListBtn = document.getElementById('clearList');
    const searchInput = document.getElementById('search');

    function loadUsers() {
        userList.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.date} - ${user.name} (${user.email}) <button class="delete">Excluir</button>`;
            userList.appendChild(li);
        });
    }

    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        loadUsers();
    }

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }

    function clearList() {
        localStorage.removeItem('users');
        loadUsers();
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();
        saveUser({ name: username, email: email, date: date });
        clearForm();
    });

    clearFormBtn.addEventListener('click', clearForm);

    clearListBtn.addEventListener('click', clearList);

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const newUserList = users.filter(user => user.email !== e.target.parentElement.textContent.match(/\(([^)]+)\)/)[1]);
            localStorage.setItem('users', JSON.stringify(newUserList));
            loadUsers();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        userList.innerHTML = '';
        users.filter(user => user.name.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)).forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.date} - ${user.name} (${user.email}) <button class="delete">Excluir</button>`;
            userList.appendChild(li);
        });
    });

    loadUsers();
});
