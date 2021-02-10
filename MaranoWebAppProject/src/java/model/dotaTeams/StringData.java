package model.dotaTeams;

import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String dotaTeamId = "";
    public String teamCompName = "";
    public String heroNames = "";
    public String teamGoals = "";
    public String teamItems = "";
    public String dateRelevant = "";
    public String webUserId = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }
    
    public StringData(ResultSet results) {
        try {
            this.dotaTeamId = FormatUtils.plainInteger(results.getObject("dota_team_id"));
            this.teamCompName = FormatUtils.formatString(results.getObject("team_comp_name"));
            this.heroNames = FormatUtils.formatString(results.getObject("hero_names"));
            this.teamGoals = FormatUtils.formatString(results.getObject("team_goals"));
            this.teamItems = FormatUtils.formatString(results.getObject("team_items"));
            this.dateRelevant = FormatUtils.formatDate(results.getObject("date_relevant"));
            this.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
        } catch (Exception e) {
            this.errorMsg = "Exception in model.dotaTeams.StringData using ResultSet: " + e.getMessage();
        } 
    }

    public int getCharacterCount() {
        String s = this.dotaTeamId + this.teamCompName;
        return s.length();
    }

    public String toString() {
        return "Dota Team Id:" + this.dotaTeamId
                + ", Team Comp Name: " + this.teamCompName;
    }
}
