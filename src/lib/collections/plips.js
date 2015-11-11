Plips = new Mongo.Collection('plips');

PlipsSchema = new SimpleSchema({
  videoId: {
    type: String,
    label: "The youtube video id"
  },
  deleted: {
    type: Boolean,
    label: "Is the plip deleted?",
    optional: true
  },
  username: {
    type: String,
    label: "The twitter user name"
  },
  thumbnail: {
    type: String,
    label: "Thumbnail",
    optional: true
  },
  message: {
    type: String,
    max: 250,
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
      videoId: videoId,
      deleted: {
        $ne: true
      }
    });
  });

  Meteor.publish('myPlips', function(username) {
    check(username, String);

    return Plips.find({
      username: username,
      deleted: {
        $ne: true
      }
    });
  });
}
