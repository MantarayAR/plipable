AdminController = function () {
  this.view = function(params, queryParams) {
    ReactLayout.render(AdminLayout, {
      content: <AdminPage />
    });
  };  
};
