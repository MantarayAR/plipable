/*
 |----------------------
 | Create Administrators
 |----------------------
 |
 | Setup some initial administrators
 |
 */

var userProfileNames = ['Mantaray AR', 'idmontie'];

Migrations.add('add-administrators', function() {
  var users = Meteor.users.find({
    'profile.name': {
      $in: userProfileNames
    }
  }).fetch();

  _.each(users, function(user) {
    Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
  });
}, function() {
var users = Meteor.users.find({
    'profile.name': {
      $in: userProfileNames
    }
  }).fetch();

  _.each(users, function(user) {
    Roles.removeUsersFromRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
  });
}, 200);