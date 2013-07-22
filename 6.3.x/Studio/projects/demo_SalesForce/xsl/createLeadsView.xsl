<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<p class="initialize">
		Leads view "<xsl:value-of select="viewName"/>" 
		<xsl:if test="viewCreated = 'true'">created</xsl:if>
		<xsl:if test="viewCreated = 'false'">already existed</xsl:if>
	</p>
</xsl:template>

</xsl:stylesheet>
