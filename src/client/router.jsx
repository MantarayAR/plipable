FlowRouter.route('/', controller(SearchController, 'view', 'Home Page'));
FlowRouter.route('/s', controller(SearchController, 'search', 'Search Page'));
FlowRouter.route('/v/:videoId', controller(VideoController, 'view', 'View Page'));
FlowRouter.route('/admin/', controller(AdminController, 'view', 'Admin Page'));

FlowRouter.route('/about', controller(ExtraController, 'about', 'About Page'));
FlowRouter.route('/about/:pageName', controller(ExtraController, 'about', 'About Page'));