document.addEventListener("DOMContentLoaded",() => {
    console.log = function(e){
        try {
            setTimeout(() => {
                if (document.getElementById("PokiUnitySDK_Ad_ad_box")) removeAds();
            }, 100);
        } catch (error) {}
    }
  
})

//All of this is useless
