/*
 |----------------------
 | Create Administrators
 |----------------------
 |
 | Setup some initial administrators
 |
 */

var userTwitterIds = ['2202135266'];

Migrations.add('add-administrators', function() {
  var users = Meteor.users.find({
    'services.twitter.id': {
      $in: userTwitterIds
    }
  }).fetch();

  _.each(users, function(user) {
    Roles.addUsersToRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
  });
}, function() {
var users = Meteor.users.find({
    'services.twitter.id': {
      $in: userTwitterIds
    }
  }).fetch();

  _.each(users, function(user) {
    Roles.removeUsersFromRoles(user._id, 'admin', Roles.GLOBAL_GROUP);
  });
}, 200);