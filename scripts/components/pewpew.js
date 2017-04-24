Game.pewpew = function(){

    /*
        spec ={
            x: ,
            y: ,
            angle: ,  // direction angle in radians
            width: ,  // hitbox width
            height: , // hitbox height
            damage: , // damage it will deal when it hits something
            speed: ,  // a rate in world coordinates
            image: ,  // image to use for this pewpew objecet
            affectedByGravity: , // boolean value indicating if bullet drop is a thing with this pewpew
        }
    */
    generatePewpew = function(spec){
        that = {
            x: spec.x,
            y: spec.y,
            angle: spec.angle,
            width: spec.width,
            height: spec.height,
            damage: spec.damage,
            speed: spec.speed,
            image: spec.image,
            affectedByGravity: spec.affectedByGravity
        }

        that.xVelocity = Math.cos(that.angle) * speed;
        that.yVelocity = Math.sign(that.angle) * speed;

        if(that.angle >= Math.PI/2 && that.angle <= 3*Math.PI/4){
            that.xVelocity = -that.xVelocity;
        }
        if(that.angle >= Math.PI && that.angle <= 2*Math.PI){
            that.yVelocity = -that.yVelocity;
        }
        
        // Update pewpew's position
        that.update = function(elapsedTime){
            that.y += that.yVelocity;
            that.x += that.xVelocity;
        }

        that.draw = function(){
            Game.graphics.drawImage({
                image: that.image, 
                dx: that.x, 
                dy: that.y, 
                dWidth: that.width, 
                dHeight: that.height
            })
        }

        that.collision = function(obj){
            return Game.physics.basicCollision(that, obj);
        }

        that.die = function(){

        }

        return that;
    }


    return{

    }
}()