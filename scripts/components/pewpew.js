Game.pewpew = function(){

    /*
        spec ={
            x: ,
            y: ,
            angle: ,  // direction angle in radians
            width: ,  // hitbox width
            height: , // hitbox height
            damage: , // damage it will deal when it hits something
            speed: ,
            image: ,  // image to use for this pewpew objecet
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
            speed: spec.speed
        }

        that.explode = function(){

        }
    }


    return{

    }
}()