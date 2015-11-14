AdminLayout = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (Meteor.userId() == null ||
       !Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
      FlowRouter.go('/');
    }

    return {
    }
  },
  render() {
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