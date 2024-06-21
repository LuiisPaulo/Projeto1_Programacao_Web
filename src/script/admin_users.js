// Script para admin users

// Criação das constantes 
document.addEventListener('DOMContentLoaded', function (){
    const addEvent = document.getElementById('add_user');
    const clear = document.getElementById('clear_button');
    const clearAll = document.getElementById('clear_all_button');
    const delete_user = document.getElementById('delete_user');
    const delete_All = document.getElementById('delete_all');
    const search = document.getElementById('search');
});


function date(eventDate){

    eventDate.preventDefault();

    // variavel
    var dateSubmit = new Date();
    var dateFormat = dateSubmit.toLocaleString();
    
    localStorage.setItem('dateSubmit', dateSubmit.toString());
 }
 
 document.getElementById('button_submit');addEventListener('add_user', date);


 addUser.addEventListener("submit", function(){
    // Variavel user infos
    let user = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    

});


