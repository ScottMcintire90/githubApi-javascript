var apiKey = require('./../.env').apiKey;
var User = require('./../js/user.js').User;


$(document).ready(function() {
  $('#userForm').submit(function() {
    var user = $('#user').val();
    $('#user').val("");
    var newUser = new User(user);
    newUser.getRepos();
    event.preventDefault();
  });
});
