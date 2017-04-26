Game.seamus = function(){    
    'use strict'


    function generateSeamus(){
        var that = {};  
        var runSpeed = .45;
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
                that.facingLeft = true;
                that.right = false;
                that.facingRight = false;
            }

            if(event.key == that.rightKey){
                that.right = true;
                that.facingRight = true;
                that.left = false;
                that.facingLeft = false;
            }

            if(event.key == that.upKey){
                
            }

            if(event.key == that.downKey){

            }

            if(event.key == that.shootKey){
                if(!that.shoot){
                    that.shoot = true;
                    
                    let spec = {
                        x: that.x,
                        y: that.y - that.height * .09,
                        angle: 0,
                        width: that.height * .2 / 1.7,
                        height: that.height * .2,
                        speed: runSpeed * 1.8,
                        image: new Image(),
                        damage: 10,
                        affectedByGravity: false,
                        lifeTime: 10000
                    }
                    
                    // Offset the x from seamus' center
                    if(that.facingLeft){
                        spec.x -= that.width/2;
                        spec.angle = Math.PI;
                    }
                    else{
                        spec.x += that.width/2;
                    }

                    if(that.facingLeft){
                        spec.image.src = "assets/sprites/leftPewpew.png";
                    }
                    else{
                        spec.image.src = "assets/sprites/rightPewpew.png";
                    }

                    Game.particles.generatePewpew(spec)
                }
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
                that.shoot = false;
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
            that.missileCount = 0;

            // Position/Dimension
            that.width = .04
            that.height = .16

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

            // Floor that we are in contact with (bottom edge of seamus)
            that.floor = null;

            // Each animation needs to know how many frames it contains and how long before transitioning
            // the width of each sprite in the sheet is img.width/frames
            animationPool.runLeft = {
                frames: 10,
                img: new Image(),
                timePerFrame: 40,
                counter: 0
            }
            animationPool.runLeft.img.src = 'assets/sprites/runLeft.png';

            animationPool.runRight = {
                frames: 10,
                img: new Image(),
                timePerFrame: 40,
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

            animationPool.jumpLeft = {
                frames: 1,
                img: new Image(),
                timePerFrame: 1000,
                counter: 0
            }
            animationPool.jumpLeft.img.src = 'assets/sprites/jumpLeft.png';

            animationPool.jumpRight = {
                frames: 1,
                img: new Image(),
                timePerFrame: 1000,
                counter: 0
            }
            animationPool.jumpRight.img.src = 'assets/sprites/jumpRight.png';

            animationPool.faceRight = {
                frames: 1,
                img: new Image(),
                timePerFrame: 1000,
                counter: 0
            }
            animationPool.faceRight.img.src = 'assets/sprites/faceRight.png';

            animationPool.faceLeft = {
                frames: 1,
                img: new Image(),
                timePerFrame: 1000,
                counter: 0
            }
            animationPool.faceLeft.img.src = 'assets/sprites/faceLeft.png';

            // curAnimation keeps track of the currently executing animation. index refers to which sprite in the current 
            // sheet we are on. The horizontal position of that sprite is at animation.img.width/animation.frames * index 
            // and has a width of animation.img.width/animation.frames
            that.curAnimation = {
                animation: animationPool.faceForward, 
                index: 0,
                width: .06,
                height: .18,
                x: that.x,
                y: null // Must be calculated based on hitbox's location
            };
            that.curAnimation.y = that.y - (that.curAnimation.height - that.height)/2;
        }

        that.updateSprite = function(elapsedTime){
            'use strict'
            that.curAnimation.animation.counter += elapsedTime;
            
            if(that.curAnimation != animationPool.faceLeft && that.facingLeft && that.xVelocity == 0 && that.yVelocity == 0){
                that.curAnimation.animation = animationPool.faceLeft;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(that.curAnimation != animationPool.faceRight && that.facingRight && that.xVelocity == 0 && that.yVelocity == 0){
                that.curAnimation.animation = animationPool.faceRight;
                that.curAnimation.counter = 0;
                that.curAnimation.index = 0;
            }
            else if(that.curAnimation.animation != animationPool.runLeft && that.left && that.yVelocity == 0){
                that.curAnimation.animation = animationPool.runLeft;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(that.curAnimation.animation != animationPool.runRight && that.right && that.yVelocity == 0){
                that.curAnimation.animation = animationPool.runRight;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(that.curAnimation.animation != animationPool.jumpLeft && that.facingLeft && that.yVelocity != 0){
                that.curAnimation.animation = animationPool.jumpLeft;
                that.curAnimation.index = 0;
                that.curAnimation.animation.counter = 0;
            }
            else if(that.curAnimation.animation != animationPool.jumpRight && that.facingRight && that.yVelocity != 0){
                that.curAnimation.animation = animationPool.jumpRight;
                that.curAnimation.animation.counter = 0;
                that.curAnimation.index = 0;
            }

            // If count has expired move to next 
            if(that.curAnimation.animation.counter >= that.curAnimation.animation.timePerFrame){
                that.curAnimation.animation.counter -= that.curAnimation.animation.timePerFrame;
                that.curAnimation.index = (that.curAnimation.index + 1) % that.curAnimation.animation.frames;
            }

            that.curAnimation.x = that.x;
            that.curAnimation.y = that.y - (that.curAnimation.height - that.height)/2;
        }

        that.update = function(elapsedTime){
            'use strict'
            
            // Update yVelocity and y position            
            that.yVelocity += Game.physics.getGravity() * elapsedTime / 1000;
            if(that.yVelocity > that.MAX_Y_VELOCITY){
                that.yVelocity = that.MAX_Y_VELOCITY;
            }
            that.y += that.yVelocity  * elapsedTime/1000;

            // check that the trying to move the position won't put us into the last registered
            // floor. If it does it will correct our position and velocity
            if(that.floor != null){
                if(!that.collision(that.floor)){
                    that.floor = null;
                    that.canJump = false;
                }
            }

            // // Update for jumping 
            // if(that.jumping == true){
            //     that.jumpTime -= elapsedTime;
            //     //that.y -= Game.physics.getGravity()*elapsedTime/1000
            //     if(that.jumpTime <= 0){
            //         that.jumping = false;
            //     }
            // }

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

            // Have to update the sprite after updating the hitbox's position
            that.updateSprite(elapsedTime);    
        }

        // for now just draw a colored rectangle, later do sprite animation.
        that.draw = function(){
            // Game.graphics.drawRect({x: that.x, y: that.y, width: that.width, height: that.height, color: 'pink'});
            
            Game.graphics.drawSprite(that.curAnimation, that)
            //Game.graphics.drawSprite(that.curanimation, that);
        }

        that.collision = function(obj){
            var collisionSide = Game.physics.collision(that, obj);
            if(collisionSide == null){
                return false;
            }
            // If collision with seamus' left side, move him so his left side
            // is not at the right side of obj
            else if(collisionSide == 'left'){
                that.x = obj.x + .5 * obj.width + .5 * that.width;
                that.curAnimation.x = that.x;
            }
            else if(collisionSide == 'right'){
                that.x = obj.x - .5 * obj.width - .5 * that.width;
                that.curAnimation.x = that.x;
            }
            else if(collisionSide == 'top'){
                if(that.yVelocity < 0){
                    that.yVelocity = 0;
                }
                that.y = obj.y + .5 * obj.height + .5 * that.height;
                that.curAnimation.y = that.y - (that.curAnimation.height - that.height)/2;
            }
            if(collisionSide == 'bottom'){
                if(that.yVelocity > 0){
                    that.yVelocity = 0;
                    that.canJump = true;
                    that.floor = obj;
                }
                that.y = obj.y - .5 * obj.height - .5 * that.height;
                that.curAnimation.y = that.y - (that.curAnimation.height - that.height)/2;
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