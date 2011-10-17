<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page
	contentType="text/html; charset=iso-8859-1"
	language="java"
	import="
		java.util.*,
		java.io.*,
		java.text.*,
		java.net.URLEncoder,
		com.twinsoft.util.*,
		com.twinsoft.convertigo.engine.*,
		com.twinsoft.convertigo.beans.core.*,
		com.twinsoft.convertigo.beans.connectors.*
	"
%>

<%	String	data = "";
	boolean admin = false;

	Enumeration en = request.getParameterNames();
	boolean params = false;
		
	while(en.hasMoreElements()) {
		String paramName = (String)en.nextElement();
		String values[] = request.getParameterValues(paramName);
		
		for (int i=0; i< values.length; i++) {
			data += paramName +"="+ URLEncoder.encode(values[i], "UTF-8") + "&";
		}
		
		params = true;
	}
	
	admin = !params;
%>

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Index</title>
		<script src="script/scriptlib.js" ></script>

<%	if (admin) {
%>		
		<link type="text/css" rel="stylesheet" href="../../admin/admin.css"/>
<%	}
%>
	</head>
	<body>

<%	if (!admin) {
%>
		<script type="text/javascript" defer="false">
			twsInit();
			ajaxXmlPostData(ajax, "<%=data%>");
		</script>
<%	} else {
%>	
		<!-- HIDDEN DIV FOR CLIPLET EXECUTION -->
		<div id="clipletDiv" style="background-color:white; visibility:hidden; position:absolute; top: 10px; left: 25%; width: 75%">
			<div  style="background:transparent url(img/title.png) repeat scroll 0%;" >
				<table border="0" style="width:100%">
					<tr>
						<td>Execution result</td>
						<td align="right">
							<img  title="Close cliplet"
								  onclick="document.getElementById('clipletDiv').style.visibility='hidden';
				                           document.getElementById('iFrameDiv').src=''; "
				      			  src="img/close_window.png" />
						</td>
					</tr>
				</table>
			</div>
			<div style="border-left:solid gray 1px;
						border-right:solid gray 1px;
						border-bottom:solid gray 1px" >
				<iframe id="iFrameDiv" name="iFrameDiv" frameborder="0" src="" width="100%" height="400">
				</iframe>
			</div>
		</div>

		<!-- INDEX PAGE CONTENT -->
		<table width="100%" border="0" cellpadding="0" cellspacing="10">
			<tr>
				<td align="left" valign="top">
					<p><img src="../../admin/images/twinsoft.gif" width="105" height="36"></p>
				</td>
				<td align="right" valign="top">
					<p><img src="../../admin/images/convertigo.gif" width="110" height="25"></p>
				</td>
			</tr>
			<tr>
				<td height="5" colspan="2" class="title"></td>
			</tr>
			
<%		String uri = request.getRequestURI();
		String hostName = request.getServerName();
		String hostPort = Integer.toString(request.getServerPort());

		// parse the uri to find the project name
        int begin				= uri.indexOf("/projects/") + 10;
        int end					= uri.indexOf("/", begin);
        String projectName	= uri.substring(begin, end);
		
		int i = 0;
		String projectComment, connectorComment, connectorName, transactionComment, transactionName, variableName, variableDesc, variableDefaultValue;
		String sequenceComment, sequenceName, seqVariableName, seqVariableDesc, seqVariableDefaultValue;
		Project project;
		Vector connectors, transactions, sequences;
		Connector connector;
		TransactionWithVariables transaction;
		Sequence sequence;
		
		try {
			StringEx sx;

			project = Engine.theApp.databaseObjectsManager.getProjectByName(projectName);
			sx = new StringEx(project.getComment());
			sx.replaceAll("\r\n", " ");
			sx.replaceAll("\n", " ");
			sx.replaceAll("\"", "\'");
			projectComment = sx.toString();
%>
			<tr>
				<td align="left" valign="top" colspan="2">
					<!-- PROJECT INFORMATION -->
					<table class="main-table" cellspacing="0" cellpadding="0" border="3">
						<tr>
							<td class="main-table-td" valign="top">
								<table cellspacing="0" cellpadding="4" border="0" width="100%">
									<tr>
										<td class="title"><em><%=projectName%></em> project</td>
									</tr>
									<tr>
										<td>
											<table cellpadding="2" width="100%">
												<tr>
													<td class="properties-group"><small>Project type : web integration</small></td>
												</tr>
												<tr>
													<td align="left" valign="top">
														<p><%=projectComment%></p>
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
<%			// connectors list
			connectors = project.getConnectors();
			
			for (int j = 0 ; j < connectors.size() ; j++) {
				connector = (Connector) connectors.elementAt(j);
				
				sx = new StringEx(connector.getComment());
				sx.replaceAll("\r\n", " ");
				sx.replaceAll("\n", " ");
				sx.replaceAll("\"", "\'");
				connectorComment = sx.toString();
				connectorName = connector.getName().replace('"', '\'');
%>
			<tr>
				<td colspan="2" align="left" valign="middle">
					<table class="main-table" cellspacing="0" cellpadding="0" border="3" width="100%">
						<tr>
							<td class="main-table-td" valign="top">
								<table cellspacing="0" cellpadding="4" border="0" width="100%">
									<tr>
										<td class="title"><em><%=connectorName%></em> connector</td>
									</tr>
									<tr>
										<td>
											<table cellspacing="2" cellpadding="2" width="100%">
												<tr> 
													<td class="table-title" align="center" width="25%"><span class="small">Cliplet name</span></td>
													<td class="table-title" align="center" width="25%"><span class="small">Add to</span></td>
													<td class="table-title" align="center" width="25%"><span class="small">Parameters</span></td>
													<td class="table-title" align="center" width="25%"><span class="small">Comment</span></td>
												</tr>
<%				// transactions list
				transactions = connector.getTransactions();
				if (transactions.size() > 0) {
					for (int k = 0 ; k < transactions.size() ; k++) {
						try {
							transaction = (TransactionWithVariables) transactions.elementAt(k);
						} catch (ClassCastException e) {
							continue;
						}
						transactionComment = transaction.getComment().replace('\n', '_').replace('"', '_').replace('\'', '_');
						transactionName = transaction.getName().replace('"', '\'');
%>
												<form id="form_<%=j%>_<%=k%>">
												<tr>
												
													<td valign="top" class="table-row<%=i%>">
														<a href="#" onclick="launchCliplet('form_<%=j%>_<%=k%>');">
															<span class="small"><%=transactionName%></span>
														</a>
														<input type="hidden" name="transactionName" value="<%=transactionName%>"/>
														<input type="hidden" name="connectorName"  value="<%=connectorName%>"/>
													</td>
													
													<td valign="top" class="table-row<%=i%>">
														
														<a href="http://fusion.google.com/add?moduleurl=http%3A//<%=hostName%>:<%=hostPort%><%=uri%>convertigo.gadget?__transaction%3D<%=transactionName%>">
															<img src="http://buttons.googlesyndication.com/fusion/add.gif"
																width="104"
																height="17"
																border="0"
																alt="Add to Google">
														</a>
														
														<a href="http://www.netvibes.com/subscribe.php?type=UWA&url=http%3A%2F%2F<%=hostName%>%3A<%=hostPort%><%=uri%>netvibes.xhtml">
															<img src="http://eco.netvibes.com/img/add2netvibes.png"
																width="91"
																height="17"
																border="0"
																alt="Add to Netvibes"/>
														</a>														
														
													</td>	
													
													
													<td valign="top" class="table-row<%=i%>">
<%
						if (transaction.hasVariables()) {
%>
														<table width="100%">
<%							for (int m = 0 ; m < transaction.numberOfVariables() ; m++) {
								Variable variable = transaction.getVariable(m);
								variableName = variable.getName();
								variableDesc = variable.getDescription();
								variableDefaultValue = variable.getValue().toString();
%>
															<tr>
																<td width="30%" class="table-row<%=i%>"><span class="small"><%=variableName %></span></td>
																<td width="30%" class="table-row<%=i%>"><span class="small"><input type="text" class="small" name="form_<%=j%>_<%=k%>_input" variable="<%=variableName %>" value="<%=variableDefaultValue %>" /></span></td>
																<td width="30%" class="table-row<%=i%>"><span class="small"><%=variableDesc %></span></td>
															</tr>
<%								}
%>
														</table>
<%							}
%>
													</td>
													<td valign="top" class="table-row<%=i%>"><span class="small"><%=transactionComment%></span></td>
												</tr>
												</form>
<%						i = (i+1) % 2;
					}
				}
%>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
<%			}
			
			// sequences list
			sequences = project.getSequences();
			
			if (sequences.size() > 0) {
%>				
			<tr>
				<td colspan="2" align="left" valign="middle">
					<table class="main-table" cellspacing="0" cellpadding="0" border="3" width="100%">
						<tr>
							<td class="main-table-td" valign="top">
								<table cellspacing="0" cellpadding="4" border="0" width="100%">
									<tr>
										<td class="title"><em>sequences</em></td>
									</tr>
									<tr>
										<td>
											<table cellspacing="2" cellpadding="2" width="100%">
												<tr> 
													<td class="table-title" align="center" width="25%"><span class="small">Sequence name</span></td>
													<!-- <td class="table-title" align="center" width="25%"><span class="small">Add to</span></td> -->
													<td class="table-title" align="center" width="25%"><span class="small">Parameters</span></td>
													<td class="table-title" align="center" width="25%"><span class="small">Comment</span></td>
												</tr>		
<%				for (int z = 0 ; z < sequences.size() ; z++) {
					sequence = (Sequence) sequences.elementAt(z);
				
					sequenceComment = sequence.getComment().replace('\n', '_').replace('"', '_').replace('\'', '_');
					sequenceName = sequence.getName().replace('"', '\'');
%>
												<form id="form_seq_<%=z%>">
												<tr>
												
													<td valign="top" class="table-row<%=i%>">
														<a href="#" onclick="launchSequence('form_seq_<%=z%>');">
															<span class="small"><%=sequenceName%></span>
														</a>
														<input type="hidden" name="sequenceName" value="<%=sequenceName%>"/>
													</td>
													
													<!-- <td valign="top" class="table-row<%=i%>">
														
														<a href="http://fusion.google.com/add?moduleurl=http%3A//<%=hostName%>:<%=hostPort%><%=uri%>convertigo.gadget?__sequence%3D<%=sequenceName%>">
															<img src="http://buttons.googlesyndication.com/fusion/add.gif"
																width="104"
																height="17"
																border="0"
																alt="Add to Google">
														</a>
														
														<a href="http://www.netvibes.com/subscribe.php?type=UWA&url=http%3A%2F%2F<%=hostName%>%3A<%=hostPort%><%=uri%>netvibes.xhtml">
															<img src="http://eco.netvibes.com/img/add2netvibes.png"
																width="91"
																height="17"
																border="0"
																alt="Add to Netvibes"/>
														</a>														
														
													</td>	 -->
													
													
													<td valign="top" class="table-row<%=i%>">
<%
					if (sequence.hasVariables()) {
%>
														<table width="100%">
<%						for (int n = 0 ; n < sequence.numberOfVariables() ; n++) {
							Variable variable = sequence.getVariable(n);
							seqVariableName = variable.getName();
							seqVariableDesc = variable.getDescription();
							seqVariableDefaultValue = variable.getValue().toString();
%>
															<tr>
																<td width="30%" class="table-row<%=i%>"><span class="small"><%=seqVariableName %></span></td>
																<td width="30%" class="table-row<%=i%>"><span class="small"><input type="text" class="small" name="form_seq_<%=z %>_input" variable="<%=seqVariableName %>" value="<%=seqVariableDefaultValue %>" /></span></td>
																<td width="30%" class="table-row<%=i%>"><span class="small"><%=seqVariableDesc %></span></td>
															</tr>
<%						}
%>
														</table>
<%					}
%>
													</td>
													<td valign="top" class="table-row<%=i%>"><span class="small"><%=sequenceComment%></span></td>
												</tr>
												</form>
<%					i = (i+1) % 2;
				}
%>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</td>
			</tr>
<%			}
		} catch(Exception e) {
			String errorMessage = e.getMessage();
			StringEx sxErrorMessage = new StringEx(errorMessage);
			sxErrorMessage.replaceAll("<", "&lt;");
			sxErrorMessage.replaceAll(">", "&gt;");
			errorMessage = sxErrorMessage.toString();
%>	
			<tr>
				<td colspan="2" align="left" valign="middle">
					<!-- ERROR --> 
					<table class="main-table" cellspacing="0" cellpadding="0" border="3" width="100%">
				 		<tr>
							<td class="main-table-td" valign="top">
								<small>
									Error while analyzing the project "<%=projectName%>" : [<%=e.getClass().getName()%>]
									<pre><%=errorMessage%></pre>
								</small>
							</td>
						</tr>
					</table>
				</td>
			</tr> 
<%		}
%>				
				
		</table>
<%	} 
%>
	</body>
</html>
