function dotaTeams() {
    
    var ele = document.createElement("div");
    ele.classList.add("tablePage");
    ele.id = "dotaList";
    var title = document.createElement("h2");
    title.innerHTML = "Dota Teams";
    ele.appendChild(title);
    
    function findTeams(list) {
        var dotaList = [];
        console.log("****************");
        console.log(list);
        for (var i = 0; i < list.length; i++) {
            dotaList[i] = {};
            dotaList[i].name = list[i].teamCompName;
            dotaList[i].heroNames = list[i].heroNames;
            dotaList[i].teamGoals = list[i].teamGoals;
            dotaList[i].teamItems = list[i].teamItems;
            dotaList[i].webUserId = list[i].webUserId;
            
        }
        document.getElementById("dotaList").appendChild(MakeClickSort({objList: dotaList}));
    }
    ajax("json/dota.json", findTeams, ele);
   
    return ele;
}