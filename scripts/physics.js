Game.physics = function(){
    'use strict'
    
    var gravity;

    function init(){
        gravity = 3;
    }

    // Takes two objects and detects if they are colliding. Assumes the first parameter is a moving object, and the other is 
    // treated as being stationary, so when position is corrected to make sure they are not superimposed on each other the 
    // moving object's position will be changed. 
    // Note: the collisions are referred to in terms of the moving object, i.e. bottom means that the bottom of the moving object
    // hit a stationary object.
    // Return Value:    'top' if the top of movingObj collided with obj
    //                  'bottom' if the bottom of movingObj collided with obj
    //                  'left' if the left of movingObj collided with obj
    //                  'right' if the right of movingObj collided with obj
    function collision(movingObj, obj){
        var movingRightSide = movingObj.x + .5 * movingObj.width, movingLeftSide = movingObj.x - .5 * movingObj.width;
        var movingTop = movingObj.y - .5 * movingObj.height, movingBottom = movingObj.y + .5 * movingObj.height;

        var stationaryLeftside = obj.x - .5 * obj.width, stationaryRightSide = obj.x + .5 * obj.width;
        var stationaryTop = obj.y - .5 * obj.height, stationaryBottom = obj.y + .5 * obj.height;

        var collisionOverlap;

        var count = 0;

        // keeps track of overlap relative to the moving object's corresponding side.
        // the minimum overlap will decide which direction to push the moving object out of the 
        // stationary object.
        var topOverlap, bottomOverlap, leftOverlap, rightOverlap;
        topOverlap = bottomOverlap = leftOverlap = rightOverlap = Infinity;
        
        // booleans that will turn true if the moving objects corresponding side overlaps the stationary obj
        var right, left, top, bottom;
        right = left = top = bottom = false;

        // Detect case where the right side of the moving obj intersects the other obj
        if(movingRightSide >= stationaryLeftside && movingRightSide <= stationaryRightSide){
            //movingObj.x = stationaryLeftside - .5 * movingObj.width;
            // if(stationaryLeftside - movingRightSide < collisionOverlap){
            //     collisionOverlap = stationaryLeftside - movingRightSide;
            //     collisionSide = "right";
            // }
            right = true;
            rightOverlap = movingRightSide - stationaryLeftside;
            count += 1;
        }

        // Detect case where the left side of the moving obj intersects stationary obj
        if(movingLeftSide <= stationaryRightSide && movingLeftSide >= stationaryLeftside){
            //movingObj.x = stationaryRightSide + .5 * movingObj.width; 
            // if(movingLeftSide - stationaryRightSide < collisionOverlap){
            //     collisionOverlap = stationaryLeftside - movingRightSide;
            //     collisionSide = "right";
            // }
            left = true;
            leftOverlap = stationaryRightSide - movingLeftSide;
            count += 1;
        }

        // Detect case where the top side of the moving obj intersects stationary obj
        if(movingTop <= stationaryBottom && movingTop >= stationaryTop){
            top = true;
            topOverlap = stationaryBottom - movingTop;
            count += 1;
        }
        
        // Detect case where the bottom side of the moving obj intersects stationary obj        
        if(movingBottom <= stationaryBottom && movingBottom >= stationaryTop){
            bottom  = true;
            bottomOverlap = movingBottom - stationaryTop;
            count += 1;
        }

        // Check some corner cases where only one side of moving obj intersects stationary obj 
        if(count <= 1){
            // If its a side overlap but they aren't vertically aligned, there's no collision
            if(left || right){
                if(stationaryTop < movingTop || stationaryTop > movingBottom){
                   return null;
                }
            }
            else if(top || bottom){
                if(stationaryLeftside > movingRightSide || stationaryLeftside < movingLeftSide){
                    return null;
                }
            }
            
        }

        // If both top and bottom are intersecting it must have been a side collision
        if(top && bottom){
            top = bottom = false;
            topOverlap = bottomOverlap = Infinity;
        }

        // If both left and right side are intersecting it must have been a top or bottom collision
        if(left && right){
            left = right = false;
            leftOverlap = rightOverlap = Infinity;
        }

        // Moving object's left side collided with the stationary object
        if(left && leftOverlap <= topOverlap && leftOverlap <= bottomOverlap){
            return 'left';
        }
        // Moving object's right side collided with the stationary object 
        else if(right && rightOverlap <= topOverlap && rightOverlap <= bottomOverlap){
            return 'right';
        }
        // Moving object's top side collided with the stationary object
        else if(top && topOverlap <= leftOverlap && topOverlap <= rightOverlap){
            return 'top';
        }
        // Moving object's bottom side collided with the stationary object
        else if(bottom && bottomOverlap <= leftOverlap && bottomOverlap <= rightOverlap){
            return 'bottom';
        }
        else{
            return null;
        }
    }

    function getGravity(){
        return gravity;
    }

    // function horizontalOverlap(obj, obj2){
    //     var objRight = obj.x + .5 * obj.width, objLeft = obj.x + .5 * obj.width;
    //     var obj2Right = obj2.x + .5 * obj2.width, obj2Left = obj2.x + .5 * obj2.width

    //     if(objRight > obj2Left && objRight < obj2Right){
    //         return true;
    //     }
    //     if(objLeft < obj2Left && objLeft > obj2Right){
    //         return true;
    //     }
    //     if(obj2Left > objLeft && obj2Left < objRight){
    //         return true;
    //     }
    //     if(obj2Right > objLeft && obj2Right < objRight){
    //         return true;
    //     }
    //     return false;
    // }

    // function verticalOverlap(obj, obj2){
    //     var objTop = obj.y - .5 * obj.height, objBottom = obj.y + .5 * obj.height;
    //     var obj2Top = obj2.y - .5 * obj2.height, obj2Bottom = obj2.y + .5 * obj2.height;

    //     if((objTop <= obj2Bottom && objTop >= obj2Top) || (objBottom < obj2Bottom && objBottom > obj2Top)){
    //         return true;
    //     }
    // }
    return{
        init: init,
        collision: collision,
        getGravity: getGravity
    }
}();