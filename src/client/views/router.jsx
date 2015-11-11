FlowRouter.route('/', {
  action: function(params, queryParams) {
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
  },
  name: "Home"
});

FlowRouter.route('/s', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <SearchPage
          searchText={queryParams.search} />
      )
    });
  },
  name: "Search"
});

FlowRouter.route('/v/:videoId', {
  action: function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <ViewPage videoId={params.videoId} />,
      allowGoBack: true
    });
  },
  name: "View"
});
