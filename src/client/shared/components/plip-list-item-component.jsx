//----------------- LOAD START --------------------\\
var $1 = null;
var $2 = null;
var $3 = null;
var $4 = null;

if (typeof require !== 'undefined') {
  $1 = require('react');
  $2 = require('react-dom');
  $3 = require('shared-lib/humanize');
  $4 = '//' +require('json!settings.json').hostName;
} else {
  $1 = this.React;
  $2 = this.ReactDOM;
  $3 = this.Humanize;
  $4 = '';
}

var React = $1;
var ReactDOM = $2;
var Humanize = $3;
var hostName = $4;
//----------------- LOAD END --------------------\\

/**
 * @param plip Plip
 * @param handleDelete(plipId)
 * @param canDelete Boolean
 */
var $out = React.createClass({
  handleDelete(e) {
    e.preventDefault();
    var plipId = this.props.plip._id;

    if (this.props.handleDelete) {
      this.props.handleDelete(plipId);
    }
  },
  render() {
    var currentTime = this.props.plip.videoTimestamp;
    var thumbnail = this.props.plip.thumbnail;
    var username = this.props.plip.username;

    currentTime = Humanize.Time.humanize(currentTime);

    var $$delete, $$thumbnail, $$image;

    if (this.props.canDelete) {
      $$delete = (
        <a href="#!" onClick={this.handleDelete} className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      );
    } else {
      $$delete = '';
    }

    if (thumbnail) {
      $$thumbnail = <img src={thumbnail} alt={username} className="circle" />;
    } else {
      $$thumbnail = (
        <i className="material-icons circle brand">chat_bubble</i>
      );
    }

    if (this.props.plip.image) {
      var $$watermark = '';

      if (this.props.plip.image.type === 'giphy') {
        var watermarkUrl = hostName + "/giphy/horizontal-dark-text.png";
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
    } else {
      $$image = '';
    }

    return (
      <div className="plips__list-item collection-item avatar">
        {$$thumbnail}
        <span className="title">{username}</span>
        <p>
          @{currentTime} – {this.props.plip.message}
        </p>
        {$$image}
        {$$delete}
      </div>
    );
  }
});

//----------------- EXPORT START --------------------\\
if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  PlipListItemComponent = $out;
}
//----------------- EXPORT END --------------------\\
