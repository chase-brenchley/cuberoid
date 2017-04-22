Game.graphics = function(){
    var canvas, context, currentStage;

    function init(){
        canvas = document.getElementById('canvas-main');
        context = canvas.getContext('2d');
        // currentStage = Game.stage1;
        currentStage = Game.stage2;     
        canvas.height = window.innerHeight * .98;
        canvas.width = canvas.height * 1.7;
        while(canvas.width > window.innerWidth * .98){
            canvas.height -= 1;
            canvas.width = canvas.height * 1.7;
        }
        currentStage.init();
        console.log(canvas)
        console.log(currentStage);        
    }

    function clear(){
        // var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // spec has x, y, width, height, color. Where x and y are the center of the rect to draw
    function drawRect(spec){
    //   let context = canvas.getContext("2d");
      context.save();
      context.beginPath();
      context.rect((spec.x - .5 * spec.width) * canvas.width, (spec.y - .5 * spec.height) * canvas.height, spec.width * canvas.width, spec.height * canvas.height);
      context.fillStyle = spec.color;
      context.fill();
      context.closePath();
      context.restore();
    }

    /**
    *   spriteSheet: new Image(),
        rows: 8,
        cols: 6,
        spriteTime: 250, // time to display each animation frame
        counter: 0,
        curAnimation{animationFrame, index}
    */
    function drawSprite(spec){
        'use strict'
        
        var topLeft = {
            x: spec.curAnimation.animationFrame[spec.curAnimation.index].col * spec.spriteSheet.width / spec.cols,
            y: spec.curAnimation.animationFrame[spec.curAnimation.index].row * spec.spriteSheet.height / spec.rows
        }
        var swidth = spec.spriteSheet.width / spec.cols;
        var sheight = spec.spriteSheet.height / spec.rows;

        //context.drawImage(spec.spriteSheet, topLeft.x, topLeft.y, swidth, sheight, spec.x - spec.width / 2, spec.y - spec.height / 2, spec.width, spec.height)
        context.drawImage(spec.spriteSheet, topLeft.x, topLeft.y, spec.spriteSheet.width/8, spec.spriteSheet.height/6, (spec.x - spec.width / 2) * canvas.width, (spec.y - spec.height / 2) * canvas.height, spec.width * canvas.width * 1.7, spec.height * canvas.height)
    }

    function drawStage(){
        currentStage.draw();
    }

    function getWidth(){
        return canvas.width;
    }

    function getHeight(){
        return canvas.height;
    }

    return{
        init: init,
        clear: clear,
        drawRect: drawRect,
        drawSprite: drawSprite,
        drawStage: drawStage,
        getWidth: getWidth,
        getHeight: getHeight
    }
}()