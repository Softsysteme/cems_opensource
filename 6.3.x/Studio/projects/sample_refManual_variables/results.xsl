<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="/document">
	<h2>Google search results</h2>
	<xsl:apply-templates/>
</xsl:template>

<xsl:template match="listResults">
	<table cellspacing="2" cellpadding="3" border="0">
		<tr>
			<td><b>Title</b></td>
			<td><b>Url</b></td>
		</tr>
		
		<xsl:for-each select="resultItem">
			<tr>
				<td><xsl:value-of select="title"/></td>
				<td><xsl:value-of select="url"/></td>
			</tr>
		</xsl:for-each>
	</table>
</xsl:template>

</xsl:stylesheet>