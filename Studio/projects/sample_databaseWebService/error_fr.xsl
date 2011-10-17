<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xsl:stylesheet [ <!ENTITY nbsp "&#160;"> ]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:lxslt="http://xml.apache.org/xslt">
	<xsl:output encoding="utf-8" media-type="text/html" method="html"/>
	<xsl:template match="error">
		<html>
			<body>
				<link rel="stylesheet" href="../../css/exception.css" type="text/css"/>
				<p>
					<table bordercolor="#002F8E" style="border-collapse: collapse" cellspacing="0" cellpadding="0" border="3">
						<tr>
							<td valign="top">
								<table cellspacing="0" cellpadding="6" border="0">
									<tr>
										<td class="title" colspan="2">Message</td>
									</tr>
									<tr>
										<td colspan="2">
											<center>
												L'information demandée n'est pas pour l'instant disponible sur ce service, veuillez cliquer
												sur le lien suivant pour revenir à la page précédente.
												<br />
												<br />
												<a href="#" onclick="goPrevious()">Page précédente</a>
												<br />
												<br />
												Ou sur le lien suivant pour pour vous reconnecter. 											
												<br />
												<br />
												<a href="#" onclick="goReconnect()">Reconnexion</a>
											</center>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</p>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>
