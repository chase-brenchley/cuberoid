Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = function(){
    var floor = document.getElementById('canvas-main').height - 20;
    var cubey = new object({height: 3, width: 3, x: 5, y: 5})
    
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