Plipable
=======

[![Stellarnauts Experience](http://stellarnauts.meteor.com/api/MantarayAR/plipable/badge "Experience up for grabs")](http://stellarnauts.meteor.com/g/MantarayAR/plipable)
[![Stories in Ready](https://badge.waffle.io/MantarayAR/plipable.png?label=ready&title=Ready)](http://waffle.io/MantarayAR/plipable)
[![Analytics](https://ga-beacon.appspot.com/UA-70022714-2/plipable/readme)](https://github.com/igrigorik/ga-beacon)


It's like Soundcloud for Youtube. Your messages are automatically timestamped to where you initially wanted to post them!

[Visit the Live Website!](http://plipable.com)

[![Plipable](documentation/images/demo.gif)](http://plipable.com)

## Running the Chrome Plugin

The Chrome plugin requires a bit of setup, first:

```sh
npm install -g gulp
npm install
```

Once installed, you will need to manually fix a Materialize file:

Find this section in `materialize-css/dist/materialize.js`:

```js
var Vel;
if ($) {
  Vel = $.Velocity;
}
else {
  Vel = Velocity;
}
```

Replace it with the following to get it to work:

```js
var Vel;
if (jQuery) {
  Vel = jQuery.Velocity;
}
else {
  Vel = Velocity;
}
```

To compile, simply run `gulp`.

### Ngrok and Chrome

In order to test the plugin on Youtube, you will need the Meteor app deployed with an HTTPS connection. See [Running the app](#running-the-app) for instructions on starting the meteor application.

Once the app is running, install and run ngrok. Have it tunnel to your Meteor application. Take the HTTPS url that ngrok gives you can use that as the hostName in the `extension-src/settings.json`. This will allow you to connect to your meteor app from the Chrome Extension.

Now go to Chrome->Extensions and enable developer options. Load the unpacked folder `chrome-src`.


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

## Running the Chrome Extension

```sh
cd extension-src
npm install
gulp
```