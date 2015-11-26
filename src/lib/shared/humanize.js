var $1 = null;

if (typeof require !== 'undefined') {
  $1 = require('moment');
} else {
  $1 = this.moment;
}

var moment = $1;

var $out = {
  Time : {
    humanize : function(seconds) {
      var outputFormat = 'm:ss';

      if (seconds > 60 * 60) {
        outputFormat = 'h:mm:ss';
      }


      return moment.utc(seconds * 1000).format(outputFormat);
    }
  },
  String : {
    truncate : function(s, n, useWordBoundary) {
      var toLong = s.length > n;
      var s_ = toLong ? s.substr(0,n-1) : s;
      s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
      return  toLong ? s_ + '...' : s_;
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  Humanize = $out;

  // Alias for Meteor
  if (typeof __ === 'undefined') {
    __ = Humanize;
  }
}
