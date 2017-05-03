/* global io */
(function(){
    //var commentList;

    var socket = io();

    var tweetSection = document.querySelector('#tweets');

    tweetSection.addEventListener('click', dislikeOrPost, false);

    function dislikeOrPost(e){
        e.preventDefault();
        console.log(e.target);

        //Check if the target is not the same as the parent
        if(e.target !== e.currentTarget){
            //If the target is the dislike button
            if(e.target.className == 'dislike-button' || e.target.className == 'dislike-counter'){
                updateCounter(e.target);
            }
            //Else we can assume that the user wants to comment
            else if(e.target.getAttribute('type') == 'submit') {
                console.log('submit button');
                placeComment(e.target);
            } else {
                console.log('something else');
            }
        }//Credits to https://www.kirupa.com/html5/handling_events_for_many_elements.htm
    }

    //Credits to https://jsfiddle.net/n7ukn6av/5/
    function updateCounter(button){
        var dislikeCounter = button.parentNode.querySelector('.dislike-counter');
        var numberCounter = Number(dislikeCounter.innerHTML);
        numberCounter++;

        dislikeCounter.innerHTML = numberCounter;
    }

    function placeComment(comment){
        console.log('Someone is trying to submit!');

        var textArea = comment.parentNode.querySelector('.comment-area');
        var textAreaValue = comment.parentNode.querySelector('.comment-area').value;
        var tweetID = comment.parentNode.parentNode.querySelector('ul').getAttribute('id');

        console.log(tweetID);
        socket.emit('comment', {
            tweetid: tweetID,
            comment: textAreaValue
        });

        textArea.value = '';
    }

    socket.on('comment', function(comm){
        var targetTweet = document.getElementById(comm.tweetid);
        var newElement = document.createElement('li');
        var newComment = document.createTextNode(comm.comment);
        newElement.appendChild(newComment);
        console.log(targetTweet);
        targetTweet.appendChild(newElement);
    });
})();
