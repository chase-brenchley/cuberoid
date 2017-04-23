Game.seamus = function(){    
    'use strict'


    function generateSeamus(){
        var that = {};  
        var runSpeed = .35;
        var animationPool = {};

        that.keyDown = window.addEventListener('keydown', function(event){
            if(event.key == that.jumpKey){
                if(that.canJump){
                    that.jumping = true;
                    that.canJump = false;
                    that.yVelocity = -1.3;
                }     
            }

            if(event.key == that.leftKey){
                that.left = true;
                that.right = false;
            }

            if(event.key == that.rightKey){
                that.left = false;
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

        that.updateControls = function(controls){
            that.upKey    = controls['up'];
            that.downKey  = controls['down']
            that.leftKey  = controls['left'];
            that.rightKey = controls['right'];
            that.jumpKey  = controls['jump'];
            that.shootKey = controls['shoot'];

            that.up = false;
            that.down = false;
            that.left = false;
            that.right = false;
            that.jump = false;
            that.shoot = false;
        }

        that.updateCoords = function(coords){
            that.x = coords.x;
            that.y = coords.y;
        }

        that.init = function(controls){
            that.health = 100;

            // Position/Dimension
            that.width = .05
            that.height = .15
            // that.x = 0 + that.width/2;
            // that.y = 0 + that.height/2;
            that.x = .5;
            that.y = .5;

            // Set controls
            that.upKey    = controls['up'];
            that.downKey  = controls['down']
            that.leftKey  = controls['left'];
            that.rightKey = controls['right'];
            that.jumpKey  = controls['jump'];
            that.shootKey = controls['shoot'];

            // States
            that.facingLeft = false;
            that.facingRight = false;
            that.facingForward = true;
            that.jumping = false;

            // Set active values for actions
            that.up = false;
            that.down = false;
            that.left = false;
            that.right = false;
            that.canJump = false;
            that.shoot = false;

            // Motion relavent variables
            that.xVelocity = 0; 
            that.yVelocity = 0;
            that.MAX_Y_VELOCITY = 2;

            // Each animation needs to know how many frames it contains and how long before transitioning
            // the width of each sprite in the sheet is img.width/frames
            animationPool.runLeft = {
                frames: 8,
                img: new Image(),
                timePerFrame: 75,
                counter: 0
            }
            animationPool.runLeft.img.src = 'assets/sprites/runLeft.png';

            animationPool.runRight = {
                frames: 8,
                img: new Image(),
                timePerFrame: 75,
                counter: 0
            }
            animationPool.runRight.img.src = 'assets/sprites/runRight.png';

            animationPool.faceForward = {
                frames: 1,
                img: new Image(),
                timePerFrame: 1000,
                counter: 0
            }
            animationPool.faceForward.img.src = 'assets/sprites/faceForward.png';

            // that.sprite = {
            //     spriteSheet: new Image(),
            //     x: that.x,
            //     y: that.y,
            //     width: that.width,
            //     height: that.height,
            //     rows: 6,
            //     cols: 8,
            //     spriteTime: 100, // time to display each animation frame
            //     counter: 0,     // count that indicates to move to next animation frame when it reaches spriteTime
            //     isReady: false,
            //     faceForward: [{row: 0, col: 0}],
            //     faceLeft: [{row: 5, col: 1}],
            //     faceRight: [{row: 5, col: 6}],
            //     runLeft: [
            //             {row: 2, col: 3}, {row: 2, col: 2}, {row: 2, col: 1}, {row: 2, col: 0},
            //             {row: 1, col: 3}, {row: 1, col: 2}, {row: 1, col: 1}, {row: 1, col: 0}
            //         ],
            //     runRight: [
            //             {row:2, col: 4}, {row:2, col: 5}, {row:2, col: 6}, {row:2, col: 7},
            //             {row:1, col: 4}, {row:1, col: 5}, {row:1, col: 6}, {row:1, col: 7} 
            //         ],    
            // }
            // that.sprite.spriteSheet.src = 'assets/sprites/samus1.png';

            // curAnimation keeps track of the currently executing animation. index refers to which sprite in the current 
            // sheet we are on. The horizontal position of that sprite is at animation.img.width/animation.frames * index 
            // and has a width of animation.img.width/animation.frames
            that.curAnimation = {animation: animationPool.faceForward, index: 0};
            // that.sprite.spriteSheet.onload = function(){
            //     that.sprite.isReady = true;
            // }
        }

        that.updateSprite = function(elapsedTime){
            'use strict'
            that.curAnimation.animation.counter += elapsedTime;
            
            if(that.left && that.curAnimation.animation != animationPool.runLeft){
                that.curAnimation.animation = animationPool.runLeft;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(that.right && that.curAnimation.animation != animationPool.runRight){
                that.curAnimation.animation = animationPool.runRight;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(!that.right && !that.left && that.curAnimation.animationFrame != animationPool.faceForward){
                that.curAnimation.animation = animationPool.faceForward;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }

            // If count has expired move to next 
            if(that.curAnimation.animation.counter >= that.curAnimation.animation.timePerFrame){
                that.curAnimation.animation.counter -= that.curAnimation.animation.timePerFrame;
                that.curAnimation.index = (that.curAnimation.index + 1) % that.curAnimation.animation.frames;
            }
            if(that.curAnimation.index > 8){
                console.log('error')
            }
        }

        that.update = function(elapsedTime){
            'use strict'
            // Update yVelocity and y position


            if(elapsedTime > 100){
                elapsedTime = 100;
            }

            that.updateSprite(elapsedTime);
            
            that.yVelocity += Game.physics.getGravity() * elapsedTime / 1000;
            if(that.yVelocity > that.MAX_Y_VELOCITY){
                that.yVelocity = that.MAX_Y_VELOCITY;
            }
            that.y += that.yVelocity  * elapsedTime/1000;

            // Update for jumping 
            if(that.jumping == true){
                that.jumpTime -= elapsedTime;
                //that.y -= Game.physics.getGravity()*elapsedTime/1000
                if(that.jumpTime <= 0){
                    that.jumping = false;
                }
            }

            // else{
            //     that.y += Game.physics.getGravity()*elapsedTime/1000;      
            // }
            if(that.left){
                that.facingLeft = true;
                that.facingForward = that.facingRight = false;
                that.xVelocity = -(runSpeed * elapsedTime / 1000);
                that.x += that.xVelocity;
                
            }
            else if(that.right){
                that.facingRight = true;
                that.facingLeft = that.facingForward = false;
                that.xVelocity = (runSpeed * elapsedTime / 1000);
                that.x += that.xVelocity;
            }
            else{
                that.xVelocity = 0;
            }

        }

        // for now just draw a colored rectangle, later do sprite animation.
        that.draw = function(){
            Game.graphics.drawRect({x: that.x, y: that.y, width: that.width, height: that.height, color: 'pink'});
            Game.graphics.drawSprite(that.curAnimation, that)
            //Game.graphics.drawSprite(that.curanimation, that);
        }

        that.collision = function(obj){
            var collisionSide = Game.physics.collision(that, obj);
            if(collisionSide == 'bottom'){
                if(that.yVelocity > 0){
                    that.yVelocity = 0;
                    that.canJump = true;
                }
            } 
            
            if(collisionSide == 'left' || collisionSide == 'right'){
                that.xVelocity = 0;
            }
            return (collisionSide != null ?  true: false);
        }

        return that;
    }


    return{
        generateSeamus: generateSeamus,
    }
}()