Game.enemies.bossMissile = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.health = 15;
        that.position = spec.startLocation;


        that.draw = function(){
            Game.graphics.drawCornerRect({
                x: that.position.x,
                y: that.position.y,
                width: .17*2/1.7,
                height: .17*2,
                color: "red",
            })
        }

        that.updatePosition = function(time){
            // does nothing. He doesn't move
        }

        that.updateState = function(){
            if(that.health <= 0){
                that.alive = false;
            }
        }

        that.update = function(time){
            that.updatePosition(time);
            that.updateState();
        }

        that.takeDamage = function(dmg){
            that.health -= dmg;
        }

        that.getEverything= function(){
            return {x: that.position.x+(.17*2/1.7)/2, y: that.position.y+.17, width: .17*2/1.7, height: .17*2, alive: that.alive, health: that.health};
        }

        return that;
    }

    return {
        generate: generate,
    }
}();