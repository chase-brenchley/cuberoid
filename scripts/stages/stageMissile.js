Game.stageMissile = function() {
    var stageID = 'stageMissile';
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height, boss, missilePickup;
    var doorHeight = .18;
    var doorWidth = doorHeight/1.7/2.06;
    var background = new Image();
    var texture = new Image();
    var verticle = new Image();
    var platform  = new Image();
    var closedDoor = new Image();
    var closedDoorLeft = new Image();
    var missilesPickedUp = false;

    var missilePickupImage = new Image();

    var stage = [
        {x: .5, y: 0,width: 1, height: .1, color:"grey"}, // Ceiling
        {x: 0, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Left Wall
        {x: 1, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Right Wall
        {x: .85/2, y: 1,width: .85, height: .1, color:"grey"}, // Floor
        {x: .2, y: .16+.1, width: .4, height: .049, color: "red"}, // top left platform
        {x: .8, y: .16+.1, width: .4, height: .049, color: "red"}, // top right platform
        {x: .05, y: .15, width: doorWidth, height: doorHeight, color: "red", nextStage: null, coords: {x:null,y:null}}, // Top-left door
        {x: .85+.15/2, y: 1+.17, width: .15, height: .05, color: "red", nextStage: null, coords: {x:null,y:null}}, // Top-left door
    ]

    function init(){
        background.src = "assets/textures/texture.jpg";
        texture.src = "assets/textures/stone1.jpg";
        verticle.src = "assets/textures/stone1.jpg";
        platform.src = "assets/textures/platform1.png";
        closedDoor.src = "assets/textures/closeddoor.png";
        closedDoorLeft.src = "assets/textures/closeddoorleft.png";

        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
        stage[6].nextStage = Game.stage2; stage[6].coords = {x:1-.1, y: .15};
        stage[7].nextStage = Game.stageJumpy; stage[7].coords = {x:.85+.15/2, y: -.17};
        boss = Game.enemies.bossMissile.generate({startLocation: {x:.03, y:1-(.05+.14*2)}})
        stage[8] = boss.getEverything();
        missilePickup = {x: .05, y: 1-.075, height: .05, width: .05/1.7, color: "blue", addMissiles: 50, pickedUp: missilesPickedUp, canCollide: false}
        stage[9] = missilePickup;
        missilePickupImage.src = "assets/sprites/missilePickup.png";
    }

    function draw() {
        Game.graphics.drawBackground(background);

        if (boss.alive) boss.draw();
        else if(stage[9].pickedUp == false) {
            stage[9].canCollide = true;
            Game.graphics.drawImage({
                image: missilePickupImage,
                dx: missilePickup.x,
                dy: missilePickup.y,
                dWidth: missilePickup.width,
                dHeight: missilePickup.height
            })
        }

        Game.graphics.drawImage({
            image: closedDoor,
            dx: .05,
            dy: .15,
            dWidth: doorWidth,
            dHeight: doorHeight
        })

        // for (i = 0; i < stage.length; i++){
        //     Game.graphics.drawRect(stage[i]);
        // }

        for (var i = 0; i < stage.length; i++){
            if (!stage[i].hasOwnProperty("nextStage") && !stage[i].hasOwnProperty("noTexture") && !stage[i].hasOwnProperty("alive") && !stage[i].hasOwnProperty("addMissiles")){
                Game.graphics.drawImage({
                    image: background,
                    dx: stage[i].x,
                    dy: stage[i].y,
                    dWidth: stage[i].width,
                    dHeight: stage[i].height
                })
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
                        Game.graphics.drawImage({
                        image: verticle,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                }
                for (x = stage[i].x+stage[i].width/2-(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
                        Game.graphics.drawImage({
                        image: verticle,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                }
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
                    Game.graphics.drawImage({
                        image: texture,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    }) 
                }
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y+stage[i].height/2-.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
                    Game.graphics.drawImage({
                        image: texture,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                    
                }
            }
        }
        
    }

    function update(time){
        stage[9].pickedUp ? missilesPickedUp = true: missilesPickedUp = false;
        boss.health = stage[8].health;
        stage[8] = boss.getEverything();
        boss.update(time);
    }
    
    function updatePickup(bool){
        missilesPickedUp = bool;
    }

    return {
        Stage: stage,
        update: update,
        draw: draw,
        init: init,
        stageID: stageID,
        updatePickup: updatePickup,

    }
}();