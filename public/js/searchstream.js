/* global io */
(function(){
    'use strict'

    var socket = io();
    var buttonClickCounter = 0;

    //When page loads, comment history is sent from the server to browser
    socket.on('comment-history', function(comments){
        //Clear all comment sections
        var allCommentSections = document.querySelectorAll('.comments ul');
        allCommentSections.forEach(function(section){
            section.innerHTML='';
        });

        //Add the comments to the HTML
        for(var i=0; i < comments.length; i++){
            comment.render(comments[i]);
        }
    });

    //If the user clicks somewhere in #tweets
    document.querySelector('#tweets').addEventListener('click', checkIfDislikeOrPost, false);

    //Check if the target was a dislike button or a submit button for commenting
    function checkIfDislikeOrPost(e){
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
                comment.emits(e.target);
            }
        }//Credits to https://www.kirupa.com/html5/handling_events_for_many_elements.htm
    }

    var comment = {
        //Get the input of the user and send it to the server
        emits: function(myComment){
            var textArea = comment.parentNode.querySelector('.comment-area');
            var textAreaValue = comment.parentNode.querySelector('.comment-area').value;
            var commentTweetID = comment.parentNode.parentNode.querySelector('ul').getAttribute('id');

            //Send the comment with the tweetID to the server
            socket.emit('comment', {
                commentTweetId: commentTweetID,
                comment: textAreaValue,
                username: commentUsername
            });
            //Clear inputfield again
            textArea.value = '';
        },
        //add the comment(s) to the right tweet
        render: function(item){
            //Create elements for the username and comment
            var targetTweet = document.getElementById(item.commentTweetId);
            var newLi = document.createElement('li');
            var newHead = document.createElement('h6');
            var newPar = document.createElement('p');
            var usernameEl = document.createTextNode(item.username);
            var newComment = document.createTextNode(item.comment);

            //Append text to elements
            newHead.appendChild(usernameEl);
            newPar.appendChild(newComment);

            newLi.appendChild(newHead);
            newLi.appendChild(newPar);

            //Append element to parent
            targetTweet.appendChild(newLi);
        }
    }

    //Credits to https://jsfiddle.net/n7ukn6av/5/
    //Update number in dislikebutton
    function updateCounter(button){
        var dislikeCounter = button.parentNode.querySelector('.dislike-counter');
        var dislikeTweetID = dislikeCounter.getAttribute('id');
        var numberCounter = Number(dislikeCounter.innerHTML);

        buttonClickCounter == 0 ? numberCounter-- : numberCounter++;

        //Emit the amount of dislikes so that others can see it.
        socket.emit('dislike', {
            dislikeTweetId: dislikeTweetID,
            dislikes: numberCounter
        });
    }

    //When the server sends a dislike, increment the number of likes
    socket.on('dislike', function(dislike){
        var targetTweet = document.getElementById(dislike.dislikeTweetId);
        targetTweet.innerHTML = dislike.dislikes;
    });

    //When the server sends a comment, execute renderComments
    socket.on('comment', function(comm){
        comment.render(comm);
    });

})();
