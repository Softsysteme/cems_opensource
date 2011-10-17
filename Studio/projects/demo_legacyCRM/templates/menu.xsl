<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	
	<!-- TEMPLATE BUTTONS PANEL -->
	<xsl:template match="*[@type='menu']">
		<xsl:param name="offsety" />
		<xsl:variable name="elDepth">
			<xsl:choose>
				<xsl:when test="ancestor::*[@type='panel']">
					<xsl:value-of select="10 - ancestor::*[@type='panel']/@zOrder"/>
				</xsl:when>
				<xsl:otherwise>
					1
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- There is a panel in the screen. We only display buttons that are in that panel -->
		<xsl:if test="((/document/blocks/*/@type ='panel') and (../@type = 'panel')) or (not(/document/blocks/*/@type ='panel'))">
			<xsl:apply-templates>
				<xsl:with-param name="offsety" select="$offsety + ancestor::blocks[1]/@page-number * $coefy * 24" />
				<xsl:with-param name="extended">true</xsl:with-param>
				<xsl:with-param name="elDepth"><xsl:value-of select="$elDepth"/></xsl:with-param>
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	
	<!-- TEMPLATE MENUITEM -->
	<xsl:template match="*[@type='menuItem']">
		<xsl:param name="offsety" />
		<xsl:param name="elDepth" />
		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span style="	position:absolute; 
						left:{./@column*$coefx+$offsetx}px; 
						top:{./@line*$coefy + $offsety}px;
						z-index: {$elDepth * 10 + 1};">
			<input type="button"
					class="keywordButtonEx"
					name="{@name}"
					id="{@name}"
					value="{@value}">
				<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="./@column"/>_l<xsl:value-of select="./@line"/>'; doAction('NPTUI');</xsl:attribute>
			</input>
		</span>
	</xsl:template>
</xsl:stylesheet>