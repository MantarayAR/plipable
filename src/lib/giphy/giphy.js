Giphy = {
  isGiphyMessage: function(message) {
    var startsWithMap = [
      '/giphy',
      '\\giphy',
      '/gif',
      '/image',
      '/giffy',
      '/giffie',
      '/gify',
      '/gipht',
      '/gliphy'
    ];

    for (var i = 0; i < startsWithMap.length; i++) {
      if (message.indexOf(startsWithMap[i] + ' ') === 0) {
        return true;
      }
    }

    return false;
  }
};
