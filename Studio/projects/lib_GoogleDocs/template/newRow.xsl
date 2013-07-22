<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt" xmlns:gs="http://schemas.google.com/spreadsheets/2006" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">
    <xsl:output encoding="UTF-8" media-type="text/xml" method="xml"/>

    <xsl:template match="variables">
        <entry xmlns="http://www.w3.org/2005/Atom" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">
            <xsl:if test="variable[@name='columnName' and @multi='true']/value">
               <xsl:call-template name="columns">
                   <xsl:with-param name="i">1</xsl:with-param>
               </xsl:call-template>  
            </xsl:if>
		</entry>
	</xsl:template>

    <xsl:template name="columns">
        <xsl:param name="i"/>
        <xsl:param name="columnName"><xsl:value-of select="variable[@name='columnName' and @multi='true']/value[number($i)]"/></xsl:param>
        <xsl:param name="columnValue"><xsl:value-of select="variable[@name='columnValue' and @multi='true']/value[number($i)]"/></xsl:param>
        <xsl:element name="gsx:{$columnName}"><xsl:value-of select="$columnValue"/></xsl:element>
        <xsl:if test="variable[@name='columnName' and @multi='true']/value[number($i)+1]">
            <xsl:call-template name="columns">
                <xsl:with-param name="i"><xsl:value-of select="number($i)+1"/></xsl:with-param>
            </xsl:call-template>  
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>