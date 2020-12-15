document.addEventListener("DOMContentLoaded",() => {
    console.log = function(e){
        if (e == "intermission") adplayer = undefined;
    }
    window.requestAnimationFrame(check);
    function check(){
        let code = ["monetization","idTips"];
        code.forEach((e) => {
            if (typeof document.getElementById(e) == "undefined") return;
            if (document.getElementById(e).style.display != "none") document.getElementById(e).style.display = "none";
        })
        window.requestAnimationFrame(check);
    }
})
//e
