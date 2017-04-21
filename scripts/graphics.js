Game.graphics = function(){
    var canvas, context, currentStage;

    function init(){
        canvas = document.getElementById('canvas-main');
        context = canvas.getContext('2d');
        currentStage = Game.stage1;
        // currentStage = Game.stage2;     
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

    // spec = {
        // image:
        // dx:
        // dy:
        // dWidth:
        // dHeight:
    // }
    function drawImage(spec){
        context.drawImage(spec.image, spec.dx, spec.dy);
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
        drawStage: drawStage,
        drawImage: drawImage,
        getWidth: getWidth,
        getHeight: getHeight
    }
}()