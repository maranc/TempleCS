package org.apache.jsp.webAPIs;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.*;
import dbUtils.*;
import model.role.*;
import model.webUser.StringData;
import com.google.gson.*;

public final class logonAPI_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("application/json; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write(" \n");
      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("  \n");
      out.write(" \n");
      out.write("\n");
      out.write("\n");

    
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
        inpUsername = request.getParameter("userEmail");
        inpPassword = request.getParameter("userPwd");
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


      out.write('\n');
      out.write('\n');
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
