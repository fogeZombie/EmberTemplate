App = Ember.Application.create({
  rootElement: "#user-admin-app",
  LOG_TRANSITIONS: true
});

// for using fixture data
App.ApplicationAdapter = DS.FixtureAdapter.extend();

// url mapping
App.Router.map(function() {
  this.resource('users');
  this.resource('user', {path: "users/:id"}, function() {
    this.route('basicInfo', {path: "basicInfo"});
    this.route('changePassword', {path: "changePassword"});
    this.route('changeRole', {path: "changeRole"});
  });
});

// routes
App.UsersRoute = Ember.Route.extend({
  model: function() {
    console.log("Users route hit up for model.");
    return this.store.find('User');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    console.log("User route hit up for model.");
    console.log(params);
    return this.store.find('User', params.id);
  }
});

// fixture data definition
App.User = DS.Model.extend({
  login: DS.attr('string'),
  name: DS.attr('string'),
	imageSource: DS.attr('string')
});

App.User.FIXTURES = [
  {
    id: "robconery",
    login: "robconery",
    name: "Rob Conery",
    imageSource: "https://avatars.githubusercontent.com/u/78586?"
  },
  {
    id: "scotthanselman",
    login: "scotthanselman",
    name: "Scott Hanselman",
    imageSource: "https://avatars.githubusercontent.com/u/2892?"
  }
];