HomePage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var isLoggedIn = !! Meteor.userId();

    return {
      isLoggedIn: isLoggedIn
    };
  },
  render() {
    var content = <SplashPage />

    if ( this.data.isLoggedIn) {
      FlowRouter.go('/s');
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});