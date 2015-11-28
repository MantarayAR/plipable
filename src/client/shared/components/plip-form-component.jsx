//----------------- LOAD START --------------------\\
var $1 = null;
var $2 = null;
var $3 = null;
var $4 = null;

if (typeof require !== 'undefined') {
  $1 = require('react');
  $2 = require('react-dom');
  $3 = require('shared-lib/humanize');
  $4 = require('jquery');
} else {
  $1 = this.React;
  $2 = this.ReactDOM;
  $3 = this.Humanize;
  $4 = this.$;
}

var React = $1;
var ReactDOM = $2;
var Humanize = $3;
var $ = $4;

//----------------- LOAD END --------------------\\

/**
 * New Plip Form Component
 *
 * @param videoId String
 * @param currentTime String
 * @param closeModal Function(boolean)
 * @param handleSubmit Function[videoId, videoTimestamp, comment, callback]
 */
var $out = React.createClass({
  componentDidMount() {
    var that = this;
    var timestamp = +new Date();
    // Really gross. Not sure why this is necessary
    setTimeout(function() {
      $('#plip-comment')
        .focus()
        .attr('length', 250)
        .characterCounter();
    }, 1);

    window.location.hash = 'open';
    window.modalWasOpen = true;

    $(window).on('hashchange', function() {
      if (that && that.closeModal && window.location.hash == '' && window.modalWasOpen) {
        that.closeModal(false);
      }
    });
  },
  closeModal(goBack) {
    this.props.closeModal(goBack);
  },
  handleSubmit(e) {
    e.preventDefault();

    var videoId        = this.props.videoId;
    var comment        = this.refs.comment.value;
    var videoTimestamp = this.props.currentTime;

    this.props.handleSubmit(videoId, videoTimestamp, comment, this.closeModal);
  },
  render() {
    var currentTime = this.props.currentTime;
    currentTime     = Humanize.Time.humanize(currentTime);

    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input autoFocus={true} maxLength="250" ref="comment" id="plip-comment" type="text"/>
              <label htmlFor="plip-comment">Your comment @ {currentTime}</label>
            </div>

            <button
                className="btn red darken-1 waves-effect waves-light right"
                type="submit"
                name="action">
              Plip!
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }  
});


//----------------- EXPORT START --------------------\\
if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  PlipFormComponent = $out;
}
//----------------- EXPORT END --------------------\\

