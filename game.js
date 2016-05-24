var gameport = document.getElementById("gameport");


var renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x33bbe8});
gameport.appendChild(renderer.view);

var gameStage = new PIXI.Container();
//var startStage = new PIXI.Container();

//var gameStart = false;
//var title = new PIXI.Sprite(PIXI.Texture.fromImage('title.png'));

var credits = new PIXI.Sprite(PIXI.Texture.fromImage("credits.png"));
var start = new PIXI.Sprite(PIXI.Texture.fromImage("instructions1.png"));
var title = new PIXI.Sprite(PIXI.Texture.fromImage("test.png"));

var titleText = new PIXI.Text("Pluto's Mission", {font:"30px Monospace"});
var titleText1 = new PIXI.Text("Press right arrow key to continue", {font:"30px Monospace"})
var creditsText = new PIXI.Text("Credits:", {font:"30px Monospace"});
var creditsText1 = new PIXI.Text("All code, images, and sounds\nproduced by Kaina Crow", {font:"30px Monospace"});
var creditsText2 = new PIXI.Text("Press the tab key to continue", {font:"30px Monospace"});
var startText = new PIXI.Text("Your mission is to get the dog to\nthe whitebone. Watch out for\nobstacles (cat and walls). Use\nWASD or arrow keys to play.", {font:"30px Monospace"});
var startText1 = new PIXI.Text("Press Enter to play game.", {font:"30px Monospace"});




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
var lose = new PIXI.Text("You got in a fight\nwith the cat and lost.", {font:"30px Monospace", fill: "#fff"});
var winTexture = new PIXI.Sprite(PIXI.Texture.fromImage("winCollision.png"));
var win = new PIXI.Text("You got the dog to the \nbone. You win!", {font:"30px Monospace"});
gameStage.addChild(lose);



    
var runner;
var sounds;

function soundready() {
    sounds = PIXI.audioManager.getAudio("gameMusic.mp3");
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

    start.position.x = 0;
    start.position.y = 0;
    gameStage.addChild(start);
    startText.position.x = 100;
    startText.position.y = 200;
    gameStage.addChild(startText);
    startText1.position.x = 100;
    startText1.position.y = 400;
    gameStage.addChild(startText1);
    
    credits.position.x = 0;
    credits.position.y = 0;
    gameStage.addChild(credits);
    
    creditsText.position.x = 300;
    creditsText.position.y = 200;
    gameStage.addChild(creditsText);
    creditsText1.position.x = 100;
    creditsText1.position.y = 300;
    gameStage.addChild(creditsText1);
    creditsText2.position.x = 100;
    creditsText2.position.y = 500;
    gameStage.addChild(creditsText2);
    
    title.position.x = 0;
    title.position.y = 0;
    gameStage.addChild(title);
    
    // test.position.x = 0;
    // test.position.y = 0;
    // gameStage.addChild(test);
    
    titleText.position.x = 260;
    titleText.position.y = 200;
    gameStage.addChild(titleText);
    
    titleText1.position.x = 100;
    titleText1.position.y = 250;
    gameStage.addChild(titleText1);
    
    runner1 = new PIXI.extras.MovieClip(frames);
    runner1.animationSpeed = 0.17;
    runner1.position.y = 300;
    runner1.position.x = 350;
    runner1.height = 72;
    runner1.width = 100;
    gameStage.addChild(runner1);
    runner1.play();
    
    
    

    winTexture.position.x = 0;
    winTexture.position.y = 0;
    win.position.x = 200;
    win.position.y = 200;
    winTexture.visible = false;
    win.visible = false;
    gameStage.addChild(winTexture);
    gameStage.addChild(win);

    loseTexture.position.x = 0;
    loseTexture.position.y = 0;
    lose.position.x = 200;
    lose.position.y = 200;
    loseTexture.visible = false;
    lose.visible = false;
    gameStage.addChild(loseTexture);
    gameStage.addChild(lose);

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
    titleText.visible = false;
    titleText1.visible =  false;
    runner1.visible = false;
    runner.play();
    if([32, 37, 38, 39, 40, 9].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
    if([9].indexOf(e.keyCode) > -1) {
        credits.visible = false;
        creditsText.visible = false;
        creditsText1.visible = false;
        creditsText2.visible = false;
    }
    if([13].indexOf(e.keyCode) > -1) {
        start.visible = false;
        startText.visible = false;
        startText1.visible = false;
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
            win.visible = true;
            document.removeEventListener('keydown', keydownEventHandler);
        

    
    }
}

