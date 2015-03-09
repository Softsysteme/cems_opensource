/*
 * Copyright (c) 2001-2011 Convertigo SA.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 *
 * $URL: $
 * $Author: $
 * $Revision: $
 * $Date: $
 */
package com.twinsoft.convertigo.beans.transactions.couchdb;

import java.beans.PropertyDescriptor;

import com.twinsoft.convertigo.beans.core.MySimpleBeanInfo;

public class GetViewTransactionBeanInfo extends MySimpleBeanInfo {

	public GetViewTransactionBeanInfo() {
		try {
			beanClass = GetViewTransaction.class;
			additionalBeanClass = AbstractDocumentTransaction.class;

			resourceBundle = getResourceBundle("res/GetViewTransaction");
			
			displayName = getExternalizedString("display_name");
			shortDescription = getExternalizedString("short_description");

			iconNameC16 = "/com/twinsoft/convertigo/beans/transactions/couchdb/images/databasetransaction_color_16x16.png";
			iconNameC32 = "/com/twinsoft/convertigo/beans/transactions/couchdb/images/databasetransaction_color_32x32.png";	
			
			properties = new PropertyDescriptor[1];
			
			properties[0] = new PropertyDescriptor("viewname", beanClass, "getViewname", "setViewname");
			properties[0].setDisplayName(getExternalizedString("property.viewname.display_name"));
			properties[0].setShortDescription(getExternalizedString("property.viewname.short_description"));
            properties[0].setPropertyEditorClass(getEditorClass("PropertyWithTagsEditorAdvance"));
//			properties[0].setPropertyEditorClass(getEditorClass("DesignDocumentViewSelectorEditor"));
			
		}
		catch(Exception e) {
			com.twinsoft.convertigo.engine.Engine.logBeans.error("Exception with bean info; beanClass=" + beanClass.toString(), e);
		}
	}

}
