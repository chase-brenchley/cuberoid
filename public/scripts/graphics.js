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

    function drawCornerRect(spec){
        context.save();
        context.beginPath();
        context.rect((spec.x) * canvas.width, (spec.y) * canvas.height, spec.width * canvas.width, spec.height * canvas.height);
        context.fillStyle = spec.color;
        context.fill();
        context.closePath();
        context.restore();
    }

    function drawText(spec){
        context.save();
        context.font = spec.font;
        context.fillStyle = spec.color;
        context.fillText(spec.text, spec.x*canvas.width, spec.y*canvas.height);
        context.restore();
    }

    function drawCenterText(spec){
        context.save();
        context.font = spec.font;
        context.fillStyle = spec.color;
        context.fillText(spec.text, (spec.x - .5 *.5)*canvas.width, (spec.y-.5*.1)*canvas.height);
        context.restore();
    }

    /*
        curAnimation has the following relavent properties
        curAnimation = {
            animation: {
                frames: (number of frames in image),
                img: (image containing sprites),
            },
            index: (index of the image)
        }

        spec has the following relevent properties
        spec ={
            x: (x position in world coordinates),
            y: (y position in world coordinates),
            width: (width in world coordinates),
            height: (height in world coordinates)
        }

        spec.height and spec.width specifies how tall/wide the animation should be (in case the animation 
        should be larger than the actual hitbox for example) in world coordinates
    */
    function drawSprite(curAnimation){
        // x, y position in image of top left corner of sprite
        let sx = curAnimation.animation.img.width / curAnimation.animation.frames * curAnimation.index;
        let sy = 0;

        // width and height in pixels of the sprite to grab from the image
        var swidth = curAnimation.animation.img.width / curAnimation.animation.frames;
        var sheight = curAnimation.animation.img.height;
        
        // x, y position in the canvas of the top left corner of the sprite
        let x = (curAnimation.x - curAnimation.width/2) * canvas.width;
        let y = (curAnimation.y - curAnimation.height/2) * canvas.height;

        // with and height in the canvas of the animation
        let width = curAnimation.width * canvas.width;
        let height = curAnimation.height * canvas.height;

        //context.drawImage(spec.spriteSheet, topLeft.x, topLeft.y, swidth, sheight, spec.x - spec.width / 2, spec.y - spec.height / 2, spec.width, spec.height)
        context.drawImage(curAnimation.animation.img, sx, sy, swidth, sheight, x, y, width, height)
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
        drawSprite: drawSprite,
        drawStage: drawStage,
        drawImage: drawImage,
        drawBackground: drawBackground,
        getWidth: getWidth,
        getHeight: getHeight,
        drawCornerRect: drawCornerRect,
        drawText: drawText,
        drawCenterText: drawCenterText,
    }
}()