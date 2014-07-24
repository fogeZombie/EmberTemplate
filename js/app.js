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
    this.route('addNote', {path: "addNote"});
  });
});

// routes
App.UsersRoute = Ember.Route.extend({
  model: function() {
    console.log("Users route hit up for model.");
    return this.store.findAll('User');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    console.log("User route hit up for model.");
    console.log(params);
    return this.store.find('User', params.id);
  }
});

// controllers
App.UsersController = Ember.ArrayController.extend({
  searchTerm: "",
  title: function() {
    if(this.get('searchTerm')) {
      return "Searching for: " + this.get('searchTerm');
    }
    else {
     return "Last 50 Users";
    }
  }.property('searchTerm'),
  actions: {
    searchForUser: function() {
      console.log("Successful search: " + this.get('searchTerm'));

      // self = this; // use to avoid scoping issue in the callback function
      // Ember.$.getJSON("<URL>", {<TableData>}, function(data) {
        // console.log(data);
        // self.set('model', data.users)
      // });
    }
  }
});

// components
App.FogeAlphaComponent = Ember.Component.extend({
  inputInt01: 2,
  inputInt02: 2,
  inputString: "empty",

  outputInt: function() {
    var input01 = this.get('inputInt01');
    var input02 = this.get('inputInt02');
    return input01 * input02;
  }.property('input01', 'input02'),

  outputString: function() {
    return this.get('inputString') + ": KABOOM!";
  }.property('inputString')
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