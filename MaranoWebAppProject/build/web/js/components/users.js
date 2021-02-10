function users() {
    
    var ele = document.createElement("div");
    ele.classList.add("tablePage");
    ele.id = "finalList";
    var title = document.createElement("h2");
    title.innerHTML = "Users";
    ele.appendChild(title);
    
    function findUsers(list) {
        var finalList = [];
        for (var i = 0; i < list.length; i++) {
            finalList[i] = {};
            finalList[i].image = "<img  src='" + list[i].image + "' style='width:5rem; margin:0.5rem'>";
            finalList[i].userEmail = list[i].userEmail;
            finalList[i].birthday = list[i].birthday;
            finalList[i].membershipFee = list[i].membershipFee;
            finalList[i].role = list[i].userRoleId + " " + list[i].userRoleType;
        }
        document.getElementById("finalList").appendChild(MakeClickSort({objList: finalList}));
    }
    ajax("json/users.json", findUsers, ele);
   
    return ele;
}