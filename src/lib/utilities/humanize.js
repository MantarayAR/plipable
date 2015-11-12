Humanize = {
  Time : {
    humanize : function(seconds) {
      outputFormat = 'm:ss';

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

if (typeof __ === 'undefined') {
  __ = Humanize;
}