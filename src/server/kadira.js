Meteor.startup(function() {
  Kadira.connect(
    Meteor.settings.kadira_app_id, 
    Meteor.settings.kadira_app_secret
  );
});