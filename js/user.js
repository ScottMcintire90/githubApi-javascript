var apiKey = require('./../.env').apiKey;

exports.User = function(name) {
  this.name = name;
};

exports.User.prototype.getUsername = function() {
  return this.name;
};

exports.User.prototype.getRepos = function(){
  $.get('https://api.github.com/users/' + this.name + '/repos?access_token=' +        apiKey).then(function(response){

    $('#repoResults').text("");

    for(var i=0; i<30; i++) {
      $('#repoResults').append('<div class="repo ' + [i] + '">' + '<button type="click">' + response[i].name + '</button>' + '<ul>' + '<li>' + response[i].description + '</li>' + '</ul>' + '</div>');

      // $('.repo ' + [i]).click(function() {
      //   $('.repo ' + [i]).append('<ul>' + '<li>' + response[i].description + '</li>' + '</ul>');
      // });
    };

      $('#userName').show();
      $('#userName').text(response[1].owner.login);

    }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};
