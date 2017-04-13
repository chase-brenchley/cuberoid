Game.seamus = function(){
    const MAX_JUMP_TIME = 500; // max jump time in ms
    var jumpTime, jumping;
    var health; // seamus stats
    var texture, x, y, width, height;   // drawing info
    var gravity; //units per second

    // Controls
    var jump, moveLeft, moveRight, fire;

    keyDownJumpListener = window.addEventListener('keydown', function(event){
        if(event.keyCode == jump){
            jumpTime = MAX_JUMP_TIME;
            jumping = true;
        }
    }) 

    keyUpJumpListener = window.addEventListener('keyup', function(event){
        if(event.keyCode == jump){
            jumping = false;
        }
    })

    function init(){
        health = 100;
        width = 50;
        height = 100;
        x = 0 + width/2;
        y = 0 + height/2;
        gravity = document.getElementById('canvas-main').height
        jump = 32
    }

    function update(elapsedTime){
        if(jumping == true){
            jumpTime -= elapsedTime;
            y -= gravity*elapsedTime/1000
            if(jumpTime <= 0){
                jumping = false;
            }
        }
        else{
            y += gravity*elapsedTime/1000;      
        }

    }

    // for now just draw a colored rectangle, later do sprite animation.
    function draw(){
        Game.graphics.drawRect({x: x, y: y, width: width, height: height, color: 'pink'});
    }

    return{
        init: init,
        draw: draw,
        update: update,
    }
}()