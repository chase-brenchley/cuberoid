Game = {};
// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = (function(controls){
    var curTime, prevTime;
    var seamus, graphics, physics, HUD;
    var currentStage;
    var paused;

    function init(){

        toggleBGMusic();
        curTime = prevTime = performance.now();
        graphics = Game.graphics;
        seamus = Game.seamus.generateSeamus(); 
        physics = Game.physics;
        currentStage = Game.stage1;
        HUD = Game.HUD;
        
        physics.init();
        graphics.init();
        Game.controls.init();
        seamus.init(Game.controls.controls);
        currentStage.init();
        HUD.init();
        
        Game.game.paused = false;
        requestAnimationFrame(gameLoop);
    }

    function reInit(){
        seamus.updateControls(Game.controls.controls)
        Game.game.paused = false;
        curTime = prevTime = performance.now();        
        requestAnimationFrame(gameLoop);
    }

    function toggleBGMusic(){
        if(document.getElementById('musicToggle').checked){
            BGMusic.pause();
            BGMusic = new Audio("assets/sound/BGMusic.mp3");
            BGMusic.loop = true;
            playSound(BGMusic);
        }
    }

    function updateCollisions(){
        for (i = 0; i < currentStage.Stage.length; i++){
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
        var canvas = document.getElementById('canvas-main');
        seamus.update(elapsedTime)
        updateCollisions();
        HUD.update();
    }

    function render(){
        graphics.clear();
        graphics.drawStage(currentStage);
        seamus.draw();
        HUD.draw(seamus.health, seamus.missiles, curTime);
    }

    return{
        init: init,
        paused: paused,
        reInit: reInit,
    }
}(Game.controls));