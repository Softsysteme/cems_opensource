Convertigo Server
=================

In order to compile Convertigo Server project, you must import the whole project from
our SVN repository inside your Eclipse workspace.

Prerequisites:
* Use the Classic 3.4.2 (and higher) eclipse distribution and use JVM 1.5 (and higher).
* Install a Tomcat 6 or higher

The following Eclipse components should have been installed:

* org.eclipse.jface.text
* org.eclipse.wst.xml.ui
* org.eclipse.wst.sse.ui
* org.eclipse.wst.sse.core
* org.eclipse.wst.jsdt.ui
* org.eclipse.wst.jsdt.core

You will find these components in following EClipse plugins:

* Eclipse Web Platform (WTP)
* Java Server Tool UI
* JST Server UI
* JST Server Adapters Extensions

Optionaly, you can consider installing following plugins:

* Source control plugins (such as SVNkit)
* XML developer tools
* XSL developer tools
* Java Web Developer Tools

After sources checkout, you have to add a new server in Servers view, and link this server
to the web app CemsServer.

Add CemsServer libraries and SWT library (org.eclipse.swt_*.jar)
