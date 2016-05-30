var User = require('./../js/user.js').User;
var Repo = require('./../js/repo.js').Repo;

$(document).ready(function() {
  //submit user input form
  $('#userForm').submit(function() {
    var username = $('#user').val();
    $('#user').val("");
    //get user information
    User(username);
    //get repository info
    Repo(username);
    event.preventDefault();
  });

  // $('button').last().click(function(event) {
  //   var descriptionId = $(this).attr("id");
  //   $('#' + descriptionId).append('<ul>' + '<li>' + "Description" + '</li>' + '</ul>');
  //
  // });


});
