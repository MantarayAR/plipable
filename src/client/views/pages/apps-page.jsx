AppsPage = React.createClass({
  getInitialState() {
    return {
      chromeInstalled: false
    }
  },
  componentDidMount() {
    setTimeout(function() {
      if ($('body').hasClass('chrome-extension-installed')) {
        this.setState({
          chromeInstalled: true
        });
      }
    }.bind(this), 500);
  },
  render() {
    var $$chromeAction = '';
    if (this.state.chromeInstalled) {
      $$chromeAction = (
        <a
            className="waves-effect waves-light btn grey lighten-3 black-text"
            href="https://chrome.google.com/webstore/detail/plipable/lamdlhgilkpnpooehbfigedjmnlcbklh"
            target="blank">Installed!</a>
      );
    } else {
      $$chromeAction = (
        <a
            className="waves-effect waves-light btn brand"
            href="https://chrome.google.com/webstore/detail/plipable/lamdlhgilkpnpooehbfigedjmnlcbklh"
            target="blank">Install</a>
      );
    }

    return (
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card">
            <div className="card-content">
              <span className="card-title black-text">
                <i className="fa fa-chrome"></i> Google Chrome</span>
              <p>Plip directly from Youtube!</p>
            </div>
            <div className="card-action">
              {$$chromeAction}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
