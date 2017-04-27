Game = {};
// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = (function(controls){
    var curTime, prevTime;
    var newGameTime = 0;
    var seamus, graphics, physics, HUD;
    var currentStage;
    var paused;
    var HUD;
    var runningTime = 0;

    // Greatest amount of elapsed time to pass to an update function 
    const MAX_ELAPSED_TIME = 150; 

    function init(){

        toggleBGMusic();
        runningTime = 0;
        newGameTime = performance.now();
        curTime = prevTime = performance.now();
        graphics = Game.graphics;
        if(seamus == undefined){
            seamus = Game.seamus.generateSeamus(); 
        }
        seamus.init(Game.controls.controls);

        physics = Game.physics;
        currentStage = Game.stage1;
        HUD = Game.HUD;
        
        physics.init();
        graphics.init();
        Game.controls.init();
        currentStage.init();
        HUD.init();
        Game.stageJumpy.updatePickup(false);
        Game.stageMissile.updatePickup(false);
        
        Game.particles.clear();

        Game.game.paused = false;
        requestAnimationFrame(gameLoop);
    }

    function reInit(){
        seamus.updateControls(Game.controls.controls)
        Game.game.paused = false;
        curTime = prevTime = performance.now();        
        requestAnimationFrame(gameLoop);
    }

    function getSaveData(){
        return{
            seamus: seamus,
            stageID: currentStage.stageID,
            runningTime: runningTime,
        }
    }

    function loadGame(data){
        // make data an object again
        if(data == undefined || data == ""){
            alert('Failed to load game');
            return;
        }

        data = JSON.parse(data);
        alert('Load successfull')
        console.log(data);
        
        playSound(gameStartSnd);
        // Make page-mainmenu be gone and display canvas
        document.getElementById('page-mainmenu').style.display = "none";
        document.getElementById('canvas-main').style.display = "block";
        canvas = document.getElementById("canvas-main");
        // canvas.width = window.innerWidth-20; //document.width is obsolete
        // canvas.height = window.innerHeight-20; //document.height is obsolete
        gameInProgress = true;

        toggleBGMusic();
        runningTime = data.runningTime;
        newGameTime = performance.now();
        curTime = prevTime = performance.now();
        graphics = Game.graphics;
        if(seamus == undefined){
            seamus = Game.seamus.generateSeamus(); 
        }
        seamus.init(Game.controls.controls);

        seamus.health = data.seamus.health;
        seamus.x = data.seamus.x;
        seamus.y = data.seamus.y;
        seamus.canJump = data.seamus.canJump;
        seamus.missileCount = data.seamus.missileCount;
        
        physics = Game.physics;

        if(data.stageID == 'stage1'){
            currentStage = Game.stage1;
        }
        else if(data.stageID == 'stage2'){
            currentStage = Game.stage2;
        }
        else if(data.stageID == 'stageBoss'){
            currentStage = Game.stageBoss;
        }
        else if(data.stageID == 'stageJumpy'){
            currentStage = Game.stageJumpy;
        }
        else if(data.stageID == 'stageMissile'){
            currentStage = Game.stageMissile;
        }
        else{
            alert("Error loading stage");
        }

        HUD = Game.HUD;
        
        physics.init();
        graphics.init();
        Game.controls.init();
        currentStage.init();
        HUD.init();
        
        Game.particles.clear();

        Game.game.paused = false;
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
        Game.particles.collision(seamus);
        // Check collisions
        for (i = 0; i < currentStage.Stage.length; i++){
            if(currentStage.Stage[i].hasOwnProperty("alive")){
                if(currentStage.Stage[i].alive) Game.particles.collision(currentStage.Stage[i]);
            }
            else {
                Game.particles.collision(currentStage.Stage[i]);
            }

            if (!currentStage.Stage[i].hasOwnProperty("nextStage")){
                if(currentStage.Stage[i].hasOwnProperty("alive") && currentStage.Stage[i].alive == false){
                    collide = false;
                }
                else if (currentStage.Stage[i].hasOwnProperty("pickedUp") && currentStage.Stage[i].pickedUp == false && currentStage.Stage[i].canCollide){
                    collide = seamus.collision(currentStage.Stage[i])
                    if(collide){
                        if (currentStage.Stage[i].hasOwnProperty("addMissiles")) seamus.missileCount = currentStage.Stage[i].addMissiles;
                        else if (currentStage.Stage[i].upgrade == "jump") seamus.updateGravity(2);
                        currentStage.Stage[i].pickedUp = true;
                    }
                } 
                else if (currentStage.Stage[i].pickedUp == true || (currentStage.Stage[i].hasOwnProperty("canCollide") && !currentStage.Stage[i].canCollide)) collide = false;

                else collide = seamus.collision(currentStage.Stage[i]);;

                if (collide && currentStage.Stage[i].hasOwnProperty("alive")) seamus.takeDamage(5);
            } else {
                if(seamus.collision(currentStage.Stage[i]) == true){
                    currentStage.Stage[i].hasOwnProperty("coords") ? coords = currentStage.Stage[i].coords: coords = {x:.5,y:.5};
                    currentStage = currentStage.Stage[i].nextStage;
                    currentStage.init();
                    seamus.updateCoords(coords)
                    Game.particles.clear();
                    break;
                }
            }
        }
    }

    function update(elapsedTime){
        if(elapsedTime > MAX_ELAPSED_TIME){
            elapsedTime = MAX_ELAPSED_TIME;
        }
        runningTime += elapsedTime;
        
        var canvas = document.getElementById('canvas-main');
        seamus.update(elapsedTime)
        Game.particles.update(elapsedTime);
        if(currentStage.hasOwnProperty('update')) currentStage.update(elapsedTime);
        HUD.update();
        updateCollisions();
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

    function render(){
        graphics.clear();
        graphics.drawStage(currentStage);
        seamus.draw();
        HUD.draw(seamus.health, seamus.missileCount, runningTime);
        Game.particles.draw();
    }

    function getSeamus(){
        return seamus;
    }

    return{
        init: init,
        paused: paused,
        reInit: reInit,
        getSaveData: getSaveData,
        loadGame: loadGame,
        getSeamus, getSeamus,
    }
}(Game.controls));