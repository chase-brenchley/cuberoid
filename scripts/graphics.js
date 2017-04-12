Game.graphics = function(){
    var canvas = document.getElementById('canvas-main');
    
    // spec has x, y, width, height, color. Where x and y are the center of the rect to draw
    function drawRect(spec){
      let context = game.canvas.getContext("2d");
      context.save();
      context.beginPath();
      context.rect(spec.x - .5 * spec.width, spec.y - .5 * spec.height, spec.width, spec.height);
      context.fillStyle = spec.color;
      context.fill();
      context.closePath();
      context.restore();
    }

    function drawFloor(params) {
        
    }

    return{
        drawRect: drawRect
    }
}()