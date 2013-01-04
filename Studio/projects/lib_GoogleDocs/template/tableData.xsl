<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt" xmlns:gs="http://schemas.google.com/spreadsheets/2006">
	<xsl:output encoding="UTF-8" media-type="text/xml" method="xml"/>

	<xsl:template match="variables">
		<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gs="http://schemas.google.com/spreadsheets/2006">
		  <title type='text'><xsl:value-of select="variable[@name='title']"/></title>
		  <summary type='text'><xsl:value-of select="variable[@name='summary']"/></summary>
		  <gs:worksheet name="{variable[@name='worksheetName']}" />
		  <gs:header row="{variable[@name='headerRow']}" />
		  <gs:data numRows="{variable[@name='numRows']}" startRow="{variable[@name='startRow']}">
		  	<xsl:if test="variable[@name='index' and @multi='true']/value">
			    <xsl:call-template name="columns">
			    	<xsl:with-param name="i">1</xsl:with-param>
			    </xsl:call-template>  
		  	</xsl:if>
		  </gs:data>
		</entry>
	</xsl:template>

	<xsl:template name="columns">
		<xsl:param name="i"/>
		<xsl:param name="index"><xsl:value-of select="variable[@name='index' and @multi='true']/value[number($i)]"/></xsl:param>
		<xsl:param name="columnName"><xsl:value-of select="variable[@name='columnName' and @multi='true']/value[number($i)]"/></xsl:param>
		<gs:column index="{$index}" name="{$columnName}"/>
		<xsl:if test="variable[@name='index' and @multi='true']/value[number($i)+1]">
			<xsl:call-template name="columns">
		    	<xsl:with-param name="i"><xsl:value-of select="number($i)+1"/></xsl:with-param>
		    </xsl:call-template>  
		</xsl:if>
	</xsl:template>

</xsl:stylesheet>