<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

	<xsl:template match="document">
		<xsl:apply-templates select="HEAD/LINK"/>
		<xsl:apply-templates select="HEAD/STYLE"/>
		<xsl:apply-templates select="HEAD/SCRIPT"/>
		<xsl:apply-templates select="HEAD/following-sibling::*" />
		<div id="menu_div" onmouseover="this.style.top=this.style.left='0px'" onmouseout="this.style.left='-25px';this.style.top='-28px'">
            <img src="../../images/e_refresh.gif" alt="Refresh" title="Refresh" onclick="goRefresh('{/document/@context}','{/document/@connector}')"></img>
            <img src="../../images/d_back.gif" alt="Restart" title="Restart" onclick="goReconnect()"></img><br/>
            <img src="../../images/e_back.gif" alt="Backward" title="Backward" onclick="doNavigationBarEvent('backward')"></img>
            <img src="../../images/e_forward.gif" alt="Forward" title="Forward" onclick="doNavigationBarEvent('forward')"></img>
        </div>
	</xsl:template>
	
	
	<xsl:template match="ALERT">
        <table id="alertTable" onclick="this.parentNode.removeChild(this)">
            <tr id="alertTableTitle">
                <td><b><xsl:value-of select="TYPE"/></b></td>
                <td><xsl:value-of select="TITLE"/></td>
                <td><b>X</b></td>
            </tr>
            <tr>
                <td colspan="3"><xsl:value-of select="MESSAGE"/></td>
            </tr>
        </table>
    </xsl:template>

    <xsl:template match="@*|node()">
      <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
      </xsl:copy>
    </xsl:template>

	<xsl:template match="//A[contains(@original_url,'mailto:')]" >
        <a href="{@original_url}"><xsl:value-of select="." /></a>                       
    </xsl:template>
    
    <xsl:template match="A[@class='l']">
	  <xsl:copy>
	  	<xsl:attribute name="target">_blank</xsl:attribute>
	  	<xsl:attribute name="href"><xsl:value-of select="@original_url"/></xsl:attribute>
	    <xsl:apply-templates select="@*[name(.)!='href' and name(.)!='twsid']|node()"/>
	  </xsl:copy>
	</xsl:template>
</xsl:stylesheet>
