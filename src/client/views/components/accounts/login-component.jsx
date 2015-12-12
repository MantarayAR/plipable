/**
 * Buttons for logging in
 */
LoginComponent = React.createClass({
  getDefaultProps() {
    return {
      text: "Sign In with Twitter"
    }
  },
  logUserIn(e) {
    e.preventDefault();

    dispatch(LogUserInCommand());
  },
  render() {
    return (
      <div>
        <button onClick={this.logUserIn} id="at-twitter" className="at-social-btn waves-effect waves-light btn">
          <i className="fa fa-twitter left"></i> {this.props.text}
        </button>
      </div>
    );
  }
});
