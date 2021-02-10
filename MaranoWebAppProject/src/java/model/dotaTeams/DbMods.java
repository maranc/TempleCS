package model.dotaTeams;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class DbMods {

    public static StringData findById(DbConn dbc, String id) {

        // The find API needs to represent three cases: found web_user, not found, db error. 
        StringData sd = new StringData();
        try {
            String sql = "SELECT dota_team_id, team_comp_name, hero_names, team_goals, team_items, date_relevant, web_user_id FROM dota_teams WHERE dota_team_id = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, id);

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.dotaTeamId = FormatUtils.plainInteger(results.getObject("dota_team_id"));
                sd.teamCompName = FormatUtils.formatString(results.getObject("team_comp_name"));
                sd.heroNames = FormatUtils.formatString(results.getObject("hero_names"));
                sd.teamGoals = FormatUtils.formatString(results.getObject("team_goals"));
                sd.teamItems = FormatUtils.formatString(results.getObject("team_items"));
                sd.dateRelevant = FormatUtils.formatDate(results.getObject("date_relevant"));
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
            } else {
                sd.errorMsg = "Dota Team Not Found.";
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();
        
        errorMsgs.teamCompName = ValidationUtils.stringValidationMsg(inputData.teamCompName, 45, true);
        errorMsgs.heroNames = ValidationUtils.stringValidationMsg(inputData.heroNames, 45, true);
        errorMsgs.teamGoals = ValidationUtils.stringValidationMsg(inputData.teamGoals, 45, true);
        errorMsgs.teamItems = ValidationUtils.stringValidationMsg(inputData.teamItems, 45, true);
        errorMsgs.dateRelevant = ValidationUtils.dateValidationMsg(inputData.dateRelevant, false);
        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    public static StringData insert(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO dota_teams (team_comp_name, hero_names, team_goals, team_items, date_relevant, web_user_id) "
                    + "values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.teamCompName); // string type is simple
            pStatement.setString(2, inputData.heroNames);
            pStatement.setString(3, inputData.teamGoals);
            pStatement.setString(4, inputData.teamItems);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.dateRelevant));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "Team comp name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

    public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            String sql = "UPDATE dota_teams SET team_comp_name=?, hero_names=?, team_goals= ?, team_items=?, date_relevant=?, web_user_id=? WHERE dota_team_id=?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.teamCompName); // string type is simple
            pStatement.setString(2, inputData.heroNames);
            pStatement.setString(3, inputData.teamGoals);
            pStatement.setString(4, inputData.teamItems);
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.dateRelevant));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.webUserId));
            pStatement.setInt(7, ValidationUtils.integerConversion(inputData.dotaTeamId));
            
            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid Team Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That team name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    public static String delete(String dotaTeamId, DbConn dbc) {

        if (dotaTeamId == null) {
            return "Error in modelwebUser.DbMods.delete: cannot delete web_user record because 'userId' is null";
        }

        // This method assumes that the calling Web API (JSP page) has already confirmed 
        // that the database connection is OK. BUT if not, some reasonable exception should 
        // be thrown by the DB and passed back anyway... 
        String result = ""; // empty string result means the delete worked fine.
        try {

            String sql = "DELETE FROM dota_teams WHERE dota_team_id = ?";

            // This line compiles the SQL statement (checking for syntax errors against your DB).
            PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

            // Encode user data into the prepared statement.
            pStatement.setString(1, dotaTeamId);

            int numRowsDeleted = pStatement.executeUpdate();

            if (numRowsDeleted == 0) {
                result = "Record not deleted - there was no record with dota_team_id " + dotaTeamId;
            } else if (numRowsDeleted > 1) {
                result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
            }

        } catch (Exception e) {
            result = "Exception thrown in model.dotaTeams.DbMods.delete(): " + e.getMessage();
        }

        return result;
    }
    
} // class
