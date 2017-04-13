Game = {};
Game.screens = {

}

// game contains gameloop, update, and render. Runs the heart of the game.
Game.game = function(){
    var floor = document.getElementById('canvas-main').height - 20;
    var curTime, prevTime;
    var seamus, graphics;

    function init(){
        curTime = prevTime = performance.now();
        seamus = Game.seamus; 
        graphics = Game.graphics;
        graphics.init();
        seamus.init();
        requestAnimationFrame(gameLoop);
    }

    function gameLoop(){
        prevTime = curTime;
	    curTime = performance.now();
        var elapsedTime = curTime - prevTime;
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function update(elapsedTime){
        seamus.update(elapsedTime)
    }

    function render(){
        graphics.clear();
        seamus.draw();
    }

    // Takes two objects and detects if they are colliding. Assumes the first parameter is a moving object, and the other is 
    // treated as being stationary, so when position is corrected to make sure they are not superimposed on each other the 
    // moving object's position will be changed. Returns true if they are colliding, else returns false.
    function collision(movingObj, obj){
        var movingRightSide = movingObj.x + .5 * movingObj.width, movingLeftSide = movingObj.x - .5 * movingObj.width;
        var movingTop = movingObj.y - .5 * movingObj.height, movingBottom = movingObj.y + .5 * movingObj.height;

        var stationaryLeftside = obj.x - .5 * obj.width, stationaryRightSide = obj.x + .5 * obj.width;
        var stationaryTop = obj.y - .5 * obj.height, stationaryBottom = obj.y + .5 * obj.height;

        var collisionOverlap = 1000;

        var collisionSide;

        // Detect side collisions. First test that they have some vertical overlap
        if(){
            // Detect case where moving obj hits left side of stationary obj
            if(movingRightSide > stationaryLeftside && movingRightSide < stationaryRightSide){
                //movingObj.x = stationaryLeftside - .5 * movingObj.width;
                if(stationaryLeftside - movingRightSide < collisionOverlap){
                    collisionOverlap = stationaryLeftside - movingRightSide;
                    collisionSide = "left";
                }
            }

            // Detect case where moving obj hits right side of stationary obj
            if(movingLeftSide < stationaryRightSide && movingLeftSide > stationaryLeftside){
                //movingObj.x = stationaryRightSide + .5 * movingObj.width; 
                if(movingLeftSide - stationaryRightSide < collisionOverlap){
                    collisionOverlap = stationaryLeftside - movingRightSide;
                    collisionSide = "right";
                }
            }
        }

        // Detect Vertical collision. First check that there is horizontal overlap
        if((movingLeftSide < stationaryBottom && movingTop > stationaryTop) || (movingBottom < stationaryBottom && movingBottom > stationaryTop)){
            // Detect case where moving obj hits left side of stationary obj
            if(movingRightSide > stationaryLeftside && movingRightSide < stationaryRightSide){
                //movingObj.x = stationaryLeftside - .5 * movingObj.width;
                if(stationaryLeftside - movingRightSide < collisionOverlap){
                    collisionOverlap = stationaryLeftside - movingRightSide;
                    collisionSide = "left";
                }
            }

            // Detect case where moving obj hits right side of stationary obj
            if(movingLeftSide < stationaryRightSide && movingLeftSide > stationaryLeftside){
                //movingObj.x = stationaryRightSide + .5 * movingObj.width; 
                if(movingLeftSide - stationaryRightSide < collisionOverlap){
                    collisionOverlap = stationaryLeftside - movingRightSide;
                    collisionSide = "right";
                }
            }
        }
        
    }

    function verticalOverlap(obj, obj2){
        var objTop = obj.y - .5 * obj.height, objBottom = obj.y + .5 * obj.height;
        var obj2Top = obj2.y - .5 * obj2.height, obj2Bottom = obj2.y + .5 * obj2.height;

        if((objTop <= obj2Bottom && objTop >= obj2Top) || (objBottom < obj2Bottom && objBottom > obj2Top)){
            return true;
        }
    }

    return{
        init: init
    }
}()