 /**
 * Define a login panel
 */
app.init.push({
	name: 'login',
	init: function () {
		var isLocalStorage = Ext.isDefined(localStorage);
		
		/**
		 * Defines a remember checkbox
		*/
		var rememberMe = new Ext.form.Checkbox({
			name: 'remember',
			label: 'Remember me',
			labelWidth: '150px',
			width: 180,
			disabled: !isLocalStorage
		});
				
		/**
		 * Defines a login textfield
		*/
		var user = new Ext.form.Text({
			xtype: 'textfield',
			name: 'user',
			labelWidth: '120px',
			value: 'username',
			label: 'User'
		 });
			/**
			 * Defines a password textfield
			 */
		var password = new Ext.form.Password({
			xtype: 'passwordfield',
			name : 'password',
			labelWidth: '120px',
			value: 'password',
			label: 'Password'
		});
		
		/**
		 * Defines a login form panel
		 */
		var loginForm = new Ext.form.FormPanel({
			title : 'Login',
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
					]
				}, 
				{
					layout: 'hbox',
					direction: 'reverse',
					items: [
						{
							xtype: 'button',
							text : 'Login',
							handler: function() {
								if (rememberMe.isChecked() == true) {
									// stocking in local storage the login data
									localStorage.setItem('user', user.getValue());
									localStorage.setItem('password', password.getValue())
								} else if (isLocalStorage && localStorage.getItem('user') !== null) {
									// removing from local storage the login data
									localStorage.removeItem('user');
									localStorage.removeItem('password');
								}
								// executing login sequence in order to authenticate
								app.server.execute({
									sequence: 'Login', 				// Convertigo sequence to execute 
									mask: app.defaultMask, 			// waiting mask to be displayed while waiting for response 
									form : loginForm, 				// form containing data to send to convertigo
									callback : function (data) { 	// callback function to be executed after the response returns from Convertigo
										if (data.document.logon === "true") {
											app.logged = true;
											// trying to activate search panel
											if (!app.activatePanel('search')) {
												// search panel not existing
												// trying to activate list panel 
												app.activatePanel('list')												
											}
										} else {
											Ext.Msg.alert("Error","Login Failed");
										}
									}
								});
							}
						}
					]
				},
				rememberMe
			],
			scroll: 'vertical',
			listeners : {
				activate: function(comp) {
					if (isLocalStorage && localStorage.getItem('user') !== null) {
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