package com.twinsoft.convertigo.beans.steps;

import java.io.File;

import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

import com.twinsoft.convertigo.beans.core.Step;
import com.twinsoft.convertigo.beans.core.StepSource;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;

public class CreateDirectoryStep extends Step {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2873578590344942963L;
	
	private String destinationPath = "";
	
	private boolean createNonExistentParentDirectories = true;

	private String destinationFilePath;
	
	public CreateDirectoryStep() {
		super();
	}

	private String evaluateDestinationPath(Context javascriptContext, Scriptable scope) throws EngineException {
		return evaluateToString(javascriptContext, scope, destinationPath, "destinationPath", false);
	}

	@Override
	protected boolean stepExcecute(Context javascriptContext, Scriptable scope) throws EngineException {
		// TODO Auto-generated method stub
		if (isEnable) {
			if (super.stepExcecute(javascriptContext, scope)) {
				try {
					destinationPath = destinationPath.replaceAll("\\\\", "/");					
					destinationFilePath = getAbsoluteFilePath(evaluateDestinationPath(javascriptContext, scope));
					destinationFilePath = destinationFilePath.replaceAll("\\\\", "/");
					File destinationFile = new File(destinationFilePath);
					
					boolean directoryCreated = false;
					
					if (isCreateNonExistentParentDirectories()) {
						directoryCreated = destinationFile.mkdirs();
					}
					else {
						directoryCreated = destinationFile.mkdir();
					}

					if (!directoryCreated) {
						throw new Exception("An error occured while creating the directory.");
					}
		        } catch (NullPointerException e) {
					setErrorStatus(true);
		            Engine.logBeans.error("An error occured while creating the directory.", e);
				} catch (Exception e) {
					setErrorStatus(true);
		            Engine.logBeans.error("An error occured while creating the directory.", e);
				}	
				Engine.logBeans.info("Directory " + destinationFilePath + " created.");
		        return true;
			}
		}
		return false;
	}

	protected String getAbsoluteFilePath(String entry) throws EngineException {
		if (entry.equals(""))
			throw new EngineException("Please fill the Destination property field.");
				
		return Engine.theApp.filePropertyManager.getFilepathFromProperty(entry, getProject().getName());
	}

	@Override
	protected boolean workOnSource() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	protected StepSource getSource() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String toJsString() {
		// TODO Auto-generated method stub
		return null;
	}

	public String getDestinationPath() {
		return destinationPath;
	}


	public void setDestinationPath(String destinationPath) {
		this.destinationPath = destinationPath;
	}

	public void setCreateNonExistentParentDirectories(
			boolean createNonExistentParentDirectories) {
		this.createNonExistentParentDirectories = createNonExistentParentDirectories;
	}

	public boolean isCreateNonExistentParentDirectories() {
		return createNonExistentParentDirectories;
	}
}
