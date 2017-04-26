//------------------------------------------------------------------
//
// This namespace holds the different game components from which the
// game model is componsed.
//
//------------------------------------------------------------------
Game.components = (function(){
    // Dean puts things like constants and game components into this file.
    // For example, in brickout he puts the paddle, ball, the interesection function, and bricks in this file

    var Constants = {
        // The Constants object. Dean does his weird with getters
        // For example:
        // get PaddleHeight() {return 15;},
    }

    // There's functions that take a spec and create objects from it. I'm just gonna paste in his paddle one:
    /* ------------------------------------------------------------------
    
	 This represents the model for the game paddle.  It knows how to
	 move and draw itself upon request.
	
	 'spec' must include:
			color: rgba
			view: {width, height}
			moveRate: number // pixels per millisecond
	
	 ------------------------------------------------------------------*/
    /*	function Paddle(spec) {
		var that;

		//
		// Prepare the initial properties of the paddle
		spec.fullSize = true;
		spec.center =  {
			x: spec.view.width / 2,
			y: spec.view.height -(Constants.PaddleOffset + Constants.PaddleHeight / 2)
		};
		spec.width = spec.view.width * (Constants.PaddleWidthPercent / 100);

		//
		// Had to wait to define that until we had the spec fully initialized
		that = {
			get left() { return spec.center.x - spec.width / 2 },
			get right() { return spec.center.x + spec.width / 2 },
			get top() { return spec.center.y - Constants.PaddleHeight / 2 },
			get bottom() { return spec.center.y + Constants.PaddleHeight / 2 },
			get center() { return spec.center },
			get width() { return spec.width }
		};

		that.moveRight = function(elapsedTime) {
			spec.center.x += spec.moveRate * elapsedTime;
			//
			// Don't let it go past the left edge of the screen
			if (spec.center.x > (spec.view.width - spec.width / 2)) {
				spec.center.x = spec.view.width - spec.width / 2;
			}
		}

		that.moveLeft = function(elapsedTime) {
			spec.center.x -= spec.moveRate * elapsedTime;
			//
			// Don't let it go past the left edge of the screen
			if (spec.center.x < spec.width / 2) {
				spec.center.x = spec.width / 2;
			}
		}

		that.intersectBall = function(ball) {
			var intersect = false;
			if (!ball.collided && intersectRectangles(that, ball)) {
				intersect = true;
			}

			ball.collided = intersect;

			return intersect;
		}

		that.update = function(elapsedTime) {
			//
			// Nothing to do for now, maybe later
		}

		that.render = function(graphics) {
			graphics.drawRectangle({
				x: spec.center.x - spec.width / 2,
				y: spec.center.y - Constants.PaddleHeight / 2,
				width: spec.width,
				height: Constants.PaddleHeight,
				fill: spec.color,
				stroke: 'rgba(0, 0, 0, 1)'
			});
		}

		return that;
	} */

    return {
        // Put he objects that map to functions
        Constants : Constants,
    }

})();