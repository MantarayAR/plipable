Meteor.users.deny({
  update: function() {
    return true;
  }
});

if ( Meteor.isServer ) {
  /**
   * Publish everyone's github id
   *
   * Careful! DON'T ACCIDENTLY EXPOSE
   * SECRET PROPERTIES
   */
  Meteor.publish(null, function() {
    return Meteor.users.find({}, {
      fields: {
        'services.twitter.screenName': 1
      }
    });
  });  
}