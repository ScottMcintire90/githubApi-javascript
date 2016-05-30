var apiKey = require('./../.env').apiKey;

exports.Repo = function(user) {
  this.name = user;
  $.get('https://api.github.com/users/' + this.name + '/repos?access_token=' +        apiKey).then(function(response){

    for(var i=0; i<30; i++) {
      $('#repoResults').append('<div class="repo"><button id="showDescription" type="click">' + response[i].name + '</button><ul>' + '<li>' + response[i].description + '</li>' + '</ul> </div>');
    }
  });
}
