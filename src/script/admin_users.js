document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormBtn = document.getElementById('clearForm');
    const clearListBtn = document.getElementById('clearList');
    const searchInput = document.getElementById('search');

    function loadUsers() {
        console.log('Loading users...');
        userList.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];
        for (let i = 0; i < users.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${dates[i]} - ${usernames[i]} (${emails[i]}) <button class="delete" data-id="${users[i].id}">Excluir</button>`;
            userList.appendChild(li);
        }
    }

    function saveUser(user) {
        console.log('Saving user:', user);
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];

        users.push(user);
        usernames.push(user.name);
        emails.push(user.email);
        dates.push(user.date);

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('usernames', JSON.stringify(usernames));
        localStorage.setItem('emails', JSON.stringify(emails));
        localStorage.setItem('dates', JSON.stringify(dates));
        loadUsers();
    }

    function clearForm() {
        console.log('Clearing form...');
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }

    function clearList() {
        console.log('Clearing list...');
        if (confirm("Você tem certeza que deseja excluir todos os itens?")) {
            localStorage.removeItem('users');
            localStorage.removeItem('usernames');
            localStorage.removeItem('emails');
            localStorage.removeItem('dates');
            loadUsers();
        }
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const date = new Date().toLocaleString();
        const id = Date.now().toString();  // Unique ID based on timestamp
        if (username && email) {
            saveUser({ id, name: username, email: email, date: date });
            clearForm();
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    clearFormBtn.addEventListener('click', clearForm);

    clearListBtn.addEventListener('click', clearList);

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            if (confirm("Você tem certeza que deseja excluir este item?")) {
                const idToDelete = e.target.getAttribute('data-id');
                console.log('Deleting user with id:', idToDelete);

                let users = JSON.parse(localStorage.getItem('users')) || [];
                let usernames = JSON.parse(localStorage.getItem('usernames')) || [];
                let emails = JSON.parse(localStorage.getItem('emails')) || [];
                let dates = JSON.parse(localStorage.getItem('dates')) || [];

                const index = users.findIndex(user => user.id === idToDelete);

                if (index > -1) {
                    users.splice(index, 1);
                    usernames.splice(index, 1);
                    emails.splice(index, 1);
                    dates.splice(index, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('usernames', JSON.stringify(usernames));
                    localStorage.setItem('emails', JSON.stringify(emails));
                    localStorage.setItem('dates', JSON.stringify(dates));
                    loadUsers();
                }
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];

        userList.innerHTML = '';
        for (let i = 0; i < users.length; i++) {
            if (usernames[i].toLowerCase().includes(searchValue) || emails[i].toLowerCase().includes(searchValue)) {
                const li = document.createElement('li');
                li.innerHTML = `${dates[i]} - ${usernames[i]} (${emails[i]}) <button class="delete" data-id="${users[i].id}">Excluir</button>`;
                userList.appendChild(li);
            }
        }
    });

    loadUsers();
});
