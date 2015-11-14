NavigationComponent = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState() {
    return {
      timestamp : +new Date()
    }
  },
  getMeteorData() {
    var isLoggedIn = !! Meteor.userId();

    return {
      isLoggedIn: isLoggedIn
    };
  },
  handleHome(e) {
    e.preventDefault();
    FlowRouter.go('/');
  },
  handleSearch(e) {
    e.preventDefault();
    FlowRouter.go('/s');
  },
  handleLogin(e) {
    e.preventDefault();

    Meteor.loginWithTwitter({}, function () {
      FlowRouter.reload();
    });
  },
  handleLogout(e) {
    e.preventDefault();

    Meteor.logout(function(err) {
      if (FlowRouter.current().path === '/') {
        FlowRouter.reload();
      }
      FlowRouter.redirect('/');
    });
  },
  componentDidMount() {
    $('[data-activates^="nav-dropdown"]').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false,
      hover: false,
      gutter: 0, 
      belowOrigin: true,
      alignment: 'left'
    }); 
  },
  render() {
    var title     = this.props.title || TAPi18n.__('app_name') || 'Plip it';
    var timestamp = this.state.timestamp;

    searchButtonClasses = 'nav__button button-collapse right ';

    var routeName = FlowRouter.getRouteName();
    if (routeName === "Home" || routeName === "Search" ) {
      searchButtonClasses += 'hide';
    }

    if (this.props.hideNavigation === true) {
      return (
        <div>
        </div>
      );
    }

    var $$navItems = [(
      <li key="search"><a href="#!" onClick={this.handleSearch}>Search</a></li>
    ), (
      <li key="about"><a href="/about">About</a></li>
    )];

    if (this.data.isLoggedIn) {
      $$navItems.push(<li key="divider1" className="divider"></li>);
      $$navItems.push(<li key="logout"><a href="#!" onClick={this.handleLogout}>Logout</a></li>);
    } else {
      $$navItems.unshift(<li key="home"><a href="#!" onClick={this.handleHome}>Home</a></li>);
      $$navItems.push(<li key="divider1" className="divider"></li>);
      $$navItems.push(<li key="login"><a href="#!" onClick={this.handleLogin}>Login</a></li>);
    }

    var navDropdown = 'nav-dropdown-' + timestamp;

    return(
      <nav>
        <div className="nav-wrapper">
          <div className="row">
            <div className="col s12">
              <a href="/" onClick={this.handleHome} className="brand-logo">{title}</a>
              <a
                  href="#"
                  data-activates={navDropdown} 
                  className="button-collapse">
                <i className="material-icons">menu</i>
                </a>
              <a onClick={this.handleSearch} className={searchButtonClasses}>
                <i className="fa fa-search"></i>
              </a>
              <ul className="right hide-on-med-and-down">
                {$$navItems}
              </ul>
              <ul id={navDropdown} className='dropdown-content'>
                {$$navItems}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
});