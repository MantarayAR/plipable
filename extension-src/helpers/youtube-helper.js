module.exports = (function() {
  var getCurrentYoutubeId = function() {
    if (window.location.search) {
      var search = window.location.search.split('=');

      if (search && search.length > 1) {
        return window.location.search.split('=')[1];
      }
    }

    return null;
  };

  var getCurrentYoutubeTitle = function() {
    return document.getElementsByClassName('watch-title')[0].innerHTML.trim();
  }

  return {
    getCurrentYoutubeId: getCurrentYoutubeId,
    getCurrentYoutubeTitle: getCurrentYoutubeTitle
  };
})();