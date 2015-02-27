package com.twinsoft.convertigo.engine.util;

import com.twinsoft.convertigo.beans.connectors.HttpConnector;
import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.beans.references.WebServiceReference;

public class ImportWsReference extends WsReference {

		public ImportWsReference(String wsdlURL) {
			super(wsdlURL);
		}

		public ImportWsReference(WebServiceReference reference) {
			super(reference);
		}

		@Override
		public void setTaskLabel(String text) {
			super.setTaskLabel(text);
		}

		@Override
		public HttpConnector importInto(Project project, boolean updateMode) throws Exception {
			return super.importInto(project, updateMode);
		}
		
		@Override
		public HttpConnector importIntoAuthenticated(Project project, String login, String password, boolean updateMode) throws Exception {
			return super.importIntoAuthenticated(project, login, password, updateMode);
		}
}
