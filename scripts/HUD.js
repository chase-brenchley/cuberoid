Game.HUD = function() {
    var missileImage;

    function init(){
        missileImage = new Image();
        missileImage.src = "assets/textures/missile.png"; //w = 6, h = 13, r = .46
    }

    function update(){

    }

    // health is seamus' health out of 100, missiles is number of missiles
    function draw(health, missiles, time){
        drawHealth(health);
        drawMissileCount(parseInt(missiles));
        drawTime(parseInt(time/1000));
    }

    function drawHealth(health){
        Game.graphics.drawCornerRect({ // The container
            x: .05,
            y: .02,
            width: .15,
            height: .013*2,
            color: "black"
        })
        Game.graphics.drawCornerRect({
            x: .05+.013/2,
            y: .02+.013/2,
            width: .15-.013,
            height: .013,
            color: "red",
        })
        var width = health/100*(.15-.013);
        Game.graphics.drawCornerRect({
            x: .05+.013/2,
            y: .02+.013/2,
            width: width,
            height: .013,
            color: "green",
        })
    }

    function drawMissileCount(missiles){
        // missiles = "8";
        Game.graphics.drawImage({
            image: missileImage,
            dx: .45,
            dy: .025,
            dWidth: .04/1.7*.46,
            dHeight: .04,
        })
        Game.graphics.drawText({
            font: "20px '8BITWONDERNominal",
            text: "X "+missiles,
            x: .47,
            y: .035,
            color: "orange"
        })
    }

    function drawTime(time){
        Game.graphics.drawText({font: "30px '8BITWONDERNominal'", text: "Time: "+time, x: 1-.2, y: .04, color: "orange",});
    }

    return {
        init: init,
        update: update,
        draw: draw
    }
}();