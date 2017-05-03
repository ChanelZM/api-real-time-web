/* global io */
(function(){
    var socket = io();
    var buttonClickCounter = 0;

    var tweetSection = document.querySelector('#tweets');

    tweetSection.addEventListener('click', dislikeOrPost, false);

    function dislikeOrPost(e){
        e.preventDefault();

        //Check if the target is not the same as the parent
        if(e.target !== e.currentTarget){
            //If the target is the dislike button
            if(e.target.className == 'dislike-button' || e.target.className == 'dislike-counter'){
                buttonClickCounter == 0 ? buttonClickCounter++ : buttonClickCounter--;
                updateCounter(e.target);
            }
            //Else we can assume that the user wants to comment
            else if(e.target.getAttribute('type') == 'submit') {
                placeComment(e.target);
            }
        }//Credits to https://www.kirupa.com/html5/handling_events_for_many_elements.htm
    }

    //Credits to https://jsfiddle.net/n7ukn6av/5/
    function updateCounter(button){
        var dislikeCounter = button.parentNode.querySelector('.dislike-counter');
        var dislikeTweetID = dislikeCounter.getAttribute('id');
        var numberCounter = Number(dislikeCounter.innerHTML);

        buttonClickCounter == 0 ? numberCounter-- : numberCounter++;

        socket.emit('dislike', {
            disliketweetid: dislikeTweetID,
            dislikes: numberCounter
        });

        //dislikeCounter.innerHTML = numberCounter;
    }

    function placeComment(comment){

        var textArea = comment.parentNode.querySelector('.comment-area');
        var textAreaValue = comment.parentNode.querySelector('.comment-area').value;
        var commentTweetID = comment.parentNode.parentNode.querySelector('ul').getAttribute('id');

        //Send the comment with the tweetID to the server
        socket.emit('comment', {
            commenttweetid: commentTweetID,
            comment: textAreaValue
        });

        textArea.value = '';
    }

    socket.on('dislike', function(dislike){
        var targetTweet = document.getElementById(dislike.disliketweetid);
        targetTweet.innerHTML = dislike.dislikes;
    });

    //Add the comment to the right tweet
    socket.on('comment', function(comm){
        var targetTweet = document.getElementById(comm.commenttweetid);
        var newElement = document.createElement('li');
        var newComment = document.createTextNode(comm.comment);
        newElement.appendChild(newComment);

        targetTweet.appendChild(newElement);
    });
})();
