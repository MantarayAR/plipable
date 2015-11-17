SplashPage = React.createClass({
  componentDidMount() {
    var targetUrl = '/previews/high-res-cat-super-trimmed.gif';
    var img = new Image();
    img.onload = function() {
      var $img = $(img).addClass('splash-page__preview-image').addClass('img-responsive');
      $('#splash-cat').replaceWith($img);
    };
    img.src = targetUrl;
  },
  render() {
    return (
      <div className="splash-page">
        <div className="row">
          <div className="col m4 offset-m1 hide-on-small-only">
            <img id="splash-cat" src="/previews/high-res-cat-super-trimmed.png" className="splash-page__preview-image img-responsive" />
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
