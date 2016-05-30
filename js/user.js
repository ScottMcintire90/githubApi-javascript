var apiKey = require('./../.env').apiKey;

//Get user info
exports.User = function(name) {
  this.name = name;
  $.get('https://api.github.com/users/' + this.name + '?access_token=' + apiKey).then(function(response){
    console.log(response);
    picture = response.avatar_url;
    followers = response.followers;

    //check if username is available
    if(response.name !== null) {
      this.name = response.name;
    } else {
      this.name = "N/A";
    }

    //show user info
    $('.userInfo').show();
    $('.repos').show();
    $('#userName').text(response.login);
    $('#fullName').text(this.name);
    $('#userPicture').append('<img src="' + picture + '" height="100" width="100">');
    $('#followers').text(followers);

    }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};









// exports.User.prototype.getUsername = function() {
//
//   return this.name;
// };
//
// exports.User.prototype.getRepos = function(){
//   $.get('https://api.github.com/users/' + this.name + '/repos?access_token=' +        apiKey).then(function(response){
//
//     $('#repoResults').text("");
//
//
//     for(var i=0; i<30; i++) {
//       $('#repoResults').append('<div class="repo"><button id="showDescription" type="click">' + response[i].name + '</button></div>');
//     }
//
//       $('#userName').show();
//       $('#userName').text(response[1].owner.login);
// + '<ul>' + '<li>' + response[i].description + '</li>' + '</ul>'
