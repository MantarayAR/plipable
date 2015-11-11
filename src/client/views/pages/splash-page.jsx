SplashPage = React.createClass({
  render() {
    return (
      <div className="splash-page">
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
    );
  }
})