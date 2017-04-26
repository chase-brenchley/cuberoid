var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    app     = express(),
    highscores = require('./public/routes/highscores.js'),
    save    = require('./public/routes/save.js')

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express(__dirname + '/scripts'));

app.get('/', function(request, response){
  response.render('index.html');
});

app.get('/high-scores', highscores.getScores)
app.post('/high-scores', highscores.update)

app.post('/save', save.saveGame)

app.get()

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});