SearchPage = React.createClass({
  getInitialState() {
    return {
      appLoading: true,
      results: [],
      error: false
    }
  },
  callSearch(text) {
    var that = this;

    Meteor.call('search', text, function(err, result) {
      if (that.isMounted()) {
        if (err) {
          that.setState({ error: err.getMessage() });
        } else {
          // Not sure why it's getting wrapping in "error"
          that.setState({ results: result.error });
        }

        that.setState({ appLoading: false });
      }
    });
  },
  componentWillReceiveProps(nextProps) {
    this.callSearch(nextProps.searchText);
  },
  componentDidMount() {
    this.callSearch(this.props.searchText);
  },
  search(text) {
    FlowRouter.go('/s/' + encodeURIComponent(text));
  },
  render() {
    var $$error = '';
    var $$contents = '';

    if (this.state.appLoading) {
      $$contents = <AppLoadingComponent />
    } else {
      if (this.state.error) {
        $$error = <ErrorComponent message={this.state.error} />
      }

      $$contents = (
        <div>
          {$$error}

          <SearchResultsListComponent results={this.state.results} />
        </div>
      );
    }

    return (
      <div className="search">
        <SearchInputComponent
            searchText={this.props.searchText}
            onSearch={this.search} />

        <div className="row">
          <div className="col s8 offset-s2">
            {$$contents}
          </div>
        </div>
      </div>
    );
  }
});
