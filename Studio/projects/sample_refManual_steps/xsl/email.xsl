<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

	<xsl:template match="document">
		<html>
		  <head></head>
		  <body>
				<h1>Available answers:</h1>
				<xsl:apply-templates/>
			</body>
		</html>
	</xsl:template>
	
	<xsl:template match="seq_result"> 
	   <ul>
	       <xsl:apply-templates select="elem"/>
	   </ul>
	</xsl:template>
	
	<xsl:template match="elem">
		<li><xsl:value-of select="."/></li>
	</xsl:template>
	
</xsl:stylesheet>