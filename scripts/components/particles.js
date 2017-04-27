Game.particles = function(){
    // List of active particle systems
    var particleSystems = [];


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
            lifeTime: spec.lifeTime,
            friendly: spec.friendly
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
                if (that.friendly && obj.hasOwnProperty("missileCount")) return;
                // obj.damaged(that) // call the objects damaged function indicating it has been damaged by the pewpew
                obj.health -= that.damage;
                that.die();
            }
        }

        // Override the default die function
        that.die = function(){
            that.isAlive = false;
            generateExplosionSystem({
                x: that.x,    // Position of particle generator
                y: that.y,
                width: that.width,  // area to generate particles in
                height: that.height, 
                pwidth: that.width/3, // particle width
                pheight: that.width/3, //particle height
                numberOfParticles: 25,
                angleRange: {start: 0, end: Math.PI * 2},  // range of valid angles for particles generated
                speed: 1/15,  // max speed of a particle (speed given in world coordinates)
                affectedByGravity: false, // boolean value indicating if bullet drop is a thing with this pewpew
                lifeTime: 350, // Max lifetime of a particle in milliseconds
            })
            
            // for(let i = 0; i < 50; i++){
            //     nonCollidableParticles.push(generateParticle({
            //         x: Math.random() * that.width + (that.x - that.width/2),
            //         y: Math.random() * that.height + (that.y - that.height/2),
            //         angle: Math.random() * (2 * Math.PI),
            //         width: that.width/2,
            //         height: that.width/2,
            //         speed: Math.random()/8,
            //         image: img,
            //         affectedByGravity: false,
            //         lifeTime: Math.random() * 350
            //     }))
            // }
        }

        particleSystems.push(that);
    }

    /**
        spec ={
            x: ,    // Position of particle generator
            y: ,
            width: ,  // area to generate particles in
            height: , 
            pwidth: , // particle width
            pheight: , //particle height
            numberOfParticles: ,
            angleRange: {start: , end: },  // range of valid angles for particles generated
            speed: ,  // max speed of a particle (speed given in world coordinates)
            image: ,  // image to use for this pewpew objecet
            damage: , // damage it will deal when it hits something. set for splash damage, otherwise don't add this property
            affectedByGravity: , // boolean value indicating if bullet drop is a thing with this pewpew
            lifeTime: , // Max lifetime of a particle in milliseconds
        }
     */
    function generateParticleSystem(spec){
        var that = {}
        that.particles = [];
        that.isAlive = true;

        for(let i = 0; i < spec.numberOfParticles; i++){
            that.particles.push(generateParticle({
                x: Math.random() * spec.width + (spec.x - spec.width / 2),
                y: Math.random() * spec.height + (spec.y - spec.height/2),
                angle: Math.random() * (spec.angleRange.end - spec.angleRange.start) + spec.angleRange.start,  // direction angle in radians
                width: spec.pwidth,  // hitbox width
                height: spec.pheight, // hitbox height
                speed: Math.random() * spec.speed,  // a rate in world coordinates
                image: spec.image,  // image to use for this pewpew object
                affectedByGravity: spec.affectedByGravity, // Boolean value indicating if the particle should fall
                lifeTime: Math.random() * spec.lifeTime, // Time in milliseconds it should be alive for
            }))
        }

        that.update = function(elapsedTime){
            for(let i = 0; i < that.particles.length; i++){
                if(that.particles[i].isAlive == false){
                    that.particles.splice(i, 1);
                    i--;
                    continue;
                }
                that.particles[i].update(elapsedTime);
            }
            if(that.particles.length == 0){
                that.isAlive = false;
            }
        }

        that.draw = function(){
            for(let i = 0; i < that.particles.length; i++){
                that.particles[i].draw();
            }
        }

        return that;        
    }

    /**
        spec ={
            x: ,    // Position of particle generator
            y: ,
            width: ,  // area to generate particles in
            height: , 
            pwidth: , // particle width
            pheight: , //particle height
            numberOfParticles: ,
            angleRange: {start: , end: },  // range of valid angles for particles generated
            speed: ,  // max speed of a particle (speed given in world coordinates)
            damage: , // damage it will deal when it hits something. set for splash damage, otherwise don't add this property
            affectedByGravity: , // boolean value indicating if bullet drop is a thing with this pewpew
            lifeTime: , // Max lifetime of a particle in milliseconds
        }
     */
    function generateExplosionSystem(spec){
        var that = {};
        that.particleSystems = [];
        that.isAlive = true;


        // Create smoke system
        var smokeImg = new Image();
        smokeImg.src = "assets/sprites/smoke.png";
        spec.image = smokeImg;
        spec.numberOfParticles;
        particleSystems.push(generateParticleSystem(spec));

        // Create fire system
        var fireImg = new Image();
        fireImg.src = "assets/sprites/fire2.png";
        spec.image = fireImg;
        particleSystems.push(generateParticleSystem(spec));


        that.update = function(elapsedTime){
            for(let i = 0; i < that.particleSystems.length; i++){
                that.particleSystems[i].update(elapsedTime);
                if(!that.particleSystems[i].isAlive){
                    that.particleSystems.splice(i, 1);
                    i--;
                    continue;
                }
            }
            if(that.particleSystems.length == 0){
                that.isAlive = false;
            }
        }

        that.draw = function(){
            for(let i = 0; i < that.particleSystems.length; i++){
                that.particleSystems[i].draw();
            }
        }
    }

    function update(elapsedTime){
        for(let i = 0; i < particleSystems.length; i++){
            particleSystems[i].update(elapsedTime);
            if(particleSystems[i].isAlive == false){
                particleSystems.splice(i, 1);
                i--;
                continue;
            }
        }
    }

    function draw(){
        for(let i = 0; i < particleSystems.length; i++){
            particleSystems[i].draw();
        }
    }

    // Check each collidable particle against the object passed in. Each particle's collide function 
    // Should handle what happens when that particle collides with an object.
    function collision(obj){
        for(let i = 0; i < particleSystems.length; i++){
            if(particleSystems[i].hasOwnProperty('collision')){
                particleSystems[i].collision(obj);
            }
        }
    }

    function clear(){
        particleSystems.length = 0;
    }

    return{
        generateParticle: generateParticle,
        generatePewpew: generatePewpew,
        update: update,
        draw: draw,
        collision: collision,
        clear: clear

    }
}()