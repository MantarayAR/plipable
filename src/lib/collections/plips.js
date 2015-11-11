Plips = new Mongo.Collection('plips');

PlipsSchema = new SimpleSchema({
  videoId: {
    type: String,
    label: "The youtube video id"
  },
  username: {
    type: String,
    label: "The twitter user name"
  },
  message: {
    type: String,
    max: 1000,
    label: "The plip message"
  },
  videoTimestamp: {
    type: Number,
    decimal: true,
    label: "The time that the plip was posted in the video"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    }
  }
});

Plips.attachSchema(PlipsSchema);

Plips.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});

if ( Meteor.isServer ) {
  Meteor.publish('plips', function(videoId) {
    check(videoId, String);

    return Plips.find({
      videoId: videoId
    });
  });

  Meteor.publish('myPlips', function(username) {
    check(username, String);

    return Plips.find({
      username: username
    });
  });
}
