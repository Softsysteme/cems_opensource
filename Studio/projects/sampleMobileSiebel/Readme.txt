/*********************************************/
/*			Sample SiebelMobile				 */
/*********************************************/

This project provides an access to a Siebel Customers Database.

This mobile application will access a Siebel application, and after logging in,
display a list of customers cards. Several basic operations will be available,
as searching, getting details or display customer address on a map.

The purpose of this project is to:
----------------------------------
* log in
* retrieve a list of customers from Siebel using a Convertigo 
  transaction|sequence
* retrieve detailed informations about a selected customer
* search in the Siebel database for customers regarding
  several criteria
* create a Sencha Touch Web application to provide the
  navigational and display interface.

The project has one connector:
------------------------------
* The SiebelConnector is an HTML connector which targets 
  the Siebel application web site.
  it declares Login as the default transaction. 

The project has fout sequences:
-------------------------------
* The 'GotoView' sequence simply calls the 'GotoView' transaction 
  but mainly handles errors and converts the returned XML to a format
  that suits Sencha.
  
* The 'Login' sequence simply calls the 'Login' transaction.

* The 'Search' sequence is more complicated. It first calls the
  'NewQuery' transaction, then calls the 'ExecuteQuery' transaction.
  Then, after handling errors, converts the returned XML to a format
  that suits Sencha.

* The 'SiebelInvoke' sequence calls the 'InvokeMethod' method, 
  handles errors and converts the returned XML to a format
  that suits Sencha.

Looking at mobile source files:
-------------------------------
All source files are commented: app.js, customersForm.js, details.js, googleMap.js, loginForm.js,
	logoffForm.js, searchForm.js, server.js, states.js, topToolbar.js

* The 'customersForm.js' is the panel where the store content is displayed.
  if a record is selected, you can access the 'details.js' panel
	
* The 'detail.js' panel displays some information about the currently selected record
  of the store. if enough information regarding the location is available, the 'Map' 
  button becomes active and allows to display the 'googleMap.js' panel.

* The 'searchForm.js' panel permits to list a subset of the siebel customers 
  database regarding name & state criteria (read from 'states.js'). Wildcards are allowed. 
  The search is case sensitive. Result is   displayed in 'customersForm' panel,
  and if no result, a messagebox is displayed.
  
* The 'Login.js' & 'Logoff.js' panels connect and disconnect the user from the Siebel app.

* The 'topToolbar.js' defines the top bar of the application. Mainly the title.

