VideoController = function() {
  this.view = function (params, queryParams) {
    ReactLayout.render(MainLayout, {
      content: <ViewPage videoId={params.videoId} />,
      allowGoBack: true
    });
  };
}
