Game.particles = function(){
    var collidableParticles = [];
    var nonCollidableParticles = [];

    // Generates a generic particle. All particles must have 
    // at least the following properties.
    /*
        spec = {
            x: ,
            y: ,
            angle: ,  // direction angle in radians
            width: ,  // hitbox width
            height: , // hitbox height
            speed: ,  // a rate in world coordinates
            image: ,  // image to use for this pewpew objecet
        }

        The function will generate the particle's xVelocity and yVelocity based 
        on the speed and angle of spec
    */
    function generateParticle(spec){
        var that = {
            x: spec.x,
            y: spec.y,
            angle: spec.angle,
            width: spec.width,
            height: spec.height,
            speed: spec.speed,
            image: spec.image,
            isAlive: true
        }

        // Initialize the xVelocity and yVelocity based on speed and angle
        that.xVelocity = Math.cos(that.angle) * that.speed;
        that.yVelocity = Math.sin(that.angle) * that.speed;

        if(that.angle >= Math.PI/2 && that.angle <= 3*Math.PI/4){
            that.xVelocity = -that.xVelocity;
        }
        if(that.angle >= Math.PI && that.angle <= 2*Math.PI){
            that.yVelocity = -that.yVelocity;
        }

        // particle update function
        that.update = function(elapsedTime){
            that.y += that.yVelocity * elapsedTime/1000;
            that.x += that.xVelocity * elapsedTime/1000;

            // update velocity if necessary
            if(that.affectedByGravity){
                // Check if it's met terminal velocity
                if(that.yVelocity > 2){
                    that.yVelocity = 2
                }
                else{
                    that.yVelocity += Game.physics.getGravity() * elapsedTime / 1000;
                }
            }
        }

        // particle draw function
        that.draw = function(){
            Game.graphics.drawImage({
                image: that.image, 
                dx: that.x, 
                dy: that.y, 
                dWidth: that.width, 
                dHeight: that.height
            })
        }

        that.die = function(){
            that.isAlive = false;
        }


        return that;
    }


    /* Generate a pewpew, which is a particle with some extra properties.
        pewpews are collidable and thus will be added to the collidable list.
        spec ={
            x: ,
            y: ,
            angle: ,  // direction angle in radians
            width: ,  // hitbox width
            height: , // hitbox height
            speed: ,  // a rate in world coordinates
            image: ,  // image to use for this pewpew objecet
            damage: , // damage it will deal when it hits something
            affectedByGravity: , // boolean value indicating if bullet drop is a thing with this pewpew
        }
    */
    var generatePewpew = function(spec){
        // basis of pew pew is a generic particle
        var that = generateParticle(spec);

        // Set properties specific to a pewpew
        that.affectedByGravity = spec.affectedByGravity;
        that.damage = spec.damage;

        // Draw the pewpew
        that.draw = function(){
            Game.graphics.drawImage({
                image: that.image, 
                dx: that.x, 
                dy: that.y, 
                dWidth: that.width, 
                dHeight: that.height
            })
        }

        // Add a collision function since pewpew's are collidable objects
        that.collision = function(obj){
            if(Game.physics.basicCollision(that, obj)){
                that.die();
            }
        }

        // Override the default die function
        that.die = function(){
            that.isAlive = false;

            //TODO Generate explosion
            // Game.particles.generateParticleGenerator({
                
            // });
        }

        collidableParticles.push(that);
    }

    function update(elapsedTime){
        for(let i = 0; i < collidableParticles.length; i++){
            if(collidableParticles[i].isAlive == false){
                collidableParticles.splice(i, 1);
                i--;
                continue;
            }
            collidableParticles[i].update(elapsedTime);
        }
        for(let i = 0; i < nonCollidableParticles.length; i++){
            if(nonCollidableParticles[i].isAlive == false){
                nonCollidableParticles.splice(i, 1);
                i--;
                continue;
            }
            nonCollidableParticles[i].update(elapsedTime);
        }
    }

    function draw(){
        for(let i = 0; i < collidableParticles.length; i++){
            collidableParticles[i].draw();
        }
        for(let i = 0; i < nonCollidableParticles.length; i++){
            nonCollidableParticles[i].draw();
        }
    }

    // Check each collidable particle against the object passed in. Each particle's collide function 
    // Should handle what happens when that particle collides with an object.
    function collision(obj){
        for(let i = 0; i < collidableParticles.length; i++){
            collidableParticles[i].collision(obj);
        }
    }

    return{
        generateParticle: generateParticle,
        generatePewpew: generatePewpew,
        update: update,
        draw: draw,
        collision: collision

    }
}()