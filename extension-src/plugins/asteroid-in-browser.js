var Asteroid = require('asteroid/dist/asteroid.browser');
var amplify = require('amplify-store');

Asteroid.prototype.login = function(userId) {
  this.subscribe('plipUsers', userId);
  var users = this.getCollection('users');

  var query = users.reactiveQuery({
    _id: userId
  });

  var callback = function () {
    var users = query.result;

    if (users && users.length > 0) {
      amplify('plipable-user', users[0]);
    }
  };

  query.on('change', callback);
  callback();
}

var oldLogout = Asteroid.prototype.logout;

Asteroid.prototype.logout = function () {
  amplify('plipable-user', null);

  return oldLogout();
};


Asteroid.prototype.user = function () {
  var user = null;

  if (amplify('plipable-user')) {
    user = amplify('plipable-user');
  }

  return user;
}

module.exports = Asteroid;
