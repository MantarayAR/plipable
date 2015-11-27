var React = require('react');
var ReactDOM = require('react-dom');
var PlipListItemComponent = require('shared/components/plip-list-item-component.jsx');

var AsteroidPlipListItemComponent = React.createClass({
  handleDelete(plipId) {
    // TODO
    console.log(this.props.Asteroid);
  },
  render() {
    var canDelete = false;

    if (this.props.Asteroid.user()) {
      canDelete = this.props.Asteroid.user().username === this.props.plip.username;  
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
