<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<!-- 
	| This line will add all the link refences (CSS) form the cliplet  
	-->
	<xsl:apply-templates select="HEAD/LINK"/>
	
	<blockquote>
		<p>
			<table style="border-collapse: collapse" cellspacing="0" cellpadding="0" border="0">
				<tr>
					<td valign="top">
						<table cellspacing="0" cellpadding="6" border="0">
							<tr>
								<td class="title">Not connected</td>
								<td align="right"><a href="http://www.convertigo.com" target="_blank"><img src="img/poweredbyc8o.jpg" alt="Powered by Convertigo" border="0"/></a></td>
							</tr>
							<tr>
								<td class="texte" colspan="2">
									You are not connected to SalesForce application due to one of the following causes :<br/>
									<ul>
										<li><p>The username and password automatically configured in the login widget are not properly set.</p></li>
										<li><p>Probably the session is expired, to reconnect click the <b>Restart</b> button on the top right corner of the widget.</p></li>
									</ul>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</p>
	</blockquote>
	<div id="menuDiv" style="position:absolute;
							 top:0;
							 right:0;
							 width:50px;
							 height:25px;
							 z-index:99998" >                        
	 	<table>
	 		<tr>
	 			<td><img src="img/e_refresh.png" alt="Refresh" onclick="C8O.call()" style="cursor: pointer" title="Refresh" /></td>
	 			<td><img src="img/e_back.png" alt="Restart"  onclick="C8O.doReconnect()" style="cursor: pointer" title="Restart" /></td>
	 		</tr>
	 	</table>
	</div>
</xsl:template>

<xsl:template match="@*|node()">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()"/>
	</xsl:copy>
</xsl:template>

<xsl:template match="@name">
 	<xsl:attribute name="name"><xsl:value-of select="../@id" /></xsl:attribute>
</xsl:template>

</xsl:stylesheet>
