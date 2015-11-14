FlowRouter.route('/', controller(SearchController, 'view', 'Home Page'));
FlowRouter.route('/s', controller(SearchController, 'search', 'Search Page'));
FlowRouter.route('/v/:videoId', controller(VideoController, 'view', 'View Page'));
FlowRouter.route('/admin/', controller(AdminController, 'view', 'Admin Page'));
