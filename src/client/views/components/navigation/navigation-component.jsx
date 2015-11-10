NavigationComponent = React.createClass({
  handleGoBack() {
    window.history.back();
  },
  render() {
    var title = this.props.title || TAPi18n.__('app_name') || 'Plip it';

    var goBackClasses = 'nav__go-back button-collapse ';

    if (this.props.allowGoBack) {
      goBackClasses += '';
    } else {
      goBackClasses += 'hide';
    }

    if (this.props.hideNavigation === true) {
      return (
        <div>
        </div>
      );
    }

    return(
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s12">
              <a href="/" className="brand-logo">{title}</a>
              <a onClick={this.handleGoBack} className={goBackClasses}>
                <i className="fa fa-chevron-left"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});