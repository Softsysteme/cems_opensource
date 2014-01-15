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
 * $URL: http://sourceus/svn/convertigo/CEMS_opensource/trunk/Studio/src/com/twinsoft/convertigo/engine/admin/services/projects/GetTestPlatform.java $
 * $Author: julienda $
 * $Revision: 34609 $
 * $Date: 2013-07-25 12:33:24 +0200 (jeu., 25 juil. 2013) $
 */

package com.twinsoft.convertigo.engine.admin.services.projects;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.engine.AuthenticatedSessionManager.Role;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.admin.services.XmlService;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceDefinition;
import com.twinsoft.convertigo.engine.admin.services.at.ServiceParameterDefinition;
import com.twinsoft.convertigo.engine.util.ProjectUtils;

@ServiceDefinition(
		name = "GetUndefinedSymbols",
		roles = { Role.TEST_PLATFORM },
		parameters = {
				@ServiceParameterDefinition(
						name = "projectName",
						description = "the name of the project to retrieve undefined global symbols"
					)
			},
		returnValue = "all project's undefined global symbols"
	)
public class GetUndefinedSymbols extends XmlService {

	protected void getServiceResult(HttpServletRequest request, Document document) throws Exception {
		Element root = document.getDocumentElement();
		String projectName = request.getParameter("projectName");
		Project project = Engine.theApp.databaseObjectsManager.getOriginalProjectByName(projectName);
		Set<String> undefinedSymbols = ProjectUtils.getUndefinedGlobalSymbols(project);
		
		Element undefined_symbols = document.createElement("undefined_symbols");
		if (undefinedSymbols!=null) {
			for (String undefinedSymbol: undefinedSymbols) {
				Element symbol = document.createElement("symbol");
				symbol.setTextContent(undefinedSymbol);
				undefined_symbols.appendChild(symbol);
			}
		}
		root.appendChild(undefined_symbols);
	}
}