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

import java.util.List;

import javax.xml.namespace.QName;

import com.twinsoft.convertigo.engine.providers.couchdb.CouchClient;

public class PostSessionTransaction extends AbstractServerTransaction {

	private static final long serialVersionUID = -1385969696979516586L;
	
	private String q_next = "";
	
	public PostSessionTransaction() {
		super();
	}

	@Override
	public PostSessionTransaction clone() throws CloneNotSupportedException {
		PostSessionTransaction clonedObject =  (PostSessionTransaction) super.clone();
		return clonedObject;
	}
	
	@Override
	public List<CouchDbParameter> getDeclaredParameters() {
		return getDeclaredParameters(var_name, var_password);
	}

	@Override
	protected Object invoke() throws Exception {
		String name = getParameterStringValue(var_name);
		String password = getParameterStringValue(var_password);
		
		getConnector().setCouchClient(new CouchClient(getCouchClient().getServerUrl(), name, password));
		
		return getCouchClient().getSession();
	}

	@Override
	public QName getComplexTypeAffectation() {
		return new QName(COUCHDB_XSD_NAMESPACE, "postSessionType");
	}

	public String getQ_next() {
		return q_next;
	}

	public void setQ_next(String q_next) {
		this.q_next = q_next;
	}
	
}
