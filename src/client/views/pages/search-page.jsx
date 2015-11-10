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
          that.setState({ error: err.reason });
        } else {
          that.setState({ results: result });
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
          <div className="col m8 offset-m2 s10 offset-s1">
            {$$contents}
          </div>
        </div>
      </div>
    );
  }
});
