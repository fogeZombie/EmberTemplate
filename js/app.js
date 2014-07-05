App = Ember.Application.create({
  rootElement: "#github-app" // the rootElement field indicates to Ember where it should inject its data
});

// for using fixture data
// App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource("user", {path: "/users/:login"});
});

// routes
App.IndexRoute = Ember.Route.extend({
  model: function() {
    return devs;
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.$.getJSON("https://api.github.com/users/" + params.login);
  }
});

// controllers
App.IndexController = Ember.ArrayController.extend({
  renderedOn: function () {
    return new Date();
  }.property(),

  actions: {
    clicked: function () {
      console.log("clicked!");
    }
  }
});

// models

var devs = [
      {login: "fogeZombie", name: "Richard Foge"},
      {login: "cbdillon", name: "Brandon Dillon"},
      {login: "halcyon00", name: "Matt Alderman"},
      {login: "robconery", name: "Rob Conery"},
      {login: "shanselman", name: "Scott Hanselman"},
      {login: "tomdale", name: "Tom Dale"},
      {login: "wycats", name: "Yehuda Katz"},
      {login: "jongalloway", name: "Jon Galloway"},
      {login: "haacked", name: "Phil Hack"},
    ];

// example of fixture data
// App.<DataName> = DS.Model.extend({
// 	title: DS.attr('string'),
// 	isCompleted: DS.attr('boolean')
// });

// App.<DataName>.FIXTURES = [
// 	{
// 		id: 1,
// 		title: "Learn Stuff",
// 		isCompleted: false
// 	}
// ];