function liveDotaTeams() {
    
    var ele = document.createElement("div");
    ele.classList.add("tablePage");
    ele.id = "dotaList";
    var heading = Utils.make({
        htmlTag: "h2",
        parent: ele
    });
    Utils.make({// don't need reference to this span tag...
        htmlTag: "span",
        innerHTML: "Dota Teams List ",
        parent: heading
    });
    var img = Utils.make({
        htmlTag: "img",
        parent: heading
    });
    img.src = CRUD_icons.insert;
    img.onclick = function () {
        // By changing the URL, you invoke the user insert. 
        window.location.hash = "#/dotaInsert";
    };
    
    function findTeams(obj) {
        var list = obj.dotaList;
        console.log("**************");
        console.log(list);
        var dotaList = [];
        for (var i = 0; i < list.length; i++) {
            dotaList[i] = {};
            dotaList[i].name = list[i].teamCompName;
            dotaList[i].heroNames = list[i].heroNames;
            dotaList[i].teamGoals = list[i].teamGoals;
            dotaList[i].teamItems = list[i].teamItems;
            dotaList[i].dateRelevant = list[i].dateRelevant;
            dotaList[i].webUserId = list[i].webUserId;
            dotaList[i].update = "<img src = 'icons/update.png' onclick='" + "window.location.hash=\"#/teamsUpdate/" + list[i].dotaTeamId + "\"'></img>";
            dotaList[i].delete = "<img src='icons/delete.png' onclick='dotaMods.delete(" +list[i].dotaTeamId+",this)'></img>";
        }
        document.getElementById("dotaList").appendChild(MakeClickSort({objList: dotaList}));
    }
    ajax("webAPIs/listOtherAPI.jsp", findTeams, ele);
   
    return ele;
}