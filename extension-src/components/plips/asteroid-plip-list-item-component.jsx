var React = require('react');
var ReactDOM = require('react-dom');
var PlipListItemComponent = require('shared/components/plip-list-item-component.jsx');

var AsteroidPlipListItemComponent = React.createClass({
  handleDelete(plipId) {
    var plipId = this.props.plip._id;
    var userId = this.props.Asteroid.user()._id;
    var token = this.props.Asteroid.token();

    var call = this.props.Asteroid.call(
      'deleteWithToken',
      this.props.plip._id,
      userId,
      token
    );

    call.result.then(function(result) {
      //
    }).catch(function(error) {
      console.log(error);
    });
  },
  render() {
    var canDelete = false;

    if (this.props.Asteroid.user()) {
      canDelete = this.props.Asteroid.user().services.twitter.screenName === this.props.plip.username;  
    }
    
    return (
      <PlipListItemComponent
          plip={this.props.plip}
          canDelete={canDelete}
          handleDelete={this.handleDelete} />
    );
  }
});

module.exports = AsteroidPlipListItemComponent;
