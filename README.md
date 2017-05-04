# Judgemental Terra
## Table of Contents
- [1: Introduction](#1-introduction)
- [2: Demo](#2-demo)
- [3: To-Do](#3-to-do)
- [4: Features](#4-Features)
- [5: Installation](#5-installation)
    - [5.1: Packages](#5.1-packages)
    - [5.2: Additional info on Mongoose](#5.2-additional-info-on-mongoose)
- [6: Get Started](#6-get-started)
    - [6.1: How to clone](#6.1-how-to-clone)
        - [6.1.1: Install](#6.1.1-install)
        - [6.1.2: Twitter](#6.1.2-twitter)
        - [6.1.3: Mongoose & MongoDB](#6.1.3-mongoose-&-mongoDB)
        - [6.1.4: Run application](#6.1.4-run-application)
    - [6.2: How to build](#6.2-how-to-build)
        - [6.2.1: Setup app.js](#6.2.1-setup-app.js)
        - [6.2.2: User login](#6.2.2-user-login)
        - [6.2.3: Twitter](#6.2.3-twitter)
        - [6.2.4: Socket.io](#6.2.4-socket.io)
            - [6.2.4.1 Comments](#6.2.4.1-comments)
            - [6.2.4.2 dislikes](#6.2.4.2-dislikes)
        - [6.2.5: Mongoose](#6.2.5-mongoose)
        - [6.2.6: Run application](#6.2.6-run-application)
- [7: Wishlist](#7-wishlist)
- [8: Bugs that need fixing](#8-bugs-that-need-fixing)
- [9: References](#9-references)
- [License](#license)

## 1 Introduction
Judgemental Terra is a real time webapplication where you can hate on Donald Trumps tweets. It contains the twitter stream of Trump and on each individual twitter can be commented hateful things. Or if you don't feel like saying something but you do want to share your disappointment you can just simply dislike the tweet.

**Get to hate on Donald Trump with likeminded people :rage: and let your mind flow with negativity. :stuck_out_tongue_closed_eyes:**

## 2 Demo
A live demo can be found on Heroku:
[Judgemental Terra](https://api-real-time-web.herokuapp.com/)

## 3 To Do
I've divided what I need to do into two sections: 'To Do' will cover the must haves and 'Wishlist' will cover features that are wanted but not needed.

- [x] User can dislike.
- [x] User can only dislike once.
- [x] Other users can see the amount of dislikes.
- [x] Comments will be added to the HTML.
- [x] Comments will be added to socket.io.
- [x] Comments can seen added to the HTML by another person.
- [ ] Check if username already exists.
- [x] Handles source offline.
- [x] Attach username to comment.
- [ ] Create style.css.
- [x] Write a good read me.
- [ ] Refactor code.

## 4 Features
- Comment hateful things on Donald Trumps tweets with own username. :speech_balloon:
- Dislike Donald Trumps tweets. :thumbsdown:
- Real time visible when somebody dislikes or comments.
- Connection with MongoDB to save comments.
- **When a user logs in, previous comments will be loaded on the right spot (!!! so proud of myself!!).**

## 5 Installation
### 5.1 Packages
Explanation about the packages I used:
[Express](https://www.npmjs.com/package/express),
[Socket.io](https://www.npmjs.com/package/socket.io),
[Path](https://nodejs.org/api/path.html),
[Twitter](https://www.npmjs.com/package/twitter),
[Body-parser](https://www.npmjs.com/package/body-parser),
[Multer](https://www.npmjs.com/package/multer)
[Mongoose](https://www.npmjs.com/package/mongoose)

### 5.2 Additional info on Mongoose
To easily read and write a database I created on MongoDB, I used a node-module called Mongoose. With Mongoose I add comments to the database.

## 6 Get started
### 6.1 How to clone
#### 6.1.1 Install
- Clone my repo: https://github.com/ChanelZM/api-real-time-web.git
- Open terminal and type:

```
$ npm install
```

#### 6.1.2 Twitter
- Create an account on Twitter.
- Go to [dev twitter](https://dev.twitter.com/) and create an app. After submitting the form you get a consumer key and a consumer secret.
- Create access token and access token secret for yourself on the same page.
- Create a .env file in the root of the folder and place the consumer key, consumer secret, access token key and access token secret like so:

```
CONSUMER_KEY = 'your consumer key'
CONSUMER_SECRET = 'your consumer secret'
ACCESS_TOKEN_KEY = 'your access token key'
ACCESS_TOKEN_SECRET = 'your access token secret'
```

#### 6.1.3 Mongoose & MongoDB
- Create an account on [Mlab](https://mlab.com/).
- Create a database and user.
- Add the username and password of the user to the .env file:

```
MONGO_USERNAME = 'youruser'
MONGO_PASSWORD = 'youruserspassword'
```

#### 6.1.4 Run application
- Run application by typing this in your terminal:

```
$ npm start
```
- The website is viewable on localhost:4000;

### 6.2 How to build
#### 6.2.1 Setup app.js
Setup app.js as usual, install all packages, require all packages and create directories and content as usual.

- Additionally install nodemon and add this to your package.json scripts object:

```
"start": "node app.js"
```

#### 6.2.2 User login
Now we're going to create a simple user 'login'.

- On the homepage create an input field and a submit button. The user can input their wanted username. In the javascript server sided file create a function that handles the post and retrieving the username.

```javascript
router.post('/', upload.single(), function(req, res){
    var username = req.body.username;
});
```
- In advance, create a page which will be rendered when the user is logged in, containing the stream of tweets.

#### 6.2.3 Twitter
Next thing to do is to get a connection with the twitter api.

- Create an account and app as explained in section 6.1.2.
- If you want to upload the code to Github, create a .gitignore and place node-modules and .env into the file.
- To get access to the twitter REST API create a new instance of the Twitter object:

```javascript
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
```
- And to get a connection with Twitter API outside of app.js and inside a router, add this to app.js.

```javascript
app.set('client', client);
```
- Now it's time to retrieve tweets from Mr. Donald J Trump. In the same file and function where we retrieve the users username, we're going to retrieve tweets. And for that we need the client variable which we previously saved:

```javascript
var client = req.app.get('client');
```
- Retrieve tweets with client. If there is an error, tell us the error. If the request is a success render the page with Trumps tweets:

```javascript
client.get('statuses/user_timeline', {screen_name: 'realDonaldTrump'}, function(error, tweets, response){
    if(error){
        throw error
    } else {
        res.render('content/{yourstreampage}', {
            username : username,
            tweets : tweets
        });
    }
});
```
- On the streaming page create a loop that loops through the retrieved tweets and fills in elements.
- Congratulations! You can now view tweets of Trump on your own page!.

#### 6.2.4 Socket.io
After retrieving the tweets, we want to add comments and dislikes.

##### 6.2.4.1 Comments
- If you didn't do it already, create an input field and submit button and add them to the loop.
- On the client-side we need to add an event to to the input fields. It's a lot of work to add events for every input field plus it's not very DRY so we are going to add a addEventListener to the parent and use target to find out which submit button was triggered. [Kirupa](https://www.kirupa.com/html5/handling_events_for_many_elements.htm) has a great post on how to that.
- Add the tweet-id to the tweet in the html so that when we emit with socket and get a message back, we can use the ID to place the right comment under the right tweet and add it to the HTML. After that clear the input field:

```javascript
socket.emit('comment', {
    commentTweetId: commentTweetID,
    comment: textAreaValue,
    username: commentUsername
});
textArea.value = '';
```
- On the server-side we need to handle the comment. This basically sends the comment to every person connected accept the sender, because we already added the comment to the HTML:

```javascript
socket.broadcast.on('comment', function(comm){
    io.emit('comment', comm);
});
```
- On the client-side receivers of the comment need to add it to the html too. Create a function that will add the data to the HTML. Select the right parent by using the unique id which is included in the data.

```javascript
socket.on('comment', function(comm){
    addComments(comm);
});
```

##### 6.2.4.2 dislikes
~

Congrats! All users connected can now real time view the comments that are added.

#### 6.2.5 Mongoose
Just like Facebook, we don't want to loose our comments after refreshing or server reset. In order to do that we are going to use a database.

- Create an account for free on [Mlab](https://mlab.com/). Choose 'Sandbox' for the creation of your database. Give it a name and create a user that can have access to the database.
- Add the username and password to the .env file as explained in 6.1.3.
- To access the database on the server side, open a connection in app.js and test if it's working by adding a `console.log()`. Message should be viewable in the terminal:

```javascript
var URI = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds129651.mlab.com:29651/{yourdatabasename}';

mongoose.connect(URI, function(err){
    if (err){
        console.log('No connection');
    } else {
        console.log('You\'re connected');
    }
});
```
- If the connection works, it's time to add a Schema. In the schema we are going to define the datatypes:

```javascript
var commentsSchema = mongoose.Schema({
    commentTweetId: String,
    username: String,
    comment: String,
    created: {type: Date, default: Date.now}
});

var Post = mongoose.model('Comment', commentsSchema);
```
- Now we want to add every comment that's posted to the created database. For that we are going to create an instance for every post:

```javascript
socket.broadcast.on('comment', function(comm){
    var newComment = new Post(comm);
    newComment.save(function(err){
        if (err) throw err;
        io.emit('comment', comm);
    });
});
```
- After that we want the users to see every comment that has been placed, even when they logged out for a period of time. In order to do that we use this code on connection on the server-side:

```javascript
Post.find({}, function(err, docs){
    if(err) throw err;
    io.emit('comment-history', docs);
});
```
- On the client-side these comments need to be added to the html. To prevent that on a new connection the comments get added a second time (or even a third time), we clear the html tag before adding the comment-history:
```javascript
socket.on('comment-history', function(comments){
    var allCommentSections = document.querySelectorAll('.comments ul');
    allCommentSections.forEach(function(section){
        section.innerHTML='';
    });

    //Loops through every comment and executes addComments for every comment.
    for(var i=0; i < comments.length; i++){
        addComments(comments[i]);
    }
});
```

#### 6.2.6 Run application
- Run application by typing this in your terminal:

```
$ npm start
```
- The website is viewable on localhost:4000;
- Congratulations! Now you can hate on Trump!

## 7 Wishlist
- [ ] Create full sign in/sign up.
- [x] Attach database.
- [ ] Responsive design.
- [ ] Extra twitter stream that follows 'America first' hashtag.
- [ ] More options besides disliking.

## 8 Bugs that need fixing
- [x] #1 When user 1 adds multiple comments user 2 sees the comment twice/three times and even more.
- [x] #2 When a user wants to comment on another tweet the same comment will be added to the previous tweet.
- [ ] #3 Likes don't work with three users.

## 9 References
Special thanks to:
[Kirupa](https://www.kirupa.com/html5/handling_events_for_many_elements.htm) for explaining using one event for several elements,
[Laurens](https://github.com/Razpudding) for helping me with bug #1 and #2 ,
[Smitha Milli](https://www.youtube.com/watch?v=c01OHDUpDMU&index=6&list=PLw5h0DiJ-9PC0Wo1NWrNHgKE-mFc_9ftq) for extremely helpful tutorials on socket.io.


## License
MIT/X11.
