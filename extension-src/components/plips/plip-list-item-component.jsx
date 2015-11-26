var React = require('react');
var ReactDOM = require('react-dom');

var moment = require('moment');
var settings = require('json!settings.json');

var humanizeTime = function(seconds) {
  var outputFormat = 'm:ss';

  if (seconds > 60 * 60) {
    outputFormat = 'h:mm:ss';
  }


  return moment.utc(seconds * 1000).format(outputFormat);
}

module.exports = React.createClass({
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    currentTime     = humanizeTime(currentTime);

    var thumbnail = this.props.plip.thumbnail;
    var username = this.props.plip.username;

    var $$thumbnail = (
      <i className="material-icons circle brand">chat_bubble</i>
    );

    if (thumbnail) {
      $$thumbnail = <img src={thumbnail} alt={username} className="circle" />;
    }

    var $$image = '';

    if (this.props.plip.image) {
      var $$watermark = '';

      if (this.props.plip.image.type === 'giphy') {
        var watermarkUrl = '//' + settings.hostName + "/giphy/horizontal-dark-text.png";
        $$watermark = (
          <div className="plip__image-watermark">
            <img src={watermarkUrl} />
          </div>
        );
      }

      $$image = (
        <div className="plip__image">
          <img src={this.props.plip.image.url} />
          {$$watermark}
        </div>
      );  
    }

    return (
      <div className="plips__list-item collection-item avatar">
        {$$thumbnail}
        <span className="title">{username}</span>
        <p>
          @{currentTime} – {this.props.plip.message}
        </p>
        {$$image}
      </div>
    );
  }
});
