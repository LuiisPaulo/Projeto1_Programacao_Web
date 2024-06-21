// Script para admin users

// variavel para criação de cadastro, array list
let register = [];

// Criação das constantes 
document.addEventListener('DOMContentLoaded', function (){
    const addEvent = document.getElementById('add_user');
    const clear = document.getElementById('clear_button');
    const clearAll = document.getElementById('clear_all_button');
    const delete_user = document.getElementById('delete_user');
    const delete_All = document.getElementById('delete_all');
    const search = document.getElementById('search');
});

 
 document.getElementById('button_submit');addEventListener('add_user', date);


 addUser.addEventListener("submit", function(event){
    
    event.preventDefault();
    // gera id
    const id = generateId();
    
    // gera data atual
    const curruntDate = getCurrentDate();

    // Variavel user infos
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    

    const createRegister = {
        id: id,
        name: name,
        email: email,
        date: curruntDate // data atual
    };

    createRegister.push(register);

    render();

    addUser.reset();
});

// função para "limpar" storage
function render(event){
    event.preventDefault();

    const registerCont = document.getElementById('register_Cont');

    registerCont.innerHTML = '';

    register.forEach(function(register){
        const createRegister = document.createElement('section');
        createRegister.classList.add('register-user');

        createRegister.innerHTML = `
        <strong>ID: <strong> ${register.id},
        <strong>Name: <strong> ${register.name},
        <strong>E-mail: <strong> ${register.email},
        <strong>Data: <strong> ${register.curruntDate},
        
        `;
        registerCont.appendChild(createRegister);
    });
}

// Função para gerar id aleatorio 
function generateId(){
    return Math.floor(Math.random() * 10000) + 1;
}

// função para pegar a data atual
function getCurrentDate(){
    const curruntDate = new Date();
    eventDate.preventDefault();

    // variavel
    var dateFormat = dateSubmit.toLocaleString();
    
    localStorage.setItem('dateSubmit', dateSubmit.toString());
     
   // return 
}

