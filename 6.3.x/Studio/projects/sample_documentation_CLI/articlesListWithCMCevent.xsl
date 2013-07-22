<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="/document">
	<body>
		<h2>Articles list</h2>
		<xsl:apply-templates/>
	</body>
</xsl:template>

<xsl:template match="articles">
	<table cellspacing="2" cellpadding="3" border="0">
		<tr>
			<td><b>Code</b></td>
			<td><b>Name</b></td>
			<td><b>Status</b></td>
			<td><b>Search in Google</b></td>
		</tr>
		
		<xsl:for-each select="row">
			<tr>
				<td><xsl:value-of select="code"/></td>
				<td><xsl:value-of select="name"/></td>
				<td><xsl:value-of select="status"/></td>
				<td>
					<img src="img/googleSearch_logo.png"
						title="please click here to search for article" 
						alt="please click here to search for article"
						style="cursor: pointer;"
						onclick="C8O.doMashupEvent ( 'event_articleClicked', 
						{{ code:'{code}', name:'{name}', status:'{status}' }} );" />
				</td>
			</tr>
		</xsl:for-each>
	</table>
</xsl:template>

<xsl:template match="article_status | article_rsp | product_group"/>

</xsl:stylesheet>