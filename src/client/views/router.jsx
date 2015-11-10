FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <HomePage
          hideNavigation={() => Meteor.userId() === null } />
      )
    });
  },
  name: "Home"
});

FlowRouter.route('/s', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <HomePage
          hideNavigation={() => Meteor.userId() === null } />
      )
    });
  },
  name: "Home Search"
});

FlowRouter.route('/s/:search', {
  action: function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <SearchPage
            transitionType="none"
            searchText={params.search} />
      )
    });
  },
  name: "Search"
});

FlowRouter.route('/v/:youtubeId', {
  action: function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <ViewPage youtubeId={params.youtubeId} />,
      allowGoBack: true
    });
  },
  name: "View"
});
