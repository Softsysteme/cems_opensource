<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- TEMPLATE FIELD -->
	<xsl:template match="*[@type='field']">
		<xsl:param name="fieldSize">
			<xsl:variable name="sWidth" select="/document/@screenWidth"/>
			<xsl:if test="(@column + @size) &lt; $sWidth">
				<xsl:value-of select="@size" />
			</xsl:if>
			<xsl:if test="(@column + @size) &gt;= $sWidth">
				<xsl:value-of select="$sWidth - @column" />
			</xsl:if>
		</xsl:param>
		<xsl:param name="offsety" />
		<xsl:param name="checkAutoEnter">
			<xsl:if test='(@autoenter)'>true</xsl:if>
			<xsl:if test='(not(@autoenter))'>false</xsl:if>
		</xsl:param>
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
		
		<xsl:if test="(@hasFocus ='true')">
			<input type="hidden" id="focus" value= "{@name}" />
		</xsl:if>
		
		<xsl:choose>
			<!-- Case this is a selection field (F4) -->
			<xsl:when test="@foreground = 'cyan'">
				<!-- Container SPAN. Used only for positioning and framework behaviour -->
				<span style="position:absolute; 
								left:{(following-sibling::*[@type='field'][@line=./@line][@foreground='green']/@column + following-sibling::*[@type='field'][@line=./@line][@foreground='green']/@size + 2)*$coefx+$offsetx}px; 
								top:{./@line*$coefy + $offsety}px;
								z-index: {$elDepth * 10 + 1};" 
						id="{@name}_n1parent" >
					<img src="images/spec/loupe-01.png"
							width="20" 
							height="20"  
							onclick="getId('__javelin_current_field').value = '{@name}'; currentFieldOnFocus = '{@name}'; doAction('KEY_PF4');"
							alt="F4 for list"/>
				</span>
			</xsl:when>
			<!-- Normal case -->
			<xsl:otherwise>
				<!-- Container SPAN. Used only for positioning and framework behaviour -->
				<span style="position:absolute; 
								left:{./@column*$coefx+$offsetx}px; 
								top:{./@line*$coefy + $offsety}px;
								z-index: {$elDepth * 10 + 1};" 
						id="{@name}_n1parent" >
					<input class="fieldText"
							style="width: {$fieldSize*$coefx}px;"
							maxlength="{@size}"
							name="{@name}" 
							id="{@name}_n1" 
							onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name});"
							onfocus="currentFieldOnFocus=this.id; onInputClick(this);"
							ondblclick="doAction('KEY_ENTER',  {@name});"
							value="{.}">
						<xsl:choose>
							<xsl:when test="@hidden = 'true'">
								<xsl:attribute name="type">password</xsl:attribute>
							</xsl:when>
							<xsl:otherwise>
								<xsl:attribute name="type">text</xsl:attribute>
							</xsl:otherwise>
						</xsl:choose>
					</input>
				</span>
			</xsl:otherwise>
		</xsl:choose>
		<xsl:if test="@email = 'true'">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span style="position:absolute; 
							left:{(./@column + ./@size + 2)*$coefx+$offsetx}px; 
							top:{./@line*$coefy + $offsety}px;
							z-index: {$elDepth * 10 + 1};">
				<a href="#" id="email_{@name}">
						<img src="images/spec/email.png"
							width="23"
							height="20"
							border="0"
							onmouseover="getId('email_{@name}').href='mailto:' + getId('{@name}_n1').value"/>
				</a>
			</span>
		</xsl:if>
	</xsl:template>
	
	<!-- TEMPLATE VALUE FOR HISTORY -->
	<xsl:template match="value" mode="history">
		<option value='{.}'>
			<xsl:value-of select="." />
		</option>
	</xsl:template>

	<!-- TEMPLATE VALUE -->
	<xsl:template match="value" />
</xsl:stylesheet>
