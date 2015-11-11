Humanize = {
  Time : {
    humanize : function(seconds) {
      outputFormat = 'm:ss';

      if (seconds > 60 * 60) {
        outputFormat = 'h:mm:ss';
      }


      return moment.utc(seconds * 1000).format(outputFormat);
    }
  }
}

if (typeof __ === 'undefined') {
  __ = Humanize;
}