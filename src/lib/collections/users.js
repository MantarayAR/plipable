Meteor.users.deny({
  update: function() {
    return true;
  }
});

if ( Meteor.isServer ) {
  /**
   * Publish everyone's twitter screenname
   *
   * Careful! DON'T ACCIDENTLY EXPOSE
   * SECRET PROPERTIES
   */
  var publish = function(userId) {
    var options = {};

    if (userId) {
      options['_id'] = userId;
    }

    return Meteor.users.find(options, {
      fields: {
        'services.twitter.screenName': 1
      }
    });
  }

  Meteor.publish(null, publish);
  Meteor.publish('plipUsers', publish);
  Meteor.publish(null, function () { 
    return Meteor.roles.find({});
  });
}