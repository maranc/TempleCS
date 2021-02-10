package org.apache.jsp.webAPIs;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.sql.*;
import dbUtils.*;
import model.role.*;
import model.webUser.StringData;
import com.google.gson.*;

public final class getProfileAPI_jsp extends org.apache.jasper.runtime.HttpJspBase
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
