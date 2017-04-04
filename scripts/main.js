Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = function(){
    function init(){

    }

    function gameLoop(elapsedTime){
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){

    }

    function render(){

    }
}()