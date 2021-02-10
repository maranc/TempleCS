function liveUsers() {
    
    var ele = document.createElement("div");
    ele.classList.add("tablePage");
    ele.id = "finalList";
    
    var heading = Utils.make({
        htmlTag: "h2",
        parent: ele
    });
    Utils.make({// don't need reference to this span tag...
        htmlTag: "span",
        innerHTML: "Web User List ",
        parent: heading
    });
    var img = Utils.make({
        htmlTag: "img",
        parent: heading
    });
    img.src = CRUD_icons.insert;
    img.onclick = function () {
        // By changing the URL, you invoke the user insert. 
        window.location.hash = "#/userInsert";
    };
    
    function findUsers(obj) {
        var list = obj.webUserList;
        console.log("****************");
        console.log(list.length);
        var finalList = [];
        for (var i = 0; i < list.length; i++) {
            finalList[i] = {};
            finalList[i].image = "<img  src='" + list[i].image + "' style='width:5rem; margin:0.5rem'>";
            finalList[i].userEmail = list[i].userEmail;
            finalList[i].birthday = list[i].birthday;
            finalList[i].membershipFee = list[i].membershipFee;
            finalList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
            finalList[i].update = "<img src = 'icons/update.png' onclick='" + "window.location.hash=\"#/userUpdate/" + list[i].webUserId + "\"'></img>";
            finalList[i].delete = "<img src='icons/delete.png' onclick='webUserMods.delete(" +list[i].webUserId+",this)'></img>";
        }
        document.getElementById("finalList").appendChild(MakeClickSort({objList: finalList}));
    }
    ajax("webAPIs/listUsersAPI.jsp", findUsers, ele);
   
    return ele;
}