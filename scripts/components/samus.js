Game.samus = function(){
    const MAX_JUMP_TIME = 500; // max jump time in ms
    var jumpTime, jumping;
    var health; // Samus stats
    var texture, x, y, width, height;   // drawing info

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
        x = 0 + width/2;
        y = 0 + height/2;
    }

    function updadte(elapsedTime){
        if(jumping == true){
            jumpTime -= elapsedTime;
            
            if(jumpTime <= 0){
                jumping = false;
            }
        }
    }

    // for now just draw a colored rectangle, later do sprite animation.
    function draw(){
        Game.graphics.drawRect({x: x, y: y, width: width, color: 'pink'});
    }

    return{
        draw: draw,
    }
}()