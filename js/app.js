App = Ember.Application.create();

// for using fixture data - new style
// App.ApplicationAdapter = DS.FixtureAdapter.extend();

// router
App.Router.map(function() {
	this.resource('tables', function() {
		this.resource('table', {path: ':table_id'});
	});
});

// routes
App.TablesRoute = Ember.Route.extend({
	model: function() {
		return App.Table.find();
	}
});

App.TableRoute = Ember.Route.extend({
	model: function(params) {
		return App.Table.find(params.table_id);
	}
});

// controllers
App.TablesController = Ember.ArrayController.extend();

// models
App.Store = DS.Store.extend({
	revision: 11,
	adapter: 'DS.FixtureAdapter'
});

App.Table = DS.Model.extend();

App.Table.FIXTURES = [
	{id: 1},
	{id: 2},
	{id: 3},
	{id: 4},
	{id: 5},
	{id: 6}
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