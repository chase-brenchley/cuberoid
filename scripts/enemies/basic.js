Game.enemies = {};
Game.enemies.basicEnemy = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.moveSpeed = .00125;
        that.health = 40;
        // that.position;
        // that.position = {};
        // var direction, leftLimit, rightLimit;
        
        // Generates a basic enemy
        // Takes in where the enemy starts and left and right limits
        // that.init = function(spec){
        var startLocation = spec.startLocation;
        that.leftLimit = spec.leftLimit;
        that.rightLimit = spec.rightLimit;
        that.upperLimit = spec.startLocation.y + .025;
        that.lowerLimit = spec.startLocation.y - .025;
        // randomly choose a direction to start moving
        that.direction = Math.random() > .5 ? that.moveSpeed : -that.moveSpeed;
        that.fly = that.moveSpeed;
        that.position = spec.startLocation;
        // }();

        that.sprite = new Image();
        that.sprite.src = "assets/sprites/metroid.png"; //w: 148 h: 125 r: 1.184

        that.draw = function(){
            height = .15/1.184/2+.02
            // Game.graphics.drawCornerRect({
            //     x: that.position.x,
            //     y: that.position.y+height/2,
            //     width: .05,
            //     height: height,
            //     color: "red",
            // })
            Game.graphics.drawImage({
                image: that.sprite,
                dx: that.position.x+.05/2,
                // dx: .5,
                dy: that.position.y+.17/2,
                // dy: .5,
                dWidth: .15/1.7,
                dHeight: .15/1.184,
            })
        }

        that.updatePosition = function(){
            if(that.position.x + that.direction > that.rightLimit) that.direction = -that.moveSpeed;
            else if(that.position.x - that.direction < that.leftLimit) that.direction = that.moveSpeed;
            that.position.x += that.direction;

            if(that.position.y + that.fly > that.upperLimit) that.fly = -that.moveSpeed/(Math.random()*2+1);
            else if(that.position.y - that.fly < that.lowerLimit) that.fly = that.moveSpeed/(Math.random()*2+1);
            that.position.y += that.fly;
        }

        that.updateState = function(){
            if (that.health <= 0){
                that.alive = false;
            }
        }

        that.update = function(){
            that.updatePosition();
            that.updateState();
        }

        that.takeDamage = function(dmg){
            that.health -= dmg;
        }

        that.getEverything= function(){
            return {x: that.position.x+.05/2, y: that.position.y+(.15/1.184/2+.02), width: .05, height: .15/1.184/2+.02, alive: that.alive, health: that.health};
        }

        return that;
    }

    return {
        generate: generate,
    }
}();