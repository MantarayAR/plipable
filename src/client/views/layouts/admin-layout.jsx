Session.setDefault('adminLoggedIn', false);

AdminLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var loggedIn = Session.get('adminLoggedIn');

    Meteor.autorun(function() {
      if (Meteor.userId() == null ||
          !Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
        Session.set('adminLoggedIn', false);
      } else {
        Session.set('adminLoggedIn', true);
      }
    });

    return {
      loggedIn: loggedIn
    }
  },
  render() {
    if (! this.data.loggedIn) {
      return <AppLoadingComponent />
    }

    return (
      <div>
        <header>
          <NavigationComponent
              hideNavigation={false}
              title="Admin"
              allowGoBack={true}/>
        </header>
        <main>
          {this.props.content}
        </main>
        <footer>
        </footer>
     </div>
    );
  }
});