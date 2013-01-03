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

package com.twinsoft.convertigo.engine.admin.services.projects;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jettison.json.JSONArray;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.twinsoft.convertigo.beans.common.XMLVector;
import com.twinsoft.convertigo.beans.core.Connector;
import com.twinsoft.convertigo.beans.core.DatabaseObject;
import com.twinsoft.convertigo.beans.core.ITestCaseContainer;
import com.twinsoft.convertigo.beans.core.IVariableContainer;
import com.twinsoft.convertigo.beans.core.MobileDevice;
import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.beans.core.RequestableObject;
import com.twinsoft.convertigo.beans.core.Sequence;
import com.twinsoft.convertigo.beans.core.TestCase;
import com.twinsoft.convertigo.beans.core.Transaction;
import com.twinsoft.convertigo.beans.core.Variable;
import com.twinsoft.convertigo.engine.AuthenticatedSessionManager.Role;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.admin.services.XmlService;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceDefinition;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceParameterDefinition;
import com.twinsoft.convertigo.engine.admin.services.mobiles.GetBuildStatus;
import com.twinsoft.convertigo.engine.enums.Visibility;
import com.twinsoft.convertigo.engine.util.GenericUtils;

@ServiceDefinition(
		name = "Get",
		roles = { Role.TEST_PLATFORM },
		parameters = {
				@ServiceParameterDefinition(
						name = "projectName",
						description = "the name of the project to retrieve"
					)
			},
		returnValue = "all project's objects and properties"
	)
public class GetRequestables extends XmlService {

	protected void getServiceResult(HttpServletRequest request, Document document) throws Exception {
		Element root = document.getDocumentElement();

		String projectName = request.getParameter("projectName");

		Project project = Engine.theApp.databaseObjectsManager.getOriginalProjectByName(projectName);
		
		Element e_project = createDatabaseObjectElement(document, project);		
		Connector defaultConnector = project.getDefaultConnector();
		e_project.setAttribute("defaultConnector", defaultConnector.getName());	
		e_project.setAttribute("defaultTransaction", defaultConnector.getDefaultTransaction().getName());	

		String sessionId = request.getSession().getId();
		boolean bAdminRole = Engine.authenticatedSessionManager.hasRole(sessionId, Role.WEB_ADMIN);
		
		for (Connector connector : project.getConnectorsList()) {			
			Element e_connector = createDatabaseObjectElement(document, connector);				
			for (Transaction transaction : connector.getTransactionsList()) {
				// WEB_ADMIN role is allowed to execute all requestables
				if ((transaction.isPublicAccessibility()) || bAdminRole) {
					e_connector.appendChild(createRequestableElement(document, transaction));				
				}
			}
			e_project.appendChild(e_connector);
		}

		for (Sequence sequence : project.getSequencesList()) {
			// WEB_ADMIN role is allowed to execute all requestables
			if ((sequence.isPublicAccessibility()) || bAdminRole) {
				e_project.appendChild(createRequestableElement(document, sequence));
			}
		}
		
		boolean hasMobileDevice = false;
		for (MobileDevice device : project.getMobileDeviceList()) {
			Element e_device = createDatabaseObjectElement(document, device);
			e_device.setAttribute("classname", device.getClass().getSimpleName());
			e_project.appendChild(e_device);
			hasMobileDevice = true;
		}
		
		if (hasMobileDevice) {
			try {
				String mobileProjectName = GetBuildStatus.getFinalApplicationName(projectName);
				e_project.setAttribute("mobileProjectName", mobileProjectName);
			} catch (Exception e) {
				Engine.logAdmin.error("Failed to retrieve the application mobile name", e);
			}
		}
		
		root.appendChild(e_project);
	}
	
	private Element createDatabaseObjectElement(Document document, DatabaseObject dbo) {
		Element elt = document.createElement(dbo.getDatabaseType().toLowerCase());
		elt.setAttribute("name", dbo.getName());
		elt.setAttribute("comment", dbo.getComment());
		return elt;
	}
	
	private Element createRequestableElement(Document document, RequestableObject requestable) {
		Element e_requestable = createDatabaseObjectElement(document, requestable);
		if (requestable instanceof IVariableContainer) {
			handleIVariableContainer(document, e_requestable, (IVariableContainer) requestable);
		}
		if (requestable instanceof ITestCaseContainer) {
			for (TestCase testcase : ((ITestCaseContainer) requestable).getTestCasesList()) {
				Element e_testcase = createDatabaseObjectElement(document, testcase);
				handleIVariableContainer(document, e_testcase, testcase);
				e_requestable.appendChild(e_testcase);
			}
		}
		return e_requestable;
	}
	
	private void handleIVariableContainer(Document document, Element e_vars, IVariableContainer vars) {
		for (Variable variable : vars.getVariables()) {
			Element e_variable = createDatabaseObjectElement(document, variable);
			Object val = variable.getValueOrNull();
			String strval = val == null ? null:variable.isMultiValued() ? new JSONArray(GenericUtils.<XMLVector<String>>cast(val)).toString():val.toString();
			e_variable.setAttribute("value", strval);
			e_variable.setAttribute("isMasked", Visibility.Platform.isMasked(variable.getVisibility()) ? "true":"false");
			e_variable.setAttribute("isMultivalued", "" + variable.isMultiValued());
			e_variable.setAttribute("isFileUpload", "" + variable.getIsFileUpload());
			e_variable.setAttribute("description", variable.getDescription());
			e_vars.appendChild(e_variable);
		}
	}
}