// App.info({
//   id: 'com.plipable.app',
//   name: 'Plipable',
//   description: 'Timestamped video reactions',
//   author: 'Mantaray AR LLC',
//   email: 'ivanmontiel@mantarayar.com',
//   website: 'http://www.plipable.com'
// });

App.setPreference('BackgroundColor', '0xFF555BFF');
App.setPreference('HideKeyboardFormAccessoryBar', true);
App.setPreference('Orientation', 'default');
App.setPreference('Orientation', 'all', 'ios');


App.accessRule('*.ytimg.com');
App.accessRule('*.googlevideo.com');
App.accessRule('*.g.doubleclick.net');
App.accessRule('*.googlesyndication.com');
App.accessRule('*.twitter.com');
App.accessRule('*.giphy.com');
App.accessRule('*.youtube.com');

App.accessRule('*.kadira.io');