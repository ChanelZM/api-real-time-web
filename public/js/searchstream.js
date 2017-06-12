/* global io */
(function(){
    'use strict'

    var socket = io();

    //When page loads, comment history is sent from the server to browser (new connection)
    socket.on('comment-history', function(comments){
        //Clear all comment sections
        for(var i=0; i < comments.length; i++){
            var commentSection = document.querySelector('.comments #' + comments[i].commentTweetId);
            if(commentSection != undefined){
                commentSection.innerHTML='';
            }
        }

        //Add the comments to the HTML
        for(var i=0; i < comments.length; i++){
            comment.render(comments[i]);
        }
    });

    //When page loads, dislike histoy is sent from the server to browser (new connection)
    socket.on('dislike-history', function(dislikes){
        for(var i=0; i < dislikes.length; i++){
            dislike.renders(dislikes[i]);
        }
    })

    //If the user clicks somewhere in #tweets
    document.querySelector('#tweets').addEventListener('click', checkIfDislikeOrPost, false);

    //Check if the target was a dislike button or a submit button for commenting
    function checkIfDislikeOrPost(e){
        e.preventDefault();

        //Check if the target is not the same as the parent
        if(e.target !== e.currentTarget){
            //If the target is the dislike button
            if(e.target.className.includes('dislike-button') == true || e.target.className == 'dislike-counter'){
                dislike.update(e.target);
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
            var textArea = myComment.parentNode.querySelector('.comment-area');
            var textAreaValue = myComment.parentNode.querySelector('.comment-area').value;
            var commentTweetID = myComment.parentNode.parentNode.querySelector('ul').getAttribute('id');
            var commentList = myComment.parentNode.parentNode.querySelector('ul');

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
            var targetTweet = document.getElementById(item.commentTweetId),
                newLi = document.createElement('li'),
                newHead = document.createElement('h6'),
                newPar = document.createElement('p'),
                usernameEl = document.createTextNode(item.username),
                newComment = document.createTextNode(item.comment);

            //Append text to elements
            newHead.appendChild(usernameEl);
            newPar.appendChild(newComment);

            newLi.appendChild(newHead);
            newLi.appendChild(newPar);

            //Append element to parent
            if(targetTweet != undefined){
                targetTweet.appendChild(newLi);
            }
        }
    };

    var dislike = {
        //Credits to https://jsfiddle.net/n7ukn6av/5/
        //Update number in dislikebutton
        update: function(el){
            var dislikeButton = el.parentNode.querySelector('.dislike-button'),
                dislikeCounter = el.parentNode.querySelector('.dislike-counter'),
                dislikeTweetID = dislikeCounter.getAttribute('id'),
                numberCounter = Number(dislikeCounter.innerHTML);

        //Check if user already disliked, if not at dislike
            if(dislikeButton.getAttribute('class') == 'dislike-button'){
                dislikeButton.classList.add('liked');
                numberCounter++;
                dislike.emits(dislikeTweetID, numberCounter);
            } else {
                dislikeButton.classList.remove('liked');
                numberCounter--;
                dislike.emits(dislikeTweetID, numberCounter);
            }
        },
        //Emit the amount of dislikes so that others can see it.
        emits: function(tweetId, dislikes){
            socket.emit('dislike', {
                dislikeTweetId: tweetId,
                dislikes: dislikes
            });
        },
        //Add the amount of dislikes to the page
        renders: function(disl){
            if(document.getElementById(disl.dislikeTweetId) != undefined){
                document.getElementById(disl.dislikeTweetId).innerHTML = disl.dislikes;
            }
        }
    }

    //When the server sends a dislike, increment the number of likes
    socket.on('dislike', function(dis){
        dislike.renders(dis);
    });

    //When the server sends a comment, execute renderComments
    socket.on('comment', function(comm){
        var commentList = document.querySelector('#' + comm.commentTweetId);
        if(commentList.contains(document.querySelector('#' + comm.commentTweetId + ' .nocomment')) == true){
            commentList.removeChild(document.querySelector('#' + comm.commentTweetId + ' .nocomment'));
        }
        comment.render(comm);
    });

})();
