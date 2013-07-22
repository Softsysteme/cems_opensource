<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- TEMPLATE STATIC -->
	<xsl:template match="*[@type='static']" >
		<xsl:param name="offsety" />
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
				<span class="title" 
						style="position:absolute;
								 left:{160 + $offsetx}px;
								 top:{5 + $offsety}px;
								white-space: nowrap;
								z-index: {$elDepth * 10 + 1};">
					<xsl:value-of select="." />
				</span>
			</xsl:when>
			<xsl:otherwise>
				<!-- Hide non-visible statics -->
				<xsl:if test="@background != @foreground">
					<!-- Container SPAN. Used only for positioning and framework behaviour -->
					<span onclick="spanClick(this, {@column}, {@line});"
							ondblclick="spanClick(this, {@column}, {@line}); doAction('KEY_ENTER');"
							style="position:absolute;
									 left:{./@column*$coefx+$offsetx}px;
									 top:{./@line*$coefy + $offsety}px;
									white-space: nowrap;
									z-index: {$elDepth * 10 + 1};">
						<!-- Background color style SPAN -->
						<span class="bgcolor{@background}">
							<!-- Foreground color style SPAN -->
							<span class="color{@foreground}">
								<xsl:choose>
									<xsl:when test="starts-with(., 'http://')">
										<a target="_blank" href="{.}"><xsl:value-of select="."/></a>
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
																		<xsl:value-of select="." />
																	</span>
																</xsl:when>
																<xsl:otherwise>
																	<xsl:value-of select="." />
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
																	<xsl:value-of select="." />
																</span>
															</xsl:when>
															<xsl:otherwise>
																<xsl:value-of select="." />
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
																	<xsl:value-of select="." />
																</span>
															</xsl:when>
															<xsl:otherwise>
																<xsl:value-of select="." />
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
																<xsl:value-of select="." />
															</span>
														</xsl:when>
														<xsl:otherwise>
															<xsl:value-of select="." />
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
</xsl:stylesheet>
