var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    // TODO humanize time
    // currentTime     = __.Time.humanize(currentTime);

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
        $$watermark = (
          <div className="plip__image-watermark">
            <img src="/giphy/horizontal-dark-text.png" />
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
