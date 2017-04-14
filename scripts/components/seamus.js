Game.seamus = function(){    


    function generateSeamus(){
        'use strict'
        var that = {};  

        // Controls
        var jump, moveLeft, moveRight, fire;
        
        that.keyDownJumpListener = window.addEventListener('keydown', function(event){
            if(event.keyCode == that.jump){
                that.jumpTime = that.MAX_JUMP_TIME;
                that.jumping = true;
            }
        }) 

        that.keyUpJumpListener = window.addEventListener('keyup', function(event){
            if(event.keyCode == that.jump){
                that.jumping = false;
            }
        })

        that.init = function(){
            that.health = 100;
            that.width = 50;
            that.height = 100;
            that.x = 0 + that.width/2;
            that.y = 0 + that.height/2;
            that.gravity = document.getElementById('canvas-main').height
            that.jump = 32
            that.xVelocity = 0; 
            that.yVelocity = 0;
            that.MAX_JUMP_TIME = 500; // max jump time in ms
            that.MAX_Y_VELOCITY = document.getElementById('canvas-main').height * 1.5;
            that.jumping = false;
            that.jumpTime = 0;
            that.MAX_JUMP_TIME = 200;
            jump = controls['jump'];
            moveLeft = controls['left'];
            moveRight = controls['right'];
            fire = controls['shoot'];
        }


        that.update = function(elapsedTime){
            that.yVelocity += that.gravity;

            if(that.yVelocity > that.MAX_Y_VELOCITY){
                that.yVelocity = that.MAX_Y_VELOCITY;
            }
            if(that.jumping == true){
                that.jumpTime -= elapsedTime;
                that.y -= that.gravity*elapsedTime/1000
                if(that.jumpTime <= 0){
                    that.jumping = false;
                }
            }
            else{
                that.y += that.gravity*elapsedTime/1000;      
            }
        }

        // for now just draw a colored rectangle, later do sprite animation.
        that.draw = function(){
            Game.graphics.drawRect({x: that.x, y: that.y, width: that.width, height: that.height, color: 'pink'});
        }

        return that;
    }


    return{
        generateSeamus: generateSeamus,
    }
}()