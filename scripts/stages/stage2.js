Game.stage2 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
    }

    function draw() {
        Game.graphics.drawRect({
            x: canvas.width/2, 
            y: canvas.height -10,
            width: canvas.width/2,
            height: 50,
            color: "grey",
        })

        Game.graphics.drawRect({
            x: canvas.width-300/2,
            y: 600,
            width: 300,
            height: 50,
            color: "grey"
        })

        Game.graphics.drawRect({
            x: canvas.width-25/2,
            y: 600-100,
            width: 25,
            height: 150,
            color: "red"
        })
    }

    return {
        draw:draw,
        init: init,
    }
}();