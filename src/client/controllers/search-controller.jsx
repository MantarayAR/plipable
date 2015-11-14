SearchController = function() {
  this.view = function(params, queryParams) {
    if (!!Meteor.userId()) {
      ReactLayout.render(MainLayout, {
        content: (
          <SearchPage
            searchText={queryParams.search} />
        )
      });
    } else {
      ReactLayout.render(MainLayout, {
        content: (
          <HomePage
            hideNavigation={() => Meteor.userId() === null } />
        )
      });
    }
  };

  this.search = function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <SearchPage
          searchText={queryParams.search} />
      )
    });
  };
};