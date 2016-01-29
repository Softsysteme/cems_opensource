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

package com.twinsoft.convertigo.beans.core;

import java.beans.PropertyDescriptor;

public class UrlMappingParameterBeanInfo extends MySimpleBeanInfo {
    
	public UrlMappingParameterBeanInfo() {
		try {
			beanClass = UrlMappingParameter.class;
			additionalBeanClass = com.twinsoft.convertigo.beans.core.DatabaseObject.class;

			iconNameC16 = "/com/twinsoft/convertigo/beans/core/images/urlmappingparameter_color_16x16.png";
			iconNameC32 = "/com/twinsoft/convertigo/beans/core/images/urlmappingparameter_color_32x32.png";

			resourceBundle = getResourceBundle("res/UrlMappingParameter");

			displayName = resourceBundle.getString("display_name");
			shortDescription = resourceBundle.getString("short_description");
			
			properties = new PropertyDescriptor[3];
            properties[0] = new PropertyDescriptor("required", beanClass, "isRequired", "setRequired");
            properties[0].setDisplayName(getExternalizedString("property.required.display_name"));
            properties[0].setShortDescription(getExternalizedString("property.required.short_description"));
            
            properties[1] = new PropertyDescriptor("multiValued", beanClass, "isMultiValued", "setMultiValued");
            properties[1].setDisplayName(getExternalizedString("property.multiValued.display_name"));
            properties[1].setShortDescription(getExternalizedString("property.multiValued.short_description"));

            properties[2] = new PropertyDescriptor("mappedVariableName", beanClass, "getMappedVariableName", "setMappedVariableName");
            properties[2].setDisplayName(getExternalizedString("property.mappedVariableName.display_name"));
            properties[2].setShortDescription(getExternalizedString("property.mappedVariableName.short_description"));
		}
		catch(Exception e) {
			com.twinsoft.convertigo.engine.Engine.logBeans.error("Exception with bean info; beanClass=" + beanClass.toString(), e);
		}
	}

}
