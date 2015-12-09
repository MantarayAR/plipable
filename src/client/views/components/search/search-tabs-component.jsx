/**
 * Show the tabs and panels for the "Search" page
 *
 * @param searchText String
 */
SearchTabsComponent = React.createClass({
  componentDidMount() {
    this.setupTabs();
  },
  componentDidUpdate() {
    this.setupTabs();
  },
  setupTabs() {
    $(ReactDOM.findDOMNode(this.refs.tabs)).tabs();

    if (this.props.searchText !== '' && typeof this.props.searchText != 'undefined') {
      $(ReactDOM.findDOMNode(this.refs.tabs)).tabs('select_tab', 'search-panel');
    }
    else {
      $(ReactDOM.findDOMNode(this.refs.tabs)).tabs('select_tab', 'latest-panel');
    }
  },
  render() {
    var $$tabs = [];
    var $$contents = [];

    if (this.props.searchText !== '' && typeof this.props.searchText != 'undefined') {
      $$tabs.push(<li key="latest" className="tab col s4"><a href="#latest-panel">Latest</a></li>);
      $$tabs.push(<li key="popular" className="tab col s4"><a href="#popular-panel"><i class="fa fa-youtube-play"></i> Trending</a></li>);
      $$tabs.push(<li key="search" className="tab col s4"><a className="active" href="#search-panel">Search</a></li>);

      $$contents.push(
        <div key="activity" id="latest-panel">
          <ActivityFeedComponent />
        </div>
      );
      $$contents.push(
        <div key="popular" id="popular-panel">
          <SearchResultsComponent searchText='' />
        </div>
      );
      $$contents.push(
        <div key="search" id="search-panel">
          <SearchResultsComponent searchText={this.props.searchText} />
        </div>
      );
    } else {
      $$tabs.push(<li key="latest" className="tab col s6"><a className="active" href="#latest-panel">Latest</a></li>);
      $$tabs.push(<li key="popular" className="tab col s6"><a href="#popular-panel"><i class="fa fa-youtube-play"></i> Trending</a></li>);

      $$contents.push(
        <div key="activity" id="latest-panel">
          <ActivityFeedComponent />
        </div>
      );
      $$contents.push(
        <div key="popular" id="popular-panel">
          <SearchResultsComponent searchText='' />
        </div>
      );
    }

    return (
      <div className="search-tabs">
        <div className="row">
          <div className="col s12">
            <ul className="tabs" ref="tabs">
              {$$tabs}
            </ul>
          </div>
          <div className="col s12">
            {$$contents}
          </div>
        </div>
      </div>
    );
  }
});
