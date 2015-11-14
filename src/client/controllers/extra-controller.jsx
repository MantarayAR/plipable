ExtraController = function() {
  this.about = function(params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: (
        <AboutPage />
      )
    });
  }
};
