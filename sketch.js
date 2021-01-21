var sandyImage, virusImage, virusKingImage, dropImage, babyVirusImage, pumpedImage, backdrop
var SandyHanitizer, VirusKing, Drops, BabyVirus
var Viruses
var BV_Array=[]
var V_Array=[]
var D_Array=[]
var array, length
var BabyVirusGroup, VirusGroup, DropsGroup
var Health=10
var Score=0
var gameState="start"

function preload(){
    sandyImage=loadImage("Images/Sandy Hanitizer.png");
    virusImage=loadImage("Images/Virus.png");
    virusKingImage=loadImage("Images/Virus King.png");
    babyVirusImage=loadImage("Images/Baby Virus.png");
    backdrop=loadImage("Images/Background.png");
    pumpedImage=loadImage("Images/Sandy Hanitizer Pumps.png");
    dropImage=loadImage("Images/Pump.png")
}

function setup(){
    var canvas=createCanvas(500,700);

    SandyHanitizer=createSprite(260, 590);
    SandyHanitizer.addImage(sandyImage);
    SandyHanitizer.scale=0.4
   
    VirusKing=createSprite(250, 100);
    VirusKing.addImage(virusKingImage);
    VirusKing.scale=0.7
    VirusKing.visible=false

    BabyVirusGroup=new Group();
    VirusGroup=new Group();
    DropsGroup=new Group();

}

function draw(){
    background(backdrop);

    if(keyCode===13){
        gameState="play"
    }

    if(gameState==="play"){
        if(SandyHanitizer.x>30){
            if(keyIsDown(LEFT_ARROW)){
                SandyHanitizer.x=SandyHanitizer.x-10
            } 
        }
        
        if(SandyHanitizer.x<470){  
            if(keyIsDown(RIGHT_ARROW)){
                SandyHanitizer.x=SandyHanitizer.x+10
            }
        }

        Virus();
        babyViruses();
        pumps();
        gameOver();

            for(var i=0; i<BabyVirusGroup.length; i++){
            if(BabyVirusGroup.get(i).isTouching(SandyHanitizer)){ 
                    BabyVirusGroup.get(i).destroy();
                    Health--
                }
            }

            for(var i=0; i<VirusGroup.length; i++){
                if(VirusGroup.get(i).isTouching(DropsGroup)){ 
                    VirusGroup.get(i).destroy();
                    Score++
                }
            }
    }
    drawSprites();

    textSize(20);
    fill("black");
    text("Sickness: " + Health, 370, 690);
    text("Cases Cured: " + Score, 30, 690);
}

function Virus(){
    if(frameCount%100===0){
        Viruses=createSprite(500, Math.round(random(50, 150)));
        Viruses.addImage(virusImage);
        Viruses.scale=0.3
        Viruses.velocityX=-3
        VirusGroup.add(Viruses)
        V_Array=(Viruses)
    }
}

function babyViruses(){
    if(frameCount%70===0){
        BabyVirus=createSprite(Math.round(random(50,450)), 50);
        BabyVirus.addImage(babyVirusImage)
        BabyVirus.scale=0.05
        BabyVirus.velocityY=3
        BabyVirusGroup.add(BabyVirus);
        BV_Array.push(BabyVirus)
    }
}

function pumps(){
    if(frameCount%20===0 && keyCode===32){
        Drops=createSprite(SandyHanitizer.x, SandyHanitizer.y-50);
        Drops.addImage(dropImage);
        Drops.scale=0.2
        Drops.velocityY=-3
        DropsGroup.add(Drops)
        D_Array.push(Drops)
    }

}

function gameOver(){
    if(Health<=0){
        gameState==="end"
        VirusGroup.destroyEach();
        BabyVirusGroup.destroyEach();
        DropsGroup.destroyEach();
        textSize(20)
        fill("black")
        text("The world was infested....", 150, 350);
    }
}