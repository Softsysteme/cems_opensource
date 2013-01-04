<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- TEMPLATE SLIDER -->
	<xsl:template match="*[@type='slider']">
		<xsl:param name="offsety" />
		<!-- Top arrow -->
			<span style="position:absolute;
						left: {./@column*$coefx + $offsetx - 1}px; 
						top: {./@line*$coefy + $offsety}px;">
				<img style="position:absolute;
							width: {$coefx + 2}px; 
							height: {$coefy}px;"
				src="images/slider-arrow-top.gif"
				onclick="doAction('KEY_ROLLUP');"/>
			</span>
		<!-- Bottom arrow -->
		<span style="position:absolute;
						left: {./@column*$coefx + $offsetx - 1}px; 
						top: {(number(./@line)+number(./@height)-1)*$coefy + $offsety}px;">
			<img style="width: {$coefx + 2}px; 
						height: {$coefy}px;" 
				src="images/slider-arrow-bottom.gif"
				onclick="doAction('KEY_ROLLDOWN');"/>
		</span>
		<!-- Empty bar -->
		<span style="position:absolute;
						left: {./@column*$coefx + $offsetx - 1}px; 
						top: {(number(./@line)+1)*$coefy + $offsety}px;
						width: {$coefx + 2}px;
						height: {(number(@height)-2)*$coefy}px;
						background-color: #D4D4D4;">
		</span>
		<!-- Selection bar -->
		<span style="position:absolute;
						left: {((number(./@column) - 0)*$coefx) + $offsetx}px; 
						top: {(number(./@line)+1+number(./@sliderPos))*$coefy + $offsety}px;
						width: {$coefx - 2}px;
						height: {(number(./@sliderSize)-1)*$coefy}px;
						border: solid 1px #909090;
						background-color : #D4D0C8;">
		</span>
	</xsl:template>
</xsl:stylesheet>