<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output method="html" indent="no" media-type="text/html" encoding="UTF-8" />

	<!-- Convertigo System Includes -->
	<xsl:include href="../../xsl/status.xsl" />
	<xsl:include href="variables.xsl" />

	<xsl:param name="doSort">false</xsl:param>
	<xsl:param name="sortColon">-1</xsl:param>	
	<xsl:param name="sortDataType">text</xsl:param>		
	<xsl:param name="sortOrder">ascending</xsl:param>

	<!-- TEMPLATE DOCUMENT -->
	<xsl:template match="error">
		<!--  these two inputs are generated to hold the screen Dimension !-->
		<input type="hidden" id="screenWidth" value= "{@screenWidth}" />
		<input type="hidden" id="screenHeight" value= "{@screenHeight}" />

		<input type="hidden" id="resize" value= "{$resize}" />
		<input type="hidden" id="coefx" value= "{$coefx}" />
		<input type="hidden" id="coefy" value= "{$coefy}" />
		<input type="hidden" id="offsetx" value= "{$offsetx}" />
		<input type="hidden" id="offsetr" value= "{$offsetr}" />
		<input type="hidden" id="offsety" value= "{$offsety}" />
		<input type="hidden" id="scrollwidth" value= "{$scrollwidth}" />

		<xsl:call-template name="generate-page" />
	</xsl:template>

	<xsl:template name="generate-page">
		<div id="generated_page">
			<span style	="position:absolute;
							  left:{$offsetx}px;
							  top:{$offsety}px;">
			<form name="javelin_form" method="post" onSubmit="doAction('KEY_ENTER');">
				<input type="hidden" name="__javelin_current_field" />
				<input type="hidden" name="__javelin_action" />
				<input type="hidden" name="__transaction" />
				<input type="hidden" name="__sesskey" />
				<input type="hidden" name="__context" value="{/document/@context}" />
				<input type="hidden" name="__signature" id="__signature" value="{/document/@signature}" />
				<br/>
				<blockquote>
					<p>
                    	<table>
							<tr>
                            	<td align="center"><img src="images/twinsoft.png"/>&#160;&#160;&#160;&#160;<img src="images/convertigo-small.png"/></td>
                            </tr>                        
                        </table>
						<table bordercolor="#00a4c8" style="border-collapse: collapse" cellspacing="0" cellpadding="0" border="2">
                            <tr>
								<td valign="top">
									<table cellspacing="0" cellpadding="6" border="0">
										<tr>
											<td class="title" colspan="2">error</td>
										</tr>
										<tr>
											<td colspan="2">
												An unexpected error occured while Convertigo was trying to execute the transaction :  '<xsl:value-of select="@transaction"/>'
												<br/>Try again your request.
												<br/>If the issue is still occuring, please contact Convertigo administrator, providing the following information.
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</p>
				</blockquote>
                    <p>
                        <table>
                            <tr>
                                <td>
                                    <img src="images/arrow-right-double.png"/>
                                    <a href="javascript:showErrorDetails()">Click here to display error details</a>                            
                                </td>
                            </tr>
                        </table>
    
                    </p>
				<div id="details" style="display: none">
					<h3>Main exception</h3>
					<p>
						<b>[<xsl:value-of select="exception"/>]</b><br/>
						<xsl:value-of select="message"/>
					</p>
					<h3>Stack trace</h3>
					<pre>
						<xsl:value-of select="stacktrace"/>
					</pre>
					<p class="small">Copyright © 2001-2011 Convertigo SA. All rights reserved.</p>
				</div>
			</form>
			</span>
		</div>
	</xsl:template>

</xsl:stylesheet>
