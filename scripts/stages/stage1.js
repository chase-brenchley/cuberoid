Game.stage1 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;

    var stage = [
        {x: .5, y: .85, width: .5, height: .3, color: "grey",}, //Middle platform
        {x: .95, y: .85, width: .1, height: .3, color: "grey",}, //Right platform
        {x: .825, y: 1-.05/2, width: .3, height: .05, color: "grey",}, // Dip
        {x: .01/2, y:.5, width: .01, height: 1, color: "grey"}, // left wall
        {x: 1-.02/2, y: .85-.3/2-.2/2, width: .02, height: .2, color: "clear", nextStage: Game.stage2}, //door
        {x: .5, y: 0+.01/2, width:1 , height: .01 , color: "grey"}, //ceiling
        {x: 1-.015/2, y: .5/2, width: .015, height: 1-(.3+.2), color: "grey"}, //right wall
        {x: .95+.05/2, y: .5, width: .05, height: .035, color: "grey"} // door overhang
    ]

    // var Constants = {
    //     get stage() {return stage;}, //access with Game.stage1.Constants["stage"]
    // }

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
        stage[4].nextStage = Game.stage2;
    }

    function draw() {
        for (i = 0; i < stage.length; i++){
            Game.graphics.drawRect(stage[i]);
        }

        var image = new Image(); //h: 64 w: 31 R: 2.06
        image.src = "assets/textures/closeddoorleft.png";
        width = .045;
        height = width * 4;
        height = .185;
        width = height / 4;

        Game.graphics.drawImage({
            image: image,
            dx: 1-width/2,
            dy: .608,
            dWidth: width,
            dHeight: height
        });

        var texture = new Image();
        texture.src = "assets/textures/floor.jpg";

        Game.graphics.drawImage({
            image: texture,
            dx: .5,
            dy: .75,
            dWidth: .1/1.7,
            dHeight: .1,
        })
    }

    return {
        Stage: stage,
        // Constants: Constants,
        draw: draw,
        init: init,
    }
}();