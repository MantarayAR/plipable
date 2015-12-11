SplashPage = React.createClass({
  componentDidMount() {
    dispatch(new SetMetaTagsCommand(), {});
    this.handleResize();
    window.addEventListener('resize', this.handleResize);

    var targetUrl = '/previews/simon.gif';
    var img = new Image();
    img.onload = function() {
      var $img = $(img).attr('id', 'splash-cat').addClass('splash-page__preview-image').addClass('img-responsive');
      $('#splash-cat').replaceWith($img);
      this.handleResize();
    }.bind(this);
    img.src = targetUrl;
  },
  handleResize: function(e) {
    var width = $('#iphone').width();
    var innerWidth = width * (253.0/305.0);
    var innerMarginTop = width * (80.0/305.0);
    $('#splash-cat').css({width: innerWidth + 'px', 'marginTop': innerMarginTop + 'px' });
    $('#splash-cat-after').css({'marginTop': $('#iphone').height() + 'px' });
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render() {
    return (
      <div className="splash-page">
        <div className="row">
          <div className="col m4 offset-m1 hide-on-small-only">
            &nbsp;
            <a className="splash-page__preview-image-link" href="/v/SSKatciX3hA">
              <div className="spash-page__preview-image-wrapper">
                <img id="splash-cat" src="/previews/simon.png" className="splash-page__preview-image" />
              </div>
              <img id="iphone" src="/previews/phone.png" className="splash-page__preview-phone" />
            </a>
            <div id="splash-cat-after">
            </div>
            <a className="btn white brand-text" href="/v/SSKatciX3hA">
              <i className="material-icons right">play_arrow</i>
              Watch Simon
            </a>
          </div>
          <div className="col m6 s12">
            <img className="splash-page__logo" src="/logos/logo-reverse.png" />
            <h1 className="splash-page__heading">{TAPi18n.__('app_name')}</h1>
            <h2 className="splash-page__description">{TAPi18n.__('app_description')}</h2>

            <div className="row">
              <div className="col s6 offset-s3">
                <LoginComponent text="Start Plipping"/>

                <p>Or, <a href="/s">search for videos</a> without signing in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
