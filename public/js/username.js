/* global io */
(function(){
    'use strict'
    var socket = io();

    //Select inputs
    var userForm = document.querySelector('.username-form');
    var usernameInput = document.querySelector('#username');

    //On submit send username to server.
    userForm.addEventListener('submit', function() {
        socket.emit('user', usernameInput.value);
    });

})();
