<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="java.sql.*" %>
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.role.*" %>
<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    session.invalidate();
    Gson gson= new Gson();
    StringData sd = new StringData();
    sd.errorMsg += "Logging off user...";
    out.print(gson.toJson(sd).trim());
%>

