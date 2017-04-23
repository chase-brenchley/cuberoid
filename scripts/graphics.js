Game.graphics = function(){
    var canvas, context, currentStage;

    var ratio = 1.7;

    function init(){
        canvas = document.getElementById('canvas-main');
        context = canvas.getContext('2d');
        // currentStage = Game.stage1;
        // currentStage = Game.stage2;     
        canvas.height = window.innerHeight * .98;
        canvas.width = canvas.height * ratio;
        while(canvas.width > window.innerWidth * .98){
            canvas.height -= 1;
            canvas.width = canvas.height * ratio;
        }
        // currentStage.init();
        console.log(canvas)
        // console.log(currentStage);        
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
        numArgs = Object.keys(spec).length;
        if (numArgs == 3) context.drawImage(spec.image, (spec.dx - .5 * spec.image.width) * canvas.width, (spec.dy - .5 * spec.image.height) * canvas.height);
        else if (numArgs == 5) context.drawImage(spec.image, (spec.dx - .5 * spec.dWidth) * canvas.width, (spec.dy - .5 * spec.dHeight) * canvas.height, spec.dWidth * canvas.width, spec.dHeight * canvas.height);
        else if (numArgs == 9) context.drawImage(spec.image, spec.sx, spec.sy, spec.sWidth, spec.sHeight, spec.dx, spec.dy, spec.dWidth, spec.dHeight);
    }

    function drawStage(stage){
        // currentStage.draw();     
        stage.draw();       
    }

    function drawBackground(img){
        context.save();
        context.globalAlpha = 0.4;
        Game.graphics.drawImage({
                image: img,
                dx: .5,
                dy: .5,
                dWidth: 1,
                dHeight: 1
            })
        context.restore();
    }

    function getWidth(){
        return canvas.width;
    }

    function getHeight(){
        return canvas.height;
    }

    return{
        ratio: ratio,
        init: init,
        clear: clear,
        drawRect: drawRect,
        drawStage: drawStage,
        drawImage: drawImage,
        drawBackground: drawBackground,
        getWidth: getWidth,
        getHeight: getHeight
    }
}()