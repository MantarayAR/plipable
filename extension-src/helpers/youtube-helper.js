module.exports = (function() {
  var _getQueryParams = function(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
      tokens,
      re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
      params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
 }
  
  var getCurrentYoutubeId = function() {
    if (window.location.search) {
      var search = _getQueryParams(document.location.search);

      return search.v;
    }

    return null;
  };

  return {
    getCurrentYoutubeId: getCurrentYoutubeId
  };
})();
