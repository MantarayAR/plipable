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

    if ( this.data.isLoggedIn || this.props.forceDisplay ) {
      content = <SearchPage searchText={false} />;
    }

    return (
      <div>
        {content}
      </div>
    );
  }
});