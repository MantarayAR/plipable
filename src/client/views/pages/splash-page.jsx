SplashPage = React.createClass({
  componentDidMount() {
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
          </div>
          <div className="col m6 s12">
            <img className="splash-page__logo" src="/logos/logo-reverse.png" />
            <h1 className="splash-page__heading">{TAPi18n.__('app_name')}</h1>
            <h2 className="splash-page__description">{TAPi18n.__('app_description')}</h2>

            <div className="row">
              <div className="col s6 offset-s3">
                <LoginComponent />

                <p>Or, <a href="/s">search for videos</a> without signing in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
