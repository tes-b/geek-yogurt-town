class Info {
    constructor(cam, section) {
        this.cam = cam;
        this.section = section;
    }
    draw(show=true, charactor) {
        if(show) {
            const charactorPosEl = document.getElementById("charactor-pos");
            if (charactorPosEl) {
                charactorPosEl.innerText = `Charactor : ${Math.floor(charactor.x)} , ${Math.floor(charactor.y)}
                                            CAM : ${Math.floor(this.cam.x)}, ${Math.floor(this.cam.y)}
                                            SECTION : ${this.section.section}`
                                            ;
            }
        }
    }
    
}