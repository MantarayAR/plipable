HomePage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var isLoggedIn = !! Meteor.userId();

    if (isLoggedIn) {
      FlowRouter.go('/s');
    }

    return {
      isLoggedIn: isLoggedIn
    };
  },
  render() {
    return (
      <div>
        <SplashPage />
      </div>
    );
  }
});