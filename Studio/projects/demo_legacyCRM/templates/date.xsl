<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- TEMPLATE DATE -->
	<xsl:template match="*[@type='date']">
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
		
		<xsl:if test="(@hasFocus ='true')">
			<input type="hidden" id="focus" value= "{@name}" />
		</xsl:if>
		
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px" id="{@name}parent">
			<input class="fixed" 
				name="{@name}" 
				id="{@name}" 
				onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name})" 
				onfocus="currentFieldOnFocus=this.id;onInputClick(this)" 
				ondblclick="doAction('KEY_ENTER',  {@name})" 
				size="{$fieldSize}" 
				maxlength="{@size}" 
				value="{.}" 
				type="text" 
				
			/>
    		</span>
	</xsl:template>

</xsl:stylesheet>
