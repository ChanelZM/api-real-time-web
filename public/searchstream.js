/* global io */
(function(){
    var socket = io();

    var tweetSection = document.querySelector('#tweets');

    tweetSection.addEventListener('click', postComment, false);

    function postComment(e){
        e.preventDefault();
        console.log(e.target);

        //Check if the target is not the same as the parent
        if(e.target !== e.currentTarget){
            //If the target is the dislike button
            if(e.target.className == 'dislike-button' || e.target.className == 'dislike-counter'){
                updateCounter(e.target);
            }
            //Else we can assume that the user wants to comment
            else {
                console.log('it\'s an input');
                //socket.emit('comment', )
            }
        }//Credits to https://www.kirupa.com/html5/handling_events_for_many_elements.htm
    }

    //Credits to https://jsfiddle.net/n7ukn6av/5/
    function updateCounter(button){
        var dislikeCounter = button.parentNode.querySelector('.dislike-counter');
        var newDislikeValue = Number(dislikeCounter.innerHTML);

        dislikeCounter.innerHTML = newDislikeValue++;
    }
})();
