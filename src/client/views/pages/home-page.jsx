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
    var content = <SplashPage />

    return (
      <div>
        {content}
      </div>
    );
  }
});