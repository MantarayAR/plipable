//----------------- LOAD START --------------------\\
var $1 = null;
var $2 = null;
var $3 = null;
var $4 = null;
var $5 = null;

if (typeof require !== 'undefined') {
  $1 = require('react');
  $2 = require('react-dom');
  $3 = require('react-modal');
  $4 = require('shared/components/plip-form-component.jsx');
  $5 = require('jquery');
} else {
  $1 = this.React;
  $2 = this.ReactDOM;
  $3 = this.ReactModal;
  $4 = this.PlipFormComponent;
  $5 = this.$;

}

var React = $1;
var ReactDOM = $2;
var ReactModal = $3;
var PlipFormComponent = $4;
var $ = $5;

//----------------- LOAD END --------------------\\

/**
 * @param currentTime String
 * @param videoId String
 * @param isLoggedIn Boolean
 * @param handleSubmit Function[videoId, videoTimestamp, comment, callback]
 */
var $out = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      currentTime: false
    };
  },
  openModal: function() {
    this.setState({
      modalIsOpen: true,
      currentTime: this.props.currentTime
    });
  },
  closeModal: function(goBack) {
    goBack = (goBack == null) ? true : goBack;

    if (this.state.modalIsOpen) {
      if (goBack) {
        window.history.back();
      }

      window.modalWasOpen = false;
      this.setState({modalIsOpen: false});
    }
  },
  handleNewComment(e) {
    e.preventDefault();

    this.openModal();
  },
  handleMouseOver(e) {
    var $twit = $(e.currentTarget);
    var originalPixels = 0;

    if (typeof $twit.data('original-width') !== 'undefined') {
      originalPixels = $twit.data('original-width');
    } else {
      originalPixels = parseInt($twit.css('width'));
      $twit.data('original-width', originalPixels);
    }

    $twit.css('width', (originalPixels + 60) + 'px')
  },
  handleMouseOut(e) {
    var $twit = $(e.currentTarget);
    var originalPixels = $twit.data('original-width');
    $twit.css('width', originalPixels + 'px');
  },
  handleTwitterShare(e) {
    e.preventDefault();

    var link = 'https://www.plipable.com/v/' + this.props.videoId;
    var title = this.props.title;
    var text = encodeURIComponent('Come watch reactions to "' + title + '" ' + link + ' on #Plipable');
    // var keywords = encodeURIComponent(['todo'].join(','));
    var href = 'https://twitter.com/intent/tweet?text=' + text; //+ '&hashtags=' + keywords;

    var windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        width = 550,
        height = 420,
        winHeight = screen.height,
        winWidth = screen.width,
        left = Math.round((winWidth / 2) - (width / 2)),
        top = 0;

    if (winHeight > height) {
      top = Math.round((winHeight / 2) - (height / 2));
    }

    window.open(href, 'intent', windowOptions + ',width=' + width +
                                       ',height=' + height + ',left=' + left + ',top=' + top);
  },
  render() {
    ReactModal.setAppElement(document.getElementById('react-root'));

    if (! this.props.isLoggedIn) {
      return <div></div>
    }

    var modalStyle = {
        overlay : {
            backgroundColor: null
        },
        content : {
            top: null,
            left: null,
            right: null,
            bottom: null,
            border: null,
            background: null,
            borderRadius: null,
            padding: null,
            position: null
        }
    };

    return (
      <div className="plip__floating-button">
        <div className="plip__floating-button--container" onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
          <a
                onClick={this.handleNewComment}
                className="plip__floating-button--comment waves-effect waves-red">
            <i className="material-icons">add</i>
          </a>
          <a
              onClick={this.handleTwitterShare}
              className="plip__floating-button--twitter waves-effect waves-light">
            <i className="fa fa-twitter"></i>
          </a>
        </div>

         <ReactModal
          className="plip__modal"
          overlayClassName="plip__modal-overlay plipable"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
        >
          <PlipFormComponent
              handleSubmit={this.props.handleSubmit}
              closeModal={this.closeModal}
              videoId={this.props.videoId}
              currentTime={this.state.currentTime} />
        </ReactModal>
      </div>
    );
  }
});

//----------------- EXPORT START --------------------\\
if (typeof module !== 'undefined') {
  module.exports = $out;
} else {
  PlipModalComponent = $out;
}
//----------------- EXPORT END --------------------\\
