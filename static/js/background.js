class Background{
    constructor(canvas, ctx) {

        this.imgDict = {};

        this.imgBgWater1 = new Image();
        this.imgBgWater1.src = imgBackgroundWater1;
        this.imgBgWater2 = new Image();
        this.imgBgWater2.src = imgBackgroundWater2;
        this.imgBgCloud1 = new Image();
        this.imgBgCloud1.src = imgBackgroundCloud1;
        this.imgBgCloud2 = new Image();
        this.imgBgCloud2.src = imgBackgroundCloud2;
        this.imgBgSky = new Image();
        this.imgBgSky.src = imgBackgroundSky;
        
        this.imgDict["water1"] = {"obj":this.imgBgWater1, "frameX":1, "frameY":1 ,"frameWidth":288, "frameHeight":208, "frameRate":0};
        this.imgDict["water2"] = {"obj":this.imgBgWater2, "frameX":1, "frameY":1 ,"frameWidth":288, "frameHeight":208, "frameRate":0};
        this.imgDict["cloud1"] = {"obj":this.imgBgCloud1, "frameX":1, "frameY":1 ,"frameWidth":288, "frameHeight":208, "frameRate":0};
        this.imgDict["cloud2"] = {"obj":this.imgBgCloud2, "frameX":1, "frameY":1 ,"frameWidth":288, "frameHeight":208, "frameRate":0};
        this.imgDict["sky"] = {"obj":this.imgBgSky, "frameX":1, "frameY":1 ,"frameWidth":288, "frameHeight":208, "frameRate":0};

    }

    drawImage(img) {
        if(img["obj"].complete){
            ctx.drawImage(
                img["obj"], 
                0,
                0,
                img["frameWidth"],
                img["frameHeight"],
                0,
                0, 
                canvas.width,
                canvas.height, 
                );
        }
    }

    draw() {
        this.drawImage(this.imgDict["sky"]);
        this.drawImage(this.imgDict["cloud2"]);
        this.drawImage(this.imgDict["cloud1"]);
        this.drawImage(this.imgDict["water2"]);
        this.drawImage(this.imgDict["water1"]);
    }
}