var minorCache = {
  data: [],
  timestamp: 0
};

Meteor.methods({
  getActivityFeed: function() {
    var now = +new Date();

    if (minorCache && minorCache.data && minorCache.timestamp > now - 1000 * 15) {
      return minorCache.data;
    } else {
      // Get the latest plips
      var plips = Plips.find({
      }, {
        limit: 20,
        sort: {
          createdAt: -1
        }
      }).fetch();

      // Merge the plips by video id
      var groupedPlips = _.groupBy(plips, function(plip) { return plip.videoId; });

      // Get videos
      var videoIds = _.keys(groupedPlips);

      var videos = Videos.find({
        videoId: {
          $in: videoIds
        }
      }).fetch();

      // Map plips to videos
      var results = _.map(videos, function(video) {
        video.plips = groupedPlips[video.videoId];
        video.latestPlip = _.max(video.plips, function(plip) {
          return +plip.createdAt;
        });

        return video;
      });

      // Sort by latest plip date
      results = _.sortBy(results, function(result) {
        return -(+result.latestPlip.createdAt)
      } );

      minorCache = {
        data: results,
        timestamp: now
      }

      return results;
    }
  }
});