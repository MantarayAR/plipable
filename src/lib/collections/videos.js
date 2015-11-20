Videos = new Mongo.Collection('videos');

VideosSchema = new SimpleSchema({
  videoId: {
    type: String,
    label: "The video id"
  },
  videoType: {
    type: String,
    label: "The video type",
  },
  title: {
    type: String,
    label: "The title of the video"
  },
  thumbnail: {
    type: String,
    label: "Thumbnail"
  },
  description: {
    type: String,
    label: "The video description"
  },
  tags: {
    type: [String],
    label: "Tags",
    optional: true
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

Videos.attachSchema(VideosSchema);

Videos.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});

if ( Meteor.isServer ) {

}
