/**
 * Reusable error component that uses
 * a card to display an array of errors
 *
 * @param message Array
 */
ErrorComponent = React.createClass({
  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      var component = this.refs.error;
      var scrollY   = $(component).offset().top - 20;

      $('html, body').stop().animate({scrollTop: scrollY }, 300);
    }
  },
  render() {
    var errors = this.props.message;
    var $$error = '';

    if (errors) {
      var $$errorInner = '';

      if (typeof this.props.message === 'string') {
        $$errorInner = (
          <ul>
            <li>{this.props.message}</li>
          </ul>
        );
      } else {
        $$errorInner = (
          <ul>
            {errors.map(function(error, i) {
              return <li key={i}>{error}</li>;
            })}
          </ul>
        );
      }

      var $$error = (
        <div className="card-panel red lighten-1">
          <span className="white-text">
            {$$errorInner}
          </span>
        </div>
      );
    }

    return (
      <div className="row" ref="error">
        {$$error}
      </div>
    );
  }
});