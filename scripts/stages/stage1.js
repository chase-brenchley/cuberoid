Game.stage1 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas, ctx;
    var width, height;

    var stage = [
        {x: .5, y: 1, width: (.1/1.7)*8, height: .6, color: "grey",}, //Middle platform
        {x: 1, y: 1, width: .2, height: .6, color: "grey",}, //Right platform
        {x: .825, y: 1-.05/2, width: .05*4, height: .05, color: "grey",}, // Dip
        {x: 0, y:.5, width: .1/1.7, height: 1, color: "grey"}, // left wall
        {x: 1-.02/2, y: .85-.3/2-.2/2, width: .02, height: .2, color: "clear", nextStage: Game.stage2, coords: {x:.1, y:.1}}, //door
        {x: .5, y: 0, width:1 , height: .1 , color: "grey"}, //ceiling
        {x: 1, y: .5/2, width: .1/1.7, height: .1*4, color: "grey"}, //right wall
        {x: .95+.05/2, y: .5, width: (.05/1.7)*4, height: .05, color: "grey"}, // door overhang
        {x:.5, y: .625, width:.1,height:.01, color:"red", noTexture: true}
    ]

    // var Constants = {
    //     get stage() {return stage;}, //access with Game.stage1.Constants["stage"]
    // }

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
        ctx = canvas.getContext('2d');        
    }

    function draw() {
        // for (i = 0; i < stage.length; i++){
        //     Game.graphics.drawRect(stage[i]);
        // }

        // Load images
        var stone = new Image();
        stone.src = "assets/textures/texture.jpg";
        var texture = new Image();
        texture.src = "assets/textures/stone1.jpg";
        var verticle = new Image();
        verticle.src = "assets/textures/stone1.jpg";
        var platform  = new Image();
        platform.src = "assets/textures/platform1.png";

        // Draw the background
        Game.graphics.drawBackground(stone);

        // Freaking door shenanigans
        var door = new Image(); //h: 64 w: 31 R: 2.06
        door.src = "assets/textures/closeddoorleft.png";
        height = .185;
        width = height / 4;

        Game.graphics.drawImage({
            image: door,
            dx: 1-width/2,
            dy: .608,
            dWidth: width,
            dHeight: height
        });

        Game.graphics.drawImage({
            image: platform,
            dx: .5,
            dy: .65,
            dWidth: .07*1.7,
            dHeight: .07
        })

        // Draw the textures. This is magic as far as I'm concerned
        for (var i = 0; i < stage.length; i++){
            if (!stage[i].hasOwnProperty("nextStage") && !stage[i].hasOwnProperty("noTexture")){
                Game.graphics.drawImage({
                    image: stone,
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
        // for (i = 0; i < stage.length; i++){
        //     Game.graphics.drawRect(stage[i]);
        // }
    }

    return {
        Stage: stage,
        // Constants: Constants,
        draw: draw,
        init: init,
    }
}();