<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:lxslt="http://xml.apache.org/xslt" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
	<xsl:output encoding="UTF-8" indent="no" media-type="text/html" method="html"/>

	<!-- Convertigo System Includes -->
	
	
<!--	<xsl:include href="../../xsl/headerfooter.xsl" /> -->

	<!-- HTML block rendering templates -->
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	<xsl:param name="doSort">false</xsl:param>
	<xsl:param name="sortColon">-1</xsl:param>	
	<xsl:param name="sortDataType">text</xsl:param>		
	<xsl:param name="sortOrder">ascending</xsl:param>

	<!-- TEMPLATE DOCUMENT -->
	<xsl:template match="document">
		<!--  these two inputs are generated to hold the screen Dimension !-->
		<input id="screenWidth" type="hidden" value="{@screenWidth}"/>
		<input id="screenHeight" type="hidden" value="{@screenHeight}"/>

		<input id="resize" type="hidden" value="{$resize}"/>
		<input id="coefx" type="hidden" value="{$coefx}"/>
		<input id="coefy" type="hidden" value="{$coefy}"/>
		<input id="offsetx" type="hidden" value="{$offsetx}"/>
		<input id="offsetr" type="hidden" value="{$offsetr}"/>
		<input id="offsety" type="hidden" value="{$offsety}"/>
		<input id="scrollwidth" type="hidden" value="{$scrollwidth}"/>

		<xsl:call-template name="generate-page"/>
	</xsl:template>
	
	<xsl:template name="generate-page">
		<div id="generated_page">
			<form id="javelin_form" method="post" name="javelin_form" onSubmit="">
				<xsl:for-each select="blocks[position()=1]">
					<!-- hidden element containing calendar fields -->
					<input id="calendar_fields" name="calendar_fields" type="hidden">
						<xsl:attribute name="value">
							<xsl:for-each select="block[@type='date']">
                                <xsl:value-of select="@name"/>|<xsl:value-of select="@pattern"/>;</xsl:for-each>
						</xsl:attribute>
					</input>
					<!--Hidden inputs for cursor position-->
					<input id="cursorColumn" type="hidden" value="{/document/@cursorColumn}"/>
					<input id="cursorLine" type="hidden" value="{/document/@cursorLine}"/>
					<xsl:apply-templates>
						<xsl:with-param name="offsety" select="$offsety + @page-number * $coefy * 24"/>
					</xsl:apply-templates>
				</xsl:for-each>
				<input id="__javelin_current_field" name="__javelin_current_field" type="hidden"/>
				<input id="__javelin_action" name="__javelin_action" type="hidden"/>
				<input id="__transaction" name="__transaction" type="hidden"/>
				<input name="__sesskey" type="hidden"/>
				<input id="__context" name="__context" type="hidden" value="{/document/@context}"/>
				<input id="__signature" name="__signature" type="hidden" value="{/document/@signature}"/>
				<input id="table_values" name="table_values" type="hidden" value=""/>
			</form>
		</div>
	</xsl:template>


	<xsl:template match="status">
		<html>
			<head>
				<meta content="TWinSoft Convertigo" name="GENERATOR"/>
				<meta content="0" http-equiv="expires"/>
				<meta content="2; url={@refresh-url}" http-equiv="refresh"/>
				<style> p {font-family:verdana;} </style>
			</head>
			<body background="../../images/marbre.gif" bgcolor="#FFFFFF">
				<p>
					<img src="../../images/twinsoft.gif"/>
				</p>
				<table border="0" cellpadding="8" style="border: 2px solid #FA8072;">
					<tr>
						<td width="100%">
							<xsl:apply-templates/>
						</td>
					</tr>
				</table>
				<p>
					<a href="http://www.convertigo.com">
						<img border="0" src="../../images/convertigo.gif"/>
					</a>
					<br/>
					<font size="-1">Copyright © 2001-2011 Convertigo SA. All rights reserved.</font>
				</p>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="job">
		<p>
			<b>La transaction (job #<xsl:value-of select="@id"/>) est en cours 
				d'éxécution ; veuillez patienter...</b>
		</p>
		<p>
			<xsl:apply-templates/>
		</p>
	</xsl:template>
	<xsl:template match="step">
		<br>
			<xsl:apply-templates/>
		</br>
	</xsl:template>

	<!--- WARNING : if you modify these constants, display may be wrong -->
	<xsl:variable name="coefx">8</xsl:variable>
	<xsl:variable name="coefy">20</xsl:variable>
	
	<!-- Viewport left margin -->
	<xsl:param name="offsetx">5</xsl:param>
	<!-- Viewport right margin -->
	<xsl:param name="offsetr">22</xsl:param>
	<!-- Viewport top margin -->
	<xsl:param name="offsety">0</xsl:param>
	
	<!-- Width of a scroll bar -->
	<xsl:param name="scrollwidth">17</xsl:param>
	
	<!-- Width of icons (like  page up/down incons in table XSL template) -->
	<xsl:variable name="iconSize" select="16"/>
	
	<!-- Panel width enlargement -->
	<xsl:param name="offsetw">10</xsl:param>
	<!-- Panel height enlargement -->
	<xsl:param name="offseth">10</xsl:param>
	
	<!-- Set this to false if you want to disable dynamic screen content resizing -->
	<xsl:variable name="resize">false</xsl:variable>
	
	<!--Set this value to true if you want to display the action key in action buttons-->
	<xsl:variable name="DisplayActionKey">false</xsl:variable>
	
	<!-- Set this value to true if you want to display action buttons outside of panels -->
	<xsl:variable name="DisplayDisabledButtons">false</xsl:variable>
	
	<!-- Help keyword string -->
	<xsl:variable name="helpKeywordString">(F4)</xsl:variable>

	<!-- TEMPLATE STATIC -->
	<xsl:template match="*[@type='static']">
		<xsl:param name="offsety"/>
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
		<xsl:choose>
			<xsl:when test="@title = 'true'">
				<!-- Container SPAN. Used only for positioning and framework behaviour -->
				<span class="title" style="position:absolute;          left:{160 + $offsetx}px;          top:{5 + $offsety}px;         white-space: nowrap;         z-index: {$elDepth * 10 + 1};">
					<xsl:value-of select="."/>
				</span>
			</xsl:when>
			<xsl:otherwise>
				<!-- Hide non-visible statics -->
				<xsl:if test="@background != @foreground">
					<!-- Container SPAN. Used only for positioning and framework behaviour -->
					<span onclick="spanClick(this, {@column}, {@line});" ondblclick="spanClick(this, {@column}, {@line}); doAction('KEY_ENTER');" style="position:absolute;           left:{./@column*$coefx+$offsetx}px;           top:{./@line*$coefy + $offsety}px;          white-space: nowrap;          z-index: {$elDepth * 10 + 1};">
						<!-- Background color style SPAN -->
						<span class="bgcolor{@background}">
							<!-- Foreground color style SPAN -->
							<span class="color{@foreground}">
								<xsl:choose>
									<xsl:when test="starts-with(., 'http://')">
										<a href="{.}" target="_blank">
                                            <xsl:value-of select="."/>
                                        </a>
									</xsl:when>
									<xsl:otherwise>
										<xsl:if test="@blink">
											<!-- Blink style SPAN -->
											<span class="blink">
												<xsl:if test="@underline">
													<!-- Underline style SPAN -->
													<span class="underline">
														<span style="staticText">
															<xsl:choose>
																<xsl:when test="@style">
																	<span style="{@style}">
																		<xsl:value-of select="."/>
																	</span>
																</xsl:when>
																<xsl:otherwise>
																	<xsl:value-of select="."/>
																</xsl:otherwise>
															</xsl:choose>
														</span>
													</span>
												</xsl:if>
												<xsl:if test="not(@underline)">
													<span style="staticText">
														<xsl:choose>
															<xsl:when test="@style">
																<span style="{@style}">
																	<xsl:value-of select="."/>
																</span>
															</xsl:when>
															<xsl:otherwise>
																<xsl:value-of select="."/>
															</xsl:otherwise>
														</xsl:choose>
													</span>
												</xsl:if>
											</span>
										</xsl:if>
										<xsl:if test="not(@blink)">
											<xsl:if test="@underline">
												<!-- Underline style SPAN -->
												<span class="underline">
													<span style="staticText">
														<xsl:choose>
															<xsl:when test="@style">
																<span style="{@style}">
																	<xsl:value-of select="."/>
																</span>
															</xsl:when>
															<xsl:otherwise>
																<xsl:value-of select="."/>
															</xsl:otherwise>
														</xsl:choose>
													</span>
												</span>
											</xsl:if>
											<xsl:if test="not(@underline)">
												<span style="staticText">
													<xsl:choose>
														<xsl:when test="@style">
															<span style="{@style}">
																<xsl:value-of select="."/>
															</span>
														</xsl:when>
														<xsl:otherwise>
															<xsl:value-of select="."/>
														</xsl:otherwise>
													</xsl:choose>
												</span>
											</xsl:if>
										</xsl:if>
									</xsl:otherwise>
								</xsl:choose>
							</span>
						</span>
					</span>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- TEMPLATE FIELD -->
	<xsl:template match="*[@type='field']">
		<xsl:param name="fieldSize">
			<xsl:variable name="sWidth" select="/document/@screenWidth"/>
			<xsl:if test="(@column + @size) &lt; $sWidth">
				<xsl:value-of select="@size"/>
			</xsl:if>
			<xsl:if test="(@column + @size) &gt;= $sWidth">
				<xsl:value-of select="$sWidth - @column"/>
			</xsl:if>
		</xsl:param>
		<xsl:param name="offsety"/>
		<xsl:param name="checkAutoEnter">
			<xsl:if test="(@autoenter)">true</xsl:if>
			<xsl:if test="(not(@autoenter))">false</xsl:if>
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
			<input id="focus" type="hidden" value="{@name}"/>
		</xsl:if>
		
		<xsl:choose>
			<!-- Case this is a selection field (F4) -->
			<xsl:when test="@foreground = 'cyan'">
				<!-- Container SPAN. Used only for positioning and framework behaviour -->
				<span id="{@name}_n1parent" style="position:absolute;          left:{(following-sibling::*[@type='field'][@line=./@line][@foreground='green']/@column + following-sibling::*[@type='field'][@line=./@line][@foreground='green']/@size + 2)*$coefx+$offsetx}px;          top:{./@line*$coefy + $offsety}px;         z-index: {$elDepth * 10 + 1};">
					<img alt="F4 for list" height="20" onclick="getId('__javelin_current_field').value = '{@name}'; currentFieldOnFocus = '{@name}'; doAction('KEY_PF4');" src="images/spec/loupe-01.png" width="20"/>
				</span>
			</xsl:when>
			<!-- Normal case -->
			<xsl:otherwise>
				<!-- Container SPAN. Used only for positioning and framework behaviour -->
				<span id="{@name}_n1parent" style="position:absolute;          left:{./@column*$coefx+$offsetx}px;          top:{./@line*$coefy + $offsety}px;         z-index: {$elDepth * 10 + 1};">
					<input class="fieldText" id="{@name}_n1" maxlength="{@size}" name="{@name}" ondblclick="doAction('KEY_ENTER',  {@name});" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name});" style="width: {$fieldSize*$coefx}px;" value="{.}">
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
			<span style="position:absolute;         left:{(./@column + ./@size + 2)*$coefx+$offsetx}px;         top:{./@line*$coefy + $offsety}px;        z-index: {$elDepth * 10 + 1};">
				<a href="#" id="email_{@name}">
						<img border="0" height="20" onmouseover="getId('email_{@name}').href='mailto:' + getId('{@name}_n1').value" src="images/spec/email.png" width="23"/>
				</a>
			</span>
		</xsl:if>
	</xsl:template>
	
	<!-- TEMPLATE VALUE FOR HISTORY -->
	<xsl:template match="value" mode="history">
		<option value="{.}">
			<xsl:value-of select="."/>
		</option>
	</xsl:template>

	<!-- TEMPLATE VALUE -->
	<xsl:template match="value"/>

	<!-- TEMPLATE DATE -->
	<xsl:template match="*[@type='date']">
		<xsl:param name="fieldSize">
			<xsl:variable name="sWidth" select="/document/@screenWidth"/>
			<xsl:if test="(@column + @size) &lt; $sWidth">
				<xsl:value-of select="@size"/>
			</xsl:if>
			<xsl:if test="(@column + @size) &gt;= $sWidth">
				<xsl:value-of select="$sWidth - @column"/>
			</xsl:if>
		</xsl:param>
		<xsl:param name="offsety"/>
		<xsl:param name="checkAutoEnter">
			<xsl:if test="(@autoenter)">true</xsl:if>
			<xsl:if test="(not(@autoenter))">false</xsl:if>
		</xsl:param>
		
		<xsl:if test="(@hasFocus ='true')">
			<input id="focus" type="hidden" value="{@name}"/>
		</xsl:if>
		
		<span id="{@name}parent" style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px">
			<input class="fixed" id="{@name}" maxlength="{@size}" name="{@name}" ondblclick="doAction('KEY_ENTER',  {@name})" onfocus="currentFieldOnFocus=this.id;onInputClick(this)" onkeyup="checkInputChars(event, {@size}, {$checkAutoEnter}, document.javelin_form.{@name})" size="{$fieldSize}" type="text" value="{.}"/>
    		</span>
	</xsl:template>


	<!-- TEMPLATE KEYWORD -->
	<xsl:template match="*[@type='keyword']">
		<xsl:param name="offsety"/>
		<xsl:param name="enable"/>
		
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
		
		<xsl:variable name="displayMe">
			<xsl:choose>
				<!-- Case this is not a 5250 extended button -->
				<xsl:when test="$enable = ''">
					<xsl:choose>
						<!-- Case project is parametered explicitly to display disabled buttons when outside of panels -->
						<xsl:when test="$DisplayDisabledButtons = 'true'">true</xsl:when>
						<!-- Normal case -->
						<xsl:otherwise>
							<xsl:choose>
								<!-- Case there is a panel in the screen and button is in the panel -->
								<xsl:when test="(/document/blocks/*/@type ='panel') and (ancestor::*/@type = 'panel')">false</xsl:when>
								<xsl:otherwise>true</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:when>
				<!-- Case this is a 5250 extended button -->
				<xsl:otherwise>
					<xsl:choose>
						<xsl:when test="$enable = 'true'">true</xsl:when>
						<xsl:otherwise>false</xsl:otherwise>
					</xsl:choose>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:if test="not(@foreground = @background)">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px; z-index: {$elDepth * 10 + 1};">
				<input id="{@name}" name="{@name}" type="button">
					<xsl:choose>
						<!-- Case the button was disabled -->
						<xsl:when test="$displayMe = 'false'">
							<xsl:attribute name="disabled">disabled</xsl:attribute>
							<xsl:attribute name="class">disabledKeywordButton</xsl:attribute>
						</xsl:when>
						<!-- Case the button is selectable -->
						<xsl:otherwise>
							<xsl:attribute name="class">keywordButton</xsl:attribute>
							<xsl:choose>
								<!-- Is this an help/F4/popup button ? -->
								<xsl:when test="(starts-with(., $helpKeywordString)) and (preceding-sibling::*[1][@type = 'field']/@line = ./@line)">
									<xsl:attribute name="onclick">
											document.javelin_form.<xsl:value-of select="preceding-sibling::*[1]/@name"/>.focus();
											currentFieldOnFocus='<xsl:value-of select="preceding-sibling::*[1]/@name"/>';
											doAction('<xsl:value-of select="@action"/>');
										</xsl:attribute>
								</xsl:when>
								<!-- Standard button -->
								<xsl:otherwise>
									<xsl:choose>
										<!-- Does this button trigger a transaction ? -->
										<xsl:when test="@dotransaction = 'true'">
											<xsl:attribute name="onclick">document.getElementById('__transaction').value='<xsl:value-of select="@action"/>'; doAction('');</xsl:attribute>
										</xsl:when>
										<!-- Is this a 5250 Extended button ? -->
										<xsl:when test="not($enable = '')">
											<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');</xsl:attribute>
										</xsl:when>
										<!-- Standard button onclick behaviour -->
										<xsl:otherwise>
											<xsl:attribute name="onclick">doAction('<xsl:value-of select="@action"/>');</xsl:attribute>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
					<xsl:choose>
						<!-- Display the action key (PF1=, PF14=, PA2=...) on the button -->
						<xsl:when test="$DisplayActionKey='true' and $enable = ''">
							<xsl:attribute name="value">
                                <xsl:value-of select="substring-after(@action, 'KEY_')"/>=<xsl:value-of select="."/>
                            </xsl:attribute>
						</xsl:when>
						<!-- Or not -->
						<xsl:otherwise>
							<xsl:attribute name="value">
                                <xsl:value-of select="."/>
                            </xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
				</input>
			</span>
		</xsl:if>
	</xsl:template>

	<!-- TEMPLATE SNAMENU -->
	<xsl:template match="*[@type='snamenu']">
		<xsl:for-each select="menu/menuitem">
			<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px">
				<a class="menuItem" href="javascript:doMenu('KEY_ENTER','{@id}')" style="line-height: {$coefy - 1}px">
					<xsl:value-of select="@id"/>.<xsl:value-of select="@literal"/>-<xsl:value-of select="@command"/>
				</a>
			</span>
		</xsl:for-each>
	</xsl:template>

	<!-- TEMPLATE PANEL -->
	<xsl:template match="*[@type='panel']">
		<xsl:param name="elDepth">
			<xsl:choose>
				<xsl:when test="@zOrder">
					<xsl:value-of select="10 - number(./@zOrder)"/>
				</xsl:when>
				<xsl:otherwise>
					0
				</xsl:otherwise>
			</xsl:choose>
		</xsl:param>
		<xsl:param name="offsety"/>
		<span style="width: {@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;      solid;       position:absolute;       left:{./@column*$coefx+$offsetx + 4}px;       top:{./@line*$coefy + $offsety+4}px;      z-index: {$elDepth * 10 - 1};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelOmbre</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelOmbre</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<span style="width:{@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;       position:absolute;       left:{./@column*$coefx + $offsetx}px;       top:{./@line*$coefy + $offsety}px;      z-index: {$elDepth * 10};">
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
		<span style="position:absolute;       left:{(number(./@column)+1)*$coefx + $offsetx}px;       top:{round((number(./@line) - 0.3)*$coefy + $offsety)}px;      z-index: {$elDepth * 10};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelTopTitle</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelTopTitle</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="./@topTitle"/>
		</span>
		<!-- Panel bottom title -->
		<span style="position:absolute;       left:{(number(./@column)+1)*$coefx + $offsetx}px;       top:{round((number(./@line) + number(./@height) - 0.3)*$coefy + $offsety)}px;">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelBottomTitle</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelBottomTitle</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
			<xsl:value-of select="./@bottomTitle"/>
		</span>
		<xsl:apply-templates>
			<xsl:with-param name="offsety" select="$offsety"/>
		</xsl:apply-templates>
	</xsl:template>

	
	<!-- TEMPLATE TABLE -->
	<xsl:template match="table[@type='table']">
		<xsl:param name="offsety"/>
		<xsl:variable name="tableTop">
			<xsl:choose>
				<xsl:when test="./actionsTableX">
					<xsl:value-of select="./@line - ./@titleheight - ./@offset + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="./@line - ./@titleheight - ./@offset"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Main container -->
		<div class="Grid" style="border-left: solid 1px #0099cc;      border-bottom: solid 1px #0099cc;       position: absolute;       left: {@column * $coefx + $offsetx}px;       top: {$tableTop * $coefy + $offsety}px;      width: {@width * $coefx}px;">
			<!-- Titles table -->
			<table border="0" cellpadding="0" cellspacing="0" style="border-top: solid 1px #0099cc;         border-right: solid 1px #0099cc;         width: {@width * $coefx}px;">
				<tr>
					<xsl:apply-templates select="row/Title"/>
				</tr>
			</table>
			<xsl:choose>
				<!-- Data table when number of rows (including title row) is greater than table height -->
				<xsl:when test="count(row) &gt; @height">
					<div id="_ScRoLl_" style="overflow-y: auto;          overflow-x: visible;         width:{@width * $coefx + $scrollwidth}px;          height: {(@height - 0) * $coefy + 1}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data" style="width: {@width * $coefx}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:when>
				<!-- Data table when number of rows (including title row) is equal or lower than table height -->
				<xsl:otherwise>
					 <div id="_ScRoLl_" style="overflow: visible;         width:{@width * $coefx}px;          height: {(count(row) - 1) * $coefy + 2}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data" style="width: {round(@width * $coefx)}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:otherwise>
			</xsl:choose>				
		</div>
		<!-- Table icons (page up/down, sort type... -->
		<!--<span style="position:absolute;
				left:{round((@column + 1 + @width)*$coefx+$offsetx - $iconSize)}px;
		 		top:{round((@line - @titleheight)*$coefy + $offsety - $iconSize)}px;
		 		width: {5*$iconSize}px;">
		 <span style="position:absolute;
				left:{round((@column + 2 + @width)*$coefx+$offsetx)}px;
		 		top:{round((@line - @titleheight)*$coefy + $offsety)}px;
		 		width: {1*$iconSize}px;">
			<xsl:if test="$sortDataType = 'text'">
				<img src="images/sort_text.gif" alt=""  onclick="onDataSortClic('number')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Sort by number"/>			
			</xsl:if>
			<xsl:if test="not($sortDataType = 'text')">
				<img src="images/sort_num.gif" alt=""  onclick="onDataSortClic('text')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Sort by text"/>
			</xsl:if>
			<img src="images/unsort.gif" alt=""  onclick="onUnsortClic()" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Undo Sort"/>
			<img src="../../images/hide.gif" alt=""  onclick="doAction('KEY_ROLLUP')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Page Up" style="cursor: pointer;"/>
			<br/><br/><img src="../../images/show.gif" alt=""  onclick="doAction('KEY_ROLLDOWN')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Page Down" style="cursor: pointer;"/>
			<img src="../../images/refresh.gif" alt=""  onclick="doAction('KEY_ROLLUP')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Extract"/>
		</span>-->
	
		<xsl:apply-templates select="actionsTable"/>
	</xsl:template>

	<!-- TEMPLATE ROW -->
	<xsl:template match="row" priority="1">
		<tr>
			<xsl:if test="../actionsTable">
				<!--xsl:attribute name="ondblclick">
					document.getElementById('<xsl:value-of select="*[1]/@name"/>').value = <xsl:value-of select="../actionsTable/action[1]/@char"/>;
					<xsl:if test="../actionsTable/action[1]/@key != 'null'">
						doAction('<xsl:value-of select="../actionsTable/action[1]/@key"/>');
					</xsl:if>
					return false;
				</xsl:attribute-->
				<xsl:attribute name="ondblclick">getCurrentRowXml('<xsl:value-of select="../@column"/>', '<xsl:value-of select="../@line"/>', '<xsl:value-of select="./@index"/>', '|');</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="(position() mod 2) = 0">
				<xsl:attribute name="class">dataroweven</xsl:attribute>
			</xsl:if>
			<xsl:if test="(position() mod 2) != 0">
				<xsl:attribute name="class">datarowodd</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="onmouseover">
				over_tr(this)
			</xsl:attribute>
			<xsl:attribute name="onmouseout">
				over_tr(this)
			</xsl:attribute>			
			<xsl:for-each select="child::*">
				<xsl:variable name="index" select="position()"/>
				<td class="cell" style="width:{round(../../row[1]/Title[$index]/@size * $coefx)}px; height: {round($coefy)}px">
					<xsl:choose>
						<!-- Cell content when it is a field -->
						<xsl:when test="@type = 'field'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<xsl:choose>
									<xsl:when test="name() = 'X'">
										<img onclick="getId('__javelin_current_field').value = '{@name}'; currentFieldOnFocus = '{@name}'; doAction('KEY_ENTER');" src="images/spec/selectarrow.png" style="cursor: pointer;"/>
									</xsl:when>
									<xsl:otherwise>
										<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" style="width: {@size*$coefx}px;" type="text" value="{.}">
												
											<xsl:choose>
												<xsl:when test="@columnSelection = 'true'">
													<xsl:attribute name="onclick">show_mySelectMenu(event, this, document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
													<!--xsl:attribute name="onblur">hide_mySelectMenu2(document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'))</xsl:attribute-->
												</xsl:when>
												<xsl:otherwise>
													<xsl:attribute name="onkeyup">checkInputChars(event, <xsl:value-of select="@size"/>, false, document.javelin_form.<xsl:value-of select="@name"/>);</xsl:attribute>
												</xsl:otherwise>
											</xsl:choose>
										</input>
									</xsl:otherwise>
								</xsl:choose>
							</span>
						</xsl:when>
						<!-- Cell content when it is a date field -->
						<xsl:when test="@type = 'date'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInputChars(event, {@size}, false, document.javelin_form.{@name});" style="width: {@size*$coefx}px;" type="text" value="{.}"/>
							</span>
						</xsl:when>
						<!-- Cell content when it is a choice -->
						<xsl:when test="(@type = &quot;choice&quot;)">
							<select class="fixed" id="{@name}" name="{@name}" onfocus="currentFieldOnFocus=this.id">
								<xsl:for-each select="child::*">
									<option value="{@action}">
										<xsl:if test="(@selected = 'true')">
											<xsl:attribute name="selected">
												selected
											</xsl:attribute>
										</xsl:if>
										<xsl:value-of select="@value"/>
									</option>
								</xsl:for-each>
							</select>
							<xsl:if test="(@hasFocus ='true')">
								<script language="javascript" type="text/javascript">
									var elt = document.getElementsByTagName("SELECT");
									if(elt['<xsl:value-of select="@name"/>'])
										focusOnField = elt['<xsl:value-of select="@name"/>'];
								</script>
							</xsl:if>
						</xsl:when>
						<!-- Default Cell content (static...) -->
						<xsl:otherwise>
							<!-- Use this to force right-align numbers in cells -->
							<!--xsl:if test="number(translate(.,',.','.0'))=number(translate(.,',.','.0'))">
								<xsl:attribute name="align">right</xsl:attribute>
							</xsl:if-->
							<xsl:if test="string-length(.) = 0"> </xsl:if>
							<xsl:if test="string-length(.) != 0">
								<!-- Container SPAN. Used only for positioning and framework behaviour -->
								<span onclick="spanClick(this, {@column}, {@line})" ondblclick="spanClick(this, {@column}, {@line}); doAction('KEY_ENTER');" style="white-space: nowrap">
									<!-- Background color style SPAN -->
									<span class="bgcolor{@background}">
										<!-- Foreground color style SPAN -->
										<span class="color{@foreground}">
											<span class="tableText">
												<xsl:value-of select="."/> 
											</span>
										</span>
									</span>
								</span>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
		</tr>
	</xsl:template>

	<!-- TEMPLATE TITLE -->
	<xsl:template match="Title" priority="1">
		<td class="datatitle" onclick="onSortClicTD({position()})" style="width:{round(@size * $coefx)}px;height:{../../@titleheight * $coefy}px;" valign="center">
			<xsl:if test="string-length(.) = 0"> </xsl:if>
			<xsl:if test="string-length(.) != 0">
				<xsl:for-each select="block">
					<span class="datatitle">
						<xsl:value-of select="."/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</span>
				</xsl:for-each>
			</xsl:if>
			<img alt="" id="CoLiMg{position()}" src="images/ascending_sug.gif"/>
		</td>
	</xsl:template>

	<!-- TEMPLATE ACTIONSTABLE -->
	<xsl:template match="actionsTable" priority="1">
		<div class="actDiv" id="act_c{../@column}_l{../@line}" origheight="{count(action)*$coefy}px" style="height: {count(action)*$coefy}px; z-index:12; overflow-y:scroll; overflow-x:hidden;">
			<img alt="Fermer" height="8" onclick="hide_mySelectMenu(document.getElementById('act_c{../@column}_l{../@line}'));" src="images/croix.gif" width="8"/>
			<table cellpadding="0" cellspacing="0">
				<xsl:for-each select="./action">
					<tr>
						<td class="menuitems" onMouseout="lowlight(this);" onmouseover="highlight(this);">
							<xsl:choose>
								<xsl:when test="@key = 'null'">
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>')); return doAction('<xsl:value-of select="@key"/>');</xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:value-of select="@label"/>
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</div>
	</xsl:template>


	
	<!-- TEMPLATE TABLE -->
	<xsl:template match="tablex[@type='table']">
		<xsl:param name="offsety"/>
		<xsl:variable name="tableTop">
			<xsl:choose>
				<xsl:when test="./actionsTableX">
					<xsl:value-of select="./@line - ./@titleheight - ./@offset + 1"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="./@line - ./@titleheight - ./@offset"/>
				</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<!-- Main container -->
		<div class="Grid" style="border-left: solid 1px #0099cc;      border-bottom: solid 1px #0099cc;       position: absolute;       left: {@column * $coefx + $offsetx}px;       top: {$tableTop * $coefy + $offsety}px;      width: {@width * $coefx}px;">
			<!-- Titles table -->
			<table border="0" cellpadding="0" cellspacing="0" style="border-top: solid 1px #0099cc;         border-right: solid 1px #0099cc;         width: {@width * $coefx}px;">
				<tr>
					<xsl:apply-templates select="row/Title"/>
				</tr>
			</table>
			<xsl:choose>
				<!-- Data table when number of rows (including title row) is greater than table height -->
				<xsl:when test="count(row) &gt; @height">
					<div id="_ScRoLl_" style="overflow-y: auto;          overflow-x: visible;         width:{@width * $coefx + $scrollwidth}px;          height: {(@height - 0) * $coefy + 1}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data" style="width: {@width * $coefx}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:when>
				<!-- Data table when number of rows (including title row) is equal or lower than table height -->
				<xsl:otherwise>
					 <div id="_ScRoLl_" style="overflow: visible;         width:{@width * $coefx}px;          height: {(count(row) - 1) * $coefy + 2}px;">
						<table border="0" cellpadding="0" cellspacing="0" class="data" style="width: {round(@width * $coefx)}px;">
							<xsl:choose>
								<xsl:when test="$doSort = 'true'">
									<xsl:if test="$sortDataType = 'number'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="translate(child::*[position()=$sortColon],',','.')"/>
										</xsl:apply-templates>
									</xsl:if>
									<xsl:if test="$sortDataType = 'text'">
										<xsl:apply-templates select="row[position() &gt; 1]">
											<xsl:sort data-type="{$sortDataType}" order="{$sortOrder}" select="child::*[position()=$sortColon]"/>
										</xsl:apply-templates>
									</xsl:if>						
								</xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="row[position() &gt; 1]"/>
								</xsl:otherwise>
							</xsl:choose>
						</table>
					</div>
				</xsl:otherwise>
			</xsl:choose>				
		</div>
		<!-- Table icons (page up/down, sort type... -->
		<span style="position:absolute;     left:{round((@column + 2 + @width)*$coefx+$offsetx)}px;      top:{round((@line - @titleheight)*$coefy + $offsety)}px;      width: {1*$iconSize}px;">
			<!--xsl:if test="$sortDataType = 'text'">
				<img src="images/sort_text.gif" alt=""  onclick="onDataSortClic('number')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Sort by number"/>			
			</xsl:if>
			<xsl:if test="not($sortDataType = 'text')">
				<img src="images/sort_num.gif" alt=""  onclick="onDataSortClic('text')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Sort by text"/>
			</xsl:if>
			<img src="images/unsort.gif" alt=""  onclick="onUnsortClic()" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Undo Sort"/-->
			<img alt="" onclick="doAction('KEY_ROLLUP')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="images/hide.gif" style="cursor: pointer;" title="Page Up"/>
			<br/>
            <br/>
            <img alt="" onclick="doAction('KEY_ROLLDOWN')" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="images/show.gif" style="cursor: pointer;" title="Page Down"/>
			<br/>
            <br/>
            <img alt="" onclick="window.open('datascsv.xls', '_blank');" onmouseout="tooltip.hide(this)" onmouseover="tooltip.show(this)" src="images/spec/excel.png" style="cursor: pointer;" title="Excel export"/>
			<!--img src="../../images/refresh.gif" alt=""  onclick="doAction('KEY_ROLLUP')" onmouseover="tooltip.show(this)" onmouseout="tooltip.hide(this)" title="Extract"/-->
		</span>
	
		<xsl:apply-templates select="actionsTable"/>
	</xsl:template>

	<!-- TEMPLATE ROW -->
	<xsl:template match="row" priority="1">
		<tr>
			<xsl:if test="../actionsTable">
				<!--xsl:attribute name="ondblclick">
					document.getElementById('<xsl:value-of select="*[1]/@name"/>').value = <xsl:value-of select="../actionsTable/action[1]/@char"/>;
					<xsl:if test="../actionsTable/action[1]/@key != 'null'">
						doAction('<xsl:value-of select="../actionsTable/action[1]/@key"/>');
					</xsl:if>
					return false;
				</xsl:attribute-->
				<xsl:attribute name="ondblclick">getCurrentRowXml('<xsl:value-of select="../@column"/>', '<xsl:value-of select="../@line"/>', '<xsl:value-of select="./@index"/>', '|');</xsl:attribute>
			</xsl:if>
			
			<xsl:if test="(position() mod 2) = 0">
				<xsl:attribute name="class">dataroweven</xsl:attribute>
			</xsl:if>
			<xsl:if test="(position() mod 2) != 0">
				<xsl:attribute name="class">datarowodd</xsl:attribute>
			</xsl:if>
			<xsl:attribute name="onmouseover">
				over_tr(this)
			</xsl:attribute>
			<xsl:attribute name="onmouseout">
				over_tr(this)
			</xsl:attribute>			
			<xsl:for-each select="child::*">
				<xsl:variable name="index" select="position()"/>
				<td class="cell" style="width:{round(../../row[1]/Title[$index]/@size * $coefx)}px; height: {round($coefy)}px">
					<xsl:choose>
						<!-- Cell content when it is a field -->
						<xsl:when test="@type = 'field'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<xsl:choose>
									<xsl:when test="name() = 'X'">
										<img onclick="getId('__javelin_current_field').value = '{@name}'; currentFieldOnFocus = '{@name}'; doAction('KEY_ENTER');" src="images/spec/selectarrow.png" style="cursor: pointer;"/>
									</xsl:when>
									<xsl:otherwise>
										<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" style="width: {@size*$coefx}px;" type="text" value="{.}">
												
											<xsl:choose>
												<xsl:when test="@columnSelection = 'true'">
													<xsl:attribute name="onclick">show_mySelectMenu(event, this, document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
													<!--xsl:attribute name="onblur">hide_mySelectMenu2(document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'))</xsl:attribute-->
												</xsl:when>
												<xsl:otherwise>
													<xsl:attribute name="onkeyup">checkInputChars(event, <xsl:value-of select="@size"/>, false, document.javelin_form.<xsl:value-of select="@name"/>);</xsl:attribute>
												</xsl:otherwise>
											</xsl:choose>
										</input>
									</xsl:otherwise>
								</xsl:choose>
							</span>
						</xsl:when>
						<!-- Cell content when it is a date field -->
						<xsl:when test="@type = 'date'">
							<xsl:attribute name="align">center</xsl:attribute>
							<xsl:if test="(@hasFocus ='true')">
								<input id="focus" type="hidden" value="{@name}"/>
							</xsl:if>
							<!-- Container SPAN. Used only for framework behaviour -->
							<span id="{@name}_n{../@page}parent">
								<input class="fieldText" id="{@name}_n{../@page}" maxlength="{@size}" name="{@name}" onfocus="getCurrentRowXml('{../../@column}', '{../../@line}', '{../@index}', '|'); currentFieldOnFocus=this.id; onInputClick(this);" onkeyup="checkInputChars(event, {@size}, false, document.javelin_form.{@name});" style="width: {@size*$coefx}px;" type="text" value="{.}"/>
							</span>
						</xsl:when>
						<!-- Cell content when it is a choice -->
						<xsl:when test="(@type = &quot;choice&quot;)">
							<select class="fixed" id="{@name}" name="{@name}" onfocus="currentFieldOnFocus=this.id">
								<xsl:for-each select="child::*">
									<option value="{@action}">
										<xsl:if test="(@selected = 'true')">
											<xsl:attribute name="selected">
												selected
											</xsl:attribute>
										</xsl:if>
										<xsl:value-of select="@value"/>
									</option>
								</xsl:for-each>
							</select>
							<xsl:if test="(@hasFocus ='true')">
								<script language="javascript" type="text/javascript">
									var elt = document.getElementsByTagName("SELECT");
									if(elt['<xsl:value-of select="@name"/>'])
										focusOnField = elt['<xsl:value-of select="@name"/>'];
								</script>
							</xsl:if>
						</xsl:when>
						<!-- Default Cell content (static...) -->
						<xsl:otherwise>
							<!-- Use this to force right-align numbers in cells -->
							<!--xsl:if test="number(translate(.,',.','.0'))=number(translate(.,',.','.0'))">
								<xsl:attribute name="align">right</xsl:attribute>
							</xsl:if-->
							<xsl:if test="string-length(.) = 0"> </xsl:if>
							<xsl:if test="string-length(.) != 0">
								<!-- Container SPAN. Used only for positioning and framework behaviour -->
								<span onclick="spanClick(this, {@column}, {@line})" ondblclick="spanClick(this, {@column}, {@line}); doAction('KEY_ENTER');" style="white-space: nowrap">
									<!-- Background color style SPAN -->
									<span class="bgcolor{@background}">
										<!-- Foreground color style SPAN -->
										<span class="color{@foreground}">
											<span class="tableText">
												<xsl:value-of select="."/> 
											</span>
										</span>
									</span>
								</span>
							</xsl:if>
						</xsl:otherwise>
					</xsl:choose>
				</td>
			</xsl:for-each>
		</tr>
	</xsl:template>

	<!-- TEMPLATE TITLE -->
	<xsl:template match="Title" priority="1">
		<td class="datatitle" onclick="onSortClicTD({position()})" style="width:{round(@size * $coefx)}px;height:{../../@titleheight * $coefy}px;" valign="center">
			<xsl:if test="string-length(.) = 0"> </xsl:if>
			<xsl:if test="string-length(.) != 0">
				<xsl:for-each select="block">
					<span class="datatitle">
						<xsl:value-of select="."/>
						<xsl:if test="position() != last()">
							<br/>
						</xsl:if>
					</span>
				</xsl:for-each>
			</xsl:if>
			<img alt="" id="CoLiMg{position()}" src="images/ascending_sug.gif"/>
		</td>
	</xsl:template>

	<!-- TEMPLATE ACTIONSTABLE -->
	<xsl:template match="actionsTable" priority="1">
		<div class="actDiv" id="act_c{../@column}_l{../@line}" origheight="{count(action)*$coefy}px" style="height: {count(action)*$coefy}px; z-index:12; overflow-y:scroll; overflow-x:hidden;">
			<img alt="Fermer" height="8" onclick="hide_mySelectMenu(document.getElementById('act_c{../@column}_l{../@line}'));" src="images/croix.gif" width="8"/>
			<table cellpadding="0" cellspacing="0">
				<xsl:for-each select="./action">
					<tr>
						<td class="menuitems" onMouseout="lowlight(this);" onmouseover="highlight(this);">
							<xsl:choose>
								<xsl:when test="@key = 'null'">
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>'));</xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="onclick">updateDataInObjSelected('<xsl:value-of select="@char"/>', document.getElementById('act_c<xsl:value-of select="../../@column"/>_l<xsl:value-of select="../../@line"/>')); return doAction('<xsl:value-of select="@key"/>');</xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
							<xsl:value-of select="@label"/>
						</td>
					</tr>
				</xsl:for-each>
			</table>
		</div>
	</xsl:template>


	<!-- TEMPLATE CHOICE TEST-->
	<xsl:template match="*[@type='choice']" priority="1">
		<xsl:param name="fieldSize">
			<xsl:value-of select="@size"/>
		</xsl:param>
		<xsl:param name="offsety"/>
		<xsl:if test="@radio = 'true'">
			<input class="fixed" id="{@name}" maxlength="{@size}" name="{@name}" onfocus="currentFieldOnFocus=this.id" size="{@size}" style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px" value="{.}"/>
			<span class="panel" style="position:absolute; left:{(@column+@size+1)*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px">
				<xsl:for-each select="child::*">
					<xsl:if test="@selected = 'true'">
						<input checked="true" id="{../@name}_r" name="{../@name}_r" onclick="document.javelin_form.{../@name}.value = '{@value}'" type="radio" value="{@value}"/>
						<xsl:value-of select="@value"/>
						 
					</xsl:if>
					<xsl:if test="string-length(@selected) = 0">
						<input id="{../@name}_r" name="{../@name}_r" onclick="document.javelin_form.{../@name}.value = '{@value}'" type="radio" value="{@value}"/>
						<xsl:value-of select="@value"/>
						 
					</xsl:if>
				</xsl:for-each>
			</span>
			<xsl:if test="(@hasFocus ='true')">
				<script language="javascript" type="text/javascript">
					var elt= document.getElementsByTagName("INPUT");
					if(elt['<xsl:value-of select="@name"/>']) focusOnField = elt['<xsl:value-of select="@name"/>'];
				</script>
			</xsl:if>
		</xsl:if>
		<xsl:if test="@radio = 'false'">
			<select class="fixed" id="{@name}" name="{@name}" onfocus="currentFieldOnFocus=this.id" style="position:absolute; left:{@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px">
				<xsl:for-each select="child::*">
					<option value="{@action}">
						<xsl:if test="(@selected = 'true')">
							<xsl:attribute name="selected">selected</xsl:attribute>
						</xsl:if>
						<xsl:value-of select="@value"/>
					</option>
				</xsl:for-each>
			</select>
			<xsl:if test="(@hasFocus ='true')">
				<script language="javascript" type="text/javascript">
					var elt= document.getElementsByTagName("SELECT");
					if(elt['<xsl:value-of select="@name"/>']) focusOnField = elt['<xsl:value-of select="@name"/>'];
				</script>
			</xsl:if>
		</xsl:if>
	</xsl:template>

	<!-- TEMPLATE SEPARATOR -->
	<xsl:template match="*[@type='separator']" priority="1">
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety + 8}px; z-index: -1;">
			<hr style="width: {@width*$coefx}px;"/>
		</span>
	</xsl:template>

	<!-- TEMPLATE SLIDER -->
	<xsl:template match="*[@type='slider']">
		<xsl:param name="offsety"/>
		<!-- Top arrow -->
			<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {./@line*$coefy + $offsety}px;">
				<img onclick="doAction('KEY_ROLLUP');" src="images/slider-arrow-top.gif" style="position:absolute;        width: {$coefx + 2}px;         height: {$coefy}px;"/>
			</span>
		<!-- Bottom arrow -->
		<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {(number(./@line)+number(./@height)-1)*$coefy + $offsety}px;">
			<img onclick="doAction('KEY_ROLLDOWN');" src="images/slider-arrow-bottom.gif" style="width: {$coefx + 2}px;        height: {$coefy}px;"/>
		</span>
		<!-- Empty bar -->
		<span style="position:absolute;       left: {./@column*$coefx + $offsetx - 1}px;        top: {(number(./@line)+1)*$coefy + $offsety}px;       width: {$coefx + 2}px;       height: {(number(@height)-2)*$coefy}px;       background-color: #D4D4D4;">
		</span>
		<!-- Selection bar -->
		<span style="position:absolute;       left: {((number(./@column) - 0)*$coefx) + $offsetx}px;        top: {(number(./@line)+1+number(./@sliderPos))*$coefy + $offsety}px;       width: {$coefx - 2}px;       height: {(number(./@sliderSize)-1)*$coefy}px;       border: solid 1px #909090;       background-color : #D4D0C8;">
		</span>
	</xsl:template>

	<!-- TEMPLATE TAB BOX -->
	<xsl:template match="*[@type='tabBox']">
		<xsl:param name="offsety"/>
		<div style="position:absolute;      left:{./@column*$coefx+$offsetx}px;      top:{./@line*$coefy + $offsety + 1}px;      width: {./@width*$coefx}px;      margin: 0px;      z-index: 0;">
					<table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; height: {@height*$coefy}px;">
						<tbody>
							<tr>
								<xsl:for-each select="tabBox/*[@type='tabBoxItem']">
									<td class="tabSpacer"> </td>
									<xsl:choose>
										<xsl:when test="./@selected = 'true'">
											<td class="selectedTab"> <xsl:value-of select="."/> </td>
										</xsl:when>
										<xsl:otherwise>
											<td class="unselectedTab" onclick="currentFieldOnFocus='__field_c{./@column}_l{./@line}'; doAction('KEY_NPTUI');"> <xsl:value-of select="."/> </td>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:for-each>
								<td class="tabSpacer" width="100%"> </td>
							</tr>
							<tr style="height: 100%">
								<td class="openedTab" colspan="{count(tabBox/block)*2 + 1}"> </td>
							</tr>
						</tbody>
					</table>
			</div>
			<xsl:apply-templates select="*[name() != 'tabBox']">
				<xsl:with-param name="offsety" select="$offsety"/>
		</xsl:apply-templates>
	</xsl:template>	

	<!-- TEMPLATE IMAGE -->
	<xsl:template match="*[@type='image']" priority="1">
		<span style="position:absolute; left:{./@column*$coefx+$offsetx}px; top:{./@line*$coefy + $offsety}px;">
			<img alt="{@alt}" src="{@url}">
				<xsl:if test="@width">
					<xsl:attribute name="width">
                        <xsl:value-of select="@width*$coefx"/>
                    </xsl:attribute>
					<xsl:attribute name="height">
                        <xsl:value-of select="@height*$coefy"/>
                    </xsl:attribute>
				</xsl:if>
				<xsl:if test="@action">
					<xsl:attribute name="style">cursor: hand;</xsl:attribute>
					<xsl:choose>
						<xsl:when test="@dotransaction='true'">
							<xsl:attribute name="onclick">document.getElementById('__transaction').value='<xsl:value-of select="@action"/>'; doAction('');</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="onclick">doAction('<xsl:value-of select="@action"/>');</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:if>
			</img>
		</span>
	</xsl:template>

	
	<!-- TEMPLATE BUTTONS PANEL -->
	<xsl:template match="*[@type='buttonsPanel']">
		<xsl:param name="offsety"/>
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
		
		
			<xsl:apply-templates>
				<xsl:with-param name="offsety" select="$offsety + ancestor::blocks[1]/@page-number * $coefy * 24"/>
				<xsl:with-param name="elDepth">
                <xsl:value-of select="$elDepth"/>
            </xsl:with-param>
				<!-- There is a panel in the screen. We only display buttons that are in that panel -->
				<xsl:with-param name="enable">
				<xsl:choose>
					<xsl:when test="@shadow = 'true'">false</xsl:when>
					 <xsl:otherwise>true</xsl:otherwise>
				</xsl:choose>
				</xsl:with-param>
			</xsl:apply-templates>
	</xsl:template>
	

	
	<!-- TEMPLATE RADIO PANEL -->
	<xsl:template match="*[@type='radioPanel']">
		<xsl:param name="offsety"/>
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
		
		<xsl:for-each select="./item[not(@value = '')]">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span id="radio__field_c{./@column}_l{./@line}_n1parent" style="position: absolute;       top: {@line*$coefy + $offsety}px;       left: {(@column)*$coefx + $offsetx}px;       z-index: {$elDepth * 10 + 1};">
				<input id="radio__field_c{./@column}_l{./@line}_n1" name="radio__field_c{../@column}_l{../@line}" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" type="radio" value="{./@value}">
					<!-- Disable radio button if radioPanel is shadowed -->
					<xsl:if test="../@shadow = 'true'">
						<xsl:attribute name="disabled">disabled</xsl:attribute>
					</xsl:if>
					<xsl:choose>
						<xsl:when test="@selected='true'">
							<xsl:attribute name="checked">checked</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="../@autoEnter = 'true'">
									<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');</xsl:attribute>
								</xsl:when>
								<xsl:otherwise>
									<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('');</xsl:attribute>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</input>
				<!-- Background color style SPAN for label -->
				<span class="bgcolor{./@background}">
					<!-- Foreground color style SPAN -->
					<span class="color{./@foreground}">
						<xsl:value-of select="@value"/>
					</span>
				</span>
			</span>
			<xsl:if test="(@hasFocus ='true')">
				<input id="focus" type="hidden" value="radio__field_c{./@column}_l{./@line}"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<!-- TEMPLATE CHECKBOXES PANEL -->
	<xsl:template match="*[@type='checkboxesPanel']">
		<xsl:param name="offsety"/>
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
				
		<xsl:for-each select="./item">
			<!-- Container SPAN. Used only for positioning and framework behaviour -->
			<span id="checkbox__field_c{./@column}_l{./@line}_n1parent" style="position: absolute;         top: {./@line*$coefy + $offsety}px;          left: {./@column*$coefx + $offsetx}px;         z-index: {$elDepth * 10 + 1};">
				<input id="checkbox__field_c{./@column}_l{./@line}_n1" onfocus="currentFieldOnFocus=this.id; onInputClick(this);" type="checkbox">
					<xsl:choose>
						<xsl:when test="../@autoEnter = 'true'">
							<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('KEY_NPTUI');</xsl:attribute>
						</xsl:when>
						<xsl:otherwise>
							<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="@column+2"/>_l<xsl:value-of select="@line"/>'; doAction('');</xsl:attribute>
						</xsl:otherwise>
					</xsl:choose>
					<!-- Hide shadowed checkboxes -->
					<xsl:if test="../@shadow = 'true'">
						<xsl:attribute name="disabled">disabled</xsl:attribute>
					</xsl:if>
					<xsl:if test="@checked='true'">
						<xsl:attribute name="checked">checked</xsl:attribute>
					</xsl:if>
				</input>
				<!-- Background color style SPAN for label -->
				<span class="bgcolor{./@background}">
					<!-- Foreground color style SPAN -->
					<span class="color{./@foreground}">
						<xsl:value-of select="."/>
					</span>
				</span>
			</span>
			<xsl:if test="@hasFocus ='true'">
				<input id="focus" type="hidden" value="checkbox__field_c{./@column}_l{./@line}"/>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	
	<!-- TEMPLATE BUTTONS PANEL -->
	<xsl:template match="*[@type='menu']">
		<xsl:param name="offsety"/>
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
				<xsl:with-param name="offsety" select="$offsety + ancestor::blocks[1]/@page-number * $coefy * 24"/>
				<xsl:with-param name="extended">true</xsl:with-param>
				<xsl:with-param name="elDepth">
                    <xsl:value-of select="$elDepth"/>
                </xsl:with-param>
			</xsl:apply-templates>
		</xsl:if>
	</xsl:template>
	
	<!-- TEMPLATE MENUITEM -->
	<xsl:template match="*[@type='menuItem']">
		<xsl:param name="offsety"/>
		<xsl:param name="elDepth"/>
		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		<span style=" position:absolute;        left:{./@column*$coefx+$offsetx}px;        top:{./@line*$coefy + $offsety}px;       z-index: {$elDepth * 10 + 1};">
			<input class="keywordButtonEx" id="{@name}" name="{@name}" type="button" value="{@value}">
				<xsl:attribute name="onclick">currentFieldOnFocus='__field_c<xsl:value-of select="./@column"/>_l<xsl:value-of select="./@line"/>'; doAction('NPTUI');</xsl:attribute>
			</input>
		</span>
	</xsl:template>

	<!-- TEMPLATE CONTAINER FOR MENUS -->
	<xsl:template match="menu[@type='container']">
		<xsl:param name="elDepth">0</xsl:param>
		<xsl:param name="offsety"/>
		<span style="width: {@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;       solid;       position:absolute;       left:{./@column*$coefx+$offsetx + 4}px;       top:{./@line*$coefy + $offsety+4}px;      z-index: {$elDepth * 10 - 1};">
			<xsl:choose>
				<xsl:when test="@shadow = 'true'">
					<xsl:attribute name="class">disabledPanelOmbre</xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="class">panelOmbre</xsl:attribute>
				</xsl:otherwise>
			</xsl:choose>
		</span>
		<span style="width:{@width*$coefx+$offsetw}px;       height:{@height*$coefy+$offseth}px;       position:absolute;       left:{./@column*$coefx + $offsetx}px;       top:{./@line*$coefy + $offsety}px;      z-index: {$elDepth * 10};">
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
		<span style="position:absolute;       left:{(number(./@column)+1)*$coefx + $offsetx}px;       top:{round((number(./@line) - 0.3)*$coefy + $offsety)}px;      z-index: {$elDepth * 10};">
			<xsl:attribute name="class">panelTopTitle</xsl:attribute>
			<xsl:value-of select="@name"/>
		</span>
		<xsl:for-each select="block[@foreground = 'white']">
			<xsl:call-template name="menuItem">
				<xsl:with-param name="offsety" select="$offsety"/>
				<xsl:with-param name="offsetx" select="$offsetx"/>
				<xsl:with-param name="elDepth" select="$elDepth"/>
				<xsl:with-param name="column" select="preceding-sibling::block[@foreground = 'green']/@column"/>
				<xsl:with-param name="code" select="preceding-sibling::block[@foreground = 'green']"/>
			</xsl:call-template>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template name="menuItem">
		<xsl:param name="offsety"/>
		<xsl:param name="offsetx"/>
		<xsl:param name="elDepth"/>
		<xsl:param name="column"/>
		<xsl:param name="code"/>
		<!-- Container SPAN. Used only for positioning and framework behaviour -->
		 <span onclick="getId('{//actionField/@name}').value='{$code}'; doAction('KEY_ENTER');" style="position:absolute;        left:{$column*$coefx+$offsetx}px;        top:{./@line*$coefy + $offsety}px;        white-space: nowrap;        z-index: {$elDepth * 10 + 1};       cursor: pointer;       text-decoration: underline;">
			<!-- Foreground color style SPAN -->
			<span class="colorwhite">
				<span style="staticText">
					<xsl:value-of select="."/>
				</span>
			</span>
		</span>
	</xsl:template>
</xsl:stylesheet>
