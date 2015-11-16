LoginComponent = React.createClass({
  logUserIn(e) {
    e.preventDefault();

    dispatch(LogUserInCommand());
  },
  render() {
    return (
      <div>
        <button onClick={this.logUserIn} id="at-twitter" className="at-social-btn waves-effect waves-light btn">
          <i className="fa fa-twitter left"></i> Sign In with Twitter
        </button>
      </div>
    );
  }
});
