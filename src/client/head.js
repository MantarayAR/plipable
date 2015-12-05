Meteor.startup(function() {
  dispatch(new SetMetaTagsCommand(), {});
});
