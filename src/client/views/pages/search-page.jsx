SearchPage = React.createClass({
  search(text) {
    FlowRouter.setQueryParams({ search: encodeURIComponent(text) });
  },
  render() {
    return (
      <div className="search">
        <div className="row">
          <div className="col s12 m10 offset-m1">
            <SearchInputComponent
                searchText={this.props.searchText}
                onSearch={this.search} />

            <SearchTabsComponent searchText={this.props.searchText}/>
          </div>
        </div>
      </div>
    );
  }
});
