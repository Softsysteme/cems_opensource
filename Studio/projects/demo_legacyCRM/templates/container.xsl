<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- TEMPLATE CONTAINER FOR MENUS -->
	<xsl:template match="menu[@type='container']">
		<xsl:param name="elDepth">0</xsl:param>
		<xsl:param name="offsety" />
		<span style="width: {@width*$coefx+$offsetw}px; 
					height:{@height*$coefy+$offseth}px; 
					solid; 
					position:absolute; 
					left:{./@column*$coefx+$offsetx + 4}px; 
					top:{./@line*$coefy + $offsety+4}px;
					z-index: {$elDepth * 10 - 1};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelOmbre</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelOmbre</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<span style="width:{@width*$coefx+$offsetw}px; 
					height:{@height*$coefy+$offseth}px; 
					position:absolute; 
					left:{./@column*$coefx + $offsetx}px; 
					top:{./@line*$coefy + $offsety}px;
					z-index: {$elDepth * 10};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanel</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panel</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<!-- Panel top title -->
		<span style="position:absolute; 
					left:{(number(./@column)+1)*$coefx + $offsetx}px; 
					top:{round((number(./@line) - 0.3)*$coefy + $offsety)}px;
					z-index: {$elDepth * 10};">
			<xsl:attribute name="class">panelTopTitle</xsl:attribute>
			<xsl:value-of select="@name" />
		</span>
		<xsl:for-each select="block[@foreground = 'white']">
			<xsl:call-template name="menuItem">
				<xsl:with-param name="offsety" select="$offsety" />
				<xsl:with-param name="offsetx" select="$offsetx" />
				<xsl:with-param name="elDepth" select="$elDepth" />
				<xsl:with-param name="column" select="preceding-sibling::block[@foreground = 'green']/@column" />
				<xsl:with-param name="code" select="preceding-sibling::block[@foreground = 'green']" />
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template name="menuItem">
		<xsl:param name="offsety" />
		<xsl:param name="offsetx" />
		<xsl:param name="elDepth" />
		<xsl:param name="column" />
		<xsl:param name="code" />
		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		 <span onclick="getId('{//actionField/@name}').value='{$code}'; doAction('KEY_ENTER');"
		 		style="position:absolute; 
						left:{$column*$coefx+$offsetx}px; 
						top:{./@line*$coefy + $offsety}px; 
						white-space: nowrap; 
						z-index: {$elDepth * 10 + 1};
						cursor: pointer;
						text-decoration: underline;">
			<!-- Foreground color style SPAN -->
			<span class="colorwhite">
				<span style="staticText">
					<xsl:value-of select="." />
				</span>
			</span>
		</span>
	</xsl:template>
</xsl:stylesheet>
