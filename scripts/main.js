Game = {};
Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = function(){
    var floor = document.getElementById('canvas-main').height - 20;
    var curTime, prevTime;
    var seamus, graphics;

    function init(){
        curTime = prevTime = performance.now();
        seamus = Game.seamus; 
        graphics = Game.graphics;
        graphics.init();
        seamus.init();
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
        seamus.update(elapsedTime)
    }

    function render(){
        graphics.clear();
        seamus.draw();
    }

    return{
        init: init
    }
}()