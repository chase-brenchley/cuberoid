Game = {};
Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = function(){
    var floor = document.getElementById('canvas-main').height - 20;
    var curTime, prevTime;

    function init(){
        curTime = prevTime = performance.now();
        requestAnimationFrame(gameLoop);
    }

    function gameLoop(){
        prevTime = curTime;
	    curTime = performance.now();
        var elapsedTime = curTime - prevTime;
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){

    }

    function render(){
        Game.samus.draw();
    }

    return{
        init: init
    }
}()