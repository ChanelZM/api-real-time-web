# Judgemental Terra
## Introduction
Judgemental Terra is a real time webapplication where you can hate on Donald Trumps tweets. It contains the twitter stream of Trump and on each individual twitter can be commented hateful things. Or if you don't feel like saying something but you do want to share your disappointment you can just simply dislike the tweet.

## Demo
A live demo can be found on Heroku:
[Judgemental Terra](https://api-real-time-web.herokuapp.com/)

## To Do
I've divided what I need to do into two sections: 'To Do' will cover the must haves and 'Wishlist' will cover features that are wanted but not needed.

- [x] User can dislike.
- [x] User can only dislike once.
- [x] Other users can see the amount of dislikes.
- [x] Comments will be added to the HTML.
- [x] Comments will be added to socket.io.
- [x] Comments can seen added to the HTML by another person.
- [ ] Check if username already exists.
- [x] Attach username to comment.
- [ ] Create style.css.
- [ ] Write a good read me.
- [ ] Refactor code.

## Features
- Comment hateful things on Donald Trumps tweets. :speech_balloon:
- Dislike Donald Trumps tweets. :thumbsdown:
- Real time visible when somebody dislikes or comments.
- Connection with MongoDB to save comments.
- **When a user logs in, previous comments will be loaded on the right spot (!!! so proud of myself!!).**
- User can view previous comments.
- Get to hate on Donald Trump with likeminded people. :rage:
- Let your mind flow with negativity. :stuck_out_tongue_closed_eyes:

## Installation
### Packages
Explanation about the packages I used:
[Express](https://www.npmjs.com/package/express),
[Socket.io](https://www.npmjs.com/package/socket.io),
[Path](https://nodejs.org/api/path.html),
[Twitter](https://www.npmjs.com/package/twitter),
[Body-parser](https://www.npmjs.com/package/body-parser),
[Multer](https://www.npmjs.com/package/multer)

#### Mongoose
To easily read and write a database I created on MongoDB, I used a node-module called Mongoose. With Mongoose I add comments to the database.

## Get started
### How to clone
- Clone my repo: https://github.com/ChanelZM/api-real-time-web.git
- Open terminal and type:

```
npm install
```
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
- Create an account on [Mlab](https://mlab.com/).
- Create a database and user.
- Add the username and password of the user to the .env file:

```
MONGO_USERNAME = 'youruser'
MONGO_PASSWORD = 'youruserspassword'
```
- Run application by typing this in your terminal:

```
npm start
```
- The website is viewable on localhost:4000;

### How to build

#### Mongoose
- Create an account for free on [Mlab](https://mlab.com/). Choose 'Sandbox' for the creation of your database. Give it a name and create a user that can have access to the database. To access the database on the server side, open a connection in app.js and test if it's working bij adding a `console.log()`. Message should be viewable in the terminal:

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

- Run application by typing this in your terminal:

```
npm start
```

## Wishlist
- [ ] Create full sign in/sign up.
- [x] Attach database.
- [ ] Responsive design.
- [ ] Extra twitter stream that follows 'America first' hashtag.
- [ ] More options besides disliking.

## Bugs that need fixing
- [x] When user 1 adds multiple comments user 2 sees the comment twice/three times and even more.
- [x] When a user wants to comment on another tweet the same comment will be added to the previous tweet.
- [ ] Likes don't work with three users.

## References
Special thanks to:
[Kirupa](https://www.kirupa.com/html5/handling_events_for_many_elements.htm),
[Laurens](https://github.com/Razpudding),
[Person on JsFiddle](https://jsfiddle.net/n7ukn6av/5/),
[Smitha Milli](https://www.youtube.com/watch?v=c01OHDUpDMU&index=6&list=PLw5h0DiJ-9PC0Wo1NWrNHgKE-mFc_9ftq)


## License
MIT/X11.
