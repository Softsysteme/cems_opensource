package com.twinsoft.convertigo.beans.statements;

import javax.xml.transform.TransformerException;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import com.twinsoft.convertigo.beans.connectors.HtmlConnector;
import com.twinsoft.convertigo.beans.core.IXPathable;
import com.twinsoft.convertigo.beans.core.Statement;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;
import com.twinsoft.convertigo.engine.util.TwsCachedXPathAPI;

public class IfXpathExistsThenElseStatement extends BlockStatement implements IThenElseStatementContainer, IXPathable {

	private static final long serialVersionUID = 8091155349126369180L;
	private transient ThenStatement thenStatement = null;
	private transient ElseStatement elseStatement = null;
	
	
	public IfXpathExistsThenElseStatement () {
		super();
	}
	
	public IfXpathExistsThenElseStatement(String condition) {
		super(condition);
		setXpath(condition);
	}
	
	@Override
	public boolean hasThenElseStatements() {
		checkSubLoaded();
		return true;
	}
	public void setThenStatement(ThenStatement thenStatement) {
		checkSubLoaded();
		this.thenStatement = thenStatement;
	}

	public ThenStatement getThenStatement() {
		checkSubLoaded();
		return thenStatement;
	}

	public void setElseStatement(ElseStatement elseStatement) {
		checkSubLoaded();
		this.elseStatement = elseStatement;
	}

	public ElseStatement getElseStatement() {
		checkSubLoaded();
		return elseStatement;
	}
	
	@Override
	public boolean execute(Context javascriptContext, Scriptable scope) throws EngineException {
		if (isEnable) {
			if (super.execute(javascriptContext, scope)) {
				HtmlConnector htmlConnector = getConnector();
				Document xmlDocument = htmlConnector.getCurrentXmlDocument();
				TwsCachedXPathAPI xpathApi = htmlConnector.context.getXpathApi();
				
				if ((xmlDocument == null) || (xpathApi == null)) {
					Engine.logBeans.warn((xmlDocument == null) ? "(XPath) Current DOM of HtmlConnector is Null!":"TwsCachedXPathAPI of HtmlConnector is Null!");
					return false;
				}

				
				evaluate(javascriptContext, scope, condition, "xpath", false);
				String jsXpath = evaluated.toString();
					
				NodeList nodeList = null;
				try {
					nodeList = xpathApi.selectNodeList(xmlDocument, jsXpath);
				} catch (TransformerException e) {
					return false;
				} catch (ClassCastException e) {
					return false;
				}
				
				if (nodeList == null){
					return false;
				}
				if (nodeList.getLength() == 0) {
					elseStatement = getElseStatement();
					if (elseStatement != null) {
						elseStatement.execute(javascriptContext, scope);
					}
					return false;
				}
					
				thenStatement = getThenStatement();
				if (thenStatement != null) {
					thenStatement.execute(javascriptContext, scope);
					return true;
				}
				return false;
			}
		}
		return false;
	}
	
	@Override
	public void addStatement(Statement statement) throws EngineException {
		checkSubLoaded();
		
		if (hasThenElseStatements()) {
			if ((!(statement instanceof ThenStatement)) && (!(statement instanceof ElseStatement))) {
				throw new EngineException("You cannot add to this statement a database object of type " + statement.getClass().getName());
			}
			
			if ((thenStatement == null) || (elseStatement == null)) {
				if ((statement instanceof ThenStatement)) {
					if (thenStatement == null) {
						super.addStatement(statement);
						thenStatement = (ThenStatement)statement;
					}
					else
						throw new EngineException("You cannot add to this statement another database object of type " + statement.getClass().getName());
				}
				else if ((statement instanceof ElseStatement)) {
					if (elseStatement == null) {
						super.addStatement(statement);
						elseStatement = (ElseStatement)statement;
					}
					else
						throw new EngineException("You cannot add to this statement another database object of type " + statement.getClass().getName());
				}
			}
			else {
				throw new EngineException("You cannot add to this step another database object of type " + statement.getClass().getName());
			}
		}
		else {
			super.addStatement(statement);
		}
	}
	
	@Override
	public void removeStatement(Statement statement) {
		checkSubLoaded();
		
		super.removeStatement(statement);
		if (hasThenElseStatements()) {
			if (statement.equals(thenStatement)) {
				thenStatement = null;
			}
			else if (statement.equals(elseStatement)) {
				elseStatement = null;
			}
		}
	}
	
	@Override
	public String toString() {
		String text = this.getComment();
		return "ifExists node at "+ condition + (!text.equals("") ? " // "+text:"");
	}
	
	@Override
	public String toJsString() {
		String code = "";
		if (!condition.equals("")) {
			code += " if ("+ condition +") {\n";
			code += super.toString();
			code += " \n}\n";
		}
		return code;
	}

	@Override
	public String getXpath() {
		return getCondition();
	}

	@Override
	public void setXpath(String xpath) {
		xpath = "'"+xpath.replace("\\", "\\\\").replace("'", "\\'")+"'";
		setCondition(xpath);
	}

}
