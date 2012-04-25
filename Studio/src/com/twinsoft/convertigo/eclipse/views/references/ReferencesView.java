package com.twinsoft.convertigo.eclipse.views.references;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.jface.viewers.TreeViewer;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.ui.ISelectionListener;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.part.ViewPart;

import com.twinsoft.convertigo.beans.connectors.CicsConnector;
import com.twinsoft.convertigo.beans.connectors.HtmlConnector;
import com.twinsoft.convertigo.beans.connectors.HttpConnector;
import com.twinsoft.convertigo.beans.connectors.JavelinConnector;
import com.twinsoft.convertigo.beans.connectors.ProxyHttpConnector;
import com.twinsoft.convertigo.beans.connectors.SiteClipperConnector;
import com.twinsoft.convertigo.beans.connectors.SqlConnector;
import com.twinsoft.convertigo.beans.core.Connector;
import com.twinsoft.convertigo.beans.core.DatabaseObject;
import com.twinsoft.convertigo.beans.core.Project;
import com.twinsoft.convertigo.beans.core.RequestableStep;
import com.twinsoft.convertigo.beans.core.ScreenClass;
import com.twinsoft.convertigo.beans.core.Sequence;
import com.twinsoft.convertigo.beans.core.Statement;
import com.twinsoft.convertigo.beans.core.Step;
import com.twinsoft.convertigo.beans.core.Transaction;
import com.twinsoft.convertigo.beans.screenclasses.JavelinScreenClass;
import com.twinsoft.convertigo.beans.statements.ContinueWithSiteClipperStatement;
import com.twinsoft.convertigo.beans.statements.ScDefaultHandlerStatement;
import com.twinsoft.convertigo.beans.statements.ScHandlerStatement;
import com.twinsoft.convertigo.beans.steps.BlockStep;
import com.twinsoft.convertigo.beans.steps.BranchStep;
import com.twinsoft.convertigo.beans.steps.ElseStep;
import com.twinsoft.convertigo.beans.steps.SequenceStep;
import com.twinsoft.convertigo.beans.steps.ThenStep;
import com.twinsoft.convertigo.beans.steps.TransactionStep;
import com.twinsoft.convertigo.beans.transactions.HtmlTransaction;
import com.twinsoft.convertigo.beans.transactions.JavelinTransaction;
import com.twinsoft.convertigo.eclipse.ConvertigoPlugin;
import com.twinsoft.convertigo.eclipse.editors.CompositeEvent;
import com.twinsoft.convertigo.eclipse.editors.CompositeListener;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.ConnectorTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.ProjectExplorerView;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.ProjectTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.ScreenClassTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.SequenceTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.TransactionTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.TreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.UnloadedProjectTreeObject;
import com.twinsoft.convertigo.eclipse.views.projectexplorer.ViewContentProvider;
import com.twinsoft.convertigo.eclipse.views.references.model.AbstractNode;
import com.twinsoft.convertigo.eclipse.views.references.model.AbstractParentNode;
import com.twinsoft.convertigo.eclipse.views.references.model.CicsConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.ConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.EntryHandlerNode;
import com.twinsoft.convertigo.eclipse.views.references.model.ExitHandlerNode;
import com.twinsoft.convertigo.eclipse.views.references.model.Folder;
import com.twinsoft.convertigo.eclipse.views.references.model.HtmlConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.HttpConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.IsUsedByNode;
import com.twinsoft.convertigo.eclipse.views.references.model.JavelinConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.ProjectNode;
import com.twinsoft.convertigo.eclipse.views.references.model.ProxyHttpConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.RequiresNode;
import com.twinsoft.convertigo.eclipse.views.references.model.RootNode;
import com.twinsoft.convertigo.eclipse.views.references.model.ScreenClassNode;
import com.twinsoft.convertigo.eclipse.views.references.model.SequenceNode;
import com.twinsoft.convertigo.eclipse.views.references.model.SequenceStepNode;
import com.twinsoft.convertigo.eclipse.views.references.model.SiteClipperConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.SqlConnectorNode;
import com.twinsoft.convertigo.eclipse.views.references.model.TransactionNode;
import com.twinsoft.convertigo.eclipse.views.references.model.TransactionStepNode;
import com.twinsoft.convertigo.engine.Engine;
import com.twinsoft.convertigo.engine.EngineException;

public class ReferencesView extends ViewPart implements CompositeListener,
		ISelectionListener {

	private TreeViewer treeViewer;

	@Override
	public void objectSelected(CompositeEvent compositeEvent) {

	}

	@Override
	public void objectChanged(CompositeEvent compositeEvent) {

	}

	@Override
	public void createPartControl(Composite parent) {
		treeViewer = new TreeViewer(parent);
		treeViewer.setContentProvider(new ViewRefContentProvider());
		treeViewer.setLabelProvider(new ViewRefLabelProvider());
		treeViewer.setInput(null);
		treeViewer.expandAll();

		getSite().setSelectionProvider(treeViewer);
		getSite().getPage().addSelectionListener(this);
		
	}

	@Override
	public void setFocus() {

	}

	@Override
	public void selectionChanged(IWorkbenchPart part, ISelection selection) {
		if (selection instanceof IStructuredSelection) {
			if (part != ReferencesView.this) {
				Object firstElement = ((IStructuredSelection) selection).getFirstElement();
				
				if (firstElement instanceof ScreenClassTreeObject) {
					handleScreenClassSelection(firstElement);
				} else if (firstElement instanceof TransactionTreeObject) {
					handleTransactionSelection(firstElement);
				} else if (firstElement instanceof ProjectTreeObject) {
					handleProjectSelection(firstElement);
				} else if (firstElement instanceof UnloadedProjectTreeObject) {
					handleProjectSelection(firstElement);
				} else if (firstElement instanceof SequenceTreeObject) {
					handleSequenceSelection(firstElement);
				} else if (firstElement instanceof ConnectorTreeObject) {
					handleConnectorSelection(firstElement);
				} else {
					Folder root = new Folder(null, "root");
					root.addChild(new Folder(root, "References are not handled for this object"));
					treeViewer.setInput(root);
				}
			}
			else {
				Object firstElement = ((IStructuredSelection) selection).getFirstElement();
				handleSelectedObjectInRefView(firstElement);
			}
		}
	}
	
	private void handleProjectSelection(Object firstElement) {
		try {
			List<String> projectNames = Engine.theApp.databaseObjectsManager.getAllProjectNamesList();
			ProjectExplorerView projectExplorerView = ConvertigoPlugin.getDefault().getProjectExplorerView();
			
			Project projectSelected = null;
			ProjectTreeObject projectTreeObjectSelected = null;
			UnloadedProjectTreeObject unloadedProjectTreeObjectSelected = null;
			
			if (firstElement instanceof ProjectTreeObject) {
				projectTreeObjectSelected = (ProjectTreeObject) firstElement;
				projectSelected = projectTreeObjectSelected.getObject();
			} else if (firstElement instanceof UnloadedProjectTreeObject) {
				unloadedProjectTreeObjectSelected = (UnloadedProjectTreeObject) firstElement;
				String projectNameSelected =unloadedProjectTreeObjectSelected.getName();
				projectSelected = getProject(projectNameSelected, projectExplorerView);
			}
			
			String projectNameSelected = projectSelected.getName();
			
			treeViewer.setInput(null);
			
			// Get the referencing sequences and transactions
			List<Sequence> sequences = projectSelected.getSequencesList();
			
			RootNode root = new RootNode();
			ProjectNode projectNode = new ProjectNode(root, projectNameSelected, projectSelected);
			root.addChild(projectNode);
			
			// Get all the projects needed to successfully execute the selected project
			// i.e. get all CallTransaction and CallSequence steps from the selected project
			// that refer to other projects
			RequiresNode requiresNode = new RequiresNode(root, "Requires", null);
			
			// Search for external sequences/transaction referenced by CallSequence/CallTransaction
			// from the selected project
			for (Sequence sequence : sequences) {
				List<Step> steps = sequence.getSteps();
				for (Step step : steps) {
					if (step instanceof SequenceStep) {
						SequenceStep sequenceStep = (SequenceStep) step;
						String projectName = sequenceStep.getProjectName();
						if (!projectName.equals(projectNameSelected)) {
							Project project = getProject(projectName, projectExplorerView);
							ProjectNode projectFolderImports = new ProjectNode(root, projectName, project);
							projectFolderImports.addChild(new SequenceNode(projectFolderImports, sequenceStep.getSequenceName(),
									project.getSequenceByName(sequenceStep.getSequenceName())));							
							requiresNode.addChild(projectFolderImports);
						}
					}
					else if (step instanceof TransactionStep) {
						TransactionStep transactionStep = (TransactionStep) step;
						String projectName = transactionStep.getProjectName();
						if (!projectName.equals(projectNameSelected)) {
							Project project = getProject(projectName, projectExplorerView);
							ProjectNode projectFolderImports = new ProjectNode(root, projectName, project);

							Connector connector = project.getConnectorByName(transactionStep.getConnectorName());
							ConnectorNode connectorNode = null;
							
							connectorNode = getConnectorNode(projectFolderImports, connector);
					
							projectFolderImports.addChild(connectorNode);
							
							Transaction transaction = connector.getTransactionByName(transactionStep.getTransactionName());
							
							connectorNode.addChild(new TransactionNode(connectorNode, transaction.getName(), transaction));							
							
							requiresNode.addChild(projectFolderImports);
						}
					} else if (step instanceof BlockStep|| step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
						getProjectReferencingRequires(step, projectSelected, projectExplorerView, requiresNode);
					}
				}
			}
			
			if (requiresNode.hasChildren()){
				projectNode.addChild(requiresNode);
			}
			
			// Get all the projects using the selected project
			// i.e. get all CallTransaction and CallSequence steps that refer to transactions
			// or sequences from the selected project
			IsUsedByNode isUsedByNode = new IsUsedByNode(root, "Is used by", null);
			
			for (String projectName : projectNames) {
				Project project = getProject(projectName, projectExplorerView);
				
				if (!(projectName.equals(projectNameSelected))) {
					ProjectNode projectFolderExports = new ProjectNode(root, projectName, project);
					
					List<Sequence> sequenceList = project.getSequencesList();
					for (Sequence sequence : sequenceList) {
						// Search for CallTransaction and CallSequence referencing a transaction or sequence
						// from the selected project
						List<Step> stepList = sequence.getSteps();
						SequenceNode sequenceNode = new SequenceNode(root, sequence.getName(), sequence);
						for (Step step : stepList) {
							if (step instanceof SequenceStep) {
								String sourceSequence = ((SequenceStep) step).getSourceSequence();
								String sourceProjectName = ((SequenceStep) step).getProjectName();
								if (sourceProjectName.equals(projectNameSelected)) {
									sequenceNode.addChild(new SequenceStepNode(sequenceNode,"Call of " + sourceSequence, step));
								}
							} else if (step instanceof TransactionStep) {
								String sourceTransaction = ((TransactionStep)step).getSourceTransaction();
								String sourceProjectName = ((TransactionStep)step).getProjectName();
								if (sourceProjectName.equals(projectNameSelected)) {
									sequenceNode.addChild(new TransactionStepNode(sequenceNode,"Call of " + sourceTransaction, step));
								}
							} else if (step instanceof BlockStep|| step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
								getProjectReferencingIsUsedBy(step, projectSelected, sequenceNode);	
							}
						}
						if (sequenceNode.hasChildren()){
							projectFolderExports.addChild(sequenceNode);
						}
					}

					if (projectFolderExports.hasChildren()){
						isUsedByNode.addChild(projectFolderExports);
					}
				}
			}
			if (isUsedByNode.hasChildren()){
				projectNode.addChild(isUsedByNode);
			}	
			
			if (!projectNode.hasChildren()) {
				projectNode.addChild(new Folder(projectNode, "This project is not used by any other projects"));
			}
			
			treeViewer.setInput(null);
			treeViewer.setInput(root);
			treeViewer.expandAll();
			
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Error while analyzing the projects hierarchy", true);
		}
	}
	
	private void handleScreenClassSelection(Object firstElement) {
		
		ScreenClassTreeObject screenClassTreeObject = (ScreenClassTreeObject) firstElement;
		ScreenClass screenClass = screenClassTreeObject.getObject();
		String screenClassName = screenClassTreeObject.getName();
		
		// Get the referencing transactions
		Connector connector = screenClass.getConnector();
		List<Transaction> transactions = connector.getTransactionsList();
		
		RootNode root = new RootNode();
		
		ScreenClassNode screenClassFolder = new ScreenClassNode(root, screenClassName, screenClass);
		root.addChild(screenClassFolder);
		
		IsUsedByNode isUsedByNode = new IsUsedByNode(screenClassFolder, "Is used by", null);

		EntryHandlerNode entryFolder = new EntryHandlerNode(isUsedByNode, "Entry handlers", null);
		ExitHandlerNode exitFolder = new ExitHandlerNode(isUsedByNode, "Exit handlers", null);
		
		if (connector instanceof HtmlConnector) {
			for (Transaction transaction : transactions) {
				HtmlTransaction htmlTransaction = (HtmlTransaction) transaction;
				List<Statement> statements = htmlTransaction.getStatements();
				for (Statement statement : statements) {
					if (statement instanceof ScHandlerStatement) {
						ScHandlerStatement scHandlerStatement = (ScHandlerStatement) statement;
						if (scHandlerStatement.getNormalizedScreenClassName().equals(screenClassName)) {
							if (scHandlerStatement.getName().endsWith("Entry")) {
								entryFolder.addChild(new TransactionNode(entryFolder, transaction.getName(), scHandlerStatement));
							} else {
								exitFolder.addChild(new TransactionNode(exitFolder, transaction.getName(), scHandlerStatement));
							}
						}
					}
				}
			}
		} else if (connector instanceof JavelinConnector) {
			for (Transaction transaction : transactions) {
				JavelinTransaction javelinTransaction = (JavelinTransaction) transaction; 
				if (javelinTransaction.handlers.indexOf("function on" + screenClassName + "Entry()") != -1) {
					entryFolder.addChild(new TransactionNode(entryFolder, transaction.getName(), transaction));
				}
				if (javelinTransaction.handlers.indexOf("function on" + screenClassName + "Exit()") != -1) {
					exitFolder.addChild(new TransactionNode(exitFolder, transaction.getName(), transaction));
				}
			}
		}
		
		if (entryFolder.hasChildren()) {
			isUsedByNode.addChild(entryFolder);
		}
		if (exitFolder.hasChildren()) {
			isUsedByNode.addChild(exitFolder);
		}
		
		if (!isUsedByNode.hasChildren()){
			screenClassFolder.addChild(new Folder(screenClassFolder, "This screen class is not used in any transaction"));
		} else {
			screenClassFolder.addChild(isUsedByNode);
		}
		
		// Build the treeviewer model				
		treeViewer.setInput(null);
		treeViewer.setInput(root);
		treeViewer.expandAll();

	}
	
	private void handleTransactionSelection(Object firstElement) {
		
		TransactionTreeObject transactionTreeObject = (TransactionTreeObject) firstElement;
		Transaction transaction = transactionTreeObject.getObject();
		String transactionName = transactionTreeObject.getName();
		
		// Get the referencing sequence steps
		String transactionProjectName = transaction.getProject().getName();
		String transactionConnectorName = transaction.getParent().getName();
		
		try {
			Project project = null;
			List<String> projectNames = Engine.theApp.databaseObjectsManager.getAllProjectNamesList();
			ProjectExplorerView projectExplorerView = ConvertigoPlugin.getDefault().getProjectExplorerView();
			
			treeViewer.setInput(null);
			
			RootNode root = new RootNode();
			
			TransactionNode transactionFolder = new TransactionNode(root, transactionName, transaction);
			root.addChild(transactionFolder);
			
			IsUsedByNode isUsedByNode = new IsUsedByNode(transactionFolder, "Is used by", null);
			RequiresNode requiresNode = new RequiresNode(transactionFolder, "Requires", null);
			
			ProjectNode projectFolder = null;
			
			//Searching all objects are required transaction selected
			Connector connector = transaction.getConnector();
			if (connector instanceof HtmlConnector) {
				Project proj = ((HtmlConnector)connector).getProject();
				ProjectNode projectNode = new ProjectNode(requiresNode, transactionProjectName, proj);
				
				HtmlTransaction htmlTransaction = (HtmlTransaction) transaction;
				List<Statement> statements = htmlTransaction.getStatements();
				List<ScreenClass> screenClassList = new ArrayList<ScreenClass>();
				for (Statement statement : statements) {
					if (statement instanceof ScHandlerStatement) {
						ScHandlerStatement scHandlerStatement = (ScHandlerStatement) statement;
						String screenClassName = scHandlerStatement.getNormalizedScreenClassName();
						ScreenClass screenClass = ((HtmlConnector)connector).getScreenClassByName(screenClassName);

						if (!screenClassList.contains(screenClass)) {
							screenClassList.add(screenClass);
							requiresNode.addChild(new ScreenClassNode(requiresNode, screenClassName, screenClass));
						}
					} 
					ScHandlerStatement scHandlerStatement = null;
					ScDefaultHandlerStatement scDefaultHandlerStatement = null;
					List<Statement> statementList = new ArrayList<Statement>();
					if (statement instanceof ScHandlerStatement) {
						scHandlerStatement = (ScHandlerStatement) statement;
						statementList = scHandlerStatement.getStatements();
					} else if (statement instanceof ScDefaultHandlerStatement) {
						scDefaultHandlerStatement = (ScDefaultHandlerStatement) statement;
						statementList = scDefaultHandlerStatement.getStatements();
					}
					for (Statement st : statementList) {
						if (st instanceof ContinueWithSiteClipperStatement) {
							ContinueWithSiteClipperStatement continueWithSiteClipperStatement = (ContinueWithSiteClipperStatement) st;
							String siteClipperconnectorName = continueWithSiteClipperStatement.getSiteClipperConnectorName();
							Connector siteClipperConnector = proj.getConnectorByName(siteClipperconnectorName);
				
							ConnectorNode connectorSiteClipperNode = new SiteClipperConnectorNode(projectNode, siteClipperconnectorName, siteClipperConnector);
							projectNode.addChild(connectorSiteClipperNode);
							requiresNode.addChild(projectNode);
						}
					}
				}
			} else if (connector instanceof JavelinConnector) {
				
				JavelinTransaction javelinTransaction = (JavelinTransaction) transaction;
				String handlers = javelinTransaction.handlers;

				List<JavelinScreenClass> screenClasses = ((JavelinConnector)connector).getAllScreenClasses();
				List<JavelinScreenClass> screenClassList = new ArrayList<JavelinScreenClass>();
				for (JavelinScreenClass screenClass : screenClasses) {
					if (handlers.indexOf("function on" + screenClass.getName()) != -1) {
						if (!screenClassList.contains(screenClass)) {
							screenClassList.add(screenClass);
							requiresNode.addChild(new ScreenClassNode(requiresNode, screenClass.getName(), screenClass));
						}
					}
				}
			}
			
			
			//Searching all objects are used transaction selected 
			for (String projectName : projectNames) {
				project = getProject(projectName, projectExplorerView);

				projectFolder = new ProjectNode(isUsedByNode, project.getName(), project);
				List<Sequence> sequences = project.getSequencesList();
				
				for (Sequence sequence : sequences) {
					List<Step> stepList = sequence.getAllSteps();
					SequenceNode sequenceNode = null;
					for (Step step : stepList) {
						if (step instanceof TransactionStep) {
							String sourceTransactionName = ((TransactionStep) step).getSourceTransaction();
							if (sourceTransactionName.equals(transactionProjectName + RequestableStep.SOURCE_SEPARATOR +
									transactionConnectorName + RequestableStep.SOURCE_SEPARATOR +
									transactionName)) {
								if (sequenceNode == null) {
									sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
								}
								sequenceNode.addChild(new TransactionStepNode(sequenceNode, step.getName(), step));
							}
						} else if (step instanceof BlockStep || step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
							if (sequenceNode == null) {
								sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
							}
							getTransactionReferencing (step, projectExplorerView, sequenceNode, transactionProjectName, transactionConnectorName, transactionName);						
						}
					}
					if (sequenceNode != null) {
						if (sequenceNode.hasChildren()) {
							projectFolder.addChild(sequenceNode);
						}
					}
				}
				if (projectFolder.hasChildren()) {
					isUsedByNode.addChild(projectFolder);
				} 
			}
			if (requiresNode.hasChildren()) {
				transactionFolder.addChild(requiresNode);
			}
			if (isUsedByNode.hasChildren()) {
				transactionFolder.addChild(isUsedByNode);
			}
			if (!transactionFolder.hasChildren()) {
				transactionFolder.addChild(new Folder(projectFolder, "This transaction is not used in any sequence"));
			}
			
			
			treeViewer.setInput(root);
			treeViewer.expandAll();
				
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Error while analyzing the projects hierarchy", true);
		}
	}

	private void handleSequenceSelection(Object firstElement) {
		SequenceTreeObject sequenceTreeObject = (SequenceTreeObject) firstElement;
		Sequence sequenceSelected = sequenceTreeObject.getObject();
		String sequenceSelectedName = sequenceSelected.getName();
		
		String sequenceProjectName = sequenceSelected.getProject().getName();
		
		try {
			List<String> projectNames = Engine.theApp.databaseObjectsManager.getAllProjectNamesList();
			ProjectExplorerView projectExplorerView = ConvertigoPlugin.getDefault().getProjectExplorerView();
			
			treeViewer.setInput(null);
			
			// Get the referencing sequence steps
			List<String> referencingSequence = new ArrayList<String>();
			
			RootNode root = new RootNode();
			
			SequenceNode sequenceFolder = new SequenceNode(root, sequenceSelectedName, sequenceSelected);
			root.addChild(sequenceFolder);
			
			IsUsedByNode isUsedByNode = new IsUsedByNode(sequenceFolder, "Is used by", null);
			
			// Searching all objects that reference the selected sequence
			for (String projectName : projectNames) {
				Project project = getProject(projectName, projectExplorerView);
				
				ProjectNode projectFolder = null;
				projectFolder = new ProjectNode(isUsedByNode, project.getName(), project);
				List<Sequence> sequences = project.getSequencesList();
				referencingSequence.clear();
				
				for (Sequence sequence : sequences) {
					List<Step> steps = sequence.getSteps();
					
					for (Step step : steps) {
						if (step instanceof SequenceStep) {
							String sourceSequence = ((SequenceStep) step).getSourceSequence();
							if (sourceSequence.equals(sequenceProjectName + RequestableStep.SOURCE_SEPARATOR +
									sequenceSelectedName)) {
								SequenceNode sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
								projectFolder.addChild(sequenceNode);
								sequenceNode.addChild(new SequenceStepNode(projectFolder, step.getName(), step));
							}
						} else if (step instanceof BlockStep || step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
							SequenceNode sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
							getSequenceReferencingIsUsedBy(step, sequenceSelected, sequenceNode);
							if (sequenceNode.hasChildren()) {
								projectFolder.addChild(sequenceNode);
							}
						}
					}
				}
				if (projectFolder.hasChildren()) {
					isUsedByNode.addChild(projectFolder);
				}
			}
			
			List<Step> steps = sequenceSelected.getSteps();
			
			RequiresNode requiresNode = new RequiresNode(root, "Requires", null);			
			
			// Searching all objects that are referenced by the selected sequence
			for (Step step : steps) {
				if (step instanceof SequenceStep) {
					SequenceStep sequenceStep = (SequenceStep)step;
					String projectName = sequenceStep.getProjectName();
					Project project = getProject(projectName, projectExplorerView);
					SequenceNode sequenceNode = null;
					ProjectNode projectFolder = null;					
					projectFolder = new ProjectNode(requiresNode, project.getName(), project);
				
					if (sequenceNode == null) {
						sequenceNode = new SequenceNode(projectFolder, sequenceStep.getSequenceName(), project.getSequenceByName(sequenceStep.getSequenceName()));
					}
					sequenceNode = new SequenceNode(projectFolder, sequenceStep.getSequenceName(), project.getSequenceByName(sequenceStep.getSequenceName()));
					projectFolder.addChild(sequenceNode);
					
					if (projectFolder.hasChildren()) {
						requiresNode.addChild(projectFolder);
					}
				} else if (step instanceof TransactionStep) {
					TransactionStep transactionStep = (TransactionStep) step;
					String projectName = transactionStep.getProjectName();
					Project project = getProject(projectName, projectExplorerView);
					

					String connectorName = transactionStep.getConnectorName();
					Connector connector = project.getConnectorByName(connectorName);
					
					ProjectNode projectFolder = new ProjectNode(requiresNode, projectName, project);
					
					TransactionNode transactionNode = null;
					ConnectorNode connectorNode = null;
					
					connectorNode = getConnectorNode(projectFolder, connector);
							
					if (transactionNode == null) {
						transactionNode = new TransactionNode(projectFolder, transactionStep.getTransactionName(), project.getConnectorByName(connectorName).getTransactionByName(transactionStep.getTransactionName()));
					}
					transactionNode = new TransactionNode(projectFolder, transactionStep.getTransactionName(), project.getConnectorByName(connectorName).getTransactionByName(transactionStep.getTransactionName()));
					projectFolder.addChild(connectorNode);
					connectorNode.addChild(transactionNode);
					
					requiresNode.addChild(projectFolder);
				} else if (step instanceof BlockStep || step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
					getSequenceReferencingRequires(step, sequenceSelected, projectExplorerView, requiresNode);
				}
			}
			
			if (requiresNode.hasChildren()) {
				sequenceFolder.addChild(requiresNode);
			}
			if (isUsedByNode.hasChildren()) {
				sequenceFolder.addChild(isUsedByNode);
			}
			if (!sequenceFolder.hasChildren()) {
				sequenceFolder.addChild(new Folder(sequenceFolder, "This sequence is not used in any sequence"));
			}

			treeViewer.setInput(root);
			treeViewer.expandAll();
			
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Error while analyzing the projects hierarchy", true);
		}
	}

	private void handleConnectorSelection(Object firstElement) {
		ConnectorTreeObject connectorTreeObject = (ConnectorTreeObject) firstElement;
		Connector connectorSelected = connectorTreeObject.getObject();
		String connectorSelectedName = connectorSelected.getName();
		
		Project projectConnectorSelected = connectorSelected.getProject();
		String connectorProjectName = connectorSelected.getProject().getName();
		List<Transaction> transactions = connectorSelected.getTransactionsList();
		
		try {
			Project project = null;
			List<String> projectNames = Engine.theApp.databaseObjectsManager.getAllProjectNamesList();
			ProjectExplorerView projectExplorerView = ConvertigoPlugin.getDefault().getProjectExplorerView();
			
			treeViewer.setInput(null);
			
			RootNode root = new RootNode();
			ConnectorNode connectorNode = null;
			connectorNode = getConnectorNode(root, connectorSelected);
		
			root.addChild(connectorNode);
			
			IsUsedByNode isUsedByNode = new IsUsedByNode(connectorNode, "Is used by", null);
			RequiresNode requiresNode = new RequiresNode(connectorNode, "Requires", null);
			ProjectNode projectFolder = null;
			
			//Search handlers are that referenced by the selected connector for continue with site Clipper
			if (connectorSelected instanceof HtmlConnector) {
				ProjectNode projectNode = new ProjectNode(requiresNode, connectorProjectName, projectConnectorSelected);
				for (Transaction transaction : transactions) {
					List<Statement> statements = ((HtmlTransaction)transaction).getStatements();
					for (Statement statement : statements) {
						ScHandlerStatement scHandlerStatement = null;
						ScDefaultHandlerStatement scDefaultHandlerStatement = null;
						List<Statement> statementList = new ArrayList<Statement>();
						if (statement instanceof ScHandlerStatement) {
							scHandlerStatement = (ScHandlerStatement) statement;
							statementList = scHandlerStatement.getStatements();
						} else if (statement instanceof ScDefaultHandlerStatement) {
							scDefaultHandlerStatement = (ScDefaultHandlerStatement) statement;
							statementList = scDefaultHandlerStatement.getStatements();
						}
						for (Statement st : statementList) {
							if (st instanceof ContinueWithSiteClipperStatement) {
								ContinueWithSiteClipperStatement continueWithSiteClipperStatement = (ContinueWithSiteClipperStatement) st;
								String siteClipperconnectorName = continueWithSiteClipperStatement.getSiteClipperConnectorName();
								Connector siteClipperConnector = projectConnectorSelected.getConnectorByName(siteClipperconnectorName);
								
								ConnectorNode connectorSiteClipperNode = new SiteClipperConnectorNode(projectNode, siteClipperconnectorName, siteClipperConnector);
								projectNode.addChild(connectorSiteClipperNode);
							}
						}
					}
				}
				if(projectNode.hasChildren()) {
					requiresNode.addChild(projectNode);
				}
			} else if (connectorSelected instanceof SiteClipperConnector) {
				List<Connector> connectors = projectConnectorSelected.getConnectorsList();
				ProjectNode projectNode = new ProjectNode(isUsedByNode, connectorProjectName, projectConnectorSelected);
				
				for (Connector connector : connectors) {
					if (connector instanceof HtmlConnector) {
						List<Transaction> transactionList = ((HtmlConnector)connector).getTransactionsList();
						for (Transaction transaction : transactionList) {
							List<Statement> statements = ((HtmlTransaction)transaction).getStatements();
							for (Statement statement : statements) {
								ScHandlerStatement scHandlerStatement = null;
								ScDefaultHandlerStatement scDefaultHandlerStatement = null;
								List<Statement> statementList = new ArrayList<Statement>();
								if (statement instanceof ScHandlerStatement) {
									scHandlerStatement = (ScHandlerStatement) statement;
									statementList = scHandlerStatement.getStatements();
								} else if (statement instanceof ScDefaultHandlerStatement) {
									scDefaultHandlerStatement = (ScDefaultHandlerStatement) statement;
									statementList = scDefaultHandlerStatement.getStatements();
								}
								for (Statement st : statementList) {
									if (st instanceof ContinueWithSiteClipperStatement) {
										String sourceSiteClipperConnectorName = ((ContinueWithSiteClipperStatement)st).getSiteClipperConnectorName();
										if (sourceSiteClipperConnectorName.equals(connectorSelectedName)) {
											ContinueWithSiteClipperStatement continueWithSiteClipperStatement = (ContinueWithSiteClipperStatement) st;
											HtmlConnectorNode htmlConnectorNode = new HtmlConnectorNode(projectNode, connector.getName(), connector);
											projectNode.addChild(htmlConnectorNode);
											TransactionNode transactionNode = new TransactionNode(htmlConnectorNode, transaction.getName(), continueWithSiteClipperStatement);
											htmlConnectorNode.addChild(transactionNode);
										}
									}
								}
							}
						}
					}
				}
				if (projectNode.hasChildren()) {
					isUsedByNode.addChild(projectNode);
				}
			}
			
			// Searching all objects that are referenced by the selected connector
			for (String projectName : projectNames) {
				project = getProject(projectName, projectExplorerView);
				
				
				projectFolder = new ProjectNode(isUsedByNode, projectName, project);
				List<Sequence> sequences = project.getSequencesList();
				
				for (Sequence sequence : sequences) {
					List<Step> steps = sequence.getSteps();
					SequenceNode sequenceNode = null;
					for (Step step : steps) {
						if (step instanceof TransactionStep) {
							String sourceTransactions = ((TransactionStep)step).getSourceTransaction();
							for (Transaction transaction : transactions) {
								if (sourceTransactions.equals(connectorProjectName + RequestableStep.SOURCE_SEPARATOR +
									connectorSelectedName + RequestableStep.SOURCE_SEPARATOR +
									transaction.getName())) {
									if (sequenceNode == null) {
										sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
									}
									sequenceNode.addChild(new TransactionStepNode(sequenceNode, step.getName(), step));
								}
							}
						} else if (step instanceof BlockStep || step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep) {
							if (sequenceNode == null) {
								sequenceNode = new SequenceNode(projectFolder, sequence.getName(), sequence);
							}
							getConnectorReferencingIsUsedBy(step, projectExplorerView, sequenceNode, transactions, connectorProjectName, connectorSelectedName);
						}
					}
					if (sequenceNode != null) {
					if (sequenceNode.hasChildren()) {
						projectFolder.addChild(sequenceNode);
				}
					}
				}
				if (projectFolder.hasChildren()) {
					isUsedByNode.addChild(projectFolder);
				}
			}
			if (requiresNode.hasChildren()) {
				connectorNode.addChild(requiresNode);
			}
			if (isUsedByNode.hasChildren()) {
				connectorNode.addChild(isUsedByNode);
			}
			if (!connectorNode.hasChildren()) {
				connectorNode.addChild(new Folder(connectorNode, "This connector is not used by any other objects"));
			}
			

			treeViewer.setInput(root);
			treeViewer.expandAll();
			
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Error while analyzing the projects hierarchy", true);
		}
	}
	

	private ConnectorNode getConnectorNode (AbstractParentNode root, Connector connector) {
		ConnectorNode connectorNode = null;
		String connectorName = connector.getName();
		
		if (connector instanceof HtmlConnector) {
			connectorNode = new HtmlConnectorNode(root, connectorName, connector);
		} else if (connector instanceof ProxyHttpConnector) {
			connectorNode = new ProxyHttpConnectorNode(root, connectorName, connector);
		} else if (connector instanceof JavelinConnector) {
			connectorNode = new JavelinConnectorNode(root, connectorName, connector);
		} else if (connector instanceof HttpConnector) {
			connectorNode = new HttpConnectorNode(root, connectorName, connector);
		} else if (connector instanceof SiteClipperConnector) {
			connectorNode = new SiteClipperConnectorNode(root, connectorName, connector);
		} else if (connector instanceof SqlConnector) {
			connectorNode = new SqlConnectorNode(root, connectorName, connector);
		} else if (connector instanceof CicsConnector) {
			connectorNode = new CicsConnectorNode(root, connectorName, connector);
		} else {
			connectorNode = new ConnectorNode(root, connectorName, connector);
		}
		
		return connectorNode;
	}
	
	//Function to retrieve the object "project" whose name is passed as a parameter
	private Project getProject (String projectName, ProjectExplorerView projectExplorerView) throws EngineException {
		Project project = null;
		TreeObject projectTreeObject = ((ViewContentProvider) projectExplorerView.viewer
				.getContentProvider()).getProjectRootObject(projectName);
		if (projectTreeObject instanceof UnloadedProjectTreeObject) {
			project = Engine.theApp.databaseObjectsManager.getProjectByName(projectName);
		} else {
			project = projectExplorerView.getProject(projectName);
		}
		
		return project;
	}
	
	private List<Step> getStepList (Step step) {
		List<Step> steps = null;
		
		if (step instanceof BlockStep) {
			steps = ((BlockStep) step).getAllSteps();
		} else if (step instanceof BranchStep) {
			steps = ((BranchStep) step).getAllSteps();
		} else if (step instanceof ThenStep) {
			steps = ((ThenStep) step).getAllSteps();
		} else if (step instanceof ElseStep) {
			steps = ((ElseStep) step).getAllSteps();
		}
		
		return steps;
	}
	
	private void getProjectReferencingRequires (Step step, Project projectSelected, ProjectExplorerView projectExplorerView, AbstractParentNode parentNode) {

		try {
			List<Step> steps = getStepList(step);
			for (Step s : steps) {
				if (s instanceof SequenceStep) {
					String sourceProjectName = ((SequenceStep)s).getProjectName();
					if (!sourceProjectName.equals(projectSelected.getName())) {
						Project project = getProject(sourceProjectName, projectExplorerView);
						ProjectNode projectNode = new ProjectNode(parentNode, sourceProjectName, project);
						Sequence sourceSequence = project.getSequenceByName(((SequenceStep)s).getSequenceName());
						projectNode.addChild(new SequenceNode(projectNode, sourceSequence.getName(), sourceSequence));

						parentNode.addChild(projectNode);

					}
				} else if (s instanceof TransactionStep) {
					String sourceProjectName = ((TransactionStep)s).getProjectName();
					if (!sourceProjectName.equals(projectSelected.getName())) {
						Project project = getProject(sourceProjectName, projectExplorerView);
						ProjectNode projectNode = new ProjectNode(parentNode, sourceProjectName, project);
						Connector connector = project.getConnectorByName(((TransactionStep)s).getConnectorName());
						ConnectorNode connectorNode = null;
						connectorNode = getConnectorNode(projectNode, connector);
						projectNode.addChild(connectorNode);
						Transaction transaction = connector.getTransactionByName(((TransactionStep)s).getTransactionName());
						connectorNode.addChild(new TransactionNode(connectorNode, transaction.getName(), transaction));

						parentNode.addChild(projectNode);

					}
				} else if (isStepContainer(s)) {
					getProjectReferencingRequires(s, projectSelected, projectExplorerView, parentNode);
				}
			}
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Unable to load the project", true);
		}
	}
	
	private void getProjectReferencingIsUsedBy (Step step, Project projectSelected, AbstractParentNode parentNode) {

		List<Step> steps = getStepList(step);
		for (Step s : steps) {
			if (s instanceof SequenceStep) {
				String sourceProjectName = ((SequenceStep)s).getProjectName();
				if (sourceProjectName.equals(projectSelected.getName())) {
					SequenceStepNode sequenceStepNode = new SequenceStepNode(parentNode,"Call of " + ((SequenceStep)s).getSourceSequence(), s);
					parentNode.addChild(sequenceStepNode);
				}
			} else if (s instanceof TransactionStep) {
				String sourceProjectName = ((TransactionStep)s).getProjectName();
				if (sourceProjectName.equals(projectSelected.getName())) {
					TransactionStepNode transactionStepNode = new TransactionStepNode(parentNode,"Call of " + ((TransactionStep)s).getSourceTransaction(), s);
					parentNode.addChild(transactionStepNode);
				}
			} else if (isStepContainer(s)) {
				getProjectReferencingIsUsedBy(s, projectSelected, parentNode);
			}
		}
	}
	
	private void getSequenceReferencingIsUsedBy (Step step, Sequence sequenceSelected, SequenceNode seNode) {
	
		List<Step> steps = getStepList(step);
		for (Step s : steps) {
			if (s instanceof SequenceStep) { 
				String sourceSequence = ((SequenceStep)s).getSourceSequence();
				if (sourceSequence.equals(sequenceSelected.getProject().getName() + RequestableStep.SOURCE_SEPARATOR + sequenceSelected.getName())) {
					SequenceStepNode sequenceStepNode = new SequenceStepNode(seNode, s.getName(), s);
					seNode.addChild(sequenceStepNode);
				}
			} else 	if (isStepContainer(s)) {
					getSequenceReferencingIsUsedBy(s, sequenceSelected, seNode);
			}
		}
	}
	
	
	private void getSequenceReferencingRequires (Step step, Sequence sequenceSelected, ProjectExplorerView projectExplorerView, RequiresNode requiresNode) {

		try {
			List<Step> steps = getStepList(step);
			
			for (Step s : steps) {
				if (s instanceof SequenceStep) {
					SequenceStep sequenceStep = (SequenceStep) s;
					String projectName = sequenceStep.getProjectName();
					Project project = getProject(projectName, projectExplorerView);
					
					ProjectNode projectNode = new ProjectNode(requiresNode, projectName, project);
					SequenceNode sequenceNode = new SequenceNode(projectNode, sequenceStep.getSequenceName(), project.getSequenceByName(sequenceStep.getSequenceName()));
					projectNode.addChild(sequenceNode);
					
					requiresNode.addChild(projectNode);
					
				} else if (s instanceof TransactionStep) {
					TransactionStep transactionStep = (TransactionStep) s;
					String projectName = transactionStep.getProjectName();
					Project project = getProject(projectName, projectExplorerView);
					
					String connectorName = transactionStep.getConnectorName();
					Connector connector = project.getConnectorByName(connectorName);
					
					ProjectNode projectFolder = new ProjectNode(requiresNode, projectName, project);
					
					TransactionNode transactionNode = null;
					ConnectorNode connectorNode = null;
					
					connectorNode = getConnectorNode(projectFolder, connector);
							
					if (transactionNode == null) {
						transactionNode = new TransactionNode(projectFolder, transactionStep.getTransactionName(), project.getConnectorByName(connectorName).getTransactionByName(transactionStep.getTransactionName()));
					}
					transactionNode = new TransactionNode(projectFolder, transactionStep.getTransactionName(), project.getConnectorByName(connectorName).getTransactionByName(transactionStep.getTransactionName()));
					projectFolder.addChild(connectorNode);
					connectorNode.addChild(transactionNode);
					
					requiresNode.addChild(projectFolder);
					
				} else if (isStepContainer(s)) {
					getSequenceReferencingRequires(s, sequenceSelected, projectExplorerView, requiresNode);
				}
			}
		} catch (EngineException e) {
			ConvertigoPlugin.logException(e, "Unable to load the project", true);
		}
	}
	
	private void getConnectorReferencingIsUsedBy(Step step,  ProjectExplorerView projectExplorerView, SequenceNode sequenceNode, List<Transaction> transactions, String connectorProjectName, String connectorSelectedName) {

		List<Step> steps = getStepList(step);
		for (Step s : steps) {
			if (s instanceof TransactionStep) {
				TransactionStep transactionStep = (TransactionStep) s;
				String sourcetransaction = transactionStep.getSourceTransaction();
				for (Transaction transaction : transactions) {
					if (sourcetransaction.equals(connectorProjectName + RequestableStep.SOURCE_SEPARATOR + connectorSelectedName + RequestableStep.SOURCE_SEPARATOR + transaction.getName())){
						sequenceNode.addChild(new TransactionStepNode(sequenceNode, s.getName(),s));
					}
				}
			} else if (isStepContainer(s)) {
				getConnectorReferencingIsUsedBy(s, projectExplorerView, sequenceNode, transactions, connectorProjectName, connectorSelectedName);
			}
		}
	}
	
	private void getTransactionReferencing(Step step,	ProjectExplorerView projectExplorerView, AbstractParentNode sequenceNode,	String transactionProjectName, String transactionConnectorName, String transactionName) {

		List<Step> steps = getStepList(step);
		for (Step s : steps) {
			if (s instanceof TransactionStep) {
				String sourceTransaction = ((TransactionStep)s).getSourceTransaction();
				if (sourceTransaction.equals(transactionProjectName + RequestableStep.SOURCE_SEPARATOR + transactionConnectorName + RequestableStep.SOURCE_SEPARATOR + transactionName)){
					sequenceNode.addChild(new TransactionStepNode(sequenceNode, s.getName(),s));
				}
			} else if (isStepContainer(s)) {
					getTransactionReferencing(s, projectExplorerView, sequenceNode, transactionProjectName, transactionConnectorName, transactionName);
			}
		}
	}
	
	private void handleSelectedObjectInRefView(Object firstElement) {
		if (firstElement != null) {
			if (firstElement instanceof AbstractNode) {
				AbstractNode abstractNode = (AbstractNode) firstElement;
				DatabaseObject selectedDatabaseObject = abstractNode.getRefDatabaseObject();
				ProjectExplorerView projectExplorerView = ConvertigoPlugin.getDefault().getProjectExplorerView();
				TreeObject selectedTreeObject = projectExplorerView.findTreeObjectByUserObject(selectedDatabaseObject);
				if (selectedTreeObject != null) {
					projectExplorerView.setSelectedTreeObject(selectedTreeObject);
				} else {
					if (!(firstElement instanceof RequiresNode)) {
						if (!(firstElement instanceof IsUsedByNode)) {
							if (!(firstElement instanceof Folder)) {
								if (!(firstElement instanceof EntryHandlerNode)) {
									if (!(firstElement instanceof ExitHandlerNode)) {
										ConvertigoPlugin.infoMessageBox("This project is closed. Please open the project first.");
									}
								}
							}
						}
					}					
				}
			}
		}
	}
	
	private boolean isStepContainer(Step step) {
		return (step instanceof BlockStep || step instanceof BranchStep || step instanceof ThenStep || step instanceof ElseStep);
	}
}
