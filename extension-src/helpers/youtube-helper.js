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

  return {
    getCurrentYoutubeId: getCurrentYoutubeId
  };
})();