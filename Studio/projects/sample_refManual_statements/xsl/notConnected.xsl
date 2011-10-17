<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<!-- 
	| This line will add all the link refences (CSS) form the cliplet  
	-->
	<xsl:apply-templates select="HEAD/LINK"/>
	
	<table border="0" width="100%" cellspacing="0" cellpadding="0">
		<tr>
			<td align="left">
				<DIV id="message">You are not connected to SalesForce application due to one of the following causes :<br/><br/>
					<p>The username and password in the login widget preferences are not properly set to match the credentials you provided when the SalesForce account was created. Please configure them by clicking the <img src="../../df/skin/default/images/button/button_edit.gif" /> icon of the SalesForce login widget</p><br/>  
					<p>Probably the session is expired, to reconnect click the <b>back</b> link in the header to go to the login page</p>
				</DIV>
			</td>
			<td align="right"><xsl:apply-templates select="HEAD/following-sibling::*" /></td>
		</tr>
	</table>
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
