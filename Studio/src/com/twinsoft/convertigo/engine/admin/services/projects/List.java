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

import java.io.File;
import java.text.DateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.engine.AuthenticatedSessionManager.Role;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;
import com.twinsoft.convertigo.engine.admin.services.XmlService;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceDefinition;

@ServiceDefinition(
		name = "GetProjects",
		roles = {
			Role.TEST_PLATFORM,
			Role.PROJECTS_CONFIG, Role.PROJECTS_VIEW,
			Role.CERTIFICATE_CONFIG, Role.CERTIFICATE_VIEW
		},
		parameters = {},
		returnValue = "the projects list"
	)
public class List extends XmlService{

	protected void getServiceResult(HttpServletRequest request, Document document) throws Exception {
		Element root = document.getDocumentElement();
        
        Element projectsListElement = document.createElement("projects");
        root.appendChild(projectsListElement);
        
    	for (String projectName : Engine.theApp.databaseObjectsManager.getAllProjectNamesList()) {
    		try {
    			Project project = Engine.theApp.databaseObjectsManager.getProjectByName(projectName);
    			String deployDate = "n/a";
    			File file = new File(Engine.PROJECTS_PATH + "/" + projectName + ".car");
    			if (file.exists())
    				deployDate = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT, request.getLocale()).format(new Date(file.lastModified()));

    			String comment = project.getComment();
    			if (comment.length() > 100) comment = comment.substring(0, 100) + "...";

    			String version = project.getVersion();
    			
    			DateFormat df = DateFormat.getDateTimeInstance(DateFormat.MEDIUM, DateFormat.SHORT, request.getLocale());
    			String exported = project.getInfoForProperty("exported", df, request.getLocale());
    			
    			Element projectElement = document.createElement("project");
    			projectElement.setAttribute("name", projectName);
    			projectElement.setAttribute("comment", comment);
    			projectElement.setAttribute("version", version);
    			projectElement.setAttribute("exported", exported);
    			projectElement.setAttribute("deployDate", deployDate);
    			
    			if (Engine.theApp.databaseObjectsManager.symbolsProjectCheckUndefined(projectName)) {
    				projectElement.setAttribute("undefined_symbols", "true");
    			} 
    			
    			projectsListElement.appendChild(projectElement);
    		}
    		catch (EngineException e) {
    			String message="Unable to get project information ('" + projectName + "')";
    			Engine.logAdmin.error(message, e);
    		}
    	}	
	}
}
