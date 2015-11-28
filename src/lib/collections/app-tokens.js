AppTokens = new Mongo.Collection('appTokens');

AppTokensSchema = new SimpleSchema({
  userId: {
    type: String,
    label: "The user id of the user the token belongs to"
  },
  deleted: {
    type: Boolean,
    label: "The app token is deleted?",
    optional: true
  },
  token: {
    type: String,
    label: "The app token"
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

AppTokens.attachSchema(AppTokensSchema);

AppTokens.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});
