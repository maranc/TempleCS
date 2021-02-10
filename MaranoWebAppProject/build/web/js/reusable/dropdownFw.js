function dropdownFw(params) {
    
    var showId = params.showId || "show";
    var hideId = params.hideId || "hide";
    var contentId = params.contentId || "dropContent";
    var headerId = params.headerId || "dropHeader";
    
    window.onclick = function (event) {
        var dropContents = document.getElementsByClassName(contentId);
        if (event.target.classList.contains(headerId)) {
            var ele = event.target.parentElement.getElementsByClassName(contentId)[0];
            toggle(ele);
            hideAllBut(dropContents, ele);
        } else {
            hideAll(dropContents);
        }
        
        function toggle(element) {
            if (element.classList.contains(showId))
                hide(element);
            else
                show(element);
        }
       
        function hide(element) {
            element.classList.remove(showId);
            element.classList.add(hideId);
        }
        
        function hideAllBut(dropContents, ele) {
            for (var i = 0; i < dropContents.length; i++) {
                if (dropContents[i] !== ele)
                    hide(dropContents[i]);
            }
        }
        
        function hideAll(dropContents) {
            for (var i = 0; i < dropContents.length; i++) {
                hide(dropContents[i]);
            }
        }
        
        function show(element) {
            element.classList.remove(hideId);
            element.classList.add(showId);
        }
    };
}