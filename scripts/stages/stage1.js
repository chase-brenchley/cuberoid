Game.stage1 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;

    var stage = [
        {x: .5, y: .85, width: .5, height: .3, color: "grey",},
        {x: .95, y: .85, width: .1, height: .3, color: "grey",},
        {x: .825, y: 1-.05/2, width: .3, height: .05, color: "grey",},
    ]

    // var Constants = {
    //     get stage() {return stage;}, //access with Game.stage1.Constants["stage"]
    // }

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
    }

    function draw() {
        for (i = 0; i < stage.length; i++){
            Game.graphics.drawRect(stage[i]);
        }
    }

    return {
        Stage: stage,
        // Constants: Constants,
        draw: draw,
        init: init,
    }
}();