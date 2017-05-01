/* global io */
(function(){
    var socket = io();

    var userForm = document.querySelector('.username-form');
    var usernameInput = document.querySelector('#username');

    userForm.addEventListener('submit', function() {
        socket.emit('user', usernameInput.value);
    });

})();
