document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormBtn = document.getElementById('clearForm');
    const clearListBtn = document.getElementById('clearList');
    const searchInput = document.getElementById('search');

    function loadUsers() {
        userList.innerHTML = '';
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];
        for (let i = 0; i < usernames.length; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${dates[i]} - ${usernames[i]} (${emails[i]}) <button class="delete">Excluir</button>`;
            userList.appendChild(li);
        }
    }

    function saveUser(user) {
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];
        usernames.push(user.name);
        emails.push(user.email);
        dates.push(user.date);
        localStorage.setItem('usernames', JSON.stringify(usernames));
        localStorage.setItem('emails', JSON.stringify(emails));
        localStorage.setItem('dates', JSON.stringify(dates));
        loadUsers();
    }

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }

    function clearList() {
        if (confirm("Você tem certeza que deseja excluir todos os itens?")) {
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
        saveUser({ name: username, email: email, date: date });
        clearForm();
    });

    clearFormBtn.addEventListener('click', clearForm);

    clearListBtn.addEventListener('click', clearList);

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            if (confirm("Você tem certeza que deseja excluir este item?")) {
                const emailToDelete = e.target.parentElement.textContent.match(/\(([^)]+)\)/)[1];
                const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
                const emails = JSON.parse(localStorage.getItem('emails')) || [];
                const dates = JSON.parse(localStorage.getItem('dates')) || [];
                const index = emails.indexOf(emailToDelete);
                if (index > -1) {
                    usernames.splice(index, 1);
                    emails.splice(index, 1);
                    dates.splice(index, 1);
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
        const usernames = JSON.parse(localStorage.getItem('usernames')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const dates = JSON.parse(localStorage.getItem('dates')) || [];
        userList.innerHTML = '';
        for (let i = 0; i < usernames.length; i++) {
            if (usernames[i].toLowerCase().includes(searchValue) || emails[i].toLowerCase().includes(searchValue)) {
                const li = document.createElement('li');
                li.innerHTML = `${dates[i]} - ${usernames[i]} (${emails[i]}) <button class="delete">Excluir</button>`;
                userList.appendChild(li);
            }
        }
    });

    loadUsers();
});
