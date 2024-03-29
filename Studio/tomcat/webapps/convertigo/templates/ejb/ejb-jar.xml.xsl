<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output encoding="ISO-8859-1" media-type="text/xml" indent="yes"/>
	<xsl:include href="./EJBUtils.xsl"/>
	
	<xsl:template match="/child::*[local-name()='definitions']">	
	
<xsl:text disable-output-escaping="yes">&lt;!DOCTYPE  ejb-jar PUBLIC "-//Sun Microsystems, Inc.//DTD Enterprise JavaBeans 2.0//EN" "http://java.sun.com/dtd/ejb-jar_2_0.dtd"&gt;</xsl:text>

<ejb-jar >

	<description><![CDATA[No Description.]]></description>
	<display-name>Generated by Convertigo</display-name>
	
	<enterprise-beans>
		<!-- Session Beans -->
		<session >
			<description><![CDATA[]]></description>
			
			<ejb-name><xsl:call-template name="getClassNameOfCurrent"/>EJB</ejb-name>
			
			<home>com.twinsoft.convertigo.ejb.<xsl:call-template name="getClassNameOfCurrent"/>EJBHome</home>
			<remote>com.twinsoft.convertigo.ejb.<xsl:call-template name="getClassNameOfCurrent"/>EJB</remote>
			<local-home>com.twinsoft.convertigo.ejb.<xsl:call-template name="getClassNameOfCurrent"/>EJBLocalHome</local-home>
			<local>com.twinsoft.convertigo.ejb.<xsl:call-template name="getClassNameOfCurrent"/>EJBLocal</local>
			<ejb-class>com.twinsoft.convertigo.ejb.<xsl:call-template name="getClassNameOfCurrent"/>EJBSession</ejb-class>
			<session-type>Stateful</session-type>
			<transaction-type>Container</transaction-type>
		
		</session>
		<!-- Entity Beans -->
		<!-- Message Driven Beans -->
	</enterprise-beans>
	<!-- Relationships -->
	<!-- Assembly Descriptor -->
	<assembly-descriptor >
		<!-- finder permissions -->
		<!-- transactions -->
		<!-- finder transactions -->
	</assembly-descriptor>

</ejb-jar>
	</xsl:template>
</xsl:stylesheet>
