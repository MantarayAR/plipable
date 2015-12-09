JobCollection = new Mongo.Collection('jobs');

JobCollection.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});

VisitedCollection = new Mongo.Collection('visited');

VisitedCollection.allow({
  insert: function () {
    return false;
  },
  update: function () {
    return false;
  }
});