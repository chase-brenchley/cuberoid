Game.enemies = {};
Game.enemies.basicEnemy = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.moveSpeed = .00125;
        that.health = 20;
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
            return {x: that.position.x+.05/2, y: that.position.y, width: .05, height: .17, alive: that.alive};
        }

        return that;
    }

    return {
        generate: generate,
    }
}();