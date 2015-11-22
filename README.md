Plipable
=======

[![Stellarnauts Experience](http://stellarnauts.meteor.com/api/MantarayAR/plipable/badge "Experience up for grabs")](http://stellarnauts.meteor.com/g/MantarayAR/plipable)
[![Stories in Ready](https://badge.waffle.io/MantarayAR/plipable.png?label=ready&title=Ready)](http://waffle.io/MantarayAR/plipable)
[![Analytics](https://ga-beacon.appspot.com/UA-70022714-2/plipable/readme)](https://github.com/igrigorik/ga-beacon)


It's like Soundcloud for Youtube. Your messages are automatically timestamped to where you initially wanted to post them!

[Visit the Live Website!](http://plipable.com)

[![Plipable](documentation/images/demo.gif)](http://plipable.com)


## Running the app

This is a Meteor application. You can run this application using:

```sh
cd src
meteor --setting settings.local.json
```


## Settings

A `settings.example.json` file is in `/src/` as an example of what your `settings.local.json` file should look like. You will need to add your own Twitter API tokens in order to get Twitter logins to work. You will also need a Youtube API token.


# Deployment

A `settings.json` file is recommended to have when deploying to production, in order to keep your development and production settings separate.

Deploy using:

```sh
cd src
meteor deploy --settings settings.json plipit.meteor.com
```

OR

If you have the mup.json configured:

```sh
mup deploy
```
