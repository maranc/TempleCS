<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="java.sql.*" %>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.role.*" %>  
<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    if ( session.getAttribute("loggedOnUser") != null ) {
        StringData loggedOnWebUser = (StringData) session.getAttribute("loggedOnUser");
        Gson gson = new Gson();
        out.print(gson.toJson(loggedOnWebUser).trim());
    } else {
        System.out.println("here*********");
        StringData sd = new StringData();
        sd.errorMsg = "no users are logged in";
        Gson gson = new Gson();
        out.print(gson.toJson(sd).trim());
    }
// Get the object back out of the session by supplying the name you provided when you put it in.
// Returns null if there’s no object by that name in the session.
// Must type cast the “plain object” that’s extracted from the session. 

%>

