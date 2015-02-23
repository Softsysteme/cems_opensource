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

import java.util.Arrays;
import java.util.List;

import javax.xml.namespace.QName;

import com.google.gson.JsonElement;

public class RestartServerTransaction extends AbstractServerTransaction {
	
	private static final long serialVersionUID = 8242007535293507090L;

	public RestartServerTransaction() {
		super();
	}

	@Override
	public RestartServerTransaction clone() throws CloneNotSupportedException {
		RestartServerTransaction clonedObject =  (RestartServerTransaction) super.clone();
		return clonedObject;
	}
	
	@Override
	public List<CouchDbParameter> getDeclaredParameters() {
		return Arrays.asList(new CouchDbParameter[] {});
	}
	
	@Override
	protected Object invoke() throws Exception {
		Object json = getCouchDbContext().restart();
		try {
			if (json instanceof JsonElement) {
				boolean b = ((JsonElement)json).getAsJsonObject().get("ok").getAsString().equals("true");
				if (b) getConnector().setCouchDbClient(null); 
			}
		}
		catch (Exception e) {}
		return json;
	}
	
	@Override
	public QName getComplexTypeAffectation() {
		return new QName(COUCHDB_XSD_NAMESPACE, "svrRestartType");
	}
}
