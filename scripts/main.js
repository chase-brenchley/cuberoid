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
        
        Game.game.paused = false;
        requestAnimationFrame(gameLoop);
    }

    function reInit(){
        console.log(Game.controls.controls);
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
        // if (!Game.game.paused) {
            update(elapsedTime);
            render();
        // }
        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){
        var canvas = document.getElementById('canvas-main');
        seamus.update(elapsedTime)
        for (i = 0; i < currentStage.Stage.length; i++){
            if (!currentStage.Stage[i].hasOwnProperty("collide")){
                seamus.collision(currentStage.Stage[i]);
            }
        }
    }

    function render(){
        graphics.clear();
        seamus.draw();
        graphics.drawStage();        
    }

    return{
        init: init,
        paused: paused,
        reInit: reInit,
    }
}(Game.controls));