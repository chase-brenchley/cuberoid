Game.seamus = function(){    
    'use strict'


    function generateSeamus(){
        var that = {};  
        
        that.keyDown = window.addEventListener('keydown', function(event){
            if(event.key == that.jumpKey){
                that.jumping = true;
                that.yVelocity = -5;
            }

            if(event.key == that.leftKey){
                that.left = true;
            }

            if(event.key == that.rightKey){
                that.right = true;
            }

            if(event.key == that.upKey){
                
            }

            if(event.key == that.downKey){

            }

            if(event.key == that.shoot){

            }
        }) 

        that.keyUp = window.addEventListener('keyup', function(event){
            if(event.key == that.jumpKey){
                that.jumping = false;
                if(that.yVelocity < 0){
                    that.yVelocity = 0;
                }
            }

            if(event.key == that.leftKey){
                that.left = false;
            }

            if(event.key == that.rightKey){
                that.right = false;
            }

            if(event.key == that.upKey){
                
            }

            if(event.key == that.downKey){

            }

            if(event.key == that.shootKey){

            }
        })

        that.init = function(controls){
            that.health = 100;

            // Position/Dimension
            that.width = 50;
            that.height = 100;
            that.x = 0 + that.width/2;
            that.y = 0 + that.height/2;

            // Set controls
            that.upKey    = controls['up'];
            that.downKey  = controls['down']
            that.leftKey  = controls['left'];
            that.rightKey = controls['right'];
            that.jumpKey  = controls['jump'];
            that.shootKey = controls['shoot'];

            // Set active values for actions
            that.up = false;
            that.down = false;
            that.left = false;
            that.right = false;
            that.jump = false;
            that.shoot = false;

            // Motion relavent variables
            that.xVelocity = 5; 
            that.yVelocity = 0;
            that.MAX_JUMP_TIME = 1000; // max jump time in ms
            that.MAX_Y_VELOCITY = document.getElementById('canvas-main').height;
            that.MAX_JUMP_TIME = 200;
        }


        that.update = function(elapsedTime){
            'use strict'
            // Update yVelocity and y position
            that.yVelocity += Game.physics.getGravity() * elapsedTime/1000;
            if(that.yVelocity > that.MAX_Y_VELOCITY){
                that.yVelocity = that.MAX_Y_VELOCITY;
            }

            // Update for jumping 
            if(that.jumping == true){
                that.jumpTime -= elapsedTime;
                //that.y -= Game.physics.getGravity()*elapsedTime/1000
                if(that.jumpTime <= 0){
                    that.jumping = false;
                }
            }

            that.y += that.yVelocity;
            // else{
            //     that.y += Game.physics.getGravity()*elapsedTime/1000;      
            // }

            // Update horizontal motion
            if(that.left){
                that.x -= that.xVelocity;
            }
            if(that.right){
                that.x += that.xVelocity;
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