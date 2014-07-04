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

package com.twinsoft.convertigo.beans.connectors;

import java.io.File;

import com.twinsoft.convertigo.beans.core.Connector;
import com.twinsoft.convertigo.beans.core.ConnectorEvent;
import com.twinsoft.convertigo.beans.core.Transaction;
import com.twinsoft.convertigo.beans.transactions.SapJcoTransaction;
import com.twinsoft.convertigo.engine.Context;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;
import com.twinsoft.convertigo.engine.enums.Visibility;
import com.twinsoft.convertigo.engine.providers.SapJCoProvider;


public class SapJcoConnector extends Connector {

	private static final long serialVersionUID = -9176104169720510775L;
	
	private String asHost="";
	private String systemNumber ="00";
	private String client = "000";
	private String user = "SAP*";
	private String password ="";
	private String language = "en";

	private transient SapJcoProviderImpl provider = null;
	
    public class SapJcoProviderImpl extends SapJCoProvider {

		@Override
		protected String getDestinationHost() {
			return getAsHost();
		}

		@Override
		protected String getDestinationSystemNumber() {
			return getSystemNumber();
		}

		@Override
		protected String getDestinationClient() {
			return getClient();
		}

		@Override
		protected String getDestinationUser() {
			return getUser();
		}

		@Override
		protected String getDestinationPassword() {
			return getPassword();
		}

		@Override
		protected String getDestinationLanguage() {
			return getLanguage();
		}

		@Override
		protected String getJcoFunctionFilePath(String functionName) {
			return getJcoFunctionDirPath() +"/"+functionName+".ser";
		}
    	
    }
    
	public SapJcoConnector() {
		super();
		
        try
        {
    		provider = new SapJcoProviderImpl();
    		provider.register();
    		Engine.logBeans.debug("[SapConnector] Provider registered");
        }
        catch(IllegalStateException providerAlreadyRegisteredException)
        {
			Engine.logBeans.warn("[SapConnector] Provider already registered!");
        }
	}

	@Override
	public SapJcoConnector clone() throws CloneNotSupportedException {
		SapJcoConnector clonedObject = null;
		try {
			clonedObject = (SapJcoConnector) super.clone();
			clonedObject.provider = provider;
		} catch (Exception e) {
			Engine.logBeans.error("[SapConnector] Failed to clone SapJcoConnector : " + e.getMessage());
		}
		return clonedObject;
	}
	
	
	@Override
	public void release() {
		super.release();

		try {
			provider.unregister();
			Engine.logBeans.debug("[SapConnector] Provider unregistered");
        } catch (Exception ee) {
			Engine.logBeans.error("[SapConnector] An error occured while unregistering provider", ee);
		}
		finally {
			provider = null;
		}
	}

	@Override
	protected void finalize() throws Throwable {
		super.finalize();
	}
	
	@Override
	protected void addTransaction(Transaction transaction) throws EngineException {
		if (!(transaction instanceof SapJcoTransaction))
			throw new EngineException("You cannot add to a SAP connector a database object of type "
					+ transaction.getClass().getName());
		super.addTransaction(transaction);
	}


	@Override
	public boolean isMaskedProperty(Visibility target, String propertyName) {
		if ("password".equals(propertyName)) {
			return true;
		}
		return super.isMaskedProperty(target, propertyName);
	}

	@Override
	public boolean isCipheredProperty(String propertyName) {
		if ("password".equals(propertyName)) {
			return true;
		}
		return super.isCipheredProperty(propertyName);
	}

	@Override
	public Transaction newTransaction() {
		return new SapJcoTransaction();
	}
	
	@Override
	public void prepareForTransaction(Context context) throws EngineException {
		SapJcoTransaction sapJcoTransaction = (SapJcoTransaction)context.requestedObject;
		provider.initJCoFunction(sapJcoTransaction.getBapiName());
	}

	protected String getJcoFunctionDirPath() {
		String dirPath = getProject().getDirPath()+"/bapis/"+getName();
		File dir = new File(dirPath);
		if (!dir.exists())
			dir.mkdirs();
		return dirPath;
	}
	
	public String getAsHost() {
		return asHost;
	}

	public void setAsHost(String asHost) {
		this.asHost = asHost;
	}

	public String getSystemNumber() {
		return systemNumber;
	}

	public void setSystemNumber(String systemNumber) {
		this.systemNumber = systemNumber;
	}

	public String getClient() {
		return client;
	}

	public void setClient(String client) {
		this.client = client;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}
	
	public SapJcoProviderImpl getSapJCoProvider() {
		return provider;
	}
	
	public void setData(Object data) {
		fireDataChanged(new ConnectorEvent(this, data));
	}
	
}