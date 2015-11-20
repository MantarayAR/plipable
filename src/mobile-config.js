App.info({
  id: 'com.plipable.app',
  name: 'Plipable',
  version: '0.0.1',
  description: 'Timestamped video reactions',
  author: 'Mantaray AR LLC',
  email: 'ivanmontiel@mantarayar.com',
  website: 'http://www.plipable.com'
});

App.setPreference('BackgroundColor', '0xFF555BFF');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');

// Self
App.accessRule('*.plipable.com');

// Google
App.accessRule('*.google.com');
App.accessRule('fonts.gstatic.com');
App.accessRule('*.google-analytics.com');

// Youtube
App.accessRule('*.youtube.com');
App.accessRule('*.ytimg.com');
App.accessRule('*.googlevideo.com');
App.accessRule('*.doubleclick.net');
App.accessRule('*.g.doubleclick.net');
App.accessRule('*.googlesyndication.com');

// Twitter
App.accessRule('*.twitter.com');
App.accessRule('pbs.twimg.com');

// Giphy
App.accessRule('*.giphy.com');

// Karida
App.accessRule('*.kadira.io');