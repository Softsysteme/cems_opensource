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

package com.twinsoft.convertigo.beans.steps;

import java.beans.PropertyDescriptor;

import com.twinsoft.convertigo.beans.core.MySimpleBeanInfo;

public class XMLActionStepBeanInfo extends MySimpleBeanInfo {
    
	public XMLActionStepBeanInfo() {
		try {
			beanClass = XMLActionStep.class;
			additionalBeanClass = com.twinsoft.convertigo.beans.core.Step.class;

			resourceBundle = java.util.ResourceBundle.getBundle("com/twinsoft/convertigo/beans/steps/res/XMLActionStep");
			
			properties = new PropertyDescriptor[2];

            properties[0] = new PropertyDescriptor("nodeName", beanClass, "getNodeName", "setNodeName");
            properties[0].setDisplayName(getExternalizedString("property.nodeName.display_name"));
            properties[0].setShortDescription(getExternalizedString("property.nodeName.short_description"));
            properties[0].setValue("normalizable", Boolean.TRUE);
            properties[0].setValue(BLACK_LIST_NAME, Boolean.TRUE);
            
			properties[1] = new PropertyDescriptor("sourcesDefinition", beanClass, "getSourcesDefinition", "setSourcesDefinition");
			properties[1].setDisplayName(getExternalizedString("property.sourcesDefinition.display_name"));
			properties[1].setShortDescription(getExternalizedString("property.sourcesDefinition.short_description"));
			properties[1].setPropertyEditorClass(getEditorClass("ActionStepSourcesEditor"));
			properties[1].setExpert(true);
			properties[1].setValue(BLACK_LIST_NAME, Boolean.TRUE);
			
			getPropertyDescriptor("schemaDataType").setHidden(false);
            getPropertyDescriptor("xmlSimpleTypeAffectation").setHidden(false);
		}
		catch(Exception e) {
			com.twinsoft.convertigo.engine.Engine.logBeans.error("Exception with bean info; beanClass=" + beanClass.toString(), e);
		}
	}	
}
