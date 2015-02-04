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
 * $URL$
 * $Author$
 * $Revision$
 * $Date$
 */
package com.twinsoft.convertigo.beans.couchdb;

import java.beans.PropertyDescriptor;

import com.twinsoft.convertigo.beans.core.MySimpleBeanInfo;

public class DesignDocumentBeanInfo extends MySimpleBeanInfo {

	public DesignDocumentBeanInfo() {
		try {
			beanClass =  DesignDocument.class;
			additionalBeanClass = com.twinsoft.convertigo.beans.core.JsonDocument.class;

		    iconNameC16 = "/com/twinsoft/convertigo/beans/couchdb/images/designdocument_color_16x16.png";
		    iconNameC32 = "/com/twinsoft/convertigo/beans/couchdb/images/designdocument_color_32x32.png";
			
			resourceBundle = getResourceBundle("res/DesignDocument");
			
			displayName = getExternalizedString("display_name");
			shortDescription = getExternalizedString("short_description");	
			
			properties = new PropertyDescriptor[2];
			
			properties[0] = new PropertyDescriptor("_id", DesignDocument.class, "getId", "setId");
			properties[0].setValue("disable", Boolean.TRUE);
			properties[0].setDisplayName(getExternalizedString("property._id.display_name"));
			properties[0].setShortDescription(getExternalizedString("property._id.short_description"));			
			
			properties[1] = new PropertyDescriptor("_rev", DesignDocument.class, "getRevision", "setRevision");
			properties[1].setValue("disable", Boolean.TRUE);
			properties[1].setDisplayName(getExternalizedString("property._rev.display_name"));
			properties[1].setShortDescription(getExternalizedString("property._rev.short_description"));			
		}
		catch(Exception e) {
			com.twinsoft.convertigo.engine.Engine.logBeans.error("Exception with bean info; beanClass=" + beanClass.toString(), e);
		}
	}

}
