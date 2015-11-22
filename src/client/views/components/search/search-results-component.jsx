/**
 * Container for the search results
 *
 * @param searchText String
 */
SearchResultsComponent = React.createClass({
  getInitialState() {
    return {
      appLoading: true,
      results: [],
      error: false
    }
  },
  callSearch(text) {
    var that = this;
    text = text || '';

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
  componentDidMount() {
    this.callSearch(this.props.searchText);
  },
  componentWillReceiveProps(nextProps) {
    this.callSearch(nextProps.searchText);
  },
  render() {
    var $$error = '';

    if (this.state.appLoading) {
      return <AppLoadingComponent />
    }

    if (this.state.error) {
      $$error = <ErrorComponent message={this.state.error} />
    }

    return (
      <div>
        {$$error}
        <SearchResultsListComponent results={this.state.results} />
      </div>
    );
  }
})