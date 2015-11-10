Meteor.startup(function() {
  DocHead.setTitle(TAPi18n.__('app_name'));
});

DocHead.addMeta({
    name: "viewport",
    content: "width=device-width, initial-scale=1"
});