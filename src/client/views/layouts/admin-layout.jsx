AdminLayout = React.createClass({
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