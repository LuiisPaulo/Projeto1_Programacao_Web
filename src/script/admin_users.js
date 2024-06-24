document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');
    const clearFormBtn = document.getElementById('clearForm');
    const clearListBtn = document.getElementById('clearList');
    const searchInput = document.getElementById('search');

    function loadUsers() {
        userList.innerHTML = '';
        const names = JSON.parse(localStorage.getItem('names')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        names.forEach((name, index) => {
            const li = document.createElement('li');
            const email = emails[index];
            const userId = index + 1; // Adiciona 1 ao index para começar com ID 1
            li.innerHTML = `ID: ${userId} - ${name} (${email}) <button class="delete" data-id="${userId}">Excluir</button>`;
            userList.appendChild(li);
        });
    }

    function saveUser(name, email) {
        const names = JSON.parse(localStorage.getItem('names')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        names.push(name);
        emails.push(email);
        localStorage.setItem('names', JSON.stringify(names));
        localStorage.setItem('emails', JSON.stringify(emails));
        loadUsers();
    }

    function clearForm() {
        document.getElementById('username').value = '';
        document.getElementById('email').value = '';
    }

    function clearList() {
        if (confirm("Você tem certeza que deseja excluir todos os itens?")) {
            localStorage.removeItem('names');
            localStorage.removeItem('emails');
            loadUsers();
        }
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        saveUser(username, email);
        clearForm();
    });

    clearFormBtn.addEventListener('click', clearForm);

    clearListBtn.addEventListener('click', clearList);

    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const userId = parseInt(e.target.getAttribute('data-id'));
            if (confirm(`Você tem certeza que deseja excluir o usuário ID: ${userId}?`)) {
                const names = JSON.parse(localStorage.getItem('names')) || [];
                const emails = JSON.parse(localStorage.getItem('emails')) || [];
                const filteredNames = names.filter((name, index) => index + 1 !== userId);
                const filteredEmails = emails.filter((email, index) => index + 1 !== userId);
                localStorage.setItem('names', JSON.stringify(filteredNames));
                localStorage.setItem('emails', JSON.stringify(filteredEmails));
                loadUsers();
            }
        }
    });

    searchInput.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const names = JSON.parse(localStorage.getItem('names')) || [];
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const filteredNames = names.filter(name => name.toLowerCase().includes(searchValue));
        const filteredEmails = emails.filter((email, index) => names[index].toLowerCase().includes(searchValue));
        userList.innerHTML = '';
        filteredNames.forEach((name, index) => {
            const li = document.createElement('li');
            const email = filteredEmails[index];
            const userId = names.indexOf(name) + 1; // Obtém o ID do usuário a partir do índice do nome
            li.innerHTML = `ID: ${userId} - ${name} (${email}) <button class="delete" data-id="${userId}">Excluir</button>`;
            userList.appendChild(li);
        });
    });

    loadUsers();
});


