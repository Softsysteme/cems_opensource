<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<p class="initialize">Lead inserted : <xsl:value-of select="salutation"/>&#160;<xsl:value-of select="name"/>&#160;from&#160;<xsl:value-of select="company"/>,&#160;<xsl:value-of select="city"/>,&#160;<xsl:value-of select="state"/></p>
</xsl:template>

</xsl:stylesheet>
