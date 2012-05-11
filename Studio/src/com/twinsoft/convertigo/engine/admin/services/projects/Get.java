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
import javax.xml.transform.stream.StreamSource;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.twinsoft.convertigo.engine.admin.services.XmlService;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceDefinition;
import com.twinsoft.convertigo.engine.AuthenticatedSessionManager.Role;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceParameterDefinition;
import com.twinsoft.convertigo.engine.util.ProjectUtils;

@ServiceDefinition(
		name = "Get",
		roles = { Role.WEB_ADMIN },
		parameters = {
				@ServiceParameterDefinition(
						name = "projectName",
						description = "the name of the project to retrieve"
					)
			},
		returnValue = "all project's objects and properties"
	)
public class Get extends XmlService {	

	protected void getServiceResult(HttpServletRequest request, Document document) throws Exception {		
		String projectName = request.getParameter("projectName");
		Element root = document.getDocumentElement();
		root.setAttribute("name", projectName);
		ProjectUtils.getFullProjectDOM(document,projectName,new StreamSource(getClass().getResourceAsStream("cleanDOM.xsl")));
		
		
	}
}