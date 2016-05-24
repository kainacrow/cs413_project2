var gameport = document.getElementById("gameport");


var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x33bbe8});
gameport.appendChild(renderer.view);

var gameStage = new PIXI.Container();
//var startStage = new PIXI.Container();

//var gameStart = false;
var title = new PIXI.Sprite(PIXI.Texture.fromImage('title.png'));

var credits = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));

var start = new PIXI.Sprite(PIXI.Texture.fromImage("instructions1.png"));



//document.addEventListener('onclick', start.visible = false);
//startStage.addChild(gameStage);
//gameStage.visible = false;



PIXI.loader.add("assets.json").load(ready);
PIXI.loader.add("gameMusic.mp3").load(soundready);

var backPicture = new PIXI.Sprite(PIXI.Texture.fromImage("background.png"));
backPicture.position.x = 0;
backPicture.position.y = 0;
gameStage.addChild(backPicture);
    
var obstacles = new PIXI.Container();
var loseTexture = new PIXI.Sprite(PIXI.Texture.fromImage("lose.png"));
var lose = new PIXI.Text("You got in a fight with the cat and lost.", {font:"30px Times New Roman", fill: "#fff"})
var winTexture = new PIXI.Sprite(PIXI.Texture.fromImage("winCollision.png"));
gameStage.addChild(lose);



    
var runner;
var sounds;

function soundready() {
    sounds = PIXI.audioManager.getAudio("gameMusic.mp3");
    console.log(sounds);
    sounds.loop = true;
    sounds.play();
}

var doggy;
var kitty;
var bone;
var someLevels;
var otherLevels;
var baseBricks; 

function ready() {
    
    var frames = []
    for (var i=1; i<=4; i++) {
        frames.push(PIXI.Texture.fromImage('dog' + i + '.png'))
    }
    
    runner = new PIXI.extras.MovieClip(frames);
    runner.animationSpeed = 0.17;
    runner.position.y = 544;
    
    doggy = new PIXI.Sprite(PIXI.Texture.fromFrame("dog4.png"));
    kitty = new PIXI.Sprite(PIXI.Texture.fromFrame('kitty.png'));
    bone = new PIXI.Sprite(PIXI.Texture.fromFrame('bone.png'));
    someLevels = PIXI.Texture.fromFrame("brick600.png");
    baseBricks = PIXI.Texture.fromFrame("brick800.png");
    otherLevels = PIXI.Texture.fromFrame("brick700.png");
    baseBrick = new PIXI.Sprite(baseBricks);

    gameStage.addChild(kitty);
    gameStage.addChild(obstacles);
    gameStage.addChild(bone);
    
   
    var level1 = new PIXI.Sprite(otherLevels);
    var level2 = new PIXI.Sprite(otherLevels);
    var level3 = new PIXI.Sprite(otherLevels);
    var level3_2 = new PIXI.Sprite(someLevels);
    var level4 = new PIXI.Sprite(otherLevels);
    var level5 = new PIXI.Sprite(someLevels);
    var level6 = new PIXI.Sprite(otherLevels);


    
    kitty.position.y = 345;
    kitty.position.x = 300;
    var target = {x: 500, y: 345};
    createjs.Tween.get(kitty.position, {loop:true})
    .to({x:500}, 3000)
    .to({x:300}, 3000);
    // var tween = createjs.Tween.get(kitty.position).to(target, 3000);
    // var tweenBack = createjs.Tween.get(kitty.position).to({x:300, y:345}, 3000);
    // tween.onMotionFinished = function() {
    //     this.setFunc (tweenBack);
    //     this.yoyo;
    //     delete this.onMotionFinished;
    //     }
    //tween.yoyo(true, 3000);
    
    bone.position.x = 750;
    bone.position.y = 20;
    //doggy.position.y = 544;
    
    
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

    winTexture.position.x = 0;
    winTexture.position.y = 0;
    winTexture.visible = false;
    gameStage.addChild(winTexture);
    
    
    start.position.x = 0;
    start.position.y = 0;
    gameStage.addChild(start);
    
    credits.position.x = 0;
    credits.position.y = 0;
    gameStage.addChild(credits);
    
    title.position.x = 0;
    title.position.y = 0;
    gameStage.addChild(title);
    
    
    



    loseTexture.position.x = 0;
    loseTexture.position.y = 0;
    lose.position.x = 200;
    lose.position.y = 200;
    loseTexture.visible = false;
    lose.visible = false;
    gameStage.addChild(loseTexture);

    //gameStage.addChild(doggy);
}






var keys = {};



function keyupEventHandler(e) {
    runner.stop();
    keys[e.which] = false;
}

function keydownEventHandler(e) {
    keys[e.which] = true;
    title.visible = false;
    runner.play();
    if([32, 37, 38, 39, 40, 9].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    if([9].indexOf(e.keyCode) > -1) {
        credits.visible = false;
    }
    if([13].indexOf(e.keyCode) > -1) {
        start.visible = false;
    }
    
}

document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

function movePlayer() {
    if (collision()) { return; }
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
    //sprite.rotation += 0.1;
    collision();
    winningCollision();
    catCollision();
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
        //return false;

    
    }
}

function catCollision() {
    if (!(kitty.position.x > (runner.position.x + runner.width) || (kitty.position.x + kitty.width) < runner.position.x || kitty.position.y > (runner.position.y + runner.height) || (kitty.position.y + kitty.height) < runner.position.y)){
            loseTexture.visible = true;
            lose.visible = true
            document.removeEventListener('keydown', keydownEventHandler);
        

    
    }
}

function winningCollision() {

        if (!(bone.position.x > (runner.position.x + runner.width) || (bone.position.x + bone.width) < runner.position.x || bone.position.y > (runner.position.y + runner.height) || (bone.position.y + bone.height) < runner.position.y)){
            winTexture.visible = true;
            document.removeEventListener('keydown', keydownEventHandler);
        

    
    }
}

