Game.stage2 = function() {
    let canvas;
    var width, height;

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
    }

    // let floor = function(){
    //     var pox = canvas.width/2;
    //     var poy = canvas.height-20;
    //     var width = canvas.width;
    //     var height = 40;

    //     return {
    //         x: pox,
    //         y: poy,
    //         width: width,
    //         height: height,
    //         color: 'grey',
    //     }
    // } ();

    function draw() {
        Game.graphics.drawRect({
            x: .3,
            y: .3,
            width: .3,
            height: .3,
            color: 'blue'
        });

        var image = new Image();
        image.src = "assets/textures/floor.jpg";

        Game.graphics.drawImage({
            image: image,
            dx: 50,
            dy: .3,
        })

        
        // Game.graphics.drawRect({
        //     x: canvas.width/2, 
        //     y: canvas.height -10,
        //     width: canvas.width/2,
        //     height: 50,
        //     color: "grey",
        // })

        // Game.graphics.drawRect({
        //     x: canvas.width-300/2,
        //     y: 600,
        //     width: 300,
        //     height: 50,
        //     color: "grey"
        // })

        Game.graphics.drawRect({
            x: canvas.width/2,
            y: canvas.height-40-150/2,
            width: 75,
            height: 150,
            color: "red"
        })
    }

    return {
        draw:draw,
        init: init,
    }
}();