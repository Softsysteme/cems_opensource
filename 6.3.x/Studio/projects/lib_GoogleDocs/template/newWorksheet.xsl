<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt" xmlns:gs="http://schemas.google.com/spreadsheets/2006">
	<xsl:output encoding="UTF-8" media-type="text/xml" method="xml"/>

	<xsl:template match="variables">
		<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gs="http://schemas.google.com/spreadsheets/2006">
			<title><xsl:value-of select="variable[@name='title']"/></title>
			<gs:rowCount>50</gs:rowCount>
			<gs:colCount>10</gs:colCount>
		</entry>
	</xsl:template>
</xsl:stylesheet>
