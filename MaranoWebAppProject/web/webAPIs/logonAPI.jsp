<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="java.sql.*" %>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.role.*" %>  
<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    
    StringData sd;
    String sql = "";
    String inpPassword = "";
    String msg = "";
    String inpUsername = "";
  
    if (request.getParameter("userPwd") == null) {
        System.out.println("Error with user email");
    } else {
        System.out.println("No error with user email");
        DbConn dbc = new DbConn();
        PreparedStatement stmt;
        ResultSet results;
        inpPassword = request.getParameter("userPwd");
        inpUsername = request.getParameter("userEmail");
        System.out.println(inpPassword);
        msg = dbc.getErr();
        stmt = null;
        results = null;
        if (msg.length() > 0) {
            System.out.println("Error with dbconn");
        } else {
            try {
                sql = "SELECT web_user_id, user_email, user_password, image, birthday, membership_fee, web_user.user_role_id, user_role_type " +
                        "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id AND user_email = ? AND user_password = ?";
                stmt = dbc.getConn().prepareStatement(sql);
                inpUsername = inpUsername.replace("<", "&lt;");
                inpPassword = inpPassword.replace("<", "&lt;");
                stmt.setString(1, inpUsername);
                stmt.setString(2, inpPassword);
                results = stmt.executeQuery();
                if (!results.next()) {
                    sd = new StringData();
                    sd.errorMsg += "unable to logon";
                } else {
                    msg += "logon completed";
                    sd = new StringData(results);
                    session.setAttribute("loggedOnUser", sd);
                }
                Gson gson = new Gson();
                out.print(gson.toJson(sd));
                results.close();
                stmt.close();
            } catch (Exception e) {
                sd = new StringData();
                sd.errorMsg = "unable to run the sql for logon api - " + e.getMessage();
                results.close();
                stmt.close();
                
            }
        }
        dbc.close();
    }

%>

