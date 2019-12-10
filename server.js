var express = require('express');
var exphbs = require("express-handlebars");
var app = express();
var port = process.env.PORT || 3000;

//// needs to be replaced with an actual database
var posts = require("./public/posts.json");
var users = require("./public/users.json");
////

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).render('body', {posts: posts});
});

app.get('/posts/:post', function (req, res) {
  var postID = req.params.post;
  if (postID >= 0 && postID < posts.length) {
    res.status(200).render('body', {post: posts[postID]})
  }
  else {
    res.status(404).render('404');
  }
});

app.get('*', function (req, res) {
  // res.status(404).render('404')
  res.status(404).sendFile(__dirname + "/public/404.html");
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
