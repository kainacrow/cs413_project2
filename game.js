var gameport = document.getElementById("gameport");


var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x33bbe8});
gameport.appendChild(renderer.view);

var gameStage = new PIXI.Container();



PIXI.loader
    .add("assets.json")
    .load(ready);
    
var obstacles = new PIXI.Container();


function ready() {
    
    var doggy = new PIXI.Sprite(PIXI.Texture.fromFrame("dog4.png"));
    var kitty = new PIXI.Sprite(PIXI.Texture.fromImage('kitty.png'));
    var bone = new PIXI.Sprite(PIXI.Texture.fromImage('bone.png'));
    gameStage.addChild(kitty);
    gameStage.addChild(obstacles);
    gameStage.addChild(bone);
    
    var someLevels = PIXI.Texture.fromFrame("brick600.png");
    var baseBricks = PIXI.Texture.fromFrame("brick800.png");
    var otherLevels = PIXI.Texture.fromFrame("brick700.png");

    var level1 = new PIXI.Sprite(otherLevels);
    var level2 = new PIXI.Sprite(otherLevels);
    var level3 = new PIXI.Sprite(otherLevels);
    var level3_2 = new PIXI.Sprite(someLevels);
    var level4 = new PIXI.Sprite(otherLevels);
    var level5 = new PIXI.Sprite(someLevels);
    var level6 = new PIXI.Sprite(otherLevels);


    var baseBrick = new PIXI.Sprite(baseBricks);
    
    //kitty = { x: 345, y:400};
    kitty.position.y = 345;
    kitty.position.x = 400;
    var target = {x: 425, y: 400};
    createjs.Tween.get(kitty.position).to(target, 2000);
    tween.start();
    //kitty.position.y = 345;
    //kitty.position.x = 400;
    bone.position.x = 100;
    bone.position.y = renderer.width - bone.width;
    //doggy.position.y = 544;
    
    var frames = []
    for (var i=1; i<=4; i++) {
        frames.push(PIXI.Texture.fromFrame('dog' + i + '.png'))
    }
    
    runner = new PIXI.extras.MovieClip(frames);
    runner.animationSpeed = 0.17;
    runner.position.y = 544;
    //runner.play();
    gameStage.addChild(runner);

    //sprite.width = 32;
    level1.height = 32;
    level2.height = 32;
    level3.height = 32;
    level3_2.height = 32;
    level4.height = 32;
    level5.height = 32;
    level6.height = 32;
    
    baseBricks.height = 32;

    // sprite.anchor.x = 0.5;
    // sprite.anchor.y = 0.5;
    level6.position.x = 100;
    level6.position.y = 40;
    
    level5.position.x = 000;
    level5.position.y = 128;
    
    level4.position.x = 100;
    level4.position.y = 216;
    
    level3.position.x = 400;
    level3.position.y = 304;
    
    level3_2.position.x = -300;
    level3_2.position.y = 304;

    level2.position.x = 100;
    level2.position.y = 392;


    level1.position.y = 480;

    baseBrick.position.x = 0;
    baseBrick.position.y = 568;

    obstacles.addChild(level1);
    obstacles.addChild(level2);
    obstacles.addChild(baseBrick);
    obstacles.addChild(level3);
    obstacles.addChild(level3_2);
    obstacles.addChild(level4);
    obstacles.addChild(level5);
    obstacles.addChild(level6);


    //gameStage.addChild(doggy);
}

start = new PIXI.Sprite(PIXI.Texture.fromImage("instructions2.png"));
start.position.x = 0;
start.position.y = 0;
start.visible = true;
document.addEventListener('onclick', start.visible = false);
gameStage.addChild(start);

gameOverTexture = new PIXI.Sprite(PIXI.Texture.fromImage("gameover.png"));
gameOverTexture.position.x = 0;
gameOverTexture.position.y = 0;
gameOverTexture.visible = false;
gameStage.addChild(gameOverTexture);


var keys = {};

function keyupEventHandler(e) {
    runner.stop();
    keys[e.which] = false;
}

function keydownEventHandler(e) {
    keys[e.which] = true;
    runner.play();
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

function movePlayer() {
    if (collision()) { return false; }
    if(keys[87] || keys[38]) { // W key pressed
        if(runner.position.y > 0){
            runner.position.y -= 3;
        }
    }
    if(keys[83] || keys[40]) { // S key pressed
        if(runner.position.y < renderer.height - runner.height)
        runner.position.y += 3;
    }
    if(keys[65] || keys[37]) { // A key pressed
        if(runner.position.x > 0)
        runner.scale.x = Math.abs(runner.scale.x)*-1;
        runner.position.x -= 3;
    }
    if(keys[68] || keys[39]) { // D key pressed
        if(runner.position.x < renderer.width - runner.width)
        runner.scale.x = Math.abs(runner.scale.x)*1;
        runner.position.x += 3;
    }
}

function animate() {
    requestAnimationFrame(animate);
    movePlayer();
    var target = {x: 425, y: 400};
    createjs.Tween.get(kitty.position).to(target, 2000);
    tween.start();
    //sprite.rotation += 0.1;
    collision();
    renderer.render(gameStage);

}
animate();

function collision() {
    var bricks = obstacles.children;
    for (var i = 0; i < bricks.length; i++){
        if (!(bricks[i].position.x > (runner.position.x + runner.width) || (bricks[i].position.x + bricks[i].width) < runner.position.x || bricks[i].position.y > (runner.position.y + runner.height) || (bricks[i].position.y + bricks[i].height) < runner.position.y)){
            return true;
           
            //document.removeEventListener('keydown', keydownEventHandler);
        }
        return false;

    
    }
}

function winningCollision() {
    var bricks = obstacles.children;
    for (var i = 0; i < bricks.length; i++){
        if (!(bricks[i].position.x > (runner.position.x + runner.width) || (bricks[i].position.x + bricks[i].width) < runner.position.x || bricks[i].position.y > (runner.position.y + runner.height) || (bricks[i].position.y + bricks[i].height) < runner.position.y)){
            //winTexture.visible;
            document.removeEventListener('keydown', keydownEventHandler);
        }
        return false;

    
    }
}

