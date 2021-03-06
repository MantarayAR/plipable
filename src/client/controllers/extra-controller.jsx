ExtraController = function() {
  this.about = function(params, queryParams) {
    var pageName = 'about-us';

    if (params.pageName) {
      pageName = params.pageName;
    }

    ReactLayout.render(MainLayout, {
      content: (
        <AboutPage pageName={pageName}/>
      )
    });
  }
};
