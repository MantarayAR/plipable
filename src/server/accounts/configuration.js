Meteor.startup(function() {
  Accounts.loginServiceConfiguration.remove({
    service : 'twitter'
  });

  Accounts.loginServiceConfiguration.insert({
    service     : 'twitter',
    consumerKey : Meteor.settings.twitter_client_id,
    secret      : Meteor.settings.twitter_secret
  });

});