<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<p class="initialize">
		Campaign "<xsl:value-of select="campaignName"/>" 
		<xsl:if test="campaignCreated = 'true'">created</xsl:if>
		<xsl:if test="campaignCreated = 'false'">already existed</xsl:if>
	</p>
</xsl:template>

</xsl:stylesheet>
