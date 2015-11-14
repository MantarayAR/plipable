if (Meteor.settings.mail_url) {
  process.env.MAIL_URL = Meteor.settings.mail_url;
}