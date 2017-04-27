var highscores = [];

exports.getScores = function(request, response){
    console.log('getting scores from server');
    // todo: load high scores from json file
    response.writeHead(200, {'content-type': 'application/json'});
    response.end(JSON.stringify(highscores));
}

exports.update = function(request, response){
    console.log('Attempting to add new high score');
    var score = {
        name: request.query.name,
        score: request.query.score
    }

    highscores.push(score);
    highscores.sort(function(a, b){return a.score > b.score})

    if(highscores.length > 5){
        highscores.splice(5, 1);
    }

    response.writeHead(200);
    response.end();
}