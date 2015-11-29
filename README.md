Plipable
=======

[![Stellarnauts Experience](http://stellarnauts.meteor.com/api/MantarayAR/plipable/badge "Experience up for grabs")](http://stellarnauts.meteor.com/g/MantarayAR/plipable)
[![Stories in Ready](https://badge.waffle.io/MantarayAR/plipable.png?label=ready&title=Ready)](http://waffle.io/MantarayAR/plipable)
[![Analytics](https://ga-beacon.appspot.com/UA-70022714-2/plipable/readme)](https://github.com/igrigorik/ga-beacon)


It's like Soundcloud for Youtube. Your messages are automatically timestamped to where you initially wanted to post them!

[Visit the Live Website!](http://plipable.com)

[![Plipable](documentation/images/demo.gif)](http://plipable.com)

# Developers Corner

## Meteor

All Meteor code is in `src`. Before running, make sure to `cp settings.example.json settings.local.json` and fill in the `settings.local.json` file with the appropriate keys, tokens, and other strings.

You can run this application using:

```sh
meteor --setting settings.local.json
```

To deploy the application, make sure that you have a `settings.json` file and a `mup.json` file. Neither file is tracked to ensure security. You can `cp settings.example.json settings.json` and fill in the necessary tokens, but the mup file will need to be created manually. Once you have the `mup.json` file all filled in, deploy using

```sh
mup deploy
```

## Browser Extensions

For now, we only have the Google Chrome Extension set up. To get started:

```sh
npm install -g gulp
npm install
gulp
```

Whenever you make changes, run `gulp` and reload the extension in Chrome.

### Ngrok and Chrome

In order to test the plugin on Youtube, you will need the Meteor app deployed with an HTTPS connection. Run the meteor app locally.

Once the app is running, install and run ngrok. Have it tunnel to your Meteor application. Take the HTTPS url that ngrok gives you can use that as the hostName in the `extension-src/settings.json`. This will allow you to connect to your meteor app from the Chrome Extension.

Now go to Chrome->Extensions and enable developer options. Load the unpacked folder `chrome-src`.
