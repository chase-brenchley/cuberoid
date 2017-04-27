Game.enemies.bossMissile = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.health = 1500;
        that.position = spec.startLocation;

        that.bossImage = new Image();
        that.bossImage.src = "assets/sprites/missileBoss.png";


        that.draw = function(){
            // Game.graphics.drawCornerRect({
            //     x: that.position.x,
            //     y: that.position.y,
            //     width: .15, //.2
            //     height: .17*2,
            //     color: "red",
            // })
            Game.graphics.drawImage({
                image: that.bossImage,
                dx: that.position.x+(.17*2/1.7)/2,
                dy: that.position.y+.11,
                dWidth: .17*2/1.7,
                dHeight: .17*2,
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
            return {x: that.position.x+(.15)/2, y: that.position.y+.17, width: .15, height: .17*2, alive: that.alive, health: that.health};
        }

        return that;
    }

    return {
        generate: generate,
    }
}();