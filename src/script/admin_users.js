var users = [];
function generateID(){
    return Math.floor(Math.radom + 1);
}

function generateDate(){
    let date = new Date();
    let day = String(date.getDate()).padStar(2, '0');
    let month = String(date.getMonth() + 1).padStar(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function addUsers(name, email){
    let newUser = {
        id: generateID(),
        name: name,
        email: email,
        date: generateDate()
    };

    listUser.push(newUser);
    localStorage.setItem('listUser', JSON.stringify(listUser));
    renderUsers();
    clearForm();
}

function deleteUser(idUser){
    var updateUsers = listUser.filter(function(user){
        return user.id !== idUser;
    });

    if(updateUsers.length < listUser.length){
        listUser = updateUsers;
        localStorage.setItem('listUser', JSON.stringify(listUser));
        renderUsers();
    }else{
        alert ('Usuario não encontrado');
    }
}

function getUser(){
    var get_user = JSON.parse(localStorage.getItem('listUser'));
    listUser = get_user || [];
}

function renderUsers(){
    let userListElement = document.getElementById('listUser');
    userListElement.innerHTML = '';

    listUser.forEach(function(user){
        let listElements = document.createElement('li');
        listElements.innerHTML = '<span class="user-name">' + user.name + '</span> (Email: ' + user.email + ') <button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
        listElements.appendChild(listElements);
    });
}

getUser();
renderUsers();

document.getElementById('addUser').addEventListener('submit', function(event){
    event.preventDefault();
    let inputName = document.getElementById('inputName');
    let inputEmail = document.getElementById('inputEmail');
    addUsers(inputName.value, inputEmail.value);;
    inputName.value = '';
    inputEmail.value = '';
});

function clearForm(){
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail').value = '';
}



