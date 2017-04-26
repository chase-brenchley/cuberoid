Game.stage2 = function() {
    // Spawn area. There's only a floor and a door to exit
    let canvas;
    var width, height;
    var doorHeight = .18;
    var doorWidth = doorHeight/1.7/2.06;
    var enemies = [];
    var enemieses = [];

    var stage = [
        {x: .5, y: 0,width: 1, height: .1, color:"grey"}, // Ceiling
        {x: 0, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Left Wall
        {x: 1, y: .5, width: .1/1.7, height: 1, color: "greY"}, // Right Wall
        {x: .5, y: 1,width: 1, height: .1, color:"grey"}, // Floor
        {x: .7, y: .7/2+.1/2, width: .05/1.7, height: .7, color: "green"}, // Separating wall
        {x: .5/2+(.1/1.7)/2, y: .16+.1, width: .5, height: .049, color: "red"}, // top left platform
        {x: .435, y: (.16+.1)*2, width: .5, height: .05, color: "red"}, // middle platform
        {x: .5/2+(.1/1.7)/2, y: (.16+.1)*3, width: .5, height: .05, color: "red"}, // top left platform
        {x: 1-(.2/1.7)/2-(.1/1.7)/2, y: .6, width: .2/1.7, height: .05, color: "red"}, // right platform
        {x: 1-(.2/1.7)/2-(.1/1.7)/2, y: .16+.1, width: .2/1.7, height: .049, color: "red"}, // right-top platform
        {x: .745, y: .45, width: .1/1.7, height: .05, color: "red"},
        {x: 1-0.05, y: 1-.14, width: doorWidth, height: doorHeight, color: "red", nextStage: null, coords: {x: null,y: null}}, // Bottom-right door
        {x: 1-.05, y: .15, width: doorWidth, height: doorHeight, color: "red", nextStage: null, coords: {x:null,y:null}}, // Top-right door
        {x: .05, y: .15, width: doorWidth, height: doorHeight, color: "red", nextStage: null, coords: {x:null,y:null}}, // Top-left door
    ]

    function init(){
        canvas = document.getElementById('canvas-main');
        width = canvas.width;
        height = canvas.height;
        stage[11].nextStage = Game.stageJumpy; stage[11].coords = {x: .1, y: .16};
        stage[12].nextStage = Game.stageMissile; stage[12].coords = {x: .1, y: .16};
        stage[13].nextStage = Game.stage1; stage[13].coords = {x: 1-.05, y: .6};
        stage[14] = stage[15] = stage[16] = [];
        enemieses = [
            {startLocation: {x:.3, y:.065}, leftLimit: .2, rightLimit: .4}, //top left enemy
            {startLocation: {x: .4, y: .325}, leftLimit: .2, rightLimit: .6}, //middle enemy
            {startLocation: {x: .3, y: .585}, leftLimit: .05, rightLimit: .46} //bottom enemy
            
        ];
        enemies = [];
        enemieses.forEach(function(element) {
            enemies.push(Game.enemies.basicEnemy.generate(element));
        }, this);
        // enemies.push(Game.enemies.basicEnemy.generate({startLocation: {x:.5, y:.5}, leftLimit: .2, rightLimit: .8}));
    }

    function draw() {
        var background = new Image();
        background.src = "assets/textures/texture.jpg";
        var texture = new Image();
        texture.src = "assets/textures/stone1.jpg";
        var verticle = new Image();
        verticle.src = "assets/textures/stone1.jpg";
        var platform  = new Image();
        platform.src = "assets/textures/platform1.png";
        var closedDoor = new Image();
        closedDoor.src = "assets/textures/closeddoor.png";
        var closedDoorLeft = new Image();
        closedDoorLeft.src = "assets/textures/closeddoorleft.png";

        Game.graphics.drawBackground(background);

        Game.graphics.drawImage({
            image: closedDoor,
            dx: .05,
            dy: .15,
            dWidth: doorWidth,
            dHeight: doorHeight
        })
        Game.graphics.drawImage({
            image:closedDoorLeft,
            dx: 1-.05,
            dy: .15,
            dWidth: doorWidth,
            dHeight:doorHeight,
        })
        Game.graphics.drawImage({
            image:closedDoorLeft,
            dx: 1-.05,
            dy: 1-.14,
            dWidth: doorWidth,
            dHeight:doorHeight,
        })

        for (var enemy in enemies) {
            currentEnemy = enemies[enemy];
            if(currentEnemy.alive) currentEnemy.draw();
        }

        // for (i = 0; i < stage.length; i++){
        //     Game.graphics.drawRect(stage[i]);
        // }

        for (var i = 0; i < stage.length; i++){
            if (!stage[i].hasOwnProperty("nextStage") && !stage[i].hasOwnProperty("noTexture") && !stage[i].hasOwnProperty("alive")){
                Game.graphics.drawImage({
                    image: background,
                    dx: stage[i].x,
                    dy: stage[i].y,
                    dWidth: stage[i].width,
                    dHeight: stage[i].height
                })
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
                        Game.graphics.drawImage({
                        image: verticle,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                }
                for (x = stage[i].x+stage[i].width/2-(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; y < stage[i].y+stage[i].height/2+.05/2; y += .05){
                        Game.graphics.drawImage({
                        image: verticle,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                }
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y-stage[i].height/2+.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
                    Game.graphics.drawImage({
                        image: texture,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                    
                }
                for (x = stage[i].x-stage[i].width/2+(.05/1.7)/2, y = stage[i].y+stage[i].height/2-.05/2; x < stage[i].x+stage[i].width/2+(.05/1.7)/2; x += .05/1.7) {
                    Game.graphics.drawImage({
                        image: texture,
                        dx: x,
                        dy: y,
                        dWidth: .05/1.7,
                        dHeight: .05,
                    })
                    
                }
            }
        }
        
    }

    function update(){
        for (var enemy in enemies) {
            //13
            if (stage[14+parseInt(enemy)].hasOwnProperty("health")) enemies[enemy].health = stage[14+parseInt(enemy)].health;
            stage[14+parseInt(enemy)] = enemies[enemy].getEverything();
            enemies[enemy].update();
        }
    }

    return {
        Stage: stage,
        draw: draw,
        init: init,
        update: update
    }
}();