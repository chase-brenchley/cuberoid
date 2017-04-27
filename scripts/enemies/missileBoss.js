Game.enemies.bossMissile = function(spec){
    function generate(spec){
        var that = {}
        that.alive = true;
        that.health = 1500;
        that.position = spec.startLocation;
        that.reloadTimeConstant = 25;
        that.reloadTime = that.reloadTimeConstant;

        that.bossImage = new Image();
        that.bossImage.src = "assets/sprites/missileBoss.png";

        that.missileImage = new Image();
        that.missileImage.src = "assets/sprites/rightMissile.png";


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
            if(!that.alive) return;
            that.reloadTime -= time;
            that.updatePosition(time);
            that.updateState();
            if(that.reloadTime <=0 && (Game.game.getSeamus().y >= .87)){
                that.reloadTime = (Math.random() * that.reloadTimeConstant) + that.reloadTimeConstant;
                // Throw a missile that.heigh = .16, that.width = .04 runSpeed = .45
                Game.particles.generatePewpew({
                    x: .2,
                    y: .845,
                    angle: 0,
                    width: .16 * .35/1.7,
                    height: .16 * .15,
                    speed: .45*1.8,
                    image: that.missileImage,
                    damage: 50,
                    affectedByGravity: false,
                    lifeTime: 10000,
                    friendly: false,
                })
            }
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