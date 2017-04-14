Game.graphics = function(){
    var canvas, context, currentStage;
    
    function init(){
        canvas = document.getElementById('canvas-main');
        context = canvas.getContext('2d');
        // currentStage = Game.stage1;
        currentStage = Game.stage2;        
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
      context.rect(spec.x - .5 * spec.width, spec.y - .5 * spec.height, spec.width, spec.height);
      context.fillStyle = spec.color;
      context.fill();
      context.closePath();
      context.restore();
    }

    function drawStage(){
        currentStage.draw();
    }

    return{
        init: init,
        clear: clear,
        drawRect: drawRect,
        drawStage: drawStage,
    }
}()