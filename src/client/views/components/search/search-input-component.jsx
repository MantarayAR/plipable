SearchInputComponent = React.createClass({getInitialState() {
    return {
      throttle: null
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    var searchCallback = this.props.onSearch;
    var searchText     = this.refs.search.value;
    
    searchCallback(searchText);
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
