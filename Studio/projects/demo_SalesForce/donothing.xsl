<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

	<xsl:template match="document">
	   <body>
			<xsl:apply-templates select="HEAD/LINK"/>
			<xsl:apply-templates select="HEAD/STYLE"/>
			<xsl:apply-templates select="HEAD/SCRIPT"/>
			<xsl:apply-templates select="HEAD/following-sibling::*" />
			<div id="menuDiv" style="position:absolute;
							 top:0;
							 right:0;
							 width:50px;
							 height:25px;
							 z-index:99998" >
			 	<table>
			 		<tr>
			 			<td><img src="img/e_refresh.png" alt="Refresh" onclick="C8O.call()" style="cursor: pointer" title="Refresh"/></td>
			 			<td><img src="img/e_back.png" alt="Restart"  onclick="C8O.doReconnect()" style="cursor: pointer" title="Restart" /></td>
			 		</tr>
			 	</table>
			</div>
	   </body>
	</xsl:template>
	
	
	<xsl:template match="ALERT">
		<table id="alertTable" onclick="this.parentNode.removeChild(this)">
			<tr id="alertTableTitle">
				<td><b><xsl:value-of select="TYPE"/></b></td>
				<td><xsl:value-of select="TITLE"/></td>
				<td><b>X</b></td>
			</tr>
			<tr>
				<td colspan="3"><xsl:value-of select="MESSAGE"/></td>
			</tr>
		</table>
	</xsl:template>

	<xsl:template match="@*|node()">
	  <xsl:copy>
	    <xsl:apply-templates select="@*|node()"/>
	  </xsl:copy>
	</xsl:template>
	
	<xsl:template match="//A[contains(@original_url,'mailto:')]" >
		<a href="{@original_url}"><xsl:value-of select="." /></a>                       
	</xsl:template>
	
</xsl:stylesheet>