var account = {};

//IIFE as suggested in hw document
(function ( ) {
    account.getProfile = function () {
        var root = document.createElement("div");
        var destination = "webAPIs/getProfileAPI.jsp";
        root.classList.add("form");
        ajax(destination, getFinalProfile, root);
        function getFinalProfile(obj) {
            root.innerHTML = buildProfile(obj);
        }
        return root;
    };
    
    account.logoff = function() {
        var root = document.createElement("div");
        root.classList.add("form");
        var destination = "webAPIs/logoffAPI.jsp";
        ajax(destination, finalLogOff, root);
        function finalLogOff(obj) {
            root.innerHTML = buildProfile(obj);
        }
        return root;
    };

    account.logon = function() {
        var root = document.createElement("div");
        var funInp = document.createElement("div");
        var tempProf = document.createElement("div");
        var username = document.createElement("span");
        var inpUsername = document.createElement("input");
        var password = document.createElement("span");
        var inpPassword = document.createElement("input");
        var finalPush = document.createElement("button");
        root.classList.add("form");
        username.innerHTML = "Email Address";
        funInp.appendChild(username);
        funInp.appendChild(inpUsername);
        password.innerHTML = "Password";
        funInp.appendChild(password);
        inpPassword.setAttribute("type", "password");
        funInp.appendChild(inpPassword);
        finalPush.innerHTML = "Submit";
        finalPush.onclick = function() {
            var destination = "webAPIs/logonAPI.jsp?userEmail=" + inpUsername.value + "&userPwd=" + inpPassword.value;
            ajax(destination, finalLogon, tempProf);
            function finalLogon(obj) {
                tempProf.innerHTML = buildProfile(obj);
            }
        };
        funInp.appendChild(finalPush);
        root.appendChild(funInp);
        root.appendChild(tempProf);
        
        return root;
    };
    
    function buildProfile (userObj) { // NOW PRIVATE, can be called by any of the account functions…
        var msg = "";
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'> </p>";
        }
        return msg;
    }
}());