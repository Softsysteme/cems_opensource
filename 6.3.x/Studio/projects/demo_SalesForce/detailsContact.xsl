<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<xsl:template match="document">
	<body onload="twsInit()" defer="true" >
		<!-- 
		| This line will add all the link refences (CSS) form the cliplet  
		-->
		<xsl:apply-templates select="HEAD/LINK"/>
		
		<!-- 
		| This line will add the header of the cliplet, extracted from the web site  
		-->
		<xsl:call-template name="header"/>
		
		<!-- 
		| This line will represent the cliplet itslef 
		-->
		<xsl:apply-templates select="HEAD/following-sibling::*[@class!='sidebarModuleHeader' and @class!='standardSearchElementBody']" />
		
		<div id="menuDiv" style="position:absolute;
								 top:0;
								 left:185px;
								 width:50px;
								 height:25px;
								 background-color: #B5D3E7;
								 filter:alpha(opacity=60);
								 -moz-opacity:0.60;
								 opacity: 0.60;
								 z-index:99998" >
		 	<table>
		 		<tr>
		 			<td><img src="img/e_refresh.png" alt="Refresh" onclick="C8O.call()" /></td>
		 			<td><img src="img/e_back.png" alt="Restart"  onclick="C8O.doReconnect()" /></td>
		 		</tr>
		 	</table>
		</div>
	</body>
</xsl:template>


<!-- 
| This is the generic HTML template, do not modify 
-->
<xsl:template match="@*|node()">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()"/>
	</xsl:copy>
</xsl:template>


<!-- 
| Add here any HTML modification template :
|
| To remove some specific HTML use :
|
|    	<xsl:template match="(XPATH of the target HTML not to be displayed)" />
|
|
| To add some HTML to an existing HTML object :
|
|    	<xsl:template match="(XPath of the target HTML object)" >
|			<xsl:copy>
|				(any HTML you want to add before the original HTML)
|    			<xsl:apply-templates select="@*|node()"/>
|				(any HTML you want to add after the original HTML)
|  		  	</xsl:copy>			
|		</xsl:template>	
|
| 
-->
<xsl:template match="TD[@id='topButtonRow']" /> 		<!-- remove top buttons 		 -->
<xsl:template match="DIV[@class='pbBottomButtons']" />	<!-- remove bottom buttons 		 -->

</xsl:stylesheet>
