var express = require('express'),
    http    = require('http'),
    path    = require('path'),
    fs      = require('fs')
    app     = express(),
    highscores = require('./public/routes/highscores')

// all environments
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express(__dirname + '/scripts'));

app.get('/', function(request, response){
  response.render('index.html');
});

app.get('/high-scores', highscores.getScores)
app.post('/high-scores', highscores.update)

app.post('/saveGame', saveGame)
app.get('/load', loadGame)

//const fs = require('fs');

// List of people's names
var people = [];


// Save the id of a person in the people object,
// save their game data in a file called person.json
// where person is the person's name
function saveGame(request, response){
  let found = false;
  for(let i = 0; i < people.length; i++){
    if(people[i] == request.query.person){
      found = true;
      break;
    }
  }

  if(!found){
    people.push(request.query.person);
  }

  // Save the updated people list
  fs.writeFile('saveFiles/people.json', JSON.stringify(people), (err) => {
    if (err) throw err;
    console.log('Saved name successfully');
    // Save the game data for this person
    fs.writeFile('saveFiles/' + request.query.person + '.json', request.query.savedGame, (err) => {
      if (err) throw err;
      console.log('The game has been saved!');
      response.writeHead(200);
      response.end();
    });
  })
  
  
}

function loadGame(request, response){
    var savedGame = "";
    var person = request.query.person;

    console.log(person);
    // read in the file data and store it in the global people list
    fs.readFile('saveFiles/people.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
        people = JSON.parse(data);

        // find person if they are in the array
        let found = false;
        for(var i = 0; i < people.length; i++){
          if(people[i] == person){
            console.log('person found\n')
            found = true;
            break;
          }
        }
        if(found){
          fs.readFile('saveFiles/' + person + '.json', 'utf8', (err1, data1) => {
            if(err1) throw err1;
            savedGame = data1;
            console.log("Successfully loaded " + person);
            console.log(data1)
            response.writeHead(200);
            response.end(savedGame);
          })
        }
        else{
          response.writeHead(200);
          response.end(savedGame);
        }

      }
    )


    
    
}

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});