module.exports = {
  getInitialState() {
    return {
      currentUser: null,
      isLoggedIn: false
    }
  },
  componentWillMount: function() {
    // TODO use an event hook that
    // hooks onto a callback for login and
    // logout, rather than using timeouts;
    this.userInterval = setInterval(function () {
      if (this.props.Asteroid.user()) {
        this.setState({
          currentUser: this.props.Asteroid.user(),
          isLoggedIn: true
        });
      } else {
        this.setState({
          currentUser: null,
          isLoggedIn: false
        });
      }
    }.bind(this), 500);
  },
  componentWillUnmount: function() {
    clearInterval(this.userInterval);
  }
}