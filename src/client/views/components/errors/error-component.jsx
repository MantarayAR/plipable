/**
 * Reusable error component that uses
 * a card to display an array of errors
 *
 * @param message Array
 */
ErrorComponent = React.createClass({
  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      var component = this.refs.error;
      var scrollY   = $(component).offset().top - 20;

      $('html, body').stop().animate({scrollTop: scrollY }, 300);
    }
  },
  render() {
    var errors = this.props.message;
    var $$error = '';

    if (errors) {
      var $$error = (
        <div className="card-panel red lighten-1">
          <span className="white-text">
            <ul>
              {errors.map(function(error, i) {
                return <li key={i}>{error}</li>;
              })}
            </ul>
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