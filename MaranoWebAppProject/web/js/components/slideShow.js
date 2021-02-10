function slideShow() {
    var slideshow=document.createElement("div");
    slideshow.classList.add("slideShowContainer");
    ajax("json/cars.json", runCarPics, slideshow);
    
    function runCarPics(picList) {
        for (var j = 0; j < picList.length; j++) {
            picList[j].image=picList[j].photo;
            picList[j].caption=picList[j].make;
        }
        var displayFirst = MakeSlideShow({
            captionStyleName: "captionClass",
            objArr: picList,
        });
        slideshow.appendChild(displayFirst);
    }
    
    ajax("json/cats.json", runCatPics, slideshow);
    function runCatPics(picList) {
        for (var j = 0; j < picList.length; j++) {
            picList[j].image=picList[j].pic;
            picList[j].caption=picList[j].nickname;
        }
        var displaySecond = MakeSlideShow({
            captionStyleName: "captionClass",
            objArr: picList,
            optSize: "small",
        });
        slideshow.appendChild(displaySecond);
    }
    return slideshow;
}