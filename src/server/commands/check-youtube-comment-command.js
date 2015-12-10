CheckYoutubeCommentCommand = function () {
  var _regex = /(?:([0-5]?[0-9]):)?([0-5]?[0-9]):([0-5][0-9])/;
  var _unescapeMap = {
    '&#39;': '\''
  };

  var _removePrefixedTimestamp = function(message, videoTimestamp) {
    if (message.indexOf(videoTimestamp) === 0) {
      message = message.replace(videoTimestamp, '');
    }

    return message.trim();
  };

  var _normalizeMessage = function(message) {
    var temp = message.replace(/<(?:.|\n)*?>/gm, '');
    temp = _.unescape(temp);

    for (var property in _unescapeMap) {
      if (_unescapeMap.hasOwnProperty(property)) {
        temp = temp.replace(property, _unescapeMap[property]);
      }
    }

    return temp;
  };

  var _calculateTimestamp = function(s) {
    var parts = s.split(':');
    var seconds = 0;

    var factorMap = {
      0: 1,
      1: 60,
      2: 60 * 60
    }

    for (var i = parts.length - 1, j = 0; i >= 0; i--, j++) {
      var part = parseInt(parts[i]);

      seconds += part * factorMap[j];
    }

    return seconds;
  };

  var handle = function (item) {
    var hasTimestamp = false;
    var videoTimestamp = 0;

    var message = item.snippet.topLevelComment.snippet.textDisplay;

    var result = _regex.exec(message);

    if (result && result.length > 0) {
      hasTimestamp = true;

      videoTimestamp = _calculateTimestamp(result[0]);
    }

    if (hasTimestamp) {

      message = _normalizeMessage(message);
      message = _removePrefixedTimestamp(message, result[0]);

      if (message.length < 250 && message.length > 0) {
        var comment = {
          videoId: item.snippet.videoId,
          username: 'Plipable Autobot – ' + item.snippet.topLevelComment.snippet.authorDisplayName,
          thumbnail: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
          message: message,
          videoTimestamp: videoTimestamp,
          // Robot comments are created one hour earlier than now
          // This is so that they don't spam the latest tab unless
          // there has been no activity for a day
          createdAt: (+new Date()) - (1000 * 60 * 60 * 24)
        };

        Plips.insert(comment, {
          getAutoValues: false
        });
      }
    }
  }

  return {
    handle: handle
  }
};
