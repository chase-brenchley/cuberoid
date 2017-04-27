Game.stageJumpy = function() {
    var stageID = 'stageJumpy';

    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;
    var doorHeight = .18;
    var doorWidth = doorHeight/1.7/2.06;
    var background = new Image();
    var texture = new Image();
    var verticle = new Image();
    var platform  = new Image();
    var closedDoor = new Image();
    var closedDoorLeft = new Image();

    var stage = [
        {x: .85/2, y: 0,width: .85, height: .1, color:"grey"}, // Ceiling
        {x: 0, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Left Wall
        {x: 1, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Right Wall
        {x: .5, y: 1,width: 1, height: .1, color:"grey"}, // Floor
        {x: .5/2+(.1/1.7)/2, y: .16+.1, width: .5, height: .049, color: "red"}, // top left platform
        {x: 1-(.25/1.7)/2-(.1/1.7)/2, y: .6, width: .25/1.7, height: .049, color: "red"}, // right platform
        {x: .05, y: .15, width: doorWidth, height: doorHeight, color: "red", nextStage: null, coords: {x:null,y:null}}, // Top-left door
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
        stage[6].nextStage = Game.stage2; stage[6].coords = {x:1-.1, y: 1-.15};
    }

    function draw() {
        Game.graphics.drawBackground(background);

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
            if (!stage[i].hasOwnProperty("nextStage") && !stage[i].hasOwnProperty("noTexture")){
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

    return {
        Stage: stage,
        draw: draw,
        init: init,
        stageID: stageID

    }
}();