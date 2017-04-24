Game.stage2 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;

    var stage = [
        {x: .5, y: 0,width: 1, height: .1, color:"grey"}, // Ceiling
        {x: 0, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Left Wall
        {x: 1, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Right Wall
        {x: .5, y: 1,width: 1, height: .1, color:"grey"}, // Floor
        {x: .7, y: .7/2+.1/2, width: .05/1.7, height: .7, color: "green"}, // Separating wall
        {x: .5/2+(.1/1.7)/2, y: .16+.1, width: .5, height: .05, color: "red"}, // top left platform
        {x: .435, y: (.16+.1)*2, width: .5, height: .05, color: "red"}, // middle platform
        {x: .5/2+(.1/1.7)/2, y: (.16+.1)*3, width: .5, height: .05, color: "red"}, // top left platform
        {x: 1-(.2/1.7)/2-(.1/1.7)/2, y: .6, width: .2/1.7, height: .05, color: "red"}, // right platform
        {x: 1-(.2/1.7)/2-(.1/1.7)/2, y: .16+.1, width: .2/1.7, height: .05, color: "red"}, // right-top platform
        {x: .745, y: .45, width: .1/1.7, height: .05, color: "red"},
        {}, // Bottom-right door
        {}, // Top-right door
        {}, // Top-left door
    ]

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
        // stage[4].nextStage = Game.stage1;
    }

    function draw() {
        var background = new Image();
        background.src = "assets/textures/texture.jpg";
        var texture = new Image();
        texture.src = "assets/textures/stone1.jpg";
        var verticle = new Image();
        verticle.src = "assets/textures/stone1.jpg";
        var platform  = new Image();
        platform.src = "assets/textures/platform1.png";

        Game.graphics.drawBackground(background);

        for (i = 0; i < stage.length; i++){
            Game.graphics.drawRect(stage[i]);
        }

        // for (var i = 0; i < stage.length; i++){
        //     if (!stage[i].hasOwnProperty("nextStage") && !stage[i].hasOwnProperty("noTexture")){
        //         Game.graphics.drawImage({
        //             image: background,
        //             dx: stage[i].x,
        //             dy: stage[i].y,
        //             dWidth: stage[i].width,
        //             dHeight: stage[i].height
        //         })
        //         for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
        //                 Game.graphics.drawImage({
        //                 image: verticle,
        //                 dx: x,
        //                 dy: y,
        //                 dWidth: .05/1.7,
        //                 dHeight: .05,
        //             })
        //         }
        //         for (x = stage[i].x+stage[i].width/2-(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
        //                 Game.graphics.drawImage({
        //                 image: verticle,
        //                 dx: x,
        //                 dy: y,
        //                 dWidth: .05/1.7,
        //                 dHeight: .05,
        //             })
        //         }
        //         for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
        //             Game.graphics.drawImage({
        //                 image: texture,
        //                 dx: x,
        //                 dy: y,
        //                 dWidth: .05/1.7,
        //                 dHeight: .05,
        //             })
                    
        //         }
        //         for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y+stage[i].height/2-.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
        //             Game.graphics.drawImage({
        //                 image: texture,
        //                 dx: x,
        //                 dy: y,
        //                 dWidth: .05/1.7,
        //                 dHeight: .05,
        //             })
                    
        //         }
        //     }
        // }
        
    }

    return {
        Stage: stage,
        draw: draw,
        init: init,
    }
}();