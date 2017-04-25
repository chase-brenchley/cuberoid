Game.particles = function(){
    // Collidable particles can be checked to see if they are colliding with other 
    // objects, and thus any particle added to this list must have a collision(obj) function that takes
    // the object you wish to check against. That function will determine what to do if you collide 
    // (ex: impart damage and create explosion effect)
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
            image: ,  // image to use for this pewpew object
            affectedByGravity: , // Boolean value indicating if the particle should fall
            lifeTime: , // Time in milliseconds it should be alive for
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
            isAlive: true, 
            affectedByGravity: spec.affectedByGravity,
            lifeTime: spec.lifeTime
        }

        // Initialize the xVelocity and yVelocity based on speed and angle
        that.xVelocity = Math.cos(that.angle) * that.speed;
        that.yVelocity = Math.sin(that.angle) * that.speed;
    

        // particle update function
        that.update = function(elapsedTime){
            that.lifeTime -= elapsedTime;
            if(that.lifeTime <= 0){
                that.die();
                return;
            }

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
            lifeTime: , // Lifetime of the pewpew in milliseconds
        }
    */
    var generatePewpew = function(spec){
        // basis of pew pew is a generic particle
        var that = generateParticle(spec);

        // Set properties specific to a pewpew
        that.damage = spec.damage;

        // Add a collision function since pewpew's are collidable objects
        that.collision = function(obj){
            if(Game.physics.basicCollision(that, obj)){
                // obj.damaged(that) // call the objects damaged function indicating it has been damaged by the pewpew
                that.die();
            }
        }

        // Override the default die function
        that.die = function(){
            that.isAlive = false;

            //TODO Generate explosion
            for(let i = 0; i < 500; i++){
                var img = new Image();
                img.src = 'assets/sprites/fire2.png'
                nonCollidableParticles.push(generateParticle({
                    x: Math.random() * that.width + (that.x - that.width/2),
                    y: Math.random() * that.height + (that.y - that.height/2),
                    angle: Math.random() * (2 * Math.PI),
                    width: that.width/2,
                    height: that.width/2,
                    speed: Math.random()/7,
                    image: img,
                    affectedByGravity: false,
                    lifeTime: Math.random() * 250
                }))
            }
        }

        collidableParticles.push(that);
    }

    /**
     * 
     *  
     */
    function makeNonCollidableParticleGenerator(spec){

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