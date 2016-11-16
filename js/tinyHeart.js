/**
 * Created by asus1 on 2016/8/8.
 */

var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic =  new Image();

var ane;
var fruit;
var mom;
var baby;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];
var data;
var wave;
var halo;
var mx;
var my;
document.body.onload = game;
function  game()
{
     init();
    lastTime=Date.now();
    deltaTime =0;
    gameloop();
}
function init()
{
    //获得canvas context
    can1=document.getElementById("canvas1");//fishes dust UI
    ctx1=can1.getContext("2d");
    can2=document.getElementById("canvas2");//background fruit
    ctx2=can2.getContext("2d");

    can1.addEventListener("mousemove",onMouseMove,false);
    bgPic.src="./src/background.jpg";

    canWidth = can1.width;
    canHeight = can1.height;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby= new babyObj();
    baby.init();

    mx=canWidth * 0.5;
    my=canHeight * 0.5;

    for (var i = 0; i < 8; i++ )
    {
        babyTail[i] = new Image();
        babyTail[i].src= "./src/babyTail" + i + ".png";
    }
    for (var j = 0; j < 2; j++ )
    {
        babyEye[j] = new Image();
        babyEye[j].src= "./src/babyEye" + j + ".png";
    }
    for (var z = 0; z < 20; z++ )
    {
        babyBody[z] = new Image();
        babyBody[z].src= "./src/babyFade" + z + ".png";
    }
    for (var i = 0; i < 8; i++ )
    {
        momTail[i] = new Image();
        momTail[i].src= "./src/bigTail" + i + ".png";
    }
    for (var j = 0; j < 2; j++ )
    {
        momEye[j] = new Image();
        momEye[j].src= "./src/bigEye" + j + ".png";
    }
    data = new dataObj();
    for (var z = 0; z < 8; z++ )
    {
        momBodyOrange[z] = new Image();
        momBodyBlue[z] = new Image();
        momBodyOrange[z].src= "./src/bigSwim" + z + ".png";
        momBodyBlue[z].src= "./src/bigSwimBlue" + z + ".png";
    }

    ctx1.font = " 30px Verdana" ;
    ctx1.textAlign = "center";

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();
}
function gameloop()
{
    window.requestAnimFrame(gameloop);//setInterval setTimeout fps
    console.log("loop");
     var now =Date.now();
     deltaTime=now-lastTime;
    lastTime=now;

    drawBackground();
    ane.draw();
    fruit.draw();
    fruitMonitor();

    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    momFruitsCollision();
    momBabyCollision();
    baby.draw();
    if(deltaTime > 35)
    {
        deltaTime = 35;
    }
    data.draw();
    wave.draw();
    halo.draw();
}
function onMouseMove(e)
{
    if(!data.gameOver)
    {
        if(e.offSetX || e.layerX)
        {
            mx = e.offSetX ==undefined ? e.layerX : e.offSetX;
            my = e.offSetY ==undefined ? e.layerY : e.offSetY;
        }
    }

}