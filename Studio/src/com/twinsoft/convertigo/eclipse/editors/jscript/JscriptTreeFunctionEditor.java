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
 * $URL: svn://devus.twinsoft.fr/convertigo/CEMS_opensource/trunk/Studio/src/com/twinsoft/convertigo/eclipse/editors/jscript/JscriptTransactionEditor.java $
 * $Author: nicolasa $
 * $Revision: 31300 $
 * $Date: 2012-08-03 16:50:19 +0200 (ven., 03 août 2012) $
 */

package com.twinsoft.convertigo.eclipse.editors.jscript;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.eclipse.core.resources.IFile;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.ListenerList;
import org.eclipse.jface.text.IDocument;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.IEditorSite;
import org.eclipse.ui.IPropertyListener;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.part.EditorPart;
import org.eclipse.ui.part.FileEditorInput;

import com.twinsoft.convertigo.eclipse.ConvertigoPlugin;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.model.IFunctionTreeObject;

public class JscriptTreeFunctionEditor extends EditorPart implements IPropertyListener {
	private IFile file;
	private IEditorSite eSite;
	private IEditorInput eInput;
	private ListenerList listenerList;
	private IFunctionTreeObject treeObject;
	private MyJScriptEditor jsEditor;
	
	public JscriptTreeFunctionEditor() {
		super();
	}

	@Override
	public void dispose() {
		jsEditor.removePropertyListener(this);
		jsEditor.dispose();
		super.dispose();

		// When the editor is closed, delete the temporary file created when we opened the editor
		if (file.exists()) {
			try {
				file.delete(true, null);
			} catch (CoreException e) {
				//ConvertigoPlugin.logWarning(e,"Error while deleting temporary file", Boolean.FALSE);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.EditorPart#doSave(org.eclipse.core.runtime.IProgressMonitor)
	 */
	public void doSave(IProgressMonitor monitor) {
		jsEditor.doSave(monitor);
		try {
			// Get the jsEditor content and transfer it to the transaction object
			InputStream is = file.getContents();
			byte[] array = new byte[is.available()];
			is.read(array);
			treeObject.setFunction(new String (array));
		} catch (Exception e) {
			ConvertigoPlugin.logException(e, "Error writing function '" + eInput.getName() + "'");
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.EditorPart#doSaveAs()
	 */
	public void doSaveAs() {
		jsEditor.doSaveAs();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.EditorPart#isDirty()
	 */
	public boolean isDirty() {
		return jsEditor.isDirty();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.EditorPart#isSaveAsAllowed()
	 */
	public boolean isSaveAsAllowed() {
		return false;
	}

	/*
	 * (non-Javadoc)
	 */
	public void createPartControl(Composite parent) {
		jsEditor = new MyJScriptEditor();
		jsEditor.setSourceViewerConfiguration();
		jsEditor.addPropertyListener(this);
		try {
			jsEditor.init(eSite, eInput);
		} catch (PartInitException e) {
			ConvertigoPlugin.logException(e, "Error inialiazing  Javascript editor '" + eInput.getName() + "'");
		}
		jsEditor.createPartControl(parent);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.WorkbenchPart#setFocus()
	 */
	public void setFocus() {
		jsEditor.setFocus();
	}
	
	/*
	 * (non-Javadoc)
	 * 
	 * @see org.eclipse.ui.part.EditorPart#init(org.eclipse.ui.IEditorSite,
	 *      org.eclipse.ui.IEditorInput)
	 */
	public void init(IEditorSite site, IEditorInput input) throws PartInitException {
		file = ((FileEditorInput) input).getFile();
		treeObject = ((JscriptTreeFunctionEditorInput) input).getFunctionTreeObject();
		
		// Create a temp  file to hold data
		InputStream sbisHandlersStream = new ByteArrayInputStream(treeObject.getFunction().getBytes());
		
		// Overrides temp file with data
		if (file.exists()) {
			try {
				file.setContents(sbisHandlersStream, true, false, null);
			} catch (CoreException e) {
				ConvertigoPlugin.logException(e, "Error while editing the function");
			}
		}
		// Create a temp file to hold data
		else {
			try {
				file.create(sbisHandlersStream, true, null);
			} catch (CoreException e) {
				ConvertigoPlugin.logException(e, "Error while editing the function");
			}
		}
		
		setSite(site);
		setInput(input);
		eSite = site;
		eInput = input;
		setPartName(file.getName());
	}
	
	public MyJScriptEditor getEditor() {
		return jsEditor;
	}

	@Override
	public void addPropertyListener(IPropertyListener l) {
		if (listenerList == null) {
			listenerList = new ListenerList();
		}
		listenerList.add(l);
	}

	@Override
	public void removePropertyListener(IPropertyListener l) {
		if (listenerList != null) {
			listenerList.remove(l);
		}
	}

	public void propertyChanged(Object source, int propId) {
		// When a property from the jsEditor Changes, walk the list all the listeners and notify them.
		Object listeners[] = listenerList.getListeners();
		for (int i = 0; i < listeners.length; i++) {
			IPropertyListener listener = (IPropertyListener) listeners[i];
			listener.propertyChanged(this, propId);
		}
	}
	
	public void reload() {
		reload("");
	}
	
	public void reload(String toAppend) {
		IDocument doc = jsEditor.getDocumentProvider().getDocument(getEditorInput());
		doc.set(treeObject.getFunction() + toAppend);
	}
}
