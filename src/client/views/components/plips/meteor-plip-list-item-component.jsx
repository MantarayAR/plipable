/**
 * Show a single plip item in a list
 *
 * @param plip Plip
 */
MeteorPlipListItemComponent = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var username = null;
    var userId = null;

    if (Meteor.user()) {
      username  = Meteor.user().services.twitter.screenName;
      userId = Meteor.userId();
    }

    return {
      username: username,
      userId: userId
    }
  },
  handleDelete(plipId) {
    Meteor.call('delete', plipId, function(err, result) {
      if (err) {
        if (err.reason) {
          Materialize.toast(err.reason, 3000, 'red lighten-1')
        } else {
          Materialize.toast('Something bad happened :(', 3000, 'red lighten-1')
        }
      } else {
        Materialize.toast('Plip Deleted!', 4000)
      }
    });
  },
  render() {
    var canDelete = (
        this.data.username === this.props.plip.username ||
        Roles.userIsInRole(this.data.userId, ['admin'], Roles.GLOBAL_GROUP)
    );

    return (
      <PlipListItemComponent
          plip={this.props.plip}
          handleDelete={this.handleDelete}
          canDelete={canDelete} />
    );
  }
});
