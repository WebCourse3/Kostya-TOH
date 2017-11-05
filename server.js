var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');

var heroes = [
	{ id: 0,  name: 'Zero' },
	{ id: 11, name: 'Mr. Nice' },
	{ id: 12, name: 'Narco' },
	{ id: 13, name: 'Bombasto' },
	{ id: 14, name: 'Celeritas' },
	{ id: 15, name: 'Magneta' },
	{ id: 16, name: 'RubberMan' },
	{ id: 17, name: 'Dynama' },
	{ id: 18, name: 'Dr IQ' },
	{ id: 19, name: 'Magma' },
	{ id: 20, name: 'Tornado' }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html');
});

app.route('/heroes')
	.get(function (req, res) {
		res.send(heroes);
	})
	 .post(function (req, res) {
	 	if (heroes.filter(hero => findHeroById(hero, req.body.id)).length != 0){
		    res.send("A hero with that id already exists!");
	    }
	    else {
		    heroes.push(req.body);

		    res.send(heroes);
	    }
	})
	.delete(function (req, res) {
		heroes = heroes.filter(hero => !findHeroByName(hero, req.query.name));
		res.send(heroes);
	})

app.route('/heroes/:heroId')
	.get(function(req, res){
		var hero = heroes.find(hero => findHeroById(hero, req.params.id));

		res.send(hero);
	})
	.put(function (req, res) {
		heroes.find(hero => findHeroById(hero, req.params.id)).name = req.query.name;

		res.send(heroes);
	})
	.delete(function (req, res) {
		heroes = heroes.filter(hero => !findHeroById(hero, req.params.id));

		res.send(heroes);
	})

function findHeroById(hero, id) {
	return hero.id == id;
}

function findHeroByName(hero, name) {
	return hero.name == name;
}

http.listen(3000, function(){
	console.log('listening on *:3000');
});