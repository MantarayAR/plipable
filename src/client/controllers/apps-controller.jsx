AppsController = function() {
  this.view = function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <AppsPage />
      )
    });
  };
}