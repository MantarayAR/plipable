var React = require('react');
var ReactDOM = require('react-dom');

var settings = require('json!settings.json');
var AsteroidLoginComponent = require('components/accounts/asteroid-login-component.jsx');
var AsteroidLogoutComponent = require('components/accounts/asteroid-logout-component.jsx');

var ExtraOptionsComponent = React.createClass({
  handleClick() {
    // Do not prevent default

    var movie = document.getElementById('movie_player');
    movie.pauseVideo();
  },
  render() {
    var link = "//" + settings.hostName + "/v/" + this.props.videoId;
    return (
      <div className="plipable-extras">
        <AsteroidLoginComponent Asteroid={this.props.Asteroid} />
        <AsteroidLogoutComponent Asteroid={this.props.Asteroid} />
      
        <a className="btn white brand-text" onClick={this.handleClick} href={link} target="_blank">Watch on Plipable</a>
      </div>
    );
  }
});

module.exports = ExtraOptionsComponent;
