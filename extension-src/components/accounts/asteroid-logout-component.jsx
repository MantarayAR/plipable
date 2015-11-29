var React = require('react');
var ReactDOM = require('react-dom');

var AsteroidUserMixin = require('components/mixins/asteroid-user-mixin');

/**
 * @param Asteroid
 */
var AsteroidLogoutComponent = React.createClass({
  mixins: [AsteroidUserMixin],
  logout(e) {
    e.preventDefault();

    this.props.Asteroid.logout();
  },
  render() {
    if (this.state.isLoggedIn) {
      return (
        <span>
          <button onClick={this.logout} className="btn">
            Sign Out
          </button>
        </span>
      );
    } else {
      return <span></span>
    }
  }
});

module.exports = AsteroidLogoutComponent;

