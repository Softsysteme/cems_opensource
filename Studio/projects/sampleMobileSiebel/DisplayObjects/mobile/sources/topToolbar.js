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
 * Define a tool bar
 */
Ext.apply(app, {
	toolbar: {
		xtype: 'toolbar',
		dock: 'top',
		ui: 'light',
		layout: {
			pack: 'center'
		},
		items: [
		{
			xtype: 'textfield',
			ui: 'light',
			html: '<p style="color:white">Siebel</p>'}]
	}
});
