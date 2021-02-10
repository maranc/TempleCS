// Sally's JS naming convention: every JS file shall be named the same as the 
// single function or object that is defined within the JS file. This helps you 
// organize and find your code.

"use strict";
function routeParam(params) {

    var fw = {}; // creating and adorning this object to be passed back to the HTML page.
  
    var contentId = params.contentId || "view";
    var startLink = params.startLink || "#/home";
    console.log("startLink is " + startLink);
    if (!params.routeArray || params.routeArray[0]) {
        alert("parameter object must specify array 'routeArray' with at least one element");
        return;
    }

    // Declare a (private) array to store the routes.
    var routes = params.routeArray;
    function inject(what) {
        document.getElementById(contentId).innerHTML = "";
        document.getElementById(contentId).appendChild(what);
    }

    function parsePath(path) {

        // start out assuming that this is a parameterless path (URL)
        var obj = {
            param: "",
            funcName: path
        };

        // search for last '/' in the path (URL)
        var n = path.lastIndexOf("/");
     
        if (n > 1) {
            obj.param = path.substring(n + 1);
            console.log('routParamFw extracted parameter [' + obj.param + '] from path [' + path + ']');
            obj.funcName = path.substring(0, n);
        }
        console.log("*** parsePath: path is [" + path + "] param is [" + obj.param + "] and funcName is [" + obj.funcName + "]");
        return obj;
    } // parsePath

    // private function that will be called whenever a link is clicked (or href changed)
    function router() {

        var path = location.hash;

        var ele;
        var pathObj = parsePath(path);
        if (!routes[pathObj.funcName]) {  // the funcName of the URL was never registered in the routing table

            ele = document.createElement("div");
            ele.innerHTML = "<p>Error: unknown link '" + pathObj.funcName
                    + "' was never added to the routing table.</p>";

        } else if (pathObj.param.length > 0) { // if this URL has a parameter after the last /

            // Invoke the function that's stored in the routing table, passing in the parameter. 
            ele = routes[pathObj.funcName](pathObj.param);

        } else {  //    This is a "regular" URL with no parameters, so dont pass any parameters into 
            // the single use component.
            var ele = routes[pathObj.funcName](); // returns DOM element from the function stored in the routes associative array
        }

        inject(ele);
    } // router


    fw.printRoutes = function () {
        console.log("routes will be printed on the next line ");
        console.log(routes);
    };

    window.addEventListener('hashchange', router);
    location.hash = "xxx";
    location.hash = startLink;
    console.log("initial location.hash is " + location.hash);
    return fw;
}