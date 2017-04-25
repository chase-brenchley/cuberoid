Game = {};
Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = (function(controls){
    var floor = document.getElementById('canvas-main').height - 20;
    var curTime, prevTime;
    var seamus, graphics, physics;
    var currentStage;
    var paused;

    // Greatest amount of elapsed time to pass to an update function 
    const MAX_ELAPSED_TIME = 200; 

    function init(){
        if(document.getElementById('musicToggle').checked){
            BGMusic.pause();
            BGMusic = new Audio("assets/sound/BGMusic.mp3");
            BGMusic.loop = true;
            playSound(BGMusic);
        }
        curTime = prevTime = performance.now();
        graphics = Game.graphics;
        seamus = Game.seamus.generateSeamus(); 
        physics = Game.physics;
        currentStage = Game.stage1;
        
        physics.init();
        graphics.init();
        Game.controls.init();
        seamus.init(Game.controls.controls);
        currentStage.init();
        
        Game.game.paused = false;
        requestAnimationFrame(gameLoop);
    }

    function reInit(){
        seamus.updateControls(Game.controls.controls)
        Game.game.paused = false;
        curTime = prevTime = performance.now();        
        requestAnimationFrame(gameLoop);
    }

    function gameLoop(){
        if(Game.game.paused){
            return;
        }
        prevTime = curTime;
	    curTime = performance.now();
        var elapsedTime = curTime - prevTime;
        update(elapsedTime);
        render();
        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){
        if(elapsedTime > MAX_ELAPSED_TIME){
            elapsedTime = MAX_ELAPSED_TIME;
        }
        
        var canvas = document.getElementById('canvas-main');
        seamus.update(elapsedTime)
        Game.particles.update(elapsedTime);

        // Check collisions
        for (i = 0; i < currentStage.Stage.length; i++){
            Game.particles.collision(currentStage.Stage[i]);
            if (!currentStage.Stage[i].hasOwnProperty("nextStage")){
                seamus.collision(currentStage.Stage[i]);
            } else {
                if(seamus.collision(currentStage.Stage[i]) == true){
                    currentStage.Stage[i].hasOwnProperty("coords") ? coords = currentStage.Stage[i].coords: coords = {x:.5,y:.5};
                    currentStage = currentStage.Stage[i].nextStage;
                    currentStage.init();
                    seamus.updateCoords(coords)
                    break;
                }
            }
        }
    }

    function render(){
        graphics.clear();
        graphics.drawStage(currentStage);
        seamus.draw();
        Game.particles.draw();
    }

    return{
        init: init,
        paused: paused,
        reInit: reInit,
    }
}(Game.controls));