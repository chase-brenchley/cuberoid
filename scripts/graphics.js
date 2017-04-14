Game.graphics = function(){
    var canvas;
    
    function init(){
        canvas = document.getElementById('canvas-main');
        console.log(canvas)
    }

    function clear(){
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // spec has x, y, width, height, color. Where x and y are the center of the rect to draw
    function drawRect(spec){
      let context = canvas.getContext("2d");
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
        init: init,
        clear: clear,
        drawRect: drawRect
    }
}()