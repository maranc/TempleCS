var dotaMods = {};

(function () {  // This is an IIFE, an immediately executing function.
// It is an anonymous function that runs once (and only once) at page load time.
// It is a way to create private functions that can be shared. 

//alert("I am an IIFE!"); // runs only at page load time...

    // create an object from the values typed into the page, URL encode it and return it.
    function getDataFromUI(validateObjList) {     // a private function within the IIFE 

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        var selTag = validateObjList["dotaTeamId"].inputBox; // New code: Role Pick List. 

        var userInputObj = {

            "dotaTeamId": validateObjList["dotaTeamId"].inputBox.value,
            "teamCompName": validateObjList["teamCompName"].inputBox.value,
            "heroNames": validateObjList["heroNames"].inputBox.value,
            "teamGoals": validateObjList["teamGoals"].inputBox.value,
            "teamItems": validateObjList["teamItems"].inputBox.value,
            "dateRelevant": validateObjList["dateRelevant"].inputBox.value,
            "webUserId": validateObjList["webUserId"].inputBox.value,
            "errorMsg": ""
        };
        console.log("getDataFromUI - userInputObj on next line");
        console.log(userInputObj);

        // JSON.stringify converts the javaScript object into JSON format 
        // (the reverse operation of what gson does on the server side).
        // Then, you have to encode the user's data (encodes special characters 
        // like space to %20 so the server will accept it with no security error). 
        return encodeURIComponent(JSON.stringify(userInputObj));
    }

    // write the jsonObj (full of error message) to the Validation UI. 
    function writeErrorObjToUI(jsonObj, validateObjList) {

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        console.log("here is JSON object (holds error messages.");
        console.log(jsonObj);
        validateObjList["dotaTeamId"].errorTd.innerHTML = jsonObj.dotaTeamId;
        validateObjList["teamCompName"].errorTd.innerHTML = jsonObj.teamCompName;
        validateObjList["heroNames"].errorTd.innerHTML = jsonObj.heroNames;
        validateObjList["teamGoals"].errorTd.innerHTML = jsonObj.teamGoals;
        validateObjList["teamItems"].errorTd.innerHTML = jsonObj.teamItems;
        validateObjList["dateRelevant"].errorTd.innerHTML = jsonObj.dateRelevant;
        validateObjList["webUserId"].errorTd.innerHTML = jsonObj.webUserId;
        validateObjList["recordError"].innerHTML = jsonObj.errorMsg;

    } // writeErrorObjToUI


    // ***** makeInputRow *****
    // This function creates then adds a tr (table row) into validationTable (a HTML table tag, input param). 
    // Into this tr, this function (makeInputRow):
    //   *  adds a 1st td filling that innerHTML with promptText. 
    //   *  adds a 2nd td, placing a textbox inside, and stores a reference to the textbox. 
    //   *  adds a 3rd td (classed "error") to hold validation error message (and stores a reference to it).
    //   
    // Finally, it creates an object that references the two things we need to access programatically: 
    // the input textbox (where user's input will be found) and the error td (where we will write any 
    // possible error messages). This object is stored into validationObjList using associative array 
    // notation (using fieldName as the key.)
    function makeInputRow(fieldName, promptText, validationTable, validationObjList) {

        var obj = {}; // this will hold references to the input box and the error td for the 
        // given field name.

        var row = Utils.make({// Inject a row into the table 
            htmlTag: "tr",
            parent: validationTable
        });
        Utils.make({// first td of row will hold promptText
            htmlTag: "td",
            innerHTML: promptText, // use fieldName as prompt for now, later promptText,
            parent: row
        });
        var inputTd = Utils.make({// second td of row will hold user input
            htmlTag: "td",
            parent: row
        });
        // store reference to this input box. we need to access it programatically 
        // (to find user's input).
        obj.inputBox = Utils.make({// place textbox in second td
            htmlTag: "input",
            parent: inputTd
        });
        // store reference to the 3rd td that is for holding error messages, 
        // so we can access it programmatically.
        obj.errorTd = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        // obj has a reference to the inputBox and the errorTd (the two things 
        // we need to access programatically to do validation). Store this 
        // object into an associative array (using fieldName as key). 
        validationObjList[fieldName] = obj;
    } // makeInputRow

    // build the validation area (three column HTML table, 1st column is promtp, 
    // second column is input data, third column is possible field level error message. 
    function createValidationArea(validateTable, validateObjList) {

        // call makeInputRow for each field. This will add a new row into the validateTable 
        // (a HTML table DOM element) and it will add two references per field in the 
        // associative array validateObjList (one will be inputBox and the other will be errorTd).

        /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
         * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

        makeInputRow("dotaTeamId", "Dota Team Id", validateTable, validateObjList);
        validateObjList["dotaTeamId"].inputBox.setAttribute("disabled", true);

        makeInputRow("teamCompName", "Team Comp Name", validateTable, validateObjList);
        makeInputRow("heroNames", "Hero Names", validateTable, validateObjList);
        makeInputRow("teamGoals", "Team Goals", validateTable, validateObjList);
        makeInputRow("teamItems", "Team Items", validateTable, validateObjList);
        makeInputRow("dateRelevant", "Date Relevant", validateTable, validateObjList);
        makeInputRow("webUserId", "Web User Id", validateTable, validateObjList);

        // Add non-standard last row to validatTable. The first cell will hold a Save button. 
        // The 2nd cell will hold the record error. The 3rd cell will be just a filler.
        var row = Utils.make({
            htmlTag: "tr",
            parent: validateTable
        });
        var saveCell = Utils.make({
            htmlTag: "td",
            parent: row
        });
        var saveButton = Utils.make({
            htmlTag: "button",
            innerHTML: "Save",
            parent: saveCell
        });
        var recordError = Utils.make({
            htmlTag: "td",
            parent: row,
            class: "error"
        });
        Utils.make({// third empty cell (filler) -- dont need a reference to this.
            htmlTag: "td",
            parent: row
        });

        // add recordError and saveButton into validateOjbList so these are available to insert/update code. 

        validateObjList["recordError"] = recordError; // key is "recordError", value recordError is a td
        // that can hold the record level validation message (like "Please try again"). 

        validateObjList["saveButton"] = saveButton; // key is "saveButton", value is the Save Button (DOM element).

    } // createValidationArea


    // This will be invoked when URL changes to the user insert URL (check routing table in index.html) 
    // to know exactly what link invokes this function. 
    dotaMods.insert = function () {

        function insertSave() {

            // create a user object from the values that the user has typed into the page.
            var myData = getDataFromUI(validateObjList);
            //console.log("webUserMods.insert: JSON data to send to insert API: "+myData); 

            ajax("webAPIs/insertOtherAPI.jsp?jsonData=" + myData, processInsert, insertDiv);
            function processInsert(obj) {

                console.log("dotaMods.insert/insertSave/processInsert error msg obj (see next line)");
                console.log(obj);

                // the server prints out a JSON string of an object that holds field level error 
                // messages. The error message object (conveniently) has its fiels named exactly 
                // the same as the input data was named. 

                if (obj.errorMsg.length === 0) { // success
                    obj.errorMsg = "Record successfully inserted.";
                }

                writeErrorObjToUI(obj, validateObjList);
            }
        } //insertSave


        // ************** Entry point for function webUsers.insert *********************

        var insertDiv = document.createElement("div");
        insertDiv.classList.add("insertArea");

        var validateObjList = [];

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "New Dota Team",
            parent: insertDiv
        });

        var validateTable = Utils.make({
            htmlTag: "table",
            parent: insertDiv
        });

        createValidationArea(validateTable, validateObjList);

        validateObjList["saveButton"].onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            validateObjList["recordError"].innerHTML = " &nbsp; &nbsp; ...";
            insertSave();
        };

        // replace role id inputBox with select tag populated from the roles in the database.
        // NOTE: since roles do not change that much, it would be OK to not be so careful 
        // to get the latest roles from the db to populate the role pick list. I am showing this 
        // to you so that you WOULD KNOW how to get the latest pick list from the DB.
        ajax("webAPIs/listUsersAPI.jsp", processUsers, insertDiv);
        function processUsers(obj) {

                if (obj.dbError.length > 0) {
                    validateObjList["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create User Pick List";
                } else {
                    var selectDOM = Utils.makePickList({
                        list: obj.webUserList,
                        keyProp: "webUserId",
                        valueProp: "userEmail"
                    });

                    var roleInputTd = validateObjList["webUserId"].inputBox.parentElement;
                    roleInputTd.innerHTML = "";
                    roleInputTd.appendChild(selectDOM);
                    validateObjList["webUserId"].inputBox = selectDOM;
                }
            }
        
        return insertDiv;

    }; // end of webUsers.insert


    dotaMods.update = function (webUserId) {

        function updateSave() {

            var myData = getDataFromUI(validateObjList);
            ajax("webAPIs/updateOtherAPI.jsp?jsonData=" + myData, processInsert, updateDiv);
            function processInsert(jsonObj) {

                // the server prints out a JSON string of an object that holds field level error 
                // messages. The error message object (conveniently) has its fiels named exactly 
                // the same as the input data was named. 

                if (jsonObj.errorMsg.length === 0) { // success
                    jsonObj.errorMsg = "Record successfully updated. ";
                }

                writeErrorObjToUI(jsonObj, validateObjList);
            }
        } //updateSave


        // ************** Entry point for function webUsers.update *********************

        console.log("dotaTeams.update called with webUserId " + webUserId);

        var updateDiv = document.createElement("div");
        updateDiv.classList.add("updateArea");

        var validateObjList = [];

        Utils.make({// don't need a reference to this created DOM element, 
            // so not capturing the return value.
            htmlTag: "h2",
            innerHTML: "Update Dota Team",
            parent: updateDiv
        });

        var validateTable = Utils.make({
            htmlTag: "table",
            parent: updateDiv
        });

        createValidationArea(validateTable, validateObjList);

        validateObjList["saveButton"].onclick = function () {

            // like an "in progress" message while waiting for AJAX call.
            validateObjList["recordError"].innerHTML = " &nbsp; &nbsp; ...";
            updateSave();
        };

        ajax("webAPIs/getOtherByIdAPI.jsp?dotaTeamId=" + webUserId, gotRecordById, updateDiv);

        function gotRecordById(jsonObj) { // obj is what got JSON.parsed from Web API's output

            console.log("gotRecordById, webUserObj is next");
            console.log(jsonObj);

            /* Web API property names: "webUserId", "userEmail", "userPassword", "userPassword2", 
             * "image", "birthday", "membershipFee", "userRoleId", "userRoleType", "errorMsg"   */

            validateObjList["dotaTeamId"].inputBox.value = jsonObj.dotaTeamId;
            validateObjList["teamCompName"].inputBox.value = jsonObj.teamCompName;
            validateObjList["heroNames"].inputBox.value = jsonObj.heroNames;
            validateObjList["teamGoals"].inputBox.value = jsonObj.teamGoals;
            validateObjList["teamItems"].inputBox.value = jsonObj.teamItems;
            validateObjList["dateRelevant"].inputBox.value = jsonObj.dateRelevant;
            validateObjList["webUserId"].inputBox.value = jsonObj.webUserId;
            
            ajax("webAPIs/listUsersAPI.jsp", processUsers, updateDiv);
            function processUsers(obj) {

                if (obj.dbError.length > 0) {
                    validateObjList["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create User Pick List";
                } else {
                    var selectDOM = Utils.makePickList({
                        list: obj.webUserList,
                        keyProp: "webUserId",
                        valueProp: "userEmail"
                    });

                    var roleInputTd = validateObjList["webUserId"].inputBox.parentElement;
                    roleInputTd.innerHTML = "";
                    roleInputTd.appendChild(selectDOM);
                    validateObjList["webUserId"].inputBox = selectDOM;
                }
            }
        }
        return updateDiv;

    }; // end of webUsers.update
    
    dotaMods.delete = function(dotaTeamId, icon) {
        if(confirm("Are you sure you would like to remove dotaTeamId - " + dotaTeamId + "?")) {
            ajax("webAPIs/deleteOtherAPI.jsp?deleteId=" + dotaTeamId, pickRow);
            
            function pickRow() {
                var dataRow = icon.parentNode.parentNode;
                var rowIndex = dataRow.rowIndex - 1;
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
            }
        }
    };

}());  // end of the IIFE