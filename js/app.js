App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  rootElement: "#github-app" // the rootElement field indicates to Ember where it should inject its data
});

// for using fixture data
// App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource("user", {path: "/users/:login"}, function() {
    this.resource("repositories");
    this.resource("repository", {path: "repositories/:name"}, function(){
      this.resource("issues");
      this.resource("forks");
      this.resource("commits");
      this.route("newIssue")
    })
  });
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

App.UserIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('user');
  }
});

App.RepositoriesRoute = Ember.Route.extend({
  model: function() {
    var user = this.modelFor('user');
    return Ember.$.getJSON(user.repos_url);
  }
});

App.RepositoryRoute = Ember.Route.extend({
  model: function(params) {
    var user = this.modelFor('user');
    // build the URL for the repo call manually
    var url = "https://api.github.com/repos/" + user.login + "/" + params.name;

    return Ember.$.getJSON(url);
  }
});

App.IssuesRoute = Ember.Route.extend({
  model: function() {
    var repo = this.modelFor('repository');
    var url = repo.issues_url.replace("{/number}", "");
    return Ember.$.getJSON(url);
  }
});

App.ForksRoute = Ember.Route.extend({
  model: function() {
    var repo = this.modelFor('repository');
    return Ember.$.getJSON(repo.forks_url);
  }
});

App.CommitsRoute = Ember.Route.extend({
  model: function() {
    var repo = this.modelFor('repository');
    var url = repo.commits_url.replace("{/sha}", "");
    return Ember.$.getJSON(url);
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

App.RepositoriesController = Ember.ArrayController.extend({
  needs: ["user"],
  user: Ember.computed.alias("controllers.user")
});

App.RepositoryController = Ember.ObjectController.extend({
  needs: ["user"],
  user: Ember.computed.alias("controllers.user"),

  // functionally equivalent to the active 'forked' member
  // forked: Ember.computed.alias('fork')

  forked: function(){
    if(this.get('fork') === true) {
      return true;
    }
    else {
      return false;
    }
  }.property('fork')
});

App.RepositoryNewIssueController = Ember.ObjectController.extend({
  needs: ["repository"],
  repo: Ember.computed.alias("controllers.repository"),

  // issueTitle: "Default Title",  // don't have to declare these
  // issueBody: "Default Body",    // but it allows you to set a default

  // this setup creates a new GitHub.Issue object every time repo.model changes
  issue: function(){
    return App.Issue.create();
  }.property("repo.model"),

  actions: {
    submitIssue: function(){
      // some other ways of grabbing data that don't work ideally in this case
      // var vals = this.getProperties("issueTitle", "issueBody");
      // console.log(vals);
      // var body = $('#new-issue-body').val(); // for grabbing with jQuery, element needs an 'id' field

      var issue = this.get("issue");
      // POST issues_url
      var url = this.get('repo').get('issues_url').replace("{/number}", "");

      // Ember.$.post(url, {title: vals.issueTitle, body: vals.issueBody}, function(result) {
      //   // success...
      // });
      console.log("Submitted " + issue.get("title") + " to: " + url);

      // reset the issue for future use on the same repo
      this.set('issue', App.Issue.create());
      this.transitionToRoute("issues");
    }
  }
});

// handlebars helpers
Ember.Handlebars.registerBoundHelper('fromDate', function(theDate) {
  var today = moment();
  var target = moment(theDate);
  return target.from(today);
});

// objects
App.Issue = Ember.Object.extend({
  title: "",
  body: "",
  isValid: function() {
    // do some fancy validation
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