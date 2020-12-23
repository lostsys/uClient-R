document.addEventListener("DOMContentLoaded",() => {
    console.log = function(e){
        try {
            setTimeout(() => {
                if (document.getElementById("PokiUnitySDK_Ad_ad_box")) removeAds();
                //I could make it less long but it doesn't matter
                document.getElementsByClassName("pokiSdkContainer pokiSdkHidden pokiSdkFixed")[0].parentElement.removeChild(document.getElementsByClassName("pokiSdkContainer pokiSdkHidden pokiSdkFixed")[0])
            }, 100);
        } catch (error) {}
    }
  
})

//All of this is useless
