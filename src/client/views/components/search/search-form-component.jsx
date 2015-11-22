/**
 * Search Form Component
 *
 * @param onSearch Function(String)
 * @param searchText String
 */
SearchFormComponent = React.createClass({
  getInitialState() {
    return {
      throttle: null
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    var searchCallback = this.props.onSearch;
    var searchText     = this.refs.search.value;
    
    searchCallback(searchText);

    var $input = $(ReactDOM.findDOMNode(this.refs.search));

    // Attempt to close the keyboard using some
    // trickery on Mobile devices
    if ( window.isMobile() ) {
      $input.attr('readonly', 'readonly');
      $input.attr('disabled', 'true');
      setTimeout(function() {
        $input.blur();
        $input.removeAttr('readonly');
        $input.removeAttr('disabled');
      }, 100);
    }
  },
  handleChange(e) {
    e.preventDefault();

    var searchCallback = this.props.onSearch;
    var searchText     = this.refs.search.value;

    if (this.state.throttle) {
      clearTimeout(this.state.throttle);
    }

    var timeout = setTimeout(function () {
      searchCallback(searchText);
    }, 500);

    this.setState({
      throttle: timeout
    });
  },
  render() {
    var defaultValue = this.props.searchText || '';

    return (
      <div className="search__search-input">
        <div className="search-wrapper card">
          <form onSubmit={this.handleSubmit}>
            <input
                onChange={this.handleChange}
                ref="search"
                id="search"
                placeholder="Search Youtube..."
                defaultValue={defaultValue} />
            <i className="material-icons">search</i>
          </form>
        </div>
      </div>
    );
  }
});
