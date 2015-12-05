HomePage = React.createClass({
  mixins: [ReactMeteorData],
  componentDidMount() {
    dispatch(new SetMetaTagsCommand(), {});
  },
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