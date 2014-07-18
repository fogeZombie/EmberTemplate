App = Ember.Application.create({
  rootElement: "#user-admin-app"
});

// for using fixture data
// App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.Router.map(function() {
  this.resource('users');
});

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