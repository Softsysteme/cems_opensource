<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output encoding="ISO-8859-1" method="text" media-type="text/comma-separated-values"/>
	<!-- TEMPLATE DOCUMENT -->
	<xsl:template match="/document"><xsl:apply-templates select="/document/table/row"/></xsl:template>
	
	<!-- TEMPLATE ROW -->
<xsl:template match="row" priority="1"><xsl:for-each select="*"><xsl:value-of select="."/>;</xsl:for-each><xsl:text>
</xsl:text></xsl:template>
</xsl:stylesheet>
