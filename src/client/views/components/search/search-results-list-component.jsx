/**
 * Show a list of search Results
 *
 * @param results [Object]
 */
SearchResultsListComponent = React.createClass({
  render() {
    return (
      <div className="search__results-list">
        <div className="collection">
          {this.props.results.items.map(function(result, i) {
            return <SearchResultItemComponent result={result} key={i} />
          })}
        </div>
      </div>
    );
  }
});