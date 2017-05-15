/* global io */
(function(){
    'use strict'
    
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
            dislikeTweetId: dislikeTweetID,
            dislikes: numberCounter
        });
    }

    function placeComment(comment){

        var textArea = comment.parentNode.querySelector('.comment-area');
        var textAreaValue = comment.parentNode.querySelector('.comment-area').value;
        var commentTweetID = comment.parentNode.parentNode.querySelector('ul').getAttribute('id');

        //Send the comment with the tweetID to the server
        socket.emit('comment', {
            commentTweetId: commentTweetID,
            comment: textAreaValue,
            username: commentUsername
        });
        textArea.value = '';
    }

    socket.on('comment-history', function(comments){
        var allCommentSections = document.querySelectorAll('.comments ul');
        allCommentSections.forEach(function(section){
            section.innerHTML='';
        });

        for(var i=0; i < comments.length; i++){
            addComments(comments[i]);
        }
    });

    socket.on('dislike', function(dislike){
        var targetTweet = document.getElementById(dislike.dislikeTweetId);
        targetTweet.innerHTML = dislike.dislikes;
    });

    //Add the comment to the right tweet
    socket.on('comment', function(comm){
        addComments(comm);
    });

    function addComments(item){
        var targetTweet = document.getElementById(item.commentTweetId);
        var newLi = document.createElement('li');
        var newHead = document.createElement('h6');
        var newPar = document.createElement('p');
        var usernameEl = document.createTextNode(item.username);
        var newComment = document.createTextNode(item.comment);

        //Append everything
        newHead.appendChild(usernameEl);
        newPar.appendChild(newComment);

        newLi.appendChild(newHead);
        newLi.appendChild(newPar);

        targetTweet.appendChild(newLi);
    }
})();
