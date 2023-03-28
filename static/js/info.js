class Info {
    constructor() {

    }

    draw() {
        const charactorPosEl = document.getElementById("charactor-pos");
        if (charactorPosEl) {
            charactorPosEl.innerText = `Charactor : ${Math.floor(charactor.x)} , ${Math.floor(charactor.y)}
                                        CAM : ${Math.floor(cam.x)}, ${Math.floor(cam.y)}
                                        SECTION : ${currentSection.section}
                                        CURR SECTION : ${charactor.section}
                                        `
                                        ;
        }
    }
    
}