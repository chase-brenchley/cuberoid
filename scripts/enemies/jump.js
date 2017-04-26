Game.enemies.bossJump = function(spec){
    function generate(spec){
        var that = {}
        that.moveSpeed = .002;
        that.health = 500;
        that.yVelocity = -2;
        // that.position;
        // that.position = {};
        // var direction, leftLimit, rightLimit;
        
        // Generates a basic enemy
        // Takes in where the enemy starts and left and right limits
        // that.init = function(spec){
            var startLocation = spec.startLocation;
            that.leftLimit = spec.leftLimit;
            that.rightLimit = spec.rightLimit;
            // randomly choose a direction to start moving
            that.direction = Math.random() > .5 ? that.moveSpeed : -that.moveSpeed;
            that.position = spec.startLocation;
        // }();

        that.draw = function(){
            Game.graphics.drawCornerRect({
                x: that.position.x,
                y: that.position.y,
                width: .05,
                height: .17,
                color: "red",
            })
        }

        that.updatePosition = function(){
            if(that.position.x + that.direction > that.rightLimit) that.direction = -that.moveSpeed;
            else if(that.position.x - that.direction < that.leftLimit) that.direction = that.moveSpeed;
            that.position.x += that.direction;
        }

        that.updateState = function(){

        }

        that.update = function(){
            that.updatePosition();
        }

        that.takeDamage = function(dmg){
            that.health -= dmg;
        }

        return that;
    }

    return {
        generate: generate,
    }
}();