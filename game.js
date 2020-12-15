document.addEventListener("DOMContentLoaded",() => {
    console.log = function(e){
        if (e == "show main ui")  hideAds();
        if (e == "intermission") adplayer = undefined;
    }
})

