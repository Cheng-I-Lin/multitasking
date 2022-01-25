var scale=(window.innerHeight/722);
const text=document.getElementsByClassName("textContainer");
for(t of text){
    t.style.fontSize=t.style.fontSize*scale+"em";
    //document.getElementById("hi").innerHTML=window.innerHeight;
}
var score=0;
var player={
    x:0,
    y:0,
    ySpeed: 0,
    speed: 0.085,
    color: "black",
    width: 40,
    height: 80,
    gravity: 0.6,
    jump: true,
    dead: false
};
var basket={
    x:0,
    friction: 0.1,
    xSpeed: 0,
    speed: 0.22,
    color: "black",
    width: 85,
    height: 35,
    lose: 0,
    dead: false
};
var ping={
    y:0,
    ySpeed: 0,
    friction: 0.1,
    speed: 0.085,
    color: "black",
    width: 35,
    height: 100,
    dead: false
};
var spacebar={
    num: 0,
    goalNum: Math.floor(Math.random()*900)+100,
    dead: false
};
var plastic={
    x: 0,
    y: 0,
    xSpeed: 4,
    size: 30
};
var fruit1={
    x: 0,
    y: 0,
    ySpeed: 1,
    size: 30,
    draw: false
};
var fruit2={
    x: 0,
    y: -100,
    ySpeed: 1,
    size: 30,
    draw: false
};
var fruit3={
    x: 0,
    y: -200,
    ySpeed: 1,
    size: 30,
    draw: false
};
var pingPongBall={
    x: 0,
    y: 0,
    speed: 1,
    draw: false,
    xSpeed: 4,
    ySpeed: 2,
    size: 30
};
const move={
    up: false,
    down: false,
    a: false,
    d: false,
    w: false,
    s: false,
    space: false
};
const grid=document.getElementById("grid");
const gridFruit=document.getElementById("gridFruit");
const gridPing=document.getElementById("gridPing");
const gridSpace=document.getElementById("gridSpace");
var gameTime=20;
var pause=true;
var blockSize=30;
function drawGame(){
    let canvas=document.getElementById("gameCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    ds.fillStyle="blue";
    ds.fillRect(plastic.x,plastic.y,plastic.size,plastic.size);
}
function drawFruit(){
    let canvas=document.getElementById("fruitCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=gridFruit.offsetLeft+"px";
    canvas.style.top=gridFruit.offsetTop+"px";
    canvas.width = gridFruit.offsetWidth;
    canvas.height = gridFruit.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(fruit1.draw){
        ds.fillStyle="red";
        ds.fillRect(fruit1.x,fruit1.y,fruit1.size,fruit1.size);
    }
    if(fruit2.draw){
        ds.fillStyle="yellow";
        ds.fillRect(fruit2.x,fruit2.y,fruit2.size,fruit2.size);
    }
    if(fruit3.draw){
        ds.fillStyle="blue";
        ds.fillRect(fruit3.x,fruit3.y,fruit3.size,fruit3.size);   
    }
    if(!basket.dead){
        ds.fillStyle="brown";
    } else{
        ds.fillStyle="red";
    }
    ds.fillRect(basket.x,gridFruit.offsetHeight-basket.height,basket.width,basket.height);
}
function drawPing(){
    let canvas=document.getElementById("ballCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=gridPing.offsetLeft+"px";
    canvas.style.top=gridPing.offsetTop+"px";
    canvas.width = gridPing.offsetWidth;
    canvas.height = gridPing.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(pingPongBall.draw){
        ds.fillStyle="white";
        ds.fillRect(pingPongBall.x,pingPongBall.y,pingPongBall.size,pingPongBall.size);
    }
    if(!ping.dead){
        ds.fillStyle="black";
    } else{
        ds.fillStyle="red";
    }
    ds.fillRect(0,ping.y,ping.width,ping.height);
}
function drawPlayer(){
    let canvas=document.getElementById("playerCanvas");
    let dp=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight;
    dp.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);
    if(!player.dead){
        dp.fillStyle=player.color;
    } else{
        dp.fillStyle="red";
    }
    dp.fillRect(player.x,player.y,player.width,player.height);
}
document.addEventListener("keydown", function(a){
    let control=a.code;
    switch(control){
        case "ArrowUp":
            move.up=true;
            if(!(player.jump)){
                player.ySpeed=-15;
            }
            break;
        case "ArrowDown":
            move.down=true;
            break;
        case "KeyA":
            move.a=true;
            break;
        case "KeyD":
            move.d=true;
            break;
        case "KeyW":
            move.w=true;
            break;
        case "KeyS":
            move.s=true;
            break;
        case "Space":
            if(!pause){
                move.space=true;
            }
            break;
        case "KeyE":
            if(!pause){
                showScore();
            }
            break;
        default:
            break;
    }
});
document.addEventListener("keyup", function(a){
    let control=a.code;
    switch(control){
        case "ArrowUp":
            move.up=false;
            if(player.ySpeed<-5){
                player.ySpeed=-6;
            }
            break;
        case "ArrowDown":
            move.down=false;
            break;
        case "KeyA":
            move.a=false;
            break;
        case "KeyD":
            move.d=false;
            break;
        case "KeyW":
            move.w=false;
            break;
        case "KeyS":
            move.s=false;
            break;
        case "Space":
            move.space=false;
            if(score>300){
                spaceBar();
            }
            break;
        default:
            break;
    }
});
player.y=grid.offsetHeight-player.height;
plastic.x=grid.offsetWidth;
plastic.y=Math.random()*(grid.offsetHeight-plastic.size-200)+200;
function game(){
    if(!pause){
        plastic.x-=plastic.xSpeed;
        if(plastic.x+plastic.size<0){
            plastic.x=grid.offsetWidth;
            plastic.y=Math.random()*(grid.offsetHeight-plastic.size-200)+200;
        }
        if((player.x<=plastic.x+plastic.size&&player.x+player.width>=plastic.x)&&(player.y<=plastic.y+plastic.size&&player.y>=plastic.y-player.height)){
            player.dead=true;
        }
        if(!player.dead){
            player.ySpeed+=player.gravity;
            player.jump=true;
            player.y+=player.ySpeed;
            if(player.y+player.height>grid.offsetHeight){
                player.jump=false;
                player.ySpeed=0;
                player.y=grid.offsetHeight-player.height;
            }
            if(move.down&&!player.jump){
                player.y+=player.height/2;
            } 
        }
    }
}
function fruitBasket(){
    if(!pause){
        if(fruit1.draw){
            fruit1.y+=fruit1.ySpeed;  
        }
        if(fruit2.draw){
            fruit2.y+=fruit2.ySpeed; 
        }
        if(fruit3.draw){
            fruit3.y+=fruit3.ySpeed;
        }
        //Repeat for all three fruits
        if(fruit1.y>gridFruit.offsetHeight){
            fruit1.y=0-fruit1.size;
            fruit1.x=Math.random()*(grid.offsetWidth-fruit1.size);
        }
        if(fruit2.y>gridFruit.offsetHeight){
            fruit2.y=0-fruit2.size;
            fruit2.x=Math.random()*(grid.offsetWidth-fruit2.size);
        }
        if(fruit3.y>gridFruit.offsetHeight){
            fruit3.y=-0-fruit3.size;
            fruit3.x=Math.random()*(grid.offsetWidth-fruit3.size);
        }
        //Fruit reaches ground, you lose(change code above)
        if(fruit1.y==gridFruit.offsetHeight||fruit2.y==gridFruit.offsetHeight||fruit3.y==gridFruit.offsetHeight){
            basket.lose++;
        }
        if(basket.lose>=5){
            basket.dead=true;
        }
        //Checks if touching the basket
        if((basket.x<=fruit1.x+fruit1.size&&basket.x+basket.width>=fruit1.x)&&(gridFruit.offsetHeight-basket.height<=fruit1.y+fruit1.size&&gridFruit.offsetHeight-basket.height>=fruit1.y-basket.height)){
            fruit1.y=0-fruit1.size;
            fruit1.x=Math.random()*(grid.offsetWidth-fruit1.size);
        }
        if((basket.x<=fruit2.x+fruit2.size&&basket.x+basket.width>=fruit2.x)&&(gridFruit.offsetHeight-basket.height<=fruit2.y+fruit2.size&&gridFruit.offsetHeight-basket.height>=fruit2.y-basket.height)){
            fruit2.y=0-fruit2.size;
            fruit2.x=Math.random()*(grid.offsetWidth-fruit2.size);
        }
        if((basket.x<=fruit3.x+fruit3.size&&basket.x+basket.width>=fruit3.x)&&(gridFruit.offsetHeight-basket.height<=fruit3.y+fruit3.size&&gridFruit.offsetHeight-basket.height>=fruit3.y-basket.height)){
            fruit3.y=-0-fruit3.size;
            fruit3.x=Math.random()*(grid.offsetWidth-fruit3.size);
        }
        if(!basket.dead){
            basket.xSpeed*=basket.friction;
            if(move.d){
                basket.xSpeed+=basket.speed*gameTime;
            }
            if(move.a){
                basket.xSpeed-=basket.speed*gameTime;
            }  
            basket.x+=basket.xSpeed;
            if(basket.x+basket.width>gridFruit.offsetWidth){
                basket.x=gridFruit.offsetWidth-basket.width;
            } else if(basket.x<0){
                basket.x=0;
            }
        }
        document.getElementById("losePoint").innerHTML="Lives: "+(5-basket.lose);
    }
}
//Reset ball position first(can't use offsetWidth/offsetHeight because grid hidden)
pingPongBall.x=741;
pingPongBall.y=Math.floor(Math.random()*(351-pingPongBall.size));
function pingPong(){
    if(!pause){
        //Bounce back when hit wall
        if(pingPongBall.x+pingPongBall.size>=gridPing.offsetWidth){
            //Reverse speed only if its coming to the wall
            if(pingPongBall.xSpeed>0){
                pingPongBall.xSpeed*=-1;
            }
        }
        if(pingPongBall.y<=0){
            //Reverse speed
            pingPongBall.ySpeed*=-1;
        }
        if(pingPongBall.y+pingPongBall.size>=gridPing.offsetHeight){
            //Reverse speed
            pingPongBall.ySpeed*=-1;
        }
        if(pingPongBall.x+pingPongBall.size<=0){
            //player dead if ball went out not hitting platform
            ping.dead=true;
        }
        //Bounces back when touch platform
        if(pingPongBall.x<=ping.width&&(ping.y+ping.height>=pingPongBall.y&&ping.y<=pingPongBall.y+pingPongBall.size)){
            pingPongBall.xSpeed*=-1;
            pingPongBall.ySpeed=Math.floor(Math.random()*10);
        }
        pingPongBall.x+=pingPongBall.xSpeed*pingPongBall.speed;
        pingPongBall.y+=pingPongBall.ySpeed;
        if(!ping.dead){
            ping.ySpeed*=ping.friction;
            if(move.w){
                ping.ySpeed-=ping.speed*gameTime;
            }
            if(move.s){
                ping.ySpeed+=ping.speed*gameTime;
            }
            ping.y+=ping.ySpeed;
            if(ping.y+ping.height>gridPing.offsetHeight){
                ping.y=gridPing.offsetHeight-ping.height;
            } else if(ping.y<0){
                ping.y=0;
            }
        }
    }
}
//Use timeout to call this function, end game if spacebar not clicked in 5 seconds
var spacebarTime=0;
function notClickSpace(){
    if(!move.space){
        spacebarTime++;
    }
    switch(spacebarTime){
        case 1:
            gridSpace.style.backgroundColor="rgb(126, 226, 193)";
            break;
        case 2:
            gridSpace.style.backgroundColor="rgb(126, 190, 130)";
            break;
        case 3:
            gridSpace.style.backgroundColor="rgb(140, 160, 110)";
            break;
        case 4:
            gridSpace.style.backgroundColor="rgb(170, 130, 100)";
            break;
        case 5:
            gridSpace.style.backgroundColor="rgb(185, 105, 90)";
            break;
        case 6:
            gridSpace.style.backgroundColor="rgb(233, 84, 84)";
            spacebar.dead=true;
            break;
        default:
            break;
    }
}
function spaceBar(){
    //Within the range of +- 5 is a win
    if(spacebar.num<=spacebar.goalNum+10&&spacebar.num>=spacebar.goalNum-10){
        //Random again?
        spacebar.goalNum=Math.floor(Math.random()*900)+100;
    } else{
        spacebar.dead=true;
        gridSpace.style.backgroundColor="rgb(233, 84, 84)";
    }
    spacebar.num=0;
}
function spacebarGame(){
    if(move.space){
        spacebar.num++;
        spacebarTime=0;
        gridSpace.style.backgroundColor="rgb(126, 226, 193)";
    }
}
function showScore(){
    let s=document.getElementById("scorePage");
    if(s.style.bottom=="45%"){
        s.style.bottom="100%";
    } else{
        s.style.bottom="45%";
    }
}
function restart(){
    plastic.x=grid.offsetWidth;
    plastic.y=Math.random()*(grid.offsetHeight-plastic.size-200)+200;
    player.dead=false;
    basket.dead=false;
    ping.dead=false;
    spacebar.dead=false;
    basket.lose=0;
    score=0;
    fruit1.draw=false;
    fruit2.draw=false;
    fruit3.draw=false;
    pingPongBall.draw=false;
    pingPongBall.x=741;
    pingPongBall.y=Math.floor(Math.random()*(351-pingPongBall.size));
    spacebar.goalNum=Math.floor(Math.random()*900)+100;
    document.getElementById("losingPage").style.bottom="100%";
    gridFruit.style.display="none";
    gridPing.style.display="none";
    gridSpace.style.display="none";
    document.getElementById("fruitCanvas").style.display="none";
    document.getElementById("ballCanvas").style.display="none";
    gridSpace.style.backgroundColor="rgb(126, 226, 193)";
    //Need to close the canvas too
    pause=false;
}
        function nextGame(){
            document.getElementById("intro").style.bottom="100%";
            pause=false;
        }
        setInterval(function(){
            if(!pause){
                score++;
                //Dinosaur
                if(score<10){
                    plastic.xSpeed=4;
                } else if(score<20){
                    plastic.xSpeed=5;
                } else if(score<30){
                    plastic.xSpeed=6;
                } else if(score<40){
                    plastic.xSpeed=7;
                } else if(score<50){
                    plastic.xSpeed=8;;
                }else if(score<60){
                    plastic.xSpeed=9;
                } else if(score<70){
                    plastic.xSpeed=10;
                } else if(score<80){
                    plastic.xSpeed=11;
                } else{
                    plastic.xSpeed=12;
                }
                //Fruits
                if(score==101){
                    //Randomize the location of the fruits
                    fruit1.x=Math.random()*(grid.offsetWidth-fruit1.size);
                    fruit2.x=Math.random()*(grid.offsetWidth-fruit2.size);
                    fruit3.x=Math.random()*(grid.offsetWidth-fruit3.size);
                }
                if(score>170){
                    fruit3.draw=true;
                } else if(score>145){
                    fruit2.draw=true;
                } else if(score>120){
                    fruit1.ySpeed=2;
                    fruit2.ySpeed=2;
                    fruit3.ySpeed=2;
                } else if(score>100){
                    fruit1.draw=true;
                }
                //Ping pong ball
                if(score>260){
                    pingPongBall.speed=1.5;
                }else if(score>240){
                    pingPongBall.speed=1.25;
                } else if(score>220){
                    pingPongBall.speed=1;
                } else if(score>200){
                    pingPongBall.draw=true;
                    //Used to control ping pong ball speed
                    pingPongBall.speed=0.5;
                }
                if(score>300){
                    notClickSpace();
                }
                let announce=document.getElementById("announcementPage");
                let announcement=document.getElementById("announcement");
                let time=document.getElementById("time");
                document.getElementById("score").innerHTML=score; 
                document.getElementById("score").innerHTML=score;
                if(score>=97&&score<=100){
                    announce.style.bottom="30%";
                    announcement.innerHTML="Second Game: Falling Collections";
                    time.innerHTML=100-score;
                } else if(score==101){
                    announce.style.bottom="100%";
                }
                if(score>=197&&score<=200){
                    announce.style.bottom="30%";
                    announcement.innerHTML="Third Game: Ping Pong";
                    time.innerHTML=200-score;
                } else if(score==201){
                    announce.style.bottom="100%";
                }
                if(score>=297&&score<=300){
                    announce.style.bottom="30%";
                    announcement.innerHTML="Fourth Game: Perfect Timing";
                    time.innerHTML=300-score;
                } else if(score==301){
                    announce.style.bottom="100%";
                }
            }
        },1000);
        setInterval(function(){
            if(player.dead||basket.dead||ping.dead||spacebar.dead){
                pause=true;
                document.getElementById("losingPage").style.bottom="30%";
                if(document.getElementById("scorePage").style.bottom=="45%"){
                    document.getElementById("scorePage").style.bottom="100%";
                }
            }
            document.getElementById("goalNum").innerHTML=spacebar.goalNum;
            document.getElementById("num").innerHTML=spacebar.num;
            if(score>=0){
                //dinosaur
                drawGame();
                drawPlayer();
                game();
            }
            if(score>100){
                drawFruit();
                //fruits
                fruitBasket();
                //Show square
                gridFruit.style.display="block";
                document.getElementById("fruitCanvas").style.display="block";
            }
            if(score>200){
                //ping pong
                drawPing();
                pingPong();
                gridPing.style.display="block";
                document.getElementById("ballCanvas").style.display="block"; 
            } 
            if(score>300){
                //space bar
                gridSpace.style.display="block";
                spacebarGame();
            }
        },gameTime);
//Shows the title of each game
document.getElementById("playerCanvas").addEventListener("mouseover",function(){
    document.getElementById("name").style.opacity=1;
});
document.getElementById("playerCanvas").addEventListener("mouseleave",function(){
    document.getElementById("name").style.opacity=0;
});
document.getElementById("fruitCanvas").addEventListener("mouseover",function(){
    document.getElementById("nameFruit").style.opacity=1;
});
document.getElementById("fruitCanvas").addEventListener("mouseleave",function(){
    document.getElementById("nameFruit").style.opacity=0;
});
document.getElementById("ballCanvas").addEventListener("mouseover",function(){
    document.getElementById("namePing").style.opacity=1;
});
document.getElementById("ballCanvas").addEventListener("mouseleave",function(){
    document.getElementById("namePing").style.opacity=0;
});
gridSpace.addEventListener("mouseover",function(){
    document.getElementById("nameSpace").style.opacity=1;
});
gridSpace.addEventListener("mouseleave",function(){
    document.getElementById("nameSpace").style.opacity=0;
});