var _JobQueue = function() {
  var _STATES = {
    IN_PROGRESS: 2,
    DONE: 1,
    NOT_STARTED: 0
  }

  var run = function () {
    Meteor.setInterval(function() {
      var job = JobCollection.findOne({
        status: {
          $ne: _STATES.IN_PROGRESS
        }
      }, {
        sort: {
          createdAt: 1
        }
      });

      if (job != null) {
        JobCollection.update({
          _id: job._id
        }, {
          $set: {
            status: _STATES.IN_PROGRESS
          }
        });

        if (job.type === 'video') {
          dispatch(
            new GetYoutubeCommentsByVideoIdCommand(),
            job.videoId
          );
        } else if (job.type === 'comments') {
          dispatch(
            new GetYoutubeCommentsByNextPageTokenCommand(),
            job.videoId,
            job.nextPageToken
          );
        }
      }
    }, 3000);
  };

  return {
    run: run
  };
};

JobQueue = new _JobQueue();
JobQueue.run();