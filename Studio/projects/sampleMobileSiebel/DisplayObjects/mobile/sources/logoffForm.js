/*
* Copyright (c) 2009-2011 Convertigo. All Rights Reserved.
*
* The copyright to the computer  program(s) herein  is the property
* of Convertigo.
* The program(s) may  be used  and/or copied  only with the written
* permission  of  Convertigo  or in accordance  with  the terms and
* conditions  stipulated  in the agreement/contract under which the
* program(s) have been supplied.
*
* Convertigo makes  no  representations  or  warranties  about  the
* suitability of the software, either express or implied, including
* but  not  limited  to  the implied warranties of merchantability,
* fitness for a particular purpose, or non-infringement. Convertigo
* shall  not  be  liable for  any damage  suffered by licensee as a
* result of using,  modifying or  distributing this software or its
* derivatives.
*/

/**
* Define a login panel
*/
app.init.push({
	name: 'logoff',
	init: function () {
		var isLocalStorage = Ext.isDefined(localStorage);
		
		/**
			Defines a logoff textfield
		*/
		var user = new Ext.form.Text({
			name: 'SWEUserName',
			labelWidth: '120px',
			value: 'username',
			disabled: true,
			label: 'User'
		 });
		
		var formFields = new Ext.form.FieldSet({
			title: 'Logoff',
			instructions: 'Click Logoff to disconnect',
			items: [
				user
			]
		});

		/**
			Defines a login form panel
		 */
		var logoffForm = new Ext.form.FormPanel({
			title : 'Logoff',
			dockedItems: [app.toolbar],
			iconCls: 'user',
			items: [
				formFields,
				{
					layout: 'hbox',
					direction: 'reverse',
					items: [
						{
							xtype: 'button',
							text : 'Logoff',
							handler: function() {
								// execute logoff transaction in order to log out
								app.server.execute({
									transaction: 'Logoff', 			// Convertigo transaction to execute 
									mask: app.defaultMask, 			// waiting mask to be displayed while waiting for response 
									form : logoffForm, 				// form containing data to send to convertigo
									callback : function (data) { 	// callback function to be executed after the response returns from Convertigo
										if (data.document.APPLICATION.attr.NAME === "Siebel Power Communications") {
											app.logged = false;
											app.enablePanels(['login'], 'login');
											return true;
										} else {
											Ext.Msg.alert("Error","Logoff Failed");
											return false;
										}																			
									}
								});
							}
						}
					]
				}
			],
			scroll: 'vertical',
			listeners : {
				activate: function(comp) {
					user.setValue(app.userName);
				}
			}
		});
		return logoffForm;
	}
});
