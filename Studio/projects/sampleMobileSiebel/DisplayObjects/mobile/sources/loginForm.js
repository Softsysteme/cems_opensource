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
app.init.push(
{
	name: 'login',
	init: function ()
	{
		var isLocalStorage = Ext.isDefined(localStorage);

		/**
			Set up a model to use in our Store
		*/
		Ext.regModel('CustomersList', {
			fields: [
				{ name: 'rowID',			type: 'string'},
				{ name: 'AccountNumber',	type: 'string'},
				{ name: 'Name', 			type: 'string'},
				{ name: 'Location', 		type: 'string'},
				{ name: 'StreetAddress', 	type: 'string'},
				{ name: 'City', 			type: 'string'},
				{ name: 'State', 			type: 'string'},
				{ name: 'Country', 			type: 'string'},
				{ name: 'MainPhoneNumber', 	type: 'string'},
				{ name: 'SlmAccount', 		type: 'string'},
				{ name: 'MvgContactId', 	type: 'string'},
				{ name: 'FundEligibleFlag', type: 'string'}
			]
		});

		/**
		 	Define a List for the customers
		 */
		Ext.apply(app.stores, {
			list: new C8O.Store(
			{
				model: 'CustomersList',
				root: 'document.customers.item',
				server: app.server
			})
		});
		/**
		 	Defines a remember checkbox
		 */
		var rememberMe = new Ext.form.Checkbox(
		{
			id: 'remember',
			label: 'Remember me',
			labelWidth: '150px',
			width: 180,
			disabled: !isLocalStorage
		});
		/**
		 	Defines a login textfield
		 */
		var user = new Ext.form.Text(
		{
			xtype: 'textfield',
			id: 'SWEUserName',
			labelWidth: '120px',
			value: 'sadmin',
			label: 'User',
			placeHolder: 'username'
		});
		/**
			Defines a password textfield
		 */
		var password = new Ext.form.Password(
		{
			xtype: 'passwordfield',
			id: 'SWEPassword',
			labelWidth: '120px',
			value: 'sadmin',
			label: 'Password',
			placeHolder: 'password'
		});

		/**
			Defines a login form panel
		 */
		var loginForm = new Ext.form.FormPanel(
		{
			title: 'Login',
			dockedItems: [app.toolbar],
			iconCls: 'user',
			items: [
			{
				xtype: 'fieldset',
				title: 'Login',
				instructions: 'Please type your username and password',
				items: [
					user,
					password
				]}, {
				layout: 'hbox',
				direction: 'reverse',
				items: [
				{
					xtype: 'button',
					text: 'Login',
					handler: function ()
					{
						if (rememberMe.isChecked() != false)
						{
							/**
								store the login parameters into local storage
							*/
							localStorage.setItem('user', user.getValue());
							localStorage.setItem('password', password.getValue())
						}
						else if (isLocalStorage && localStorage.getItem('user') != null)
						{
							/**
								remove the login parameters from local storage
							*/
							localStorage.removeItem('user');
							localStorage.removeItem('password');
						}

						app.userName = user.getValue();

						/**
							execute the login transaction in order to authenticate
						*/
						app.server.execute(
						{
							transaction: 'Login',			// transaction to execute
							mask: app.defaultMask,			// waiting mask to be displayed while waiting for response 
							form: loginForm, 				// get all fields from form and send them to Convertigo
							callback: function (data) {		// callback function executed after the response returns from Convertigo
								/**
								 * best case, we are on target screen
								 */
								if ((data.document.APPLICATION != null) && (data.document.APPLICATION.SCREEN.attr.NAME == "CUT Home Screen"))
								{
									/**
										remember we have been logged
									*/
									app.logged = true;

									/**
										navigate to customers panel using Siebel GotoView Command
									*/
									app.stores.list.load(
									{
										sequence: 'GotoView',					// Convertigo transaction to execute 
										params: {
											SWEApplet: 'SIS Account List Applet',
											SWEView: 'All Account List View'	// form containing data to send to convertigo
										},
										callback: function (data)				// callback function executed after the response returns from Convertigo
										{
											if (Ext.isDefined(data.document.errorMessage))
											{
												Ext.Msg.alert("Error", data.document.errorMessage);												
												return false;					// return false not to try filling the list
											}

											if (app.initialized = Ext.isDefined(data.document.attr.sequence == 'GotoView')) {
												app.enablePanels(['logoff', 'customers', 'search'], 'customers');
												/**
													reset badge if any
												*/	
												app.panels['customers'].tab.setBadge('');
											}									

											/**
												in case no error message was found return true or false 
												depending on the presence of data in the response
											*/
											return (Ext.isDefined(data.document.customers.item));
										}
									});
								}
								else
								{
									/**
									 	check for errors
									 */
									if (data.document.error != null)
										Ext.Msg.alert("Error", Ext.query('title')[0].innerHTML);
									else
										Ext.Msg.alert("Error", "Login Failed");

									/**
										remember we are not logged, return error
									 */
									app.logged = false;
									return false;
								}
							}
						});
					}}
				]},
				rememberMe
				],
			scroll: 'vertical',
			listeners: {
				activate: function (comp)
				{
					if (isLocalStorage && localStorage.getItem('user') !== null)
					{
						// sets back the values from the local storage to the form's fields
						rememberMe.check();
						user.setValue(localStorage.getItem('user'));
						password.setValue(localStorage.getItem('password'));
					}
				}
			}
		});
		return loginForm;
	}
});
