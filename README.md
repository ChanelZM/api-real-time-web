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
- [x] Check if username already exists.
- [x] Attach username to comment.
- [ ] Create style.css.
- [ ] Write a good read me.
- [ ] Refactor code.

## Features
- Comment hateful things on Donald Trumps tweets. :speech_balloon:
- Dislike Donald Trumps tweets. :thumbsdown:
- Real time visible when somebody dislikes or comments.
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

## Get started
1. Clone my repo: https://github.com/ChanelZM/api-real-time-web.git
2. Open terminal and type:
```
npm install
```
3. Create an account on Twitter.
4. Go to [dev twitter](https://dev.twitter.com/) and create an app.
5. Create access token and access token secret for yourself.
6. Create a .env file in the root of the folder and place the consumer key, consumer secret, access token key and access token secret like so:
```
CONSUMER_KEY = 'your consumer key'
CONSUMER_SECRET = 'your consumer secret'
ACCESS_TOKEN_KEY = 'your access token key'
ACCESS_TOKEN_SECRET = 'your access token secret'
```
7. Run application by typing this in your terminal:
```
npm start
```

## Wishlist
- [ ] Create full sign in/sign up.
- [ ] Attach database.
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
