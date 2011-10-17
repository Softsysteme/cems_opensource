<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:lxslt="http://xml.apache.org/xslt">

				
<xsl:output encoding="UTF-8" media-type="text/html" method="html"/>

<!-- 
| This line includes the XSL file which contains all common templates 

<xsl:include href="common.xsl" />
-->

<xsl:template match="document">
	<body onload="twsInit()" defer="true" >
		<!-- 
		| This line will add all the link refences (CSS) form the cliplet  
		<xsl:apply-templates select="HEAD/LINK"/>
		-->
		<xsl:call-template name="styles"/>
		 
		
		<!-- 
		| This line will add the header of the cliplet, extracted from the web site  
		-->
		<xsl:call-template name="header"/>
		
		<!-- 
		| This line will represent the cliplet itslef 
		-->
		<xsl:apply-templates select="HEAD/following-sibling::DIV[not(@class) or (@class!='sidebarModuleHeader' and @class!='standardSearchElementBody')]" />
		
		<div id="menuDiv" style="position:absolute;
								 top:0;
								 right:0;
								 width:50px;
								 height:25px;
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

<xsl:template match="DIV[@class='pbHeader']" />

<!-- 
| This is the header template : these lines will display the top image and the searching area 
-->
<xsl:template name="styles">
<style>
<![CDATA[
/* -------------- */
/* version: 17.0*/
/* skin: Salesforce */
/* cssSheet: common */
/* postfix:  */
/* spritesEnabled: true */


/* this is a great place for application-wide styles (comomon.html.* entities & so on) */
/* It will import into every page of the app (popups, setup, 'regular pages' etc... */


/* BEGIN General page styles */

pre.exception {
    font-size: 145%;
}

body, td {
    margin:0px;
    color:#333;
}

body {
    background-repeat: repeat-x;
    background-position: left top;
    font-size: 80%;
    font-family: 'Arial', 'Helvetica', sans-serif;
    background-color: #FFF;
}

/*
 * Because of this selector, selectors that style the color must remember
 * to account for styling the anchor tag.
 */
a {
    color:#CCC;
}

a:hover {
    text-decoration:none;
}

th {
    text-align: left;
    font-weight: bold;
    white-space: nowrap;
}

form {
    margin:0px;
    padding:0px;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Verdana', 'Geneva', sans-serif;
    font-size: 100%;
    margin:0px;
    display:inline;
}

textarea {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 100%;
 }

select {
    color:#00a4c8;
}
/* prevent browsers from overwriting the font-size. It should be the same as the select. */
select option,
select optgroup {
    font-size: 100%;
}

img { border:0; }

dl { margin-left: 1em; }

dt { font-weight: bold; }

fieldset legend {
    font-weight: bold;
    color: black;
}

fieldset ul {
    padding: 0;
}

ul li,
ol li {
    margin-left: 1.5em;
    padding-left: 0;
}

input { /* added to make inputs on detail elements look ok */
    padding-top: 0;
}

.fileFieldInputElement div {
    padding-bottom: 3px;
}

.accessibleHiddenText {
    position: absolute;
    width: 0;
    height: 0;
    font-size: 0;
    overflow: hidden;
}

/* use this to clear floats */
.clearingBox {
    clear:both;
    font-size: 1%;
}

.advisory {
    font-style: italic;
}

.hidden {
    display:none;
}

.errorStyle,
.errorMsg,
.importantWarning,
.pbBody .errorStyle a,
.pbBody .errorMsg a{
   color: #C00;
}

.errorLine {
   margin:0 0 0 .7em;
   text-indent:-0.7em;
}

.requiredMark {
    color: white;
    display: none;
}

.requiredInput .requiredMark {
    display: inline;
}

.fewerMore {
    text-align: center;
    font-size: 109%;
}

.topLinks {
    text-align: center;
    margin-bottom: 2px;
}
.topLinks .calendarIconBar img {
    float: none;
    display: inline;
}

/* Colons after titles in Classic mode */
.titleSeparatingColon {
    display: none;
}

/* Messaging box styles */
.statusMsg,
.messagingBox {
    padding: 4px;
    margin: 4px;
    border: 1px solid #333;
    background-color: #FFC;
    display: block;
}

.messagingBox {
    background-image: none;
    background-position: 5px 2px;
    background-repeat: no-repeat;
    padding-left: 25px;
}

.actionConfirmationBox {
    background-image: url(/img/func_icons/util/checkmark16.gif);
}

.disabledInput {
    background-color: #EBEBE4;
}

/* Used in reports */
.confidential {
    padding: 10px;
    text-align: center;
    font-size: 91%;
    font-style: italic;
    color: #777;
}

/* Used in wizards */

.exampleBox {
    background-color: #FFFFEE;
    border: 1px solid #AAA;
    margin: 0 0.5em;
    padding: 0 0.25em;
}

.selectAndClearAll {
    display: block;
}

/* for textareas, to warn about going over the limit */
.textCounterOuter {
    text-align: right;
    padding: 2px 0;
}

.eventResponse.textCounterOuter {
  text-align: left;
}

.textAreaReadOnly {
    background-color: #E8E8E8;
}
.textCounterMiddle {
    border: 1px solid #fff;
    padding: 2px;
    display: none;
}
.textCounterMiddle.warn,
.textCounterMiddle.over {
    display: inline;
}
.textCounter {
    padding: 0 2px;
    display: inline;
    font-size: 93%;
}
.warn .textCounter {
    background-color: #FF6;
    color: #000;
}
.over .textCounter {
    background-color: #F33;
    color: #FFF;
}

.warning {
    font-weight: bold;
    color: #C00;
}

/* END General page styles */
/* --------------------------------------------- */
/* BEGIN Toolbar nav links */

.forceappLogo {
  background-image: url(/img/forceapp_logo.gif);
	background-position: 0px 0px;width:92px;
	height:32px;;
  background-repeat: no-repeat;
  background-position: bottom;
}

.multiforce {
    padding-top: 2px;
    white-space: nowrap;
    font-weight: bold;
    text-align: right;
}

.multiforce #toolbar {
    display: inline;
    padding: 22px 8px 30px 63px;
    background: url(/img/tab/forceapp_bg.gif) no-repeat top left;
}

.multiforce #toolbar select {
    font-weight:bold;
    font-size: 100%;
    vertical-align: top;
    margin-top: 6px;
}

.multiforce #toolbar .btnGo {
    vertical-align: top;
    margin: 12px 0 0 0;
}

.multiforce .navLinks {
    color:#999;
    position: relative;
    vertical-align: top;
    top: 2px;
}

.multiforce .navLinks a {
    padding: 0 2px;
    color: #000;
    vertical-align: top;
}

.multiforce .warning {
    font-weight:bold;
}

/* END Toolbar nav links */
/* -------------------------------------- */
/* BEGIN Tab bar */
.bPageHeader .phHeader,
.tabsNewBar {
  width:100%;
  border: 0;
  margin: 0;
  padding: 0;
}
table.tabsNewBar tr.newBar {
  display:none;
}

.tabNavigation {
    padding-bottom:10px;
    padding-left: 10px;
    margin-bottom:6px;
    font-size: 91%;
    font-family: 'Verdana', 'Geneva', sans-serif;
}
table.tab {
    line-height:normal;
}
.tab td {
    text-align:center;
    background-image: url(/img/sprites/motiftab3.gif);
	background-position: left -156px;
    background-repeat: no-repeat;
    margin:0;
    padding:0 0 0 6px;
    border-bottom:1px solid #A4A29E;
}
.tab a {
    text-decoration:none;
    color:#444;
}
.tab div {
    background-image: url(/img/sprites/motiftab3.gif);
	background-position: right -4776px;
    background-repeat: no-repeat;
    padding:3px 9px 5px 3px;
}
.tab a:hover {
    text-decoration:underline;
}
.tab td.currentTab {
    font-weight:bold;
    background-color: transparent;
}
.currentTab,
.currentTab a {
    color: #FFF;
}

.currentTab div {
    padding:4px 9px 4px 3px;
}
.tab .last div {
    background-image: url(/img/sprites/motiftab3.gif);
	background-position: right -2px;
}

.tabNavigation,
.blank .tabNavigation {
    background-image:url(/img/tab/blank_bg.gif);
    background-repeat: repeat-x;
    background-position: bottom;
}

.allTabsArrow { background-image: url(/img/tab/arrow.gif);
	background-position: 0px 0px;width:6px;
	height:9px; }

.allTabTab .currentTab .allTabsArrow { background-image: url(/img/tab/arrowWhite.gif);
	background-position: 0px 0px;width:6px;
	height:9px; }

/* END Tab Bar */
/* ------------------------------------------- */
/* BEGIN Legacy tab styles for MH pages */
/* Don't use these */
.tabOn {
   font-family: 'Verdana', 'Arial', 'Helvetica';
   font-weight: bold;
   font-size: 100%;
   color: #FFFFFF;
   text-decoration: none;
   background-color: #669900;
}

A:link.tabOn {
   font-family: 'Verdana', 'Arial', 'Helvetica';
   font-weight: bold;
   font-size: 100%;
   color: #FFFFFF;
   text-decoration: none;
   background-color: #669900;
}

.tabOff {
   font-family: 'Verdana', 'Arial', 'Helvetica';
   font-weight: normal;
   font-size: 100%;
   color: #FFFFFF;
   text-decoration: none;
   background-color: #336699;
}

A:link.tabOff {
   font-family: 'Verdana', 'Arial', 'Helvetica';
   font-weight: normal;
   font-size: 100%;
   color: #FFFFFF;
   text-decoration: none;
   background-color: #336699;
}
/* END Legacy tab styles */
/* ---------------------------------------- */
/* BEGIN Layout Table - outer */
.outerNoSidebar {
    padding:0px 10px 10px 10px;
    width:100%;
}
div.outerNoSidebar {
    width:auto;
}
.outer {
    margin:0;
}
.outer td.oRight {
    padding:0px 10px 10px 210px;
    background-color:#FFFFFF;
}

.bodyDiv {
    position: relative;
    height: 100%;
}

#sidebarDiv {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #E8E8E8;
}

#sidebarDiv.collapsible {
    padding-right: 6px;
    border-width: 1px 0;
}

#sidebarDiv .indicator {
    position: absolute;
    z-index: 6; /*must be greater than .pinBox*/
    right: 1px;
    width: 6px;
    height: 41px;
    padding: 0;
    background: url(/img/sidebar/LNav_twisty_closed.gif) no-repeat top left;
}

#sidebarDiv #pinIndicator {
    top: 20px;
}

#sidebarDiv #pinIndicator2 {
    bottom: 20px;
}

#sidebarDiv .indicator.open {
    background-image: url(/img/sidebar/LNav_twisty_opened.gif);
}

#sidebarDiv .pinBox {
    background: url(/img/sidebar/LNav_handleBG.gif) repeat-y right;
    display: none;
    overflow: hidden;
    position: absolute;
    z-index: 5; /*must be less than the .indicator*/
    right: 0;
    width: 6px;
    top: 0;
}

#sidebarDiv .indicator,
#sidebarDiv .pinBox {
    cursor: url(/img/cursors/col-expand.cur), pointer;
}

#sidebarDiv .indicator.open,
#sidebarDiv .pinBox.open {
    cursor: url(/img/cursors/col-collapse.cur), pointer;
}

#sidebarDiv.collapsible .pinBox,
#sidebarDiv.collapsible .indicator {
    display: block;
}

#sidebarDiv .sidebarInner {
    background-color: #FFF;
    width: 200px;
    padding-bottom: 0.1px; /* Hack to get the bottom margin of the last sidebar module to show */
}

.outer td {
    vertical-align:top;
}

.outer .oRight .spacer{
    width:678px;
}

.outer .fullSpan {
    padding:0px 0px 10px 14px;
    background-color:#FFFFFF;
}
.outer .fullSpan .spacer{
    width:678px;
}

/* END Layout Table - outer */
/*---------------------------------------------- */
/* BEGIN Page Header */
.bPageHeader, .bPageHeader td.left{
    background-image: url(/img/bgTop.gif);
    background-position: left top;
    background-repeat: repeat-x;
}
.bPageHeader .phHeader {
    background-repeat: no-repeat;
    background-position: right top;
}

.bPageHeader .phHeader td{
    vertical-align:top;
}

.bPageHeader .previewIndicator {
    float: left;
    height: 100%;
    padding: 20px 0 0 2em;
    font-weight: bold;
    color: #900;
}

.bPageHeader .phHeader td.right {
    width: 100%;
    text-align: right;
    white-space: nowrap;
}

.bPageHeader .phHeader .daysRemaining,
.bPageHeader .phHeader .buildMsg,
.bPageHeader .phHeader .preRelease  {
    position: absolute;
    top: 1.8em;
    right: 0;
}

.bPageHeader .phHeader .upgradeNow {
    position: absolute;
    top: 2em;
    right: 4px;
}

.bPageHeader .phHeader .currentlySu {
    position: absolute;
    top: 3.2em;
    right: 0;
    color: #C00;
    font-weight: bold;
    text-transform: uppercase;
}

.bPageHeader .phHeader .buildMsg,
.bPageHeader .phHeader .preRelease  {
    font-weight: bold;
    color: #F00;
    background-color: #FFD;
    padding: 2px 4px;
    border: 1px solid #CCC;
}

.bPageHeader .phHeader .daysRemaining,
.bPageHeader .phHeader .preRelease  {
    margin-left: -10px;
}

.bPageHeader .phHeader .daysRemaining a,
.bPageHeader .phHeader .preRelease a {
    font-weight: normal;
    font-size: 93%;
    margin-left: 3px;
    text-decoration: none;
}

.bPageHeader .phHeader .right .spacer{
    width:533px;
}

.bPageHeader .phHeader .left .spacer, .bPageHeader .phHeader td.left {
    width:230px;
}
/* END Page Header */

/*BEGIN Setup */

.mTreeSelection{
    background-color:#E8E8E8;
    padding: 0.80em;
    font-size: 109%;
    text-align: left;
}

.mTreeSelection .folderNodeSpan{
    white-space:nowrap;
}

.mTreeSelection .helpTreeHeading{
    font-weight:bold;
}

.mTreeSelection .treeLine {
    background-color:#333;
    height:1px;
    margin-top: 0.33em;
    margin-bottom: 0.69em;
    font-size:0%;

}

.mTreeSelection h2 {
    display:block;
    margin-top:15px;
    font-weight:bold;
    padding:0.33em 0.33em 0.33em 0.00em;
    border-bottom: 2px solid #ccc;
}

.helpTree {
    font-size: 88%;
}

.helpTree .mTreeSelection .setupLeaf,
.helpTree .mTreeSelection .setupHighlightLeaf{
    padding-bottom:2px;

}
.mTreeSelection .setupHighlightLeaf {
    background-color:#fff;
    margin-left:1.27em;
    padding-bottom:0.15em;
    margin-right:-0.5em;
}


.newFlag {
    margin-left:0.5em;
    color: #f00;
    font-size:0.8em;
}

.mTreeSelection .setupHighlightLeaf a {
    text-decoration:none;
}

.mTreeSelection .setupLeaf{
    margin-left:1.27em;
    padding-top: 2px;
    padding-bottom: 2px;
}

.mTreeSelection  a:hover  {
   text-decoration: underline;
}

.mTreeSelection a.setupHighlightFolder{
    text-decoration:none;
    background-color:#fff;
}

.mTreeSelection .parent {
    padding-bottom: 1px;
    padding-top: 1px;
}

.setupFolder {
    text-decoration: none;
}

.childContainer{
        margin-left: 1.00em;
}

.setupLeaf a {
    text-decoration: none;
}

.setupSection {
   font-weight:bold;
   text-decoration: none;
   padding:0.33em;
}

.setupLink {
   font-weight:bold;
   text-decoration: underline;
   padding:0.33em;
}

.setupImage {
    padding: 0 0.33em 0.07em 0.33em;
    cursor:pointer;
}



/* Text in headers of Get Info boxes in Setup should be bold white,
   but DON'T USE IT! */
.bodyBoldWhite {
    color: #FFF;
    font-weight: bold;
}


/* END Setup */
/* --------------------------------------------- */
/* BEGIN Page Footer */

.bPageFooter {
    padding:10px 0px 20px 0px;
    border-top:1px solid #E8E8E8;
    text-align:center;
    line-height:1.8em;
}

.bPageFooter .spacer {
    width:935px;
}

/* END Page Footer */
/* --------------------------------------------- */
/* BEGIN Styles for tags mru */

.sidebarModuleTagLink {
    padding-bottom: .5em;
}

#tagsMru {
    display: block;
    position: static;
    height: 20px;
}


#tagsMru .menuButtonButton {
    background: #fff url(/img/sidebar/tagsBG.gif) no-repeat right bottom;
    border: 1px solid #69c;
    padding: 2px 1px;
    font-size: 90%;
    display: block;
    color: #333;
}

#tagsMru .menuButtonButton img {
    vertical-align: top;
    margin: -1px 2px -1px 0;
}
#tagsMru .menuButtonMenu {
    left: auto;
    border: 1px solid #69C;
    background-color: #f3f3ec;
    margin-top: 0;
}

#tagsMru .menuButtonMenu a {
    background-color: transparent;
    padding: 0 2px 0 6px;
    border: solid #f3f3ec;
    border-width: 1px 0;
    color: #333;
    font-family: 'Arial','Helvetica',sans-serif;
    font-weight: normal;
    font-size: 100%;
    padding:2px 2px 2px 6px;
}

#tagsMru .menuButtonMenu a img {
    padding-right:.5em;
    vertical-align:top;
}

#tagsMru .menuButtonMenu .tagHomeLink {
    color:#000;
    font-weight: bold;
    z-index:200;
    padding:4px 2px 6px 6px;
}

#tagsMru .menuButtonMenu a .mruIcon {
    margin-right: 2px;
}

#tagsMru .menuButtonMenu a:hover {
    background-color: #fff;
    border-color: #e3deb8;
    text-decoration: none;
}

/* END tags MRU specific */
/* --------------------------------------------- */
/* BEGIN Styles for create new */

#createNew {
    display: block;
    position: static;
    height: 20px;
}

#createNew .menuButtonButton {
    background: #fff url(/img/sidebar/createNewBG.gif) no-repeat right bottom;
    border: 1px solid #69c;
    padding: 2px 1px;
    font-size: 90%;
    display: block;
    color: #333;
}

#createNew .menuButtonMenu {
    left: auto;
    border: 1px solid #69C;
    background-color: #f3f3ec;
    margin-top: 0;
}

#createNew .menuButtonMenu a {
    background-color: transparent;
    padding: 0 2px 0 6px;
    border: solid #f3f3ec;
    border-width: 1px 0;
    color: #333;
    font-family: 'Arial','Helvetica',sans-serif;
    font-weight: normal;
    font-size: 100%;
}

#createNew .menuButtonMenu a .mruIcon {
    margin-right: 2px;
}

#createNew .menuButtonMenu a:hover {
    background-color: #fff;
    border-color: #e3deb8;
    text-decoration: none;
}

/* END create new specific */
/* BEGIN MenuButtonElement */

.menuButton {
    display: inline;
    cursor: pointer;
    z-index: 99;
}

.menuButton .menuButtonButton {
    background: #fff url(/img/combo_button_no_line.gif) no-repeat bottom right;
    padding: 2px 22px 3px 3px;
    display: inline;
    font-family: 'Verdana', 'Geneva', sans-serif;
    color: #fff;
    font-weight: bold;
    font-size: 80%;
    white-space: pre;
}

.menuButton .hasDefault {
    background: #FFF url(/img/combo_button.gif) no-repeat bottom right;
}

.menuButton .menuButtonMenu {
    display: none;
    position: absolute;
    left: 0;
    z-index: 50;
    white-space: nowrap;
    border-bottom: 1px solid #333;
    margin-top: -2px;
}

.menuButton .menuButtonMenu a {
    display: block;
    text-decoration: none;
    background-color: #ccc;
    padding: 0 6px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #bbb;
    border-right: 1px solid #666;
    border-left: 1px solid #bbb;
    color: #000;
    font-size: 80%;
    font-family: 'Verdana','Geneva',sans-serif;
    font-weight: bold;
    white-space: pre;
}

.menuButton .menuButtonMenu a:hover {
    text-decoration: none;
    background-color: #9096A1;
    color: #fff;
    border-bottom: 1px solid #666;
}


/* end MenuButton element */
/* MenuButton customizations */
.searchCustomization .menuButton .menuButtonMenu {
    left: auto;
    right: 0;
    border: none;
}

.searchCustomization .menuButton .menuButtonMenu a,
#browseTags .menuButton .menuButtonMenu a {
    background-color:#fff;
    border: 1px solid #333;
    padding: .3em;
}

.searchCustomization .menuButton .menuButtonMenu a:hover {
    background-color: #9096A1;
}

#browseTags .menuButtonMenu a.selectedSortOrder {
    cursor:default;
    color: #fff;
}

.googleDocMutton .menuButtonMenu a {
    background-color: #FFFFFF;
    font-weight : normal;
    border-bottom: 0px;
    border-top: 0px;
    border-right: 1px solid #666;
    border-left: 1px solid #bbb;
}

.googleDocMutton .menuButtonMenu a:hover {
    background-color: #ffffcc;
    color: #000000;
    border-bottom: 0px;
}
/* end MenuButton customizations */
/* old ButtonComboElement CSS */

.selectMenuOuterDiv {
    display: inline;
    z-index: 5;
}

.pbButton .selectMenuOuterDiv {
    vertical-align: top;
}

.selectMenuOuterDiv .selectMenuDiv {
    display: inline;
    position: relative;


    /* These are from btn class */
    background-image: none;
    font-family: 'Verdana', 'Geneva', sans-serif;
    color:#FFFFFF;
    padding:0px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
    white-space: pre;
}

.selectMenuDiv .selectMenuButton {
    background: #FFF url(/img/combo_button_no_line.gif) no-repeat bottom right;
    padding: 2px 22px 3px 3px;
    cursor: pointer;
    display: inline;
    position: relative;
    font-size: 80%;
}

.selectMenuDiv div.hasDefault {
    background: #FFF url(/img/combo_button.gif) no-repeat bottom right;
}

.selectMenuDiv .selectMenuDropdown {
    display: inline;
    position: relative;
    margin-top: 2px;
    margin-left: 3px;
}

.selectMenuDiv .selectMenuDropdownDiv {
    border-bottom: 1px solid #333;
}

.selectMenuDiv .selectMenuDropdown  .theOption {
    background-color: #CCC;
    padding: 0 6px 0 6px;
    border-top: 1px solid #EEE;
    border-bottom: 1px solid #BBB;
    border-right: 1px solid #666;
    border-left: 1px solid #BBB;
    text-decoration: none;
    color: #000;
    font-size: 80%;
    display: block;
}

.selectMenuDiv .selectMenuDropdown  .selectMenuGroup {
    background-color: #fff;
    padding: 0 6px 0 6px;
    border-top: 1px solid #EEE;
    border-bottom: 1px solid #BBB;
    border-right: 1px solid #666;
    border-left: 1px solid #BBB;
    text-decoration: none;
    color: #000;
    font-size: 80%;
    font-weight:bold;
    display: block;
    cursor:default;
}

.selectMenuDiv .selectMenuDropdown a.theOption:hover {
    background-color: #9096A1;
    color: #FFF;
    border-bottom: 1px solid #666;
}

/* END ButtonComboElement */

/* --------------------------------------------- */
/* BEGIN Common page Elements */

/* Help buttons */
.help td {
    vertical-align:middle;
}

/* LookupInputElement */
.lookupInput {
    display: inline;
    white-space: nowrap;
    vertical-align: middle;
}
.lookupInput img {
    margin-right: .25em;
    background-repeat: no-repeat;
}

.lookupInput a.readOnly {
    float: right;
}

.lookupInput span.readOnly {
    white-space: normal;
    display: block;
}

.lookupInput span.totalSummary {
    font-weight: bold;
}


/* ColorInputElement */
.colorInputElement .sample {
    border: 1px solid #A5ACB2;
    margin: 0 5px 0 1px;
}

/* DuelingListBoxElement */
.duelingListBox table.layout td{
    vertical-align: middle;
    text-align: center;
}

.duelingListBox .selectTitle {
    padding: .5em 0 .5em 0;
    font-weight: bold;
}

.duelingListBox .text {
    padding: .1em 0 .1em 0;
}

.duelingListBox .errorMsg {
    text-align: center;
}

/* Alert Box - BEGIN */
.alertBox {
    margin:10px 0px 20px 0px;
    padding:0px 15px 0px 13px;
    background-repeat: no-repeat;
    background-position: left top;
    background-image:  url("/img/bgmMessage.gif");
}

.alertBox .content {
    padding:5px 10px;
    background-color:#FFC;
    font-size: 109%;
}
/* Alert Box - END */

/* Date Picker */
.dateInput {
    white-space: nowrap;
}

.dateOnlyInput input {
    width: 6em;
}

.datePickerButton  {
    padding:0em 0.33em 0em 0.33em;
/*    vertical-align:bottom; - removed by polcari for the new Event page */
}

.multiItemEdit .genericTable td .datePickerButton {
    padding:0em 0.33em 0em 0.33em;
    vertical-align:bottom; /* - added by nprokopev for multiItem edit page (new product for opportunity) */
}

.sidebarModule .dateInput input {
    width: 70px; /* added by rchen so that date input elements fit in the sidebar */
}

/* Time Input */
.timeInput {
    white-space: nowrap;
}

/* HTML Input Element */
.htmlInput .controls {
    padding: 5px;
    border: 1px solid #000;
    background-color: #CCC;
}

.htmlInput .htmlEditor {
    border: 1px solid #000;
}

/* Mini-tabs */
.miniTab {
    padding: 6px 0 0 10px;
    font-family: 'Verdana', 'Geneva', sans-serif;
}

.miniTab .currentTab,
.miniTab .currentTab a {
    /* Need to override app tab styles */
    color: #333;
}

.miniTab ul {
    list-style-type: none;
    padding: 0.235em 0;
    margin: 0;
}


.miniTab .links {
    text-align: right;
    margin-right: 5px;
    float: right;
    color: #FFF;
    font-size: 91%;
}

.miniTab .links a {
    color: #FFF;
    font-size: 91%;
}

/*Needs to be more specific than the palette*/
.miniTab ul.miniTabList li {
    display: inline;
    border-style: solid;
    border-width: 1px 1px 2px 1px;
    /*border-color-bottom is from the palette*/
    border-top-color: black;
    border-left-color: black;
    border-right-color: black;
    padding: 4px 8px 1px 8px;
    margin-left: 0;
    margin-right: 5px;
    background-image: url(/img/tab/miniTab_off.gif);
    background-repeat: repeat-x;
    white-space: nowrap;
}

.miniTab ul li a {
    text-decoration: none;
}

.miniTab ul li a:hover {
    text-decoration: underline;
}

.miniTab ul li.currentTab {
    padding-bottom: 3px;
    border-bottom-style: none;
    background-image: url(/img/tab/miniTab_on.gif);
    background-repeat: repeat-x;
    font-weight: bold;
}

.bMiniTab .bPageBlock {
    border-top-style: none;
}

.bMiniTab .bPageBlock .pbHeader{
    padding-top: 4px;
}

.bMiniTab .bPageBlock .pbHeader .pbButton {
    text-align: center;
}

/* AFAIK just used in Adv. Forecast edit minitabs */
.bMiniTabFilter {
    margin-top: 4px;
}

/* for blocks that contain stuff other than just a single bPageBlock */
.bMiniTabBlock {
    padding-top: 4px;
}

/* different minitab style in a lookup */
.lookupTab .lookup .lookupMiniTab {
    margin-bottom: 22px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #000000;
}

.lookup div.miniTabBackground {
    padding-top:5px;
    border-bottom:1px solid #000000;
    position:relative;
    top:27px;
}

.lookupTab .lookup .lookupMiniTab ul li {
    border-bottom-width: 0px;
    margin-right: 10px;
    padding-bottom: 3px;
    position:relative;
}

.lookupTab .lookup .lookupMiniTab ul li.currentTab {
    padding-bottom: 4px;
}

#insertFieldCell {
    padding-bottom: 0.5em;
    padding-top: 0.3em;
}

#insertOperatorCell {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.insertCell {
    padding-top: 2.1em;
}

.editorContentLabel {
    font-weight: bold;
}

/* Formula editor: Field selector */
#fieldSelector {
    width:14em;
}

.newFieldSelector {
    padding: 10px 0;
    white-space: nowrap;
    overflow-x: auto;
}

.newFieldSelector .selectWrapper {
    margin: 0 10px;
}

.fieldSelectorScrollableArea {
    border: 1px solid #919191;
    background-color: #fff;
    width:63em;
    overflow-x: auto;
}

#insertBox {
    background-color: #FAFAFA;
    padding-left:5px;
    padding-right:5px;
    border:1px solid #AAAAAA;
    text-align: center;
}

#insertBox span {
    display: block;
    margin-bottom: 8px;
}

.fieldPickerAttributeTable{
    margin-bottom:5px;
    width:100%;
    text-align:left;
}

.insertWrapperString{
    font-size: 100%;
    font-weight:bold;
}

.fieldPickerAttributeCategory{
    font-size: 90%;
    color: #555555;
    text-align:center;
    vertical-align:bottom;
    padding-right:6px;
}

.fieldPickerAttributeValue{
    font-size: 90%;
    color: #888888;
    text-align:left;
    vertical-align:bottom;
    text-decoration:none;
}
#functionSelector, #functionCategorySelector {
    width:14em;
}

.miniTabOn .formulaType {
    font-size:0.8em;
}

.miniTabOn .formulaType .formulaExample {
    color: blue;
}

.formulaEditorOuter {
    clear:both;
}

#funcFormat, #funcExplain {
    width:14em;
}

.formulaFooter td  {
    white-space:nowrap;
}

.validationSuccess {
    color:green;
}

/* Show Me More */
.pShowMore{
   padding:9px 0 2px 5px;
   text-align: left;
}

.bDescription {
    padding: 0.8em 0 0.8em 0;
    font-size: 109%;
    text-align:left;
}

.bDescriptionUi {
    padding: 0.1em 0 0.8em 0;
    font-size: 109%;
    text-align:left;
}

.opportunitySummary th {
    font-weight: bold;
    width: 30%;
}

.opportunitySummary .btn {
    margin: 0;
}

/* Prev/next buttons.  Used by ListElement, Calendar */
.bNext {
    margin:0px 0px 4px 18px;
    margin-right:15px;
}
.rolodex {
    font-size: 91%;
    white-space: nowrap;
    padding: 8px 0;
    margin-right: 0em;
    text-align: center;
    float: none;
}

.rolodex a:link,
.rolodex a:visited,
.rolodex a:active {
    text-decoration:none;
}
.rolodex a:hover {
    text-decoration:none;
                font-weight: bold;
}

.rolodex a.listItem {
    border-right: 1px solid #DDD;
}

.rolodex a.listItem:hover {
    background-color: #f3f2f1;
}

.rolodex a.listItem .listItemPad {
                color:#8f8f8f;
    padding: 0 5px;
}

.rolodex a.listItemLast {
    border-right: none;
}

.rolodex .listItemSelected {
    border-right: 1px solid #f3f2f1;
    font-weight: bold;
    background-color: #CCC;
    color: #FFF;
    padding: 0 5px;
}

.bNext .next {
    padding-top: 5px;
    text-align:right;
    font-size: 91%;
    float: right;
    white-space: nowrap;
}

.bNext .current {
    font-weight:bold;
}

.bNext .recycle {
    color:#336600;
    font-weight:bold;
}

.bNext .withFilter {
    height: 1%;
}

.bNext .withFilter .filter {
    float: left;
}

/* FilterElements */
.bFilter {
    margin:0 0 15px 18px;
}

.bSubBlock .bFilter {
    margin-left: 0;
    margin-bottom: 0;
}


.bFilter .btn {
    vertical-align: middle;
    margin-right: .69em;
}
.bFilter .view {
    padding-right:15px;
}
.bFilter .fBody span {
    vertical-align:middle;
}
.bFilter .fBody .leftPad ,
.bFilter .fDescription  {
    margin-left: 10px;
}

.bFilter input ,
.bFilter select {
    vertical-align: middle;
    margin: 2px auto;
}

.bFilter select {
    font-size: 91%;
}

.bFilter .fHeader,
.bFilter h2 {
    text-align:left;
    font-weight:bold;
    padding-right: .69em;
}

.bFilterSearch .fHeader,
.bFilterSearch .fDescription {
    display:inline;
    margin-left:0;
}

.bFilter .fFooter {
    padding-left:8px;
    padding-top:2px;
    text-align:left;
    font-size: 91%;
}
.bFilter th {
    text-align:left;
    font-size: 91%;
    font-weight:normal;
    padding-right:10px;
    padding-top:8px;
}
.bFilter td {
    text-align:left;
    padding-right:10px;
}
.bFilter .btnRow {
    padding-top:8px;
}

.bFilterView .bFilter .fBody {
    vertical-align:middle;
}

.bFilterSearch .bFilter .messages,
.bFilterSearch .bFilter .view {
    float: left;
    margin-bottom:10px;
}

.bFilterSearch .bFilter .fBody {
    vertical-align:top;
}

.bFilterSearch .bFilter .messages {
    width:50%;
}

.filterOverview {
    padding-bottom: 15px;
}

.filterOverview .bFilter {
    margin: 0px 0px 0px 0px;
}

/* Search Elements */
.bOverviewSearch .messages {
    width: 50%;
}
.bOverviewSearch .view {
    padding-right:15px;
}
.bOverviewSearch .pbSearch {
    margin-top: 5px;
}
.bOverviewSearch {
    margin: 0 0 18px 15px;
}

.multiSelectPicklistTable .multiSelectPicklistRow {
    vertical-align: top;
}

.multiSelectPicklistTable .multiSelectPicklistRow .multiSelectPicklistCell {
    vertical-align: middle;
    background-color: #aaa;
}

/* END Common Page Elements */
/* --------------------------------------------- */
/* BEGIN buttons */
.btn, .button, .formulaButton, .btnWhatsNew {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButton.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    font-size: 80%;
    color:#FFFFFF;
    padding:1px 3px;
    cursor:pointer;
    font-weight:bold;
    display:inline;
}
.btnGo {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButton.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    font-size: 80%;
    color:#FFFFFF;
    padding:0px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
}
.btnImportant {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButtonImportant.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    font-size: 80%;
    color:#FFFFFF;
    padding:1px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
}

.upgradeNow, .subscribeNow, .btnSharing {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButtonSharing.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    color:#FFFFFF;
    padding:1px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
    font-size: 80%;
}
.btnDisabled {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButtonDisabled.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #999999;
    border-bottom:1px solid #999999;
    border-top:1px solid #CCCCCC;
    border-left:1px solid #CCCCCC;
    font-size: 80%;
    color:#C1C1C1;
    padding:0 3px 1px 3px;
    cursor:default;
    font-weight:bold;
}
.btnHelp {
    margin-right:5px;
}
/* Same as .btn, but with extra margin-left */
.btnCancel {
    font-family: 'Verdana', 'Geneva', sans-serif;
    background-image:  url("/img/bgButton.gif");
    background-repeat: repeat-x;
    background-position: left top;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    font-size: 80%;
    color:#FFFFFF;
    padding:1px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
    display:inline;
    margin-left: 2em;
}


.btnActionOverride, .btnOverriddenAction {
    color: white;
    background:#38C352;
    font-family: 'Verdana', 'Geneva', sans-serif;
    border-right:1px solid #5C5D61;
    border-bottom:1px solid #5C5D61;
    border-top:none;
    border-left:none;
    font-size: 80%;
    padding:1px 3px 1px 3px;
    cursor:pointer;
    font-weight:bold;
}

.btnOverriddenAction {
    background:#45F166;
    font-style: italic;
}

.btnActionOverrideFailedToMatchPattern {
    background:yellow;
}

.btnGo, .btnImportant, .btnSharing, .btnDisabled, .btn,
.bEditBlock .btnGo, .bEditBlock .btnImportant, .bEditBlock .btnSharing, .bEditBlock .btnDisabled, .bEditBlock .btn, .btnCustomAction, .btnOverriddenAction {
    margin: 0 2px;
}

/* END buttons */
/* --------------------------------------------- */
/* BEGIN Page Title */
.bPageTitle {
    margin-bottom:15px;
}

.bPageTitle .ptBody {
    padding-top: 5px;
    padding-bottom: 5px;
    width:100%;
    overflow: hidden;
}

.SimpleWhatIsPopup .bPageTitle .ptBody {
    padding-bottom: 5px;
}

.bPageTitle .ptBreadcrumb {
    font-family: 'Verdana', 'Geneva', sans-serif;
    font-size: 91.3%;
    margin-bottom: -15px;
    height:15px;
    vertical-align:middle;
}

.bPageTitle h1, .bPageTitle h2{
    display: block;
}

/* used in places where the h1 is too high (because the h2 is empty).  */
h1.noSecondHeader,
.introPage h1 {
    margin: 10px 0 15px 0;
    white-space:nowrap;
}

.bPageTitle .ptHeader a {
    color:#fff;
    text-decoration:underline;
}

.bPageTitle .ptBody .content {
    float: left;
    vertical-align: middle;
    padding-left: 5px;
    white-space: nowrap;
}

.pageTitleIcon {
    display: inline;
    float: left;
    width: 32px;
    margin-right: 5px;
}

/* Pages without pageTitleIcons */
.sysAdminTab .bPageTitle .ptBody .content,
.homeTab .bPageTitle .ptBody .content,
.allTabTab .bPageTitle .ptBody .content {
    padding-left: 10px;
}

.bPageTitle .ptBody .links {
    padding: 10px 5px 0 0;
    float: right;
    text-align: right;
    vertical-align:middle;
    font-size: 91%;
    white-space: nowrap;
}

.bPageTitle .ptBody .links .configLinks {
    text-decoration:underline;
}

.bPageTitle .metadata {
    background-color: #D6D6D6;
    border-bottom: 1px solid #C1C1C1;
    width: 100%;
    line-height: 22px;
    white-space: nowrap;
}

.metadata .feedLinks {
    float: left;
    vertical-align: middle;
    white-space: nowrap;
    font-weight: bold;
    height: 100%;
    padding: 2px 5px;
}

.metadata .feedLinks img {   /* delete this comment */
    padding: 0 5px 0 0;
    vertical-align: top;
}

.feedLink {
    margin-right: 7px;
}

.feedLinkDiv {
    display: inline-block;
    vertical-align: top;
}

.feedLinkDiv img {
    margin-top: 4px;
}

.bPageTitle .metadata .tagHeader {
    text-align: right;
    float: right;
}

.bPageTitle .metadata .tagHeader img {
    vertical-align: middle;
    padding: .4em 0px;
}

.bPageTitle .metadata .newText {
    margin-left: .2em;
    color: #F00;
    font-weight: bold;
}

.bPageTitle .metadata .tagHeader .tagHeaderLists {
    background-color: #E8E8E8;
    border-top: 1px solid #E8E8E8;
    vertical-align: middle;
    padding: .4em 0px .4em 2px;
}

.bPageTitle .metadata .tagHeader .tagHeaderLists .tagHeaderImg {
    vertical-align: middle;
    padding: 0px 2px 0px 0px;
}

.bPageTitle .metadata .tagHeader .tagHeaderLists .myTags {
    vertical-align: middle;
    font-weight: bold;
}

.bPageTitle .metadata .tagHeader .tagHeaderLists .tagList {
    vertical-align: middle;
    margin-left: .2em;
    margin-right: .5em;
}

.editTags {
    margin-right: .5em;
    margin-left: .2em;
    font-weight: bold;
    vertical-align: middle;
}

.bPageTitle .tagDropDown {
    border-top: 1px solid #fff;
    background-color: #e0e0e0;
    padding-top: .2em;
    padding-bottom: .2em;
    width: 100%;
    clear: left;
    white-space: normal;
}

.bPageTitle .tagDropDown #tag_edit_error {
    background-color: #FFFFCC;
    width: 95%;
    padding: .2em;
    margin: .5em;
}

.bPageTitle .tagDropDown .tagDropDownContent {
    padding: .5em;
    width: 100%;
    text-align: right;
}

.bPageTitle .tagDropDown .tagDropDownContent .tagHelp {
    padding-top: 0em;
}

.bPageTitle .tagDropDown .tagDropDownContent .tagHelp div {
    font-size: 91%;
}

.bPageTitle .tagDropDown .tagDropDownContent .tagHelp a span {
    text-decoration: none;
    margin-right: 0.5em;
}

.bPageTitle .tagDropDown .tagDropDownContent .tagHelp a {
    text-decoration: none;
}

.bPageTitle .tagDropDown .tagDropDownContent .tagButtons {
    width: 100%;
    text-align: center;
}

.bPageTitle .tagDropDown .tagDropDownContent .my_tags {
    font-weight: bold;
    padding: 0px;
    margin-right: 1em;
    text-align: left;
    width: 45%;
}

.bPageTitle .tagDropDown .tagDropDownContent .solo {
    width: 90%;
}

.bPageTitle .tagDropDown .tagDropDownContent .my_tags .tagList {
    font-weight: normal;
    font-size: 91%;
    margin-left: 5px;
}

.bPageTitle .tagDropDown .tagDropDownContent .my_tags .tagList .tag {
    white-space: nowrap;
}

.bPageTitle .tagDropDown .tagDropDownContent .my_tags .tagList .tagRemove {
    color: rgb(204, 0, 0);
    font-weight: bold;
    cursor: pointer;
}

.bPageTitle .tagDropDown .tagDropDownContent textarea {
    margin-top: .2em;
    padding: 1px 0px 0px 2px;
    overflow-y: hidden;
    overflow-x: auto;
    width: 100%;
}

.bPageTitle .tagDropDown .tagDropDownContent .example {
    margin-top: -2px;
    text-align: left;
    color: #FFF;
    font-size: .9em;
}

.bPageTitle .ptBody .links .helpLink,
.bWizardBlock .helpLink,
.bEditBlock .booleanFilterTopMargin .helpLink,
.bPageBlock .pbBody .pbSubblock .pbSubbody .helpLink {
    text-decoration:none;
    padding-right: 5px;
}

.bPageTitle .ptBody .links .helpIcon,
.bWizardBlock .helpIcon {
    vertical-align:bottom;
}

.bPageTitle .ptBody .links a,
.bWizardBlock .pbLinks a {
    text-decoration:none;
}
/*for advanced filter option help link*/
.bEditBlock .booleanFilterTopMargin .helpIcon {
    vertical-align: text-bottom;
}
a.tipsLink, a.tipsLink:hover {
    text-decoration: none;
}

.bWizardBlock .pbWizardHelpLink a {
    text-decoration: none;
}

.bPageTitle .content .blank {
    font-size: 0%;
    clear:both;
}

.bPageTitle .ptBody .content .icon{
    position: absolute;
    margin-top: -5px;
}
.bPageTitle .ptSubheader .content {
    padding-left:20px;
    padding-bottom:2px;
    padding-top:2px;
    height:40px;
}
.bPageTitle .ptBody .pageType {
    font-size: 91%;
}
.bPageTitle .ptBody .pageDescription {
    font-size: 109%;
    font-weight:bold;
}

.bPageTitle .ptSubheader .pageType {
    font-size: 91%;
}
.bPageTitle .ptSubheader .pageDescription {
    font-size: 109%;
    font-weight:bold;
}

.bPageTitleButton {
  float: right;
}



.oRight .bPageTitle .ptBody a,
.oRight .bPageTitle .ptSubheader a,
.outerNoSidebar .bPageTitle a .helpLink {
}
/* begin record types */
.oRight .recordTypesHeading{
    display: block;
     font-weight: bold;
     padding: 1em 0 1em 0;
}

.oRight .infoTable {
     background-color:#666666;
     text-align: left;
}

.oRight .infoTable .headerRow th{
     white-space: nowrap;
     background-color:#CCC;
     padding:3px;
     margin:1px;
     font-weight: bold;
     border: none;
}

.oRight .infoTable td,
.oRight .infoTable th{
     white-space: nowrap;
     background-color:#FFF;
     padding:4px;
     margin:1px;
     border: solid #DDD;
     border-width: 0 1px 1px 0;
 }

.oRight .infoTable th{
     border-left-width: 1px;
}
/* END record types */


/* working defaults, so you can at least read the text */
.bPageTitle .ptHeader{
    background-color: black;
}

/* this should be a not-very specific case so that it doesn't override custom tab pages */
.ptBody {
    background-color: #666;
}

/* END Page Title */
/* --------------------------------------------- */
/* BEGIN Overview Page elements */
/* Added to set up two-column divs for Tools displayed at bottom of each tab */
.toolsContent {
    width: 100%;
}
/* Overview Page Headers */
.overviewHeaderDescription {
    float: left;
    padding: 5px 15px 15px 5px;
}
.overviewHeaderContent {
    float: right;
    padding: 5px 15px 15px 5px;
}

/* bSubBlock */

.bSubBlock{
    margin-bottom:15px;
    border-top:0px;
    border-right:0px;
    border-bottom:2px solid #000;
    border-left:0px;
}

.bSubBlock .lbHeader {
    padding:2px 13px 2px 13px;
    font-weight:bold;
    font-family: 'Arial', 'Helvetica', sans-serif;
    display:block;
    float: none;
}
.bSubBlock .lbHeader .spacer {
    clear: both;
    font-size: 0%;
}

.bSubBlock .lbSubheader {
    padding:10px 0px 1px 13px;
    font-weight:bold;
}
.bSubBlock .lbBodyDescription {
    background-color:#F3F3EC;
    padding:10px 23px 5px 26px;
}
.bSubBlock .lbBody {
    background-color:#F3F3EC;
    padding:10px 23px 10px 26px;
    line-height:1.6em;
    height: 100%;
}
.bSubBlock .lbBody td , .bSubBlock .lbBody th {
    padding:0px 5px 1px 0px;
    vertical-align:middle;
    text-align:left;
}
.bSubBlock .lbBody span{
    vertical-align:middle;
}
.bSubBlock .lbBody UL {
    margin: 0px;
    padding: 0px;
    list-style-type: none;
}
.bSubBlock .lbBody LI, .bSubBlock .lbBody .bSummary {
    line-height: 2em;
    padding: 0px;
    margin: 0px;
}
 .bSubBlock .lbBody .bSummary td,
  .bSubBlock .lbBody .bSummary th  {
    padding:.10em .69em .10em .00em;
    vertical-align:middle;

 }

.bSubBlock .lbBody .mainLink {
    font-weight: bold;
}

.bReport .bSubBlock .lbHeader, .bTool .bSubBlock .lbHeader {
    background-color:#DF8810;
}
.bReport .bSubBlock, .bTool .bSubBlock{
    border-right-color:#DF8810;
    border-bottom-color:#DF8810;
}

.bSubBlock .textDate{
    width:80px;
    margin:1px;
    margin-right:1px;
    font-size: 91%;
}
.bSubBlockselect {
    font-size: 91%;
}
.bSubBlock .lbHeader .primaryInfo {
    float: left;
    width: 50%;
}
.bSubBlock .lbHeader .secondaryInfo {
    text-align: right;
    float: left;
    width: 50%;
}
/* END Overview Page Elements */
/* --------------------------------------------- */
/* BEGIN Basic DetailElement */
.bPageBlock {
    border:1px solid #00a4c8;
    clear: both;
}

.bPageBlock .pbError, .editListError {
   font-weight: bold;
   color: #C00;
   text-align: center;
}

/* used for information message in header.. same as pbError plus some padding */
/* I think pbError should have some padding too but what do I know */
.pbInfo {
   font-weight: bold;
   color: #090;
   text-align: center;
   padding-bottom:10px;
}


.bPageBlock .pbHeader {
    margin:0px 2px 0px 0px;
    padding-bottom:2px;
    background-color: #EEECD1;
    border-bottom: 1px solid #fff;
}

.pbSubheader {
    background-color:#222;
    font-weight:bold;
    font-size: 91%;
    padding:2px 2px 2px 5px;
    margin-top: 15px;
    overflow: hidden;
    margin-bottom: 2px;
}
.pbSubheader.first {
    margin-top: 0;
}

.pbSubheader .pbSubExtra {
    float: right;
    margin-right: 2em;
}

.pbSubbody {
    padding: 10px;
}

.pbSubbody ul {
    padding: 0;
    margin: 0;
}

.detailPage .bPageBlock,
.editPage .bPageBlock {
    border-top-width:7px;
}

.detailPage .bRelatedList .bPageBlock,
.editPage .bRelatedList .bPageBlock {
    border-top-width:4px;
}

.bRelatedList .bPageBlock .pbButton {
   white-space: normal;
}

.bRelatedList .bPageBlock .pbButton .btn {
    margin: 0 1px;
}

.bRelatedList .bPageBlock .pbButton .relatedInfo {
  padding-right:3.7em;
  vertical-align: bottom;
  white-space: normal;
}
.bRelatedList .bPageBlock .pbButton .relatedInfo .mouseOverInfoOuter{
  vertical-align: bottom;
}

/* added by polcari 9/27 in an effort simplify spacing & alignment issues (see new event page) */
.bEditBlock input,
.bEditBlock select,
.bEditBlock img,
.quickCreateModule input,
.quickCreateModule select,
.quickCreateModule img {
    vertical-align: middle;
    margin-right: .25em;
}
.bEditBlock input.radio {
    vertical-align: baseline;
}

.requiredLegend {
    padding: 0 2px;
    background-color: #FFF;
    font-weight: normal;
    color: #000;
}

/*For EditHeaderElement*/
.headerTitle .requiredLegend {
    float: right;
}

.requiredExampleOuter {
    margin: 0 0.2em 0 0.3em;
    padding: 1px 0;
}

.requiredExample {
    border-left: 3px solid #c00;
    font-size: 80%;
    vertical-align: 1px;
    width: 100%;
}

.bPageBlock .pbHeader .pbIcon{
    width: 44px;
}

.bPageBlock .pbTitle{
  vertical-align:middle;
  color:#222;
  font-size: 91%;
  width: 30%;
  margin:0px;
}

/*this enforces a minimum width for the pbTitle cell */
.bPageBlock .pbTitle img.minWidth {
  height:1px;
  width:190px;
  margin: 0 0 -1px 0;
  padding: 0;
  border: 0;
  visibility:hidden;
  display: block;
}

.bPageBlock .pbHeader table,
.bPageBlock .pbBottomButtons table {
    border-spacing:0;
    width: 100%;
}

.bPageBlock .pbButton {
    padding: 1px 0px;
    vertical-align: middle;
}
.bPageBlock .pbButtonb{
    padding: 1px 0px;
}
.bPageBlock .pbDescription {
    text-align:right;
}

.bPageBlock .pbHeader .pbLinks {
    font-size: 91%;
    text-align:right;
    padding:1px 5px 1px 1px;
    vertical-align:middle;
}
.bPageBlock .pbCopy {
    text-align:left;
    font-size: 91%;
    padding:3px 0px 5px 0px;
}
.bPageBlock .pbDescription span {
    font-size: 91%;
    padding:3px 0px 5px 0px;
}

.bPageBlock .pbHeader select,
.bPageBlock .pbBottomButtons select {
    font-size: 91%;
    margin:1px 7px 0px 0px;
}

.customLinks {
    width: 100%;
}

.customLinks td {
    width:33%;
    padding:2px;
}

.customLinks td .bullet {
    display:none;
}

/* h2 used for detail element headers */
/* h3 used for related list headers */
.pbHeader .pbTitle h2 ,
.pbHeader .pbTitle h3 {
    margin: 0 0 0 4px;
    padding: 0;
    display:block;
    color: #333;
}

.bPageBlock .pbHeader .pbTitle .twisty {
    width:16px;
    height:10px;
    background-color:#222222;
    border-bottom:none;
}
.bPageBlock .pbHeader .pbHelp .help{
    font-size: 91%;
    vertical-align:middle;
    width:auto;
}
.bPageBlock .pbHeader .pbHelp .help .imgCol{
    width: 22px;
}
.bPageBlock .pbHeader .pbHelp .help a.linkCol{
/*  white-space: nowrap; */
    padding-right: 0.5em;
    vertical-align:bottom;
    text-decoration:none;
}

.bPageBlock .pbHeader .pbHelp .help .linkCol .linkSpan{
    font-size: 100%;
/*  white-space: nowrap; */
    vertical-align:bottom;
    margin-right:0.40em;
    text-decoration:underline;
}

.bPageBlock .pbHeader .pbHelp .help .linkCol .helpIcon {
    vertical-align:bottom;
}

.bPageBlock .pbHeader .pbHelp {
    text-align:right;
    padding:1px 5px 1px 1px;
    vertical-align:middle;
}

.bPageBlock .pbHeader .pbCustomize {
    font-size: 91%;
    padding:3px 2px 2px 10px;
    vertical-align:middle;
    text-align:right;
}
.bPageBlock .pbBody {
/*    margin-right:2px;*/
    padding:10px auto;
/*    background-color:#f3f2f1;*/
}
/* .bPageBlock .pbFooter,
.bWizardBlock .pbFooter {
  background-color:#222;
    height:9px;
    width:9px;
    display:block;
    float:right;
    background-image:  url(/img/bgPageBlockRight.gif);
    background-repeat: repeat-x;
    background-position: right bottom;
}*/

.bPageBlock .pbBottomButtons {
    background-color: #F3F3EC;
    margin: 1px 2px 0 0;
}

.bPageBlock .noRecords {
    font-weight:bold;
    color:#333;
    padding-bottom: 15px;
}

/* Detail List - BEGIN */
.bPageBlock .detailList {
    width:100%;

}

.bPageBlock .detailList th,
.bPageBlock .detailList td {
    vertical-align:top;
}

/* RPC: Made less specific so these classes can be used in FilterEditPage */
.bPageBlock .labelCol {
    padding:2px 10px 2px 2px;
    text-align:right;
    font-size: 91%;
    font-weight: bold;
    color:#333;
}

label .labelDesc {
    color:#666;
}

.bPageBlock .detailList .labelCol {
    width: 18%;
}
/* RPC: Made less specific so these classes can be used in FilterEditPage */
.bPageBlock .dataCol {
    padding:2px 2px 2px 10px;
    text-align:left;
}
.bPageBlock .detailList .dataCol {
    width:32%;
}

.hoverDetail .bPageBlock .detailList .dataCol {
    width:82%;
}

.bPageBlock .detailList .data2Col {
    padding: 2px 2px 2px 10px;
    text-align: left;
    width: 82%;
}

.bPageBlock .buttons {
    text-align: center;
    padding: 3px 20px;
}

/* Note: this overrides the above selector on edit pages,
   so it must come afterwards
*/
.bEditBlock .detailList .dataCol,
.bEditBlock .detailList .data2Col {
    padding: 0 2px 0 10px;
}

.bPageBlock .detailList .col02{
    border-right: 2px solid #f3f2f1;
}
.editPage .bPageBlock .detailList tr td,
.editPage .bPageBlock .detailList tr th {
  border-bottom: none;
}

.bPageBlock .detailList tr td, .bPageBlock .detailList tr th,
.hoverDetail .bPageBlock .detailList tr td,
.hoverDetail .bPageBlock .detailList tr th {
    border-bottom:1px solid #f3f2f1;
}
.bPageBlock .detailList th.last,
.bPageBlock .detailList td.last,
.bPageBlock .detailList tr.last td,
.bPageBlock.bLayoutBlock .detailList tr td,
.bPageBlock.bLayoutBlock .detailList tr th {
    border-bottom:none;
}
.bPageBlock .detailList table td,
.bPageBlock .detailList table th {
    border-bottom-style: none;
}

.bPageBlock .detailList .bRelatedList .pbTitle {
  vertical-align: middle;
}

.bPageBlock .detailList .error,
.bPageTitle .tagDropDown #tag_edit_error,
.bPageTitle .tagDropDown .tagDropDownContent .error,
.tagRenameMenu .error,
.inlineEditDiv .error,
.inlineEditRequiredDiv .error {
    border: 2px solid #C00;
}

.bPageBlock .detailList .empty {
    border-bottom: none;
}

.bPageBlock .detailList .errorMsg {
    padding-left: 3px;
}

/* RPC: detailList commented out so others can use requiredInput */
.bPageBlock .requiredInput {
    position: relative;
    height: 100%;
}

.bPageBlock .requiredInput .requiredBlock {
    background-color: #C00;
    position: absolute;
    left: -4px;
    width: 3px;
    top: 1px;
    bottom: 1px;
}


.bPageBlock .requiredInput .requiredBlock.noLabel {
    height: 1.7em;
}

.bPageBlock .doubleCol{
    width: 100%;
}

.bPageBlock .doubleCol th{
    width: 14.5%;
}

.bPageBlock .requiredMark {
    color: #F3F3EC;
}

.pbBody .bPageBlock .pbHeader,
.pbBody .bPageBlock .pbTitle,
.pbBody .bPageBlock .pbLinks ,
.pbBody .bPageBlock .pbLinks a {
    color: #FFF;
}

.bPageBlock .subgroup {
    padding: 0 0 0 10px;
    margin: 0;
    list-style-type: none;
}

.bPageBlock .subSubHeader {
    display: block;
    padding-left: 5px;
    margin-top: 10px;
    color: #333;
}

/* Detail List - END */

/* BEGIN Inline edit */

.detailList .inlineEditLock,
.detailList .inlineEditLockOn,
.detailList .inlineEditWrite,
.detailList .inlineEditWriteOn,
.listViewport .inlineEditLock .x-grid3-cell-inner,
.listViewport .inlineEditLockOn .x-grid3-cell-inner,
.listViewport .inlineEditWrite .x-grid3-cell-inner,
.listViewport .inlineEditWriteOn .x-grid3-cell-inner {
    padding-right: 16px;
}


.detailList .inlineEditLockOn {
    background: url(/img/func_icons/util/lock12.gif) no-repeat 100% 2px;
}

.detailList .inlineEditWriteOn {
    background: url(/img/func_icons/util/pencil12.gif) no-repeat 100% 2px;
}

.listViewport .inlineEditLockOn .x-grid3-cell-inner {
    background: url(/img/func_icons/util/lock12.gif) no-repeat 100% 4px;
}

.listViewport .inlineEditWriteOn .x-grid3-cell-inner {
    background: url(/img/func_icons/util/pencil12.gif) no-repeat 100% 4px;
}

.detailList .inlineEditWriteOn {
    background-color: #fff;
}

.listViewport .inlineEditWriteOn .x-grid3-cell-inner {
    background-color: #E1F6FF;
}

.inlineEditUndo { background-image: url(/img/func_icons/util/ileUndo16.gif);
	background-position: 0px 0px;width:16px;
	height:16px;
    vertical-align: middle;
}

.inlineEditUndoLink {
    display: none;
    margin-left: 2px;
}

.inlineEditModified .inlineEditUndoLink {
    margin-left: 6px;
}

.inlineEditRequiredDiv,
.inlineEditDiv {
    display: none;
}

.listViewport .inlineEditRequiredDiv,
.listViewport .inlineEditDiv {
    display: block;
}

.inlineEditRequiredDiv .lookupInput img,
.inlineEditDiv .lookupInput img {
    vertical-align: middle;
}

.inlineEditRequiredDiv {
    padding-left: 1px;
    border-left: 3px solid #c00;
}

.inlineEditRequiredMark {
    background-color: #c00;
    color: #c00;
    height: 90%;
}

.inlineEditCompoundDiv .inlineEditRequiredMark {
   padding: 3px 0 2px 0;
   margin-right: 1px;
}

.inlineEditCompoundDiv .textCounterMiddle {
    position:absolute;
    bottom:20px;
    left:80px;
}

.inlineEditModified {
    color: #ff6a00;
    font-weight: bold;
}

.inlineEditDialog .inlineEditRequiredDiv,
.inlineEditDialog .inlineEditDiv {
    display: block;
    padding-right: 20px;
}

.inlineEditDialog .innerContent {
    text-align: center;
}

.inlineEditDialog .innerContent table {
    text-align: left;
}

.inlineEditDialog .innerContent .fieldTable {
    width: 100%;
}

.inlineEditDialog .innerContent .fieldTableDiv {
    border-style: solid;
    border-color: #999;
    border-width: 1px;
    background-color: #FFF;
    margin-bottom: 5px;
    padding: 20px 0;
}

.inlineEditDialog .innerContent .fieldTableDiv .labelCol {
    width: 40%;
}

.inlineEditDialog .labelCol {
    padding: 2px 10px 2px 2px;
    text-align: right;
    font-size: 91%;
    font-weight: bold;
    color: #333;
}

.inlineEditDialog .dataCol .radio {
    margin: 3px 0px 5px;
}

.inlineEditDialog .dataCol .radio label {
    margin-left: 5px;
}

.inlineEditDialog .selectionRow {
    vertical-align: top;
}

.inlineEditDialog .selectionRow .data {
    padding-top: 2px;
}

.inlineEditDialog .inlineEditButtons {
    margin-top: 8px;
}

/* END Inline Edit */

/* START overlay Dialog */
.clickAndCreateDialog .secondaryPalette {
    background-color: #F5F5F5;
}

.clickAndCreateDialog .innerContent {
    padding:0px 16px 8px 0px;
}

.clickAndCreateDialog .bPageBlock {
    background-color: #F5F5F5;
    margin-bottom: 0px;
    padding-bottom: 0px;
    border-top: none;
}
.clickAndCreateDialog .bPageBlock .pbBody {
    background-color: #F5F5F5;
    margin-right: 0px;
    border: 0px;
}
.clickAndCreateDialog .bPageBlock .detailList {
    border: 0px;
}
.clickAndCreateDialog .bPageBlock .pbFooter  {
    display: none;
}

.clickAndCreateDialog .bPageBlock .pbHeader {
    display: none;
}
.clickAndCreateDialog .bPageBlock .pbBottomButtons {
    background-color: #F5F5F5;
    text-align: right;
    padding-top: 0px;
    margin: 0px;
}

.overlayDialog .bPageBlock .pbBottomButtons .pbTitle {
    display: none;
}

.overlayDialog .bPageBlock .detailList tr td,
.overlayDialog .bPageBlock .detailList tr th {
    border-bottom:0px;
    padding-bottom: 2px;
    padding-top: 2px;
}

.clickAndCreateDialog .innerContent .link {
    margin-right: 1em;
}

.clickAndCreateDialog .overlayError .errorText {
    padding-top: 20px;
    padding-bottom: 8px;
    padding-left: 8px;
    text-align: center;
}

/* END overlay Dialog */

/* BEGIN rowsPerPage Dialog */

.RPPDialog .innerContent .message {
    margin: 0 0 5px;
    text-align: left;
}

.RPPDialog .innerContent .warningM4 .msgIcon {
    margin-right: 5px;
}

.RPPDialog .innerContent .radioDiv {
    background-color: #FFFFFF;
    border-color: #999999;
    border-style: solid;
    border-width: 1px;
    padding: 10px 0 10px 50px;
    text-align: left;
}

.RPPDialog .innerContent .radio {
    margin:3px 0px 5px;
}

.RPPDialog .innerContent .radio label {
    padding-left: 4px;
}

.RPPDialog .innerContent .RPPSelect {
    margin-left: 3px;
}

/* END rowsPerPage Dialog */
/* --------------------------------------- */
/* BEGIN InlineScheduler page */

.inlineScheduler .calendarHeader .legend img {
    height: 14px;
    width: 14px;
    margin-top: 0px;
}

.inlineScheduler .x-panel-body {
    margin: 0px;
}

.inlineScheduler .calendarPanel .x-panel-body {
    background-color: #F3F3EC;
}

.inlineScheduler .bCalendar .bPageBlock .pbBody .calendarDayWeekView {
    background-color: #F3F3EC;
    border-color: #999999;
}

/* END InlineScheduler page */
/* --------------------------------------- */
/* START toggle calendar footer for Inline Schedularoverlay Dialog */
.inlineSchedulerFooter {
}

.inlineSchedulerFooter, .toggleCalFooterLeft {
    background-image:url(/img/cal/footer/bg.gif);
    background-position:left top;
    background-repeat:repeat;
    border-bottom:1px solid #A4A29E;
    margin-top:0px;
    height: 25px;
}

.inlineSchedulerFooter .toggleCalFooterRight {
    background-image:url(/img/cal/footer/bg.gif);
    background-position:right top;
    border-bottom:0px;
    background-repeat:repeat;
    height: 25px;
}


.inlineSchedulerFooter .toggleCalFooterMiddle {
    background-image:url(/img/cal/footer/bg.gif);
    border-bottom:0px;
    background-repeat:repeat;
    height: 25px;
    margin: 0px 6px 0px 6px;
    text-align:right;
}

.inlineSchedulerFooter .toggleCalendarOpen {
    float: right;
    border-left: thin solid #c1c1c6;
    border-right: thin solid #c1c1c6;
    padding: 5px;
    background-image:url(/img/cal/footer/open_bg.gif);
}

.inlineSchedulerFooter .toggleCalendarClose {
    float: right;
    border-left: thin solid #b5b5b5;
    border-right: thin solid #b5b5b5;
    padding: 5px;
    background-image:url(/img/cal/footer/close_bg.gif);
}
/* END toggle calendar footer for Inline Schedularoverlay Dialog */
/* END Basic DetailElement */
/* ------------------------------------------ */
/* BEGIN Related List*/
.bPageBlock .pbHeader .listHeader {
    padding-top: 1px;
    text-align: center;
    vertical-align: middle;
}

.bPageBlock .pbHeader .listHeader span {
    font-size: 100%;
    padding-right: 0.91em;
}

.listHeader .btn {
    margin: 0 1px;
}
.bPageBlock .alignCenter {
    text-align:center;
}
.bPageBlock .list {
    width:100%;
}

/* polcari: I dropped the .bPageBlock to make this less specific in in hopes of fixing some problems w/ font color on the custom-tab picker page.
   Let me know if it causes problems & i'll devise a better workaround */
.list td,
.list th,
body.oldForecast .list .last td,
body.oldForecast .list .last th {
    padding: 4px 2px 4px 5px;
    color: #0099cc;
	border-right: 1px solid #00A4C8 ;
    /*border-bottom: 1px solid #E3DEB8;*/
}

.bPageBlock .list .last td,
.bPageBlock .list .last th,
body.oldForecast .list .totalRow td,
body.oldForecast .list .totalRow th {
    border-bottom-width: 0;
}

.bPageBlock td.actionColumn .actionLink,
#stt td.actionColumn .actionLink {
    color: #333;
    font-weight:bold;
    vertical-align: top;
}

.list .iconColumn,
.list .actionColumn {
    width: 1%;
}

.list th.actionColumn * {
    vertical-align: top;
}

/*ie behaves slightly differently - check common_ie for details */
.list .actionColumn input {
    margin-top: 2px;
    vertical-align: top;
    margin-bottom: 1px;
}

/* BEGIN TimePickerInputElement */

.timeContainer {
    z-index: 0;
}
.timeInputInactive {
    color: #CCC;
}
.timeInputActive {
    color: #000;
}

.timePicker {
    position: absolute;
    z-index: 500;
    width: 100px;
    background-color: #FFF;
    border: 1px solid #333;
    overflow: auto;
    padding: 0;
    margin: 0
}
.timePicker ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
}
.timePicker ul li {
    margin: 0;
    padding: 2px;
}
.timePicker ul li a {
    text-decoration: none;
    display: block;
}
.timePicker ul li a:hover {
    background-color: #0033CC;
    color: #FFF;
    text-decoration: none;
}

/* END  TimePickerInputElement */

/* Related List text formatting */

.list .headerRow th {
	/*border-bottom: 2px solid #CCC;*/
    color: #FFF;
	background-color:#00A4C8;
	white-space: nowrap;
	font-size:11px;
	font-variant:small-caps;
}

.list .noRows, .bRelatedList .list .noRowsHeader {
    padding-bottom: 0;
    border-bottom: none;
    font-weight: normal;
    font-size: 91%;
}

.listHoverLinks,
.RLPanelShadow {
    display: none;
}

.backToTop {
    display: none;
}

.list tr.even th{
    font-weight: normal;
	color:#00a4c8 ;
    white-space: normal;
	background-color:#FFF;
}

.list tr.odd th {
    font-weight: normal;
	color:#00a4c8 ;
    white-space: normal;
	background-color:#FFF;
}

.list tr.even th:hover{
    font-weight: normal;
	color:#00a4c8 ;
    white-space: normal;
	background-color:#f3f2f1;
}

.list tr.odd th:hover {
    font-weight: normal;
	color:#00a4c8 ;
    white-space: normal;
	background-color:#f3f2f1;
}

.list tr.even th,
.list tr.odd th ,
.list tr.even td,
.list tr.odd td {
    vertical-align: top;
}

.list .booleanColumn {
    text-align: center;
}

.searchResults .list .booleanColumn img {
    vertical-align:bottom;
}

.list .numericalColumn,
.list .numericalColumn,
.list .CurrencyElement,
.list .QuoteDocCreatedBy {
    text-align:right;
}

.bPageBlock .pbInnerFooter table {
    width: 100%;
}

.list .CurrencyElement, .list .PhoneNumberElement, .list .DateElement {
    white-space: nowrap;
}
/*polcari: I cut out ".bPageBlock .list" to make this less specific and not conflict tables inside a row (custom tab picker).
If this causes problems, let me know there is another easy solution i can pursue */
.highlight td,
.highlight th {
    background-color:#FFF;
}

.listAction {
    font-size: 91%;
}

.actionColumn {
    white-space:nowrap;
}

/* End Related List text formatting */

.bPageBlock .list .divide td {
    border-bottom:none;
    padding-bottom:15px;
}

.bPageBlock .reportHeader {
    padding-bottom:10px;
}
.bPageBlock .reportHeader .booleanFilter,
.bPageBlock .reportHeader .itemNumber,
.bPageBlock .reportHeader .filterField,
.bPageBlock .reportHeader .filterValue,
.bPageBlock .reportHeader .filterAction,
.bPageBlock .reportHeader .topnAction {
    font-weight: bold;
}
.bPageBlock .reportOutput td, .bPageBlock .reportOutput th {
    vertical-align:top;
    padding:3px 2px 3px 5px;
    color:#333;
    white-space: normal;
}
.bPageBlock .reportOutput td.nowrapCell,
.bPageBlock .reportOutput th.nowrapCell {
    white-space: nowrap;
}
.bPageBlock .reportOutput {
    padding-bottom:15px;
    width:100%;
}
.bPageBlock .reportOutput .colSpan td {
    vertical-align:middle;
}
.bPageBlock .reportOutput th {
    border-top:none;
    text-align:left;
}
.bPageBlock .reportOutput .odd {
    background-color: #FFF;
}
.bPageBlock .reportOutput .even {
    background-color: #F3F3EC;
}

.bPageBlock .reportOutput a:active,
.bPageBlock .reportOutput a:hover {
    color: #666;
}

.bPageBlock .componentTable .col01, .bPageBlock .componentTable .col02 {
    padding-right:15px;
}

.categoryTitle {
    margin-bottom:10px;
    font-weight:bold;
}
.bPageBlock .categoryList td, .bPageBlock .categoryList th {
    text-align:left;
    padding:3px 2px 3px 5px;
    color:#333;
}
.bPageBlock .categoryList {
    padding-bottom:15px;
}
.bPageBlock .formTable h3 {
    padding:15px 0px 10px 0px;
    display:block;
    font-weight:bold;
}
.bPageBlock .formTable td {
    padding-left:0.89em;
}
.bPageBlock .formTable .bHeader {
    text-indent:-0.63em;
    font-weight:bold;
}
.bPageBlock .formTable .bBody {
    font-size: 91%;
}
.bPageBlock .formTable .asterisk{
    color:#c00;
}
.bPageBlock .textBox {
    width:160px;
    margin:1px;
    margin-right:7px;
}

.bPageBlock .cbCol {
    vertical-align:middle;
}
.bPageBlock .cbCol input {
    margin:-2px 0px -2px 0px;
}

/* we don't want to see the rolodex & prev/next buttons in most places */
.listElementBottomNav {
    display:none;
}

/* ok, it's nice to see the rolodex & prev/next buttons here */

.recycleBin .listElementBottomNav,
.listPage .listElementBottomNav,
.product .listElementBottomNav {
    display: block;
}

.listElementBottomNav .bNext .clear {
    clear:none;
    display:none;
}

/* END Related List */




/* begin document styles */

/* Center the New Document and New Email Template buttons and fix padding */
/* rchen - removing this because I don't think it's needed any more*/
/*.listDocument .bPageBlock .pbHeader {
    text-align: center;
    padding: 2px 0 2px 0;
}*/



/* End document Styles */


/* BEGIN Intro Page elements */

.introBody {
    width: 951px;
}

.introBody .introTitle{
    font-weight: bold;
}
.introBody .introForm {
    background-color: #E8E8E8;
    width: 225px;
    vertical-align:top;
    border-left:20px solid #fff;
}

.introBody .introFormBody {
    padding:1em;
    font-size:91%;
    text-align: center;
}
.introBody .introFormBody .formDescription {
    padding: 10px 0 20px 0;
    text-align: left;
}

.introBody .introForm .requiredMark {
    color:red;
    font-size:109%;
}

.introBody .introForm .inputLabel {
    padding-top:10px;
    font-weight:bold;
}

.introBody .introForm .formDescription{
    padding-top:10px;
    padding-bottom:15px;
}

.introBody .introForm .requiredDescription{
    padding-bottom:20px;
    text-align:right;
    font-weight:bold;

}

.introBody .formTitle {
    background-color: #999;
    padding:0.1em 1em 0.1em 1em;
    font-weight:bold;
    color:#fff;
}

.introBody .introDescription {
    background-color:#F3F3EC;
    padding:1.0em;
    background-repeat: no-repeat;
    background-position: left top;
    width:951px;
}

.introBody .introDescription .contentDescription {
    font-size:109%;
    width:70%;
    float:left;
    padding: 5px 0 20px 0;
}

.introBody .introDescription .demoDescription {
    font-size:109%;
    width:27.5%;
    float:right;
    padding-left:2.5%;

}

.introBody .introDescription .helpAndTraining {
    vertical-align:top;
    width:28%;
    float:right;
    padding-left:2%;
}

.introBody .introDescription .benefitsDescription{
    vertical-align:top;
    width:70%;
    float:left;
}

.introBody .introDescription .demoBox {
    background-color:#FFF;
    border:1px solid #000;
    margin:10px;
    width:170px;
}

.introBody .introDescription .demoBox .demoTitle {
    background-color:#000;
    color:#FFF;
    font-weight:bold;
    text-align:left;
}

.introBody .introDescription .demoBox .demoImage {
    background-color:#000;
    border-bottom:1px solid #000;
    width:71px;
}

.introBody  .introDescription .nestedModule {
    background-color: #F3F3EC;
    border-color: #F3F3EC;
    font-size:91%;
}

.introBody  .introDescription .nestedModuleInner {
    padding-bottom:70px;
}

.introBody  .introDescription .continue {
    text-align:right;
    float:right;
    width:8%;

}

.introBody  .introDescription .buttons {
    width:98%;
    clear: both;
    overflow:hidden;

}

.introBody  .upperBorder {
    padding-top:1.31em;
}

.introBody  .lowerBorder {
    padding-bottom:2px;
}

 .introBody .screenShot {
     margin: 25px auto;
     vertical-align:bottom;
 }




.accountTab .introBody .introDescription { background-image: url(/img/accountsSplashBg.gif); }
.campaignTab .introBody .introDescription {  background-image: url(/img/campaignsSplashBg.gif); }
.caseTab .introBody .introDescription {  background-image: url(/img/casesSplashBg.gif); }
.contactTab .introBody .introDescription { background-image: url( /img/contactsSplashBg.gif); }
.contractTab .introBody .introDescription {background-image: url( /img/contractsSplashBg.gif); }
.dashboardTab .introBody .introDescription { background-image: url(/img/dashboardsSplashBg.gif); }
.documentTab .introBody .introDescription { background-image: url(/img/documentsSplashBg.gif); }
.forecastTab .introBody .introDescription { background-image: url(/img/forecastsSplashBg.gif); }
.leadTab .introBody .introDescription { background-image: url(/img/leadsSplashBg.gif); }
.opportunityTab .introBody .introDescription {background-image: url( /img/opportunitiesSplashBg.gif); }
.portalTab .introBody .introDescription { background-image: url(/img/portalsSplashBg.gif); }
.productTab .introBody .introDescription {background-image: url( /img/productsSplashBg.gif); }
.reportTab .introBody .introDescription { background-image: url(/img/reportsSplashBg.gif); }
.solutionTab .introBody .introDescription { background-image: url(/img/solutionsSplashBg.gif); }


/* END Intro Page elements */
/* --------------------------------------- */
/* BEGIN EventPage */

.eventTab div.recurrenceHeader,
.taskTab div.recurrenceHeader {
    padding: 8px 0 8px 5px;
    border-right-style: solid;
    border-right-width: 2px;
    background-color: #F3F3EC;
    border-color:#4F9241;
}

.eventTab div.recurrenceSectionBackground,
.taskTab div.recurrenceSectionBackground {
    padding: 8px 0 8px 5px;
    background-color: #F3F3EC;
}

.currentUser {
    font-weight:bold;
}

.hiddenWarning {
    display: inline;
    visibility: hidden;
    padding-left: 10px;
}

/* END EventPage */
/* --------------------------------------- */
/* BEGIN Tree pages */
.bTitle {
    border-bottom: 1px solid #000;
    margin-bottom: 4px;
    padding-bottom: 6px;
}

.bTitle h2 {
    font-size: 109%;
}

.bTitle .viewSelect {
    float: right;
}
/* END Tree pages */
/* --------------------------------------- */
/* BEGIN single user calendar */

.bCalendar .taskList {
    width: 50%;
    padding-left: 10px;
}

.bCalendar .calendarBlock {
    width: 50%;
}

.bCalendar .bTopButtons {
    text-align: right;
    margin-bottom: 2px;
}

.bCalendar .calHeader {
    clear: both;
    padding-top: 5px;
    white-space: nowrap;
}

.bCalendar .calendarIconBar {
    white-space: nowrap;
    text-align: right;
    padding-bottom: 5px;
}

.bCalendar .bPageBlock .calendarIconBar * {
    float: none;
    display: inline;
}

.bCalendar .bPageBlock .pbTitle h3{
    padding: 3px 0 7px 0;
    font-weight: bold;
    width: auto;
    white-space: nowrap;
}

.bCalendar .bPageBlock .calendarView,
.bCalendar .bPageBlock .calendarWeekView {
    width: 100%;
    border-style:solid;
    border-width: 1px;
    background: none;
}

.bCalendar .calendarView td {
    padding: 1px 0 1px 2px;
    width: 90%;
}

.calendarBlock th {
    padding: 3px;
    font-weight: bold;
    text-align: right;
    border-right: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    background-color: #E2E2D1;
}
.bCalendar .taskList th {
    border-right: none;
}

.bCalendar .even td,
.bCalendar .odd td {
    border-bottom: 1px solid #E7E7D8;
}

.bCalendar .even{
    border-bottom: 1px solid #E7E7D8;
}

.bCalendar .odd {
    border-bottom: 1px solid #C5C5B6;
}

.bCalendar .evenHour {
    border-bottom: 1px solid #D6D6C7;
}

.bCalendar .oddHour {
    border-bottom: 1px solid #C5C5B6;
}

.bCalendar .calendarWeekView th {
    text-align: left;
    border: none;
}

.bCalendar .calendarWeekView .newLink {
    text-align: right;
    background-color: #E7E7D8;
    padding-right: 2px;
}

.bCalendar .calendarWeekView .eventBlock {
    border-bottom: 1px solid #E8E3C3;
    padding: 2px 0;
}

.bCalendar .calendarWeekView .eventBlock.last {
    border-bottom: none;
}

.bCalendar .bPageBlock .calendarDayWeekView {
    width: 100%;
    border: 1px solid #999;
    background: none;
    table-layout: fixed;
    position: relative;
    z-index: 0;
}

.bCalendar .bPageBlock .calendarDayWeekView th {
    margin: 0px;
    padding: 0px;
    border-right: none;
}
.bCalendar .bPageBlock .calendarDayWeekView .calDays {
    font-size: 110%;
    height: 25px;
    text-align: left;
    padding: 2px 0px 0px 5px;
    color:#333;
    border-bottom: 1px solid #A7A7A7;
    border-left: 1px solid #CCC;
}

.bCalendar .bPageBlock .calendarDayWeekView .calDays.timeColumn {
    padding-left: 0px;
}

.bCalendar .bPageBlock .calendarDayWeekView .date {
    background-color: #E2E2D1;
    padding: 1px 3px 1px 5px;
    font-size: 90%;
    color: #333;
    border-left: 1px solid #CCC;
    font-weight: bold;
}

.bCalendar .bPageBlock .calendarDayWeekView .dateDnD {
    background-color: #E2E2D1;
    padding: 1px 3px 1px 5px;
    font-size: 90%;
    color: #333;
    border-left: 1px solid #CCC;
    border-bottom: 1px solid #C5C5B6;
    font-weight: bold;
}

.addNewEventIcon {
    background-image: url(/img/cal/addNew_off.gif);
	background-position: 0px 0px;width:13px;
	height:9px;;
    display:block;
    float: right;
    background-repeat: no-repeat;
    margin: 2px 6px 2px 2px;
}

a:hover img.addNewEventIcon {
    background-image: url(/img/cal/addNew_on.gif);
	background-position: 0px 0px;width:13px;
	height:9px;;
}

.inlineScheduler .bCalendar .bPageBlock .pbBody {
    padding: 0px;
    margin: 0px;
    border-width:1px;
    border-style:solid;
    border-color:#D8D8D8;
}

.inlineScheduler .bCalendar .secondaryPalette {
    border: 0px;
    background-color: #f3f2f1;
}

.bCalendar .bPageBlock .pbBody .noBorder {
    border: 0px;
}

.bCalendar .bPageBlock .pbBody .noBorderBottom {
    border-bottom: 0px;
}

.bCalendar .bPageBlock .pbBody .noBorderTop {
    border-top: 0px;
}

.bCalendar .calendarDayWeekView .timeColumn {
    background-color: #E2E2D1;
    height: 100%;
    width: 65px;
}

.bCalendar .calendarDayWeekView .timeColumnDnD {
    background-color: #E2E2D1;
    height: 100%;
    width: 5.5em;
}
.bCalendar .calendarDayWeekView .timeCell {
    white-space: nowrap;
    border-top: 1px solid #E7E7D8;
    text-align: center;
    width: 60px;
}

.bCalendar .calendarDayWeekView .timeCellDnD {
    text-align: center;
    font-weight: bold;
    line-height: 25px;
    white-space: nowrap;
    background-color: #E2E2D1;
}

.bCalendar .calendarDayWeekView .dayOfWeekCell {
    height: 100%;
}

.bCalendar .calendarDayWeekView .dayCell {
    width: 95%;
    height: 100%;
}

.bCalendar .calendarDayWeekView .dayBlock {
    width: 100%;
    height: 100%;
    border-left: 1px solid #CCC;
    table-layout: fixed;
}

.bCalendar .calendarDayWeekView .fixedTable {
    table-layout: fixed;
}

.bCalendar .calendarDayWeekView .firstWeekCell {
    border-bottom:1px solid #A7A7A7;
    height:25px;
    text-align:left;
    background-color:#B8AFAB;
}

/* Do not change the height without changing the height in SingleUserCalendar.java's getDurationEventCalendarElement() method */
.bCalendar .calendarDayWeekView .hourRow {
    height: 25px;
}

/* Do not change the height without changing the height in SingleUserCalendar.java's getDurationEventCalendarElement() method */
.bCalendar .calendarDayWeekView .hourRow td,
.bCalendar .calendarDayWeekView .hourRow th {
    padding: 0px;
    height: 17px;
}

.bCalendar .calendarDayWeekView .even td,
.bCalendar .calendarDayWeekView .even th {
    border-top: 1px solid #CCC;
}

.bCalendar .calendarDayWeekView .odd th {
    border: 1px solid #E7E7D8;
}

.bCalendar .calendarDayWeekView th.alldayevent,
.bCalendar .calendarDayWeekView td.alldayevent {
    margin: 0;
    background-color: #E8E8E8;
    height: 25px
}

.bCalendar .calendarDayWeekView td.alldayevent {
    border-bottom: 0px;
}

.bCalendar .calendarDayWeekView td.alldayevent.noItem {
    font-size: 0pt;
}

.bCalendar .calendarDayWeekView td.alldayevent.dailyLastRow,
.bCalendar .calendarDayWeekView td.alldayevent.weeklyLastRow {
    border-bottom: 1px solid #C5C5C6;
    height: 8px;
    max-height: 8px;
}

.bCalendar .calendarDayWeekView td.alldayevent.weeklyLastRow {
    font-size: 0pt
}

.bCalendar .calendarDayWeekView .eventBlock {
    border-width: 0px;
}

/* The following two classes are specifically for the Apex Pages drag-and-droppable calendar */
.bCalendar .calendarDayWeekView .hourRowLabel,
.bCalendar .calendarDayWeekView .hourRowDnD {
    height: 25px;
    overflow: visible;
    position: relative;
}

.bCalendar .calendarDayWeekView .eventBlockNonDnD,
.bCalendar .calendarDayWeekView .eventBlockDnD {
    border-width: 0px;
    position: absolute;
    top: 0%;
}

.bCalendar .calendarDayWeekView .even td.eventBlock {
    border-top-width:0px;
}

.bCalendar .calendarDayWeekView .eventBlockDiv {
    padding-left: 6px;
    border-color: #CCC;
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    margin: 0px 0px -1px -1px;
    white-space: normal;
    overflow: hidden;
    cursor: pointer;
}

.bCalendar .calendarDayWeekView .eventBlockDivDnD {
    padding-left: 6px;
    border-color: #CCC;
    border-style: solid;
    border-width: 1px 1px 1px 1px;
    margin: 0px 0px -1px -1px;
    white-space: normal;
    overflow: hidden;
/*    cursor: pointer;*/
}

.bCalendar .calendarDayWeekView .noDrop {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    opacity: 0.5;
    background: #ff0000 url(/img/cal/icon_nodrop.gif) no-repeat center center;
    visibility: visible;
}

/* adding accept class to the dragIndicator hides the noDrop indicator */
.bCalendar .calendarDayWeekView .accept .noDrop {
    visibility: hidden;
}
.bCalendar .calendarDayWeekView .multiLineEventBlock {
    padding: 2px 2px 4px 4px;
    background-color: #FFF;
    overflow:hidden;
    border-left: 1px solid #CCC;
    height:100%;
}

.bCalendar .calendarDayWeekView .alldayDnD {
    height:25px;
    width:100%;
}

/* This is a fix to get the pointer cursor to appear on any inner content of the event block.
   When http://bugforce/bug/bugDetail.jsp?id=100000000000jCN is resolved, this (and it uses)
   can go away, and the cursor:pointer in the .eventBlockDivDnD rule above can be uncommented */
.bCalendar .calendarDayWeekView .dragContentPointer * {
    cursor: pointer;
}

.bCalendar .bPageBlock .calendarDayWeekView .currentHeader {
    background-color: #C4D2E4;
}

.bCalendar .bPageBlock .calendarDayWeekView .currentBody {
    background-color: #E4EAF3;
}

.bCalendar .calendarDayWeekView .multiLineEventBlock img {
    vertical-align: middle;
}
.bCalendar .calendarDayWeekView .eventIcon {
    float:left;
}

.bCalendar .calendarMonthView {
    width: 100%;
    border: 1px solid;
}

.bCalendar .calendarMonthView td.upperLeft,
.bCalendar .headerRow .calDays {
    background-color: #00a4c8;
    color: #333;
}

.bCalendar .calendarMonthView .headerRow th {
    font-weight: bold;
    width: 14%;
    padding: 3px;
    text-align: left;
    border-color: #FFF;
    border-width: 0 0 1px 0px;
    border-style: solid;
    border-bottom-color: #CCC;
}

.bCalendar .calendarMonthView td {
    border: solid #CCC;
    border-width: 0 1px 1px 0;
    width: 14%;
    padding: 0;
}

.bCalendar .calendarMonthView td.upperLeft {
    border-width: 0;
    border-bottom: 1px solid #CCC;
    padding: 0;
}

.bCalendar .calendarMonthView .calInactive {
    background-color: #D4D4D4;
}

.bCalendar .calendarMonthView .calActive{
    background-color: #F3F3EC;
}
.bCalendar .calendarMonthView .calToday {
    background-color: #FFF;
}

.bCalendar .calendarMonthView .date {
    background-color: #E2E2D1;
    border-bottom: 1px solid #CCC;
    margin-bottom: 1px;
    padding: 1px 3px;
    font-size: 90%;
    color: #333;
    font-weight: bold;
}

.bCalendar .calendarMonthView .calToday .date {
    background-color: #CDC68D;
    font-weight: bold;
}

.bCalendar .calendarMonthView td .event {
    display: block;
    font-weight: bold;
}
.bCalendar td .event {
    font-weight: bold;
    margin-right: 0.4em;
}

.bCalendar .calendarMonthView .date .newLink {
    float: right;
    font-weight: normal;
}

.bCalendar .calendarMonthView .weekLink {
    width: 18px;
    background-color: #E2E2D1;
    padding: 30px 5px;
    vertical-align: middle;
    text-align: center;
}

.bCalendar #dropZones {
    position: absolute;
    opacity: 0.5;
}

/* accounts for 1-px border on hour rows */
.bCalendar #dropZones div {
    height: 26px;
}
.print .bCalendar .calendarWeekView th {
    background-color: #F3F3EC;
}

.bCalendar .pbHeaderBar,
.bMultiuserCalendar .pbHeaderBar {
    width: 100%;
    display:inline;
}

.bCalendar .pbHeaderBar .calLinks,
.bMultiuserCalendar .pbHeaderBar .calLinks {
    float:right;
    padding-right:2px;
    padding-left:20px;
}

.bCalendar .pbHeaderBar .legendBar,
.bMultiuserCalendar .pbHeaderBar .legendBar {
    float:left;
    padding-right:20px;
    padding-left:2px;
}

.bCalendar .legend,
.bMultiuserCalendar .legend {
    text-align: left;
}

.bCalendar .pbHeaderBar .headerClearing,
.bMultiuserCalendar .pbHeaderBar .headerClearing {
    clear:both;
}

.bCalendar.hideWeekend .weekend,
.bMultiuserCalendar .hideWeekend .weekend,
#listDiv .weekend {
    display: none;
}

.bCalendar .singleUserCalSpacer,
.bMultiuserCalendar .multiUserCalSpacer {
    width:740px;
    visibility:hidden;
}

.bCalendar .dailySpacer {
    width:405px;
    visibility:hidden;
}
.bCalendar .allDaySpacer {
    height: 26px;
    visibility: hidden;
}
.bCalendar .allDayLastRowSpacer {
    height: 8px;
    font-size: 0pt;
}
.sCalendarFooter {
    height: 24px;
    position: fixed;
    bottom: 0pt;
    right: 10px;
    padding-right: 7px;
    z-index: 1000;
    float: right;
    text-align: right;
}

.bCalendar .bPageBlock .calDnDfixedHeader {
    overflow:hidden;
}

.bCalendar .bPageBlock .calDnDfixedHeaderBody {
    overflow-y:scroll;
    overflow-x:hidden;
    position:relative;
}


/* END single user calendar */

/* --------------------------------------- */
/* BEGIN MultiuserCalendar */

.bMultiuserCalendar .bPageBlock {
    border-top-color: #506749;
}
.bMultiuserCalendar .bPageBlock .pbHeader .pbTitle,
.bMultiuserCalendar .bPageBlock .pbHeader .pbTitle h2{
    color:#506749;
}
.bMultiuserCalendar .bPageBlock .pbFooter,
.bMultiuserCalendar .bPageBlock,
.bMultiuserCalendar .bPageBlock .pbHeader .pbTitle .twisty {
    background-color:#506749;
}
.bMultiuserCalendar .bPageBlock .pbSubheader {
    background-color:#506749;
}
.bMultiuserCalendar  .pbButton, .bMultiuserCalendar  .pbDescription {
    vertical-align:middle;
}
.bMultiuserCalendar  .pbDescription {
    text-align:right;
}
.bMultiuserTopButtons {
    text-align: right;
    margin-bottom: 2px;
    float: right;
    clear:both;
}
.bMultiuserCalendar  .pbButton .iconBar {
    margin-top:0px;
    padding:1px 1px 1px 1px;
}
.bMultiuserCalendar  .pbButton .iconBar img {
    margin-right:4px;
    vertical-align:middle;
}
.bMultiuserCalendar  .pbButton .iconBar img.extra {
    margin-right:15px;
}
.bMultiuserCalendar  .pbButton .iconBar img.last {
    margin-right:24px;
}

.multiuserCalendar .calendarTable {
    width:100%;
    border:1px #506749 solid;
}
.multiuserCalendar .sunCol, .multiuserCalendar .monCol,
.multiuserCalendar .tueCol, .multiuserCalendar .wedCol,
.multiuserCalendar .thuCol, .multiuserCalendar .friCol,
.multiuserCalendar .satCol{
    width:11%;
    border-left:1px solid #CCC;
}

.multiuserCalendar .mins.first {
    border-left:1px solid #CCC;
}

.multiuserCalendar.hideWeekend .monCol, .multiuserCalendar.hideWeekend .tueCol,
.multiuserCalendar.hideWeekend .wedCol, .multiuserCalendar.hideWeekend .thuCol,
.multiuserCalendar.hideWeekend .friCol {
    width:15.4%;
}
.multiuserCalendar.hideWeekend .sunCol, .multiuserCalendar.hideWeekend .satCol {
    display:none;
}

.multiuserCalendar th.sunCol, .multiuserCalendar th.monCol,
.multiuserCalendar th.tueCol, .multiuserCalendar th.wedCol,
.multiuserCalendar th.thuCol, .multiuserCalendar th.friCol,
.multiuserCalendar th.satCol, .multiuserCalendar th.timeCol,
.multiuserCalendar .headerRow th.nameCol,
.multiuserCalendar .headerRow th.typeCol {
    border-left:none;
    border-bottom:none;
}
.multiuserCalendar.superDetail th.timeCol {
    border-left: 1px solid #CCC;
    padding: 0 2px;
}
.multiuserCalendar .nameCol,
.multiuserCalendar .typeCol {
    border-left:1px solid #CCC;
    border-bottom:1px solid #CCC;
}
.multiuserCalendar .headerRow th.cbCol {
    border-bottom:none;
}
.multiuserCalendar th.sunCol, .multiuserCalendar th.monCol,
.multiuserCalendar th.tueCol, .multiuserCalendar th.wedCol,
.multiuserCalendar th.thuCol, .multiuserCalendar th.friCol,
.multiuserCalendar th.satCol, .multiuserCalendar th.nameCol {
/*  background-image: url(../images/calendar/bgBorderMUCalendar.gif); */
    background-repeat: no-repeat;
    background-position: left bottom;
}

.multiuserCalendar .error .nameCol {
    background-color: #C00;
    color: #FFF;
}

.multiuserCalendar .lastLineOdd, .multiuserCalendar .lastLineEven {
    border-bottom:none;
}

/* calendar dialog content formatting */
.calDialog div {
    padding-top: 10px;
}

.calDialog .options {
    padding-left: 24px;
}

.calDialog .commands {
    float: right;
}

.calDialog .commands * {
    margin-left: 6px;
}
/* Outer block surrounding the calendar, shared with single-user cal */
.calHeader {
    width: 100%;
    text-align: center;
    color: #333;
    font-weight: bold;
    padding-bottom: 5px;
    white-space: nowrap;
}

.calHeader a {
    font-size: 100%;
}

.calHeader .prev{
    margin-right: 1em;
}

.calHeader .next{
    margin-left: 1em;
}

.calHeader .picker {
    margin: 0 1em 0;
    padding-top: 2px;
}

.calHeader .picker form {
    display: inline;
}

.calHeader .rightElements {
    float:right;
    padding-right:5px;
}

.calHeader .titleElements {
    white-space:nowrap;
}

.multiuserCalendar .dateRow td,
.multiuserCalendar .dateRow th {
    background-color: #E2E2D1;
    color:#333;
    border-top:1px solid #CCC;
    border-bottom:1px solid #CCC;
    font-weight:bold;
    font-size: 91%;
    padding:1px 0px 0px 4px;
}

.multiuserCalendar .dateRow td a,
.multiuserCalendar th a {
    color:#333;
    font-weight:bold;
}

.multiuserCalendar .headerRow th {
    background-color:#B8AFAB;
    font-weight:bold;
    padding:3px 0px 3px 0px;
    color:#333;
}

.multiuserCalendar th,
.multiuserCalendar .even td.cbCol,
.multiuserCalendar .odd td.cbCol {
    background-color:#E2E2D1;
    color:#506749;
    font-weight:bold;
}

.multiuserCalendar th.cbCol,
.multiuserCalendar .even td.cbCol,
.multiuserCalendar .odd td.cbCol {
    text-align: center;
    vertical-align: middle;
    border-bottom:1px solid #CCC;
}

.multiuserCalendar tr.continuing th.cbCol,
.multiuserCalendar tr.even.continuing td.cbCol,
.multiuserCalendar tr.odd.continuing td.cbCol {
    border-bottom: none;
}

.multiuserCalendar .odd td {
    background-color:#fff;
}
.multiuserCalendar .even td {
    background-color:#F9F9F9;
}
.multiuserCalendar .even td, .multiuserCalendar .odd td{
    border-bottom:1px solid #E3DEB8;
    padding:0px;
}
.multiuserCalendar tr.continuing td,
.multiuserCalendar tr.continuing th {
    border-bottom: none;
}

.multiuserCalendar td.nameCol,
.multiuserCalendar th.nameCol,
.multiuserCalendar td.typeCol {
    padding:3px 0px 3px 3px;
    vertical-align:middle;
}

.multiuserCalendar .emptyRow {
    line-height:0;
}

.multiuserCalendar .eventBusy,
.multiuserCalendar .eventFree,
.multiuserCalendar .eventOOO
{
    text-decoration: none;
    display: block;
    width: 100%;
    height: 1.2em;
    overflow: hidden;
}

/* TODO JSW remove for 144 */
.multiuserCalendar .eventCtnr {
    position: relative;
    min-height: 1.2em;
}

/* TODO JSW remove for 144 */
.multiuserCalendar .eventCtnr .eventBusy,
.multiuserCalendar .eventCtnr .eventFree,
.multiuserCalendar .eventCtnr .eventOOO
{
    text-decoration: none;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
}

.multiuserCalendar .inner{
    display:block;
    width: 100%;
    height: 100%;
}

.multiuserCalendar .eventCtnr .eventText {
    margin: 0 3px;
    width: auto;
    background-color: #FEFDB9;
    text-decoration: none;
    color: #333;
    overflow: hidden;
    white-space: nowrap;
}

.multiuserCalendar .eventCtnr .callout{
    position: absolute;
    display: none;
    left:-2em;
    bottom: 120%;
    width: 15em;
    background-color: #FEFDB9;
    padding:  2px;
    border: 1px solid black;
    /*Mozilla:*/
    opacity: 0;
}

.superDetail .mins.first {
    border-left: 1px solid black;
}

.superDetail .dayView .mins.first{
    border-left: none;
}

.superDetail .eventBusy,
.superDetail .eventFree,
.superDetail .eventOOO {
    height: 100%;
    overflow: visible;
}

.superDetail .eventBusy div,
.superDetail .eventFree div,
.superDetail .eventOOO div {
    margin: 0 4px;
    background-color: #FEFDB9;
    font-size: 75%;
    white-space: nowrap;
    border-top: 1px solid #E3DEB8;
    border-bottom: 1px solid #E3DEB8;
}

.superDetail .eventBusy a,
.superDetail .eventFree a,
.superDetail .eventOOO a {
    text-decoration: none;
}

.legend {
    padding:4px 5px 4px 0px;
    text-align:right;
}
.legend div {
    display:inline;
    height: 9px;
    padding-right: 9px;
}
.legend span {
    margin:0px 6px 0px 2px;
    padding-bottom:2px;
}

.legend .busy,
.multiuserCalendar .eventBusy,
.bCalendar .calendarDayWeekView .eventBlockDiv.eventBusy,
.bCalendar .calendarDayWeekView .eventBlockDivDnD.eventBusy,
.hoverDetail.eventBusy .hoverOuter {
    background-color: #6699CC;
}

.legend .outOfOffice,
.multiuserCalendar .eventOOO,
.bCalendar .calendarDayWeekView .eventBlockDiv.eventOOO,
.bCalendar .calendarDayWeekView .eventBlockDivDnD.eventOOO,
.hoverDetail.eventOOO .hoverOuter {
    background-color: #B6624F;
}

.bCalendar .calendarDayWeekView .eventBlockDiv.eventFree,
.bCalendar .calendarDayWeekView .eventBlockDivDnD.eventFree,
.hoverDetail.eventFree .hoverOuter {
    background-color: #FFFFFF;
}

.multiuserCalendar .eventFree {
/*  intentionally blank - slevine bug #54128 */
}

.hoverDetail .hoverErrorMsgDesc {
    text-align:left;
}
/* END MultiuserCalendar */
/* --------------------------------------------- */
/* BEGIN TaskList */

.bRelatedList .bMyTask .bPageBlock .pbButton {
    white-space: nowrap;
}
.bMyTask .selectMenuDiv .selectMenuDropdownDiv {
    border: 1px solid #333;
    background-color: #FFF;
}

.bMyTask .selectMenuDiv .selectMenuDropdown .theOption {
    background-color: #FFF;
    padding: 2px 6px 2px 6px;
    border: 0px solid #BBB;
    text-align:left;
    font-size: 80%;
}

.bMyTask .selectMenuDiv .selectMenuDropdown a.theOption.hover {
    background-color: #9096A1;
    color: #FFF;
}
.detailPage .taskOverDue,
.bMyTask .taskOverDue {
    color: #990000;
}

/* END TaskList */
/* --------------------------------------------- */
/* BEGIN Entity Merge */
.mergeEntity {
    width: 100%;
}

.mergeEntity .headerRow td,
.mergeEntity .headerRow th{
    background-color: #DDD;
    text-align: left;
    font-weight: bold;
}

.mergeEntity .requiredInput th {
    color: white;

}

.accountTab .mergeEntity .requiredInput th,
.personaccountTab .mergeEntity .requiredInput th  {
    background-color: #36C;
}
.accountTab .mergeEntity .requiredMark,
.personaccountTab .mergeEntity .requiredMark  {
   color: #36C;
}
.leadTab .mergeEntity .requiredInput th {
    background-color: #E1A21A;
}
.leadTab .mergeEntity .requiredMark {
   color: #E1A21A;
}
.contactTab .mergeEntity .requiredInput th {
    background-color: #56458C;
}
.contactTab .mergeEntity .requiredMark {
   color: #56458C;
}
.mergeEntity th{
    background-color: #DDD;
    text-align: right;
    vertical-align: top;
    border-bottom: 1px solid #BBB;
    padding-right: 2px;
}

.mergeEntity td {
    background-color: white;
    vertical-align: top;
    white-space: normal;
    border-bottom: 1px solid #BBB;
}

.mergeEntity .last td,
.mergeEntity .last th{
    border-bottom: none;
}

/* END Entity Merge */
/* --------------------------------------------- */
/* BEGIN Icons */
/* If possible we try to keep all icon substitions together */
/*  for the sake of classic mode & PNG->GIF swaps per browser sheet */

/* general skinnable utility icons */

.helpIcon { background-image: url(/img/sprites/master.png);
	background-position: 0px -142px;width:16px;
	height:16px; }

.recycleIcon { background-image: url(/img/func_icons/util/recycle.gif);
	background-position: 0px 0px;width:19px;
	height:19px;
    margin-right: 7px;
}

.printerIcon { background-image: url(/img/func_icons/util/printer20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}

.printerIconOn { background-image: url(/img/func_icons/util/printer20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.removeIcon { background-image: url(/img/func_icons/remove12.gif);
	background-position: 0px 0px;width:12px;
	height:12px;
    background-position: top left;
}

.removeIconOn { background-image: url(/img/func_icons/remove12_on.gif);
	background-position: 0px 0px;width:12px;
	height:12px;
    background-position: top right;
}

.dialogCloseIcon { background-image: url(/img/func_icons/util/dialogClose16.gif);
	background-position: 0px 0px;width:16px;
	height:16px;
    background-position: top left;
}

.dialogCloseIconOn { 
    background-position: top right;
}


.lookupIcon { background-image: url(/img/func_icons/util/lookup20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}

.lookupIconOn { background-image: url(/img/func_icons/util/lookup20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.alertIcon { background-image: url(/img/func_icons/util/alert16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }

.checkmarkIcon { background-image: url(/img/func_icons/util/checkmark16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }

.blogIcon { background-image: url(/img/func_icons/util/blog20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.blogIconOn { background-image: url(/img/func_icons/util/blog20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.addBlogIcon { background-image: url(/img/func_icons/util/blogAdd20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.addBlogIcon { background-image: url(/img/func_icons/util/blogAdd20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.dependencyIcon { background-image: url(/img/func_icons/util/dependency20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.dependencyIconOn { background-image: url(/img/func_icons/util/dependency20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.exportIcon { background-image: url(/img/func_icons/util/export20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.exportIconOn { background-image: url(/img/func_icons/util/export20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.searchIcon { background-image: url(/img/func_icons/util/search20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.searchIconOn { background-image: url(/img/func_icons/util/search20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.trashIcon { background-image: url(/img/func_icons/util/trash20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}
.trashIconOn { background-image: url(/img/func_icons/util/trash20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.groupEventIcon { background-image: url(/img/group_event.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }
.doubleArrowUp { background-image: url(/img/double_arrow_up.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }
.doubleArrowDwn { background-image: url(/img/double_arrow_dwn.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }

.comboboxIcon { background-image: url(/img/func_icons/util/combobox20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}

.comboboxIconOn { background-image: url(/img/func_icons/util/combobox20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}
.colorPickerIcon { background-image: url(/img/func_icons/util/colorPicker16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }
.downArrowIcon { background-image: url(/img/arrow_dwn.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }
.leftArrowIcon { background-image: url(/img/arrow_lt.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }
.rightArrowIcon { background-image: url(/img/arrow_rt.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }
.upArrowIcon{ background-image: url(/img/arrow_up.gif);
	background-position: 0px 0px;width:24px;
	height:20px; }
.datePickerIcon { background-image: url(/img/func_icons/util/datePicker16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }
.escalatedLarge { background-image: url(/img/func_icons/util/escalation16.gif);
	background-position: 0px 0px;width:16px;
	height:16px;
  vertical-align: middle;
  margin-left: 3px;
  margin-top: 3px;
}
.escalatedSmall {
  background-image: url(/img/func_icons/util/escalation12.gif);
	background-position: 0px 0px;width:12px;
	height:12px;
  vertical-align: middle;
  margin-left: 3px;
  margin-top: -2px;
}
.infoIcon { background-image: url(/img/sprites/master.png);
	background-position: 0px -162px;width:16px;
	height:16px; }

.imgNewDataSmall, .imgNewData {
  vertical-align: top;
  margin-left: .5em;
}

.mailCloseIcon { background-image: url(/img/func_icons/util/mailCloseEnv16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }

.mailOpenIcon { background-image: url(/img/func_icons/util/mailOpenEnv16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }

.mailFrontIcon { background-image: url(/img/func_icons/util/mailFrontEnv16.gif);
	background-position: 0px 0px;width:16px;
	height:16px; }

.customizePageIcon { background-image: url(/img/func_icons/util/customize20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}

.customizePageIconOn { background-image: url(/img/func_icons/util/customize20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}

.editLayoutIcon { background-image: url(/img/func_icons/util/editLayout20.gif);
	background-position: 0px 0px;width:20px;
	height:20px; }

.linkIcon { background-image: url(/img/func_icons/util/link20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top left;
}

.linkIconOn { background-image: url(/img/func_icons/util/link20.gif);
	background-position: 0px 0px;width:20px;
	height:20px;
    background-position: top right;
}


/* multiforce bar */
.tab .multiforce div {
background-image: url(/img/tab/mf_picklist.gif);
	background-position: 0px 0px;width:47px;
	height:21px;
background-repeat: no-repeat;
 }

/* End general utility icons */

.listTranslatedSolutions .pbTitle h3 { margin: 3px 0 0 4px; }

/* hide related list icon */
.relatedListIcon { display: none; }

/* special case for UserDefined motifs -- should have been done in custom_template */
.listRelatedObject .userDefinedImage {
    position: relative;
    float:left;
    margin-top:-4px;
    margin-left:5px;
    display: inline;
}
/* special case - undo the above styles */
.listRelatedObject .motifElement .userDefinedImage {
    position: static;
    float: none;
    margin-top: 0px;
    margin-left: 0px;
}
/* special case - hide the image */
.customnotabBlock .userDefinedImage {
    display: none;
}

.relatedListIcon,
.mruIcon {
    background-repeat: no-repeat;
}

.hideListButton { background-image: url(/img/twistySubhDown.gif);
	background-position: 0px 0px;width:16px;
	height:10px; }
.showListButton { background-image: url(/img/twistySubhRight.gif);
	background-position: 0px 0px;width:16px;
	height:10px; }

.twistyHeader .hideListButton { background-image: url(/img/arrowDown.gif);
	background-position: 0px 0px;width:16px;
	height:13px; }
.twistyHeader .showListButton { background-image: url(/img/arrowRight.gif);
	background-position: 0px 0px;width:16px;
	height:13px; }


/* END Icons */
/* --------------------------------------------- */
/* BEGIN Calendar buttons, used on multiple pages */
.calendarIconBar {
    padding-top: 3px;
}

.calendarIconBar .dayViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -36px;
    display:block;
}

.calendarIconBar .dayViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -36px;
    display:block;
}

.calendarIconBar .weekViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -146px;
    display:block;
}

.calendarIconBar .weekViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -146px;
    display:block;
}

.calendarIconBar .monthViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -80px;
    display:block;
    margin-right: 13px;
}

.calendarIconBar .monthViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -80px;
    display:block;
    margin-right: 13px;
}

.calendarIconBar .singleUserViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -124px;
    display:block;
}

.calendarIconBar .singleUserViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -124px;
    display:block;
}

.calendarIconBar .multiUserViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -102px;
    display:block;
    margin-right: 13px;
}

.calendarIconBar .multiUserViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -102px;
    display:block;
    margin-right: 13px;
}

.calendarIconBar .listViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -58px;
    display:block;
    margin-right: 0px;
}

.calendarIconBar .listViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -58px;
    display:block;
    margin-right: 0px;
}

/* this can probably be changed to regular inline layout */
.calendarIconBar img {
    float: left;
    background-repeat: no-repeat;
    margin-right: 3px;
    width: 24px;
    height: 18px;
}

.calendarIconBar .clear {
    clear: both;
}

/* BEGIN CALENDAR HEADER COMPONENT */

.calendarHeader {
    min-height: 30px;
    margin: 0px;
    padding: 0px;
    width: 100%;
}

.calendarHeaderBG {
    background-image: url(/img/cal/header_bkgd.gif);
    background-repeat: repeat-x;
}

/* this can probably be changed to regular inline layout */
.calendarHeader img {
    float: left;
    background-repeat: no-repeat;
    margin-right: 3px;
    width: 24px;
    height: 18px;
}

.calendarHeader .clear {
    clear: both;
}

.calendarHeader .extra {
    float: left;
    margin: 6px 6px 6px 10px;
}

.calendarHeader .error {
    display: block;
}

.calendarHeader .userIcons {
    float: left;
    margin: 6px 6px 6px 10px;
}

.calendarHeader .dwmIcons {
    float: left;
    margin: 6px 0px 6px 10px;
}

.calendarHeader .dateText {
    float: left;
    padding-left: 21px;
    margin: 7px 0px;
    font-weight: bold;
}

.calendarHeader .dateDiv {
    text-align: center;
    margin: 7px 0px;
    font-weight: bold;
}

.calendarHeader .arrowIcons {
    float: left;
    padding-left: 2px;
    margin: 8px 0px;
}

.calendarHeader .arrowIcons img {
    width: 20px;
}

.calendarHeader .dateLinks {
    float: left;
    padding-left: 2px;
    margin: 7px 0px;
}

.calendarHeader .dateLinks img {
    width: 20px;
}

.calendarHeader .buttons {
    float: left;
    padding-left: 21px;
    margin: 7px 0px;
}

.calendarHeader .wEndCheckBox .checkboxLabel {
    float: left;
    margin: 7px 2px;
}

.calendarHeader .wEndCheckBox input {
    float: left;
    margin: 8px 0px 8px 10px;
}

.calendarHeader .buttons .menuButton {
    padding-left: 4px;
}

.calendarHeader .legend {
    float: right;
    margin: 3px 0px;
}

.calendarHeader .dayViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -36px;
    display:block;
}

.calendarHeader .dayViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -36px;
    display:block;
}

.calendarHeader .weekViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -146px;
    display:block;
}

.calendarHeader .weekViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -146px;
    display:block;
}

.calendarHeader .monthViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -80px;
    display:block;
}

.calendarHeader .monthViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -80px;
    display:block;
}

.calendarHeader .singleUserViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -124px;
    display:block;
}

.calendarHeader .singleUserViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -124px;
    display:block;
}

.calendarHeader .multiUserViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -102px;
    display:block;
}

.calendarHeader .multiUserViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -102px;
    display:block;
}

.calendarHeader .listViewIconOn {
    background-image: url(/img/sprites/calendar.gif);
	background-position: -26px -58px;
    display:block;
}

.calendarHeader .listViewIcon {
    background-image: url(/img/sprites/calendar.gif);
	background-position: 0px -58px;
    display:block;
}

.multiUserCalendarHeader {
    clear: both;
}

.multiUserCalendarHeader h2 {
    display:inline;
}

.multiUserCalendarHeader .bNext {
    margin:-15px 15px 4px 18px;
}

/* END CALENDAR HEADER COMPONENT */
.prevCalArrow { background-image: url(/img/func_icons/cal/leftArrow.gif);
	background-position: 0px 0px;width:19px;
	height:13px; }

.nextCalArrow { background-image: url(/img/func_icons/cal/rightArrow.gif);
	background-position: 0px 0px;width:19px;
	height:13px; }


/* END calendar Buttons */
/* -------------------------------- */
/* BEGIN Sidebar Modules */
/* - html Area Left -*/

/* - Generic -*/
.sidebarModule {
    background-color:#E8E8E8;
    margin: 0 0 2px 0;
    overflow: hidden;
}

.sidebarModule .requiredMark {
    color: #E8E8E8; /* Hide in background */
}

.sidebarModuleHeader {
    padding: 15px 8px 2px 15px;
    font-weight: bold;
}

.sidebarModuleBody,
.sidebarModuleBodyNoHeader {
    padding: 0 6px 16px 11px;
}

.sidebarModuleBodyNoHeader {
    padding-top: 15px;
}

.sidebarModuleBody select {
    font-size: 91%;
}

.sidebarModuleTag {
    vertical-align:top;
}

.sidebarModuleTag img {
    padding-right:.5em;
    vertical-align:bottom;
}

/* - Image - */
.imageModule .sidebarModuleBody {
    margin: auto;
    padding-left: 0;
    padding-right: 0;
    width: 185px;
}

/* - Create New - */
.createNewModule {
    overflow: visible;
}
/* - Tags MRU - */
.tagsMruModule {
    overflow: visible;
}

/* - Recycle Bin - */
.recycleBin .undelButtons {
    text-align: center;
}

body.recycleBin .bFilter {
  margin-left: 0;
}

body.recycleBin .bFilter input {
  margin-left: .25em;
  margin-right: .25em;
}
.recycleBinModule {
    background-color:#E8EEE3;
}
.recycleBinModule .sidebarModuleBody {
    padding:10px 12px 10px 16px;
    font-weight: bold;
}
.recycleBinModule a {
    color: #360;
    text-decoration: none;
}
.recycleBinModule a span {
    text-decoration: underline;
}

/* - Recent Items - */
.recentItemModule {
    overflow: visible;
}

.mruItem  {
    position: relative;
    /* must be greater than the sidebar handle/indicators for IE6 bug */
    z-index: 7;
    padding: 4px 2px 3px 30px;
}

.mruItem a img {
    position: absolute;
    left: 5px;
}

/*
 * The selector immediately above applies only to the images to the left of the links in the MRU list --
 * and possibly to other elements on a page, the code certainly allows for that -- but not to any images
 * inside an MRU hover itself.
 */
.mruItem .mruHoverDetail a img {
    position: inherit;
    left: inherit;
}

/* Cancel the ".mruItem a img" selector for manager photos in User Profile-format User hovers. */
.mruItem a .userLinkIconImage {
    position: static;
}

/* MRU hover details */
.mruHoverDetail {
    display: none;
    position: absolute;
    z-index: 15;
    top: 0;
}

.mruList .secondaryPalette a {
    color: #fff;
}

.mruList .secondaryPalette .pbBody a {
    color: #000;
    font-weight: normal;
    text-decoration: underline;
}

/* override normal pageblock styles for the hover */
.mruHoverDetail .bPageBlock {
    border-width: 3px;
    border-style: solid;
    margin: 0;
    padding: 0;
    width: 300px;
    overflow: hidden;
}

/* userProfileHoverPageBlock and bPageBlock are part of the same class and so this selector overrides the previous one
   (the extra selectors add enough specificity for the override). */
.userBlock .mruItem .mruHoverDetail .userProfileHoverPageBlock {
    width: 369px;
}

.lookupHoverDetail .bPageBlock .pbFooter,
.mruHoverDetail .bPageBlock .pbFooter {
    display: none;
}

.mruHoverDetail .bPageBlock .pbHeader {
    padding: 0;
    margin: 0 0 0 2px;
    border: none;
    background-color: transparent;
}

.mruHoverDetail .userProfileHoverPageBlock .pbHeader {
    margin: 0 3px;
}

.lookupHoverDetail .bPageBlock .pbHeader .pbTitle,
.mruHoverDetail .bPageBlock .pbHeader .pbTitle {
    border: none;
    background-color: transparent;
    width: 45%;
}

.mruHoverDetail .bPageBlock .pbHeader .pbTitle h2,
.mruHoverDetail .bPageBlock .pbHeader .pbTitle h3 {
    color: #fff;
    overflow: hidden;
    width: 140px;
}

.lookupHoverDetail .bPageBlock .pbHeader .errorTitle,
.mruHoverDetail .bPageBlock .pbHeader .errorTitle {
    display: block;
    font-size: 91%;
    color: #fff;
    margin: 2px 0 4px 4px;
}

.lookupHoverDetail .bPageBlock .pbHeader .pbButton,
.mruHoverDetail .bPageBlock .pbHeader .pbButton {
    text-align: right;
    border: none;
    background-color: transparent;
}

.mruHoverDetail .bPageBlock .pbBody {
    margin: 0;
    padding: 6px 10px;
}

.lookupHoverDetail .bPageBlock .detailList .labelCol,
.mruHoverDetail .bPageBlock .detailList .labelCol {
    width: 33%;
    border-bottom: 1px solid #E3DEB8;
}

.lookupHoverDetail .bPageBlock .detailList .dataCol,
.lookupHoverDetail .bPageBlock .detailList .data2Col,
.mruHoverDetail .bPageBlock .detailList .dataCol,
.mruHoverDetail .bPageBlock .detailList .data2Col {
    width: 67%;
    border-bottom: 1px solid #E3DEB8;
}

.lookupHoverDetail .bPageBlock .detailList .last,
.mruHoverDetail .bPageBlock .detailList .last {
    border-bottom: none;
}

.mruHoverDetail .bPageBlock table {
    table-layout: fixed;
}

.mruHoverDetail .userProfileHoverPageBlock table {
    table-layout: auto;
}

.lookupHoverDetail {
    width: 320px;
    height: 270px;
    position: absolute;
    z-index: 15;
    top: 0;
    left: 0;
    display: none;
    padding: 0;
    margin: 0;
}

.lookupHoverDetail .bPageBlock {
    border: none;
    margin: 0;
    padding: 0;
    width: 292px;
    height: 239px;
}

.lookupHoverDetail .userProfileHoverPageBlock {
    width: 369px;
    /* The height of this div isn't always the sum of the heights of the divs it contains --
       setting it to auto sometimes results in a height that's 1 px smaller and eliminates a blue
       bar at the bottom of the bubble in Safari. */
    height: auto;
}

.lookupHoverDetail .bPageBlock .pbBody {
    margin: 0;
    padding: 6px 10px;
    width: 272px;
    height: 207px;
    overflow-y: auto;
    overflow-x: hidden;
    border: none;
    background-color: #f3f2f1;
}

.lookupHoverDetail .userProfileHoverPageBlock .pbBody {
    width: 349px;
}

/* This keeps the bottom of the content div from overwriting the bottom of the hover image */
.lookupHoverDetail .bPageBlock .userProfileHoverBody {
    padding-bottom: 0;
}

.userProfileHoverPageBlock .pbHeader table {
    table-layout: fixed;
    overflow: hidden;
}

.userProfileHoverDetailTable {
    table-layout:fixed;
}

.userProfileHoverDetailTable td {
    padding: 0;
}

.userProfileHoverDetailTable .userProfileHoverPhotoCell{
    width: 64px;
    padding: 0 10px 0 0;
    vertical-align: top;
}

.userProfileHoverHeaderContent {
    width: 361px;
    margin: 3px 0;
    color: white;
    white-space: nowrap;
    /* This truncates very long lines at the header's right hand edge. */
    overflow: hidden;
    /* This appends an ellipsis to a truncated very long line (everything but FF3.0) */
    text-overflow: ellipsis;
}

.userProfileHoverHeaderContent a {
    font-weight: bold;
    color: white;
}

.userProfileHoverContent {
    width: 272px;
    overflow: hidden;
}

.userProfileHoverPhoto img {
    height: 64px;
    width: 64px;
}

.lookupHoverDetail .bPageBlock .pbHeader {
    padding: 1px 0 0 0;
    margin: 0;
    border: none;
    background-color: transparent;
}

.lookupHoverDetail div.userProfileHoverPageBlock .pbHeader {
    padding: 1px 5px 0;
}

.lookupHoverDetail .bPageBlock .pbTitle h2,
.lookupHoverDetail .bPageBlock .pbTitle h3 {
    color: #fff;
    overflow: hidden;
    width: 132px;
}

.lookupHoverDetail .topLeft,
.lookupHoverDetail .bottomLeft,
.lookupHoverDetail .topRight,
.lookupHoverDetail .bottomRight,
.lookupHoverDetail .topLeft397Wide,
.lookupHoverDetail .bottomLeft397Wide,
.lookupHoverDetail .topRight397Wide,
.lookupHoverDetail .bottomRight397Wide {
    margin: 0;
    height: 239px;
    overflow: hidden;
    padding-left: 14px;
    padding-right: 14px;
}

.lookupHoverDetail .topLeft,
.lookupHoverDetail .bottomLeft,
.lookupHoverDetail .topRight,
.lookupHoverDetail .bottomRight {
    width: 292px;
}

.lookupHoverDetail .topLeft397Wide,
.lookupHoverDetail .bottomLeft397Wide,
.lookupHoverDetail .topRight397Wide,
.lookupHoverDetail .bottomRight397Wide {
    width: 369px;
}

.lookupHoverDetail .topLeft {
    background: url(/img/topLeftBubble.png) no-repeat center;
    padding-top: 19px;
    padding-bottom: 12px;
}

.lookupHoverDetail .topLeft397Wide {
    background: url(/img/userprofile/userProfileHoverTopLeftBubble.png) no-repeat center;
    padding-top: 19px;
    padding-bottom: 12px;
}

.lookupHoverDetail .bottomLeft {
    background: url(/img/bottomLeftBubble.png) no-repeat center;
    padding-top: 4px;
    padding-bottom: 27px;
}

.lookupHoverDetail .bottomLeft397Wide {
    background: url(/img/userprofile/userProfileHoverBottomLeftBubble.png) no-repeat center;
    padding-top: 4px;
    padding-bottom: 27px;
}

.lookupHoverDetail .topRight {
    background: url(/img/topRightBubble.png) no-repeat center;
    padding-top: 19px;
    padding-bottom: 12px;
}

.lookupHoverDetail .topRight397Wide {
    background: url(/img/userprofile/userProfileHoverTopRightBubble.png) no-repeat center;
    padding-top: 19px;
    padding-bottom: 12px;
}

.lookupHoverDetail .bottomRight {
    background: url(/img/bottomRightBubble.png) no-repeat center;
    padding-top: 4px;
    padding-bottom: 27px;
}

.lookupHoverDetail .bottomRight397Wide {
    background: url(/img/userprofile/userProfileHoverBottomRightBubble.png) no-repeat center;
    padding-top: 4px;
    padding-bottom: 27px;
}

/* end MRU */

/* - Search - */
.pbSearch input.searchTextBox {
    margin-right: 3px;
}

.searchTagDeletedUsers {
    text-align: center;
    font-weight: bold;
    padding:1em;
}

.searchTagDeletedUsers img {
    vertical-align:bottom;
}

.searchModule {
    background-color:#D9D9D9;
}

.searchModule .sidebarModuleBody {
    padding-bottom: 5px;
}

.searchScope {
    margin-bottom: 5px;
    padding-top: 2px;
}

.searchModule .searchTextBox {
    width: 135px;
    margin-left: 1px;
    margin-right: 3px;
    font-size: 91%;
    vertical-align: middle;
}

.searchFooter {
    margin-top:7px;
    border-top: 1px dotted #999;
    font-size: 91%;
    padding: 6px 2px 0px 0px;
}

.relatedListsearchHeader {
    border-bottom: 1px solid #999;
    margin-bottom: 10px;
    padding-bottom: 6px;
}

.relatedListsearchFooter {
    border-top: 1px solid #999;
    margin-top: 10px;
    padding-top: 6px;
}

.searchModule .standardSearchElementBody .btn {
    vertical-align: middle;
}

.searchModule .standardSearchElementBody select {
    margin-bottom: 5px;
}

/* - Nested Base - */
.nestedModule {
    background-color: #E8E8E8;
    background-image:  url("/img/bgmMessage.gif");
    background-repeat: no-repeat;
    background-position: left top;
    border-color: #E8E8E8; /* Match the background color */
    border-style: solid;
    border-width: 10px 0;
    margin-top: -2px; /* Eat up the margin spacing that's normally present */
    padding:0px 15px 0px 13px;
}

.nestedModuleInner {
    background-color: #FFF;
    margin-bottom: 0;
}

.nestedModule .sidebarModuleHeader {
    padding-top: 7px;
    padding-bottom: 5px;
}

.nestedModule .sidebarModuleBody {
    border-top: 1px solid #CCC;
    line-height:1.6em;
    margin: 0 10px 8px;
    padding: 0px 3px 0 5px;
}

/* - Custom Links - */
.linksModule ul {
    padding: 2px 0 1px 10px;
    margin: 0;
}

.linksModule li {
    list-style: disc;
    padding: 0;
    line-height: 1.3em;
    margin: 0;
}

/* - Division - */
.divisionModule  {
    background-color:#D9D9D9;
}

.divisionModule select {
    width: 165px;
}

/* - Quick Create - */
.quickCreateModule .requiredMark {
    color: #C00;
}

.quickCreateField {
    padding: 1px 2px 5px 4px;
}

.quickCreateFooter {
    padding-bottom: 2px;
}
/* END Sidebar Modules */
/* --------------------------------------- */
/* BEGIN Wizard */
.bWizardBlock {
    border-bottom: 2px solid #747E96;
    margin-right: 11px;
}
.bWizardBlock .pbWizardTitle {

    background-position: bottom;
    background-repeat: repeat-x;
    font-weight: bold;
    color: white;
    padding: 2px 15px 6px 15px;
}
.reportTab .bWizardBlock .pbWizardTitle {
    background-image: url(/img/bgReportsWizard.gif);
}
.campaignTab .bWizardBlock .pbWizardTitle {
    background-image: url(/img/bgCampaignsWizard.gif);
}

.bWizardBlock .pbWizardTitle .ptRightTitle{
    float: right;
}

.bWizardBlock .pbWizardHeader {
    margin-bottom: 6px;
}

.bWizardBlock .pbDescription {
    color: #333;
    font-size: 109%;
    clear: right;
}
.bWizardBlock .pbTopButtons {
    color: #333;
}
.bWizardBlock .pbTopButtons label {
    font-size: 109%;
}
.bWizardBlock .pbTopButtons #navsel {
    font-size: 91%;
}

.bWizardBlock .pbBody {
    background-color: #F3F3EC;
    background-image: url(/img/bgScanline.gif);
    background-repeat: repeat;
    padding: 6px 20px 2px 20px;
}

.bWizardBlock .quickLinks,
.bWizardBlock .pbWizardHelpLink {
    float: right;
    margin: 4px 0;
}

.linksDiv fieldset {
    overflow: visible;
    position: relative;
}

.bEditBlock .linksDiv fieldset {
    margin-top:-2.0em;
}

.editFormulaQuickLinks {
    float: right;
}

.bWizardBlock fieldset {
    background-color: white;
}

.bWizardBlock .pbWizardBody {
    clear: both;
}

/* Magic to make the div clear its floats.  X-Browser */
.bWizardBlock .pbWizardFooter,
.bWizardBlock .pbWizardHeader {
    overflow: hidden;
    height: 1%;
}

.bWizardBlock .pbTopButtons {
    float: right;
    margin: 2px 5px 2px 1em;
}

.bWizardBlock .pbBottomButtons {
    float: right;
    margin-right: 5px;
}

.bWizardBlock .bPageBlock {
    margin: 0;
}

/* for mass email wizards */
.bWizardBlock .bRelatedList .contactBlock .secondaryPalette .pbHeader,
.bWizardBlock .bRelatedList .leadBlock .secondaryPalette .pbHeader,
.bWizardBlock .bRelatedList .caseBlock .secondaryPalette .pbHeader {
    background-color: #EEECD1;
    border-top-width:4px;
    border-top-style: solid;
    border-bottom: 1px solid #fff;
}

.bWizardBlock .bRelatedList .contactBlock .secondaryPalette .pbBody,
.bWizardBlock .bRelatedList .leadBlock .secondaryPalette .pbBody,
.bWizardBlock .bRelatedList .caseBlock .secondaryPalette .pbBody {
    padding-bottom: 2px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
}
/* end mass email wizards */

.bWizardBlock .pbBody .bPageBlock,
.bWizardBlock .pbBody .bPageBlock .pbFooter,
.bWizardBlock .pbBody .bPageBlock .pbHeader{
    background: none;
    border: none;
}

.bWizardBlock .bPageBlock .pbTitle,
.bWizardBlock .bPageBlock .pbBody {
    background: none;
    padding: 0;
    margin: 0;
}

.bWizardBlock .bPageBlock .detailList tr td,
.bWizardBlock .bPageBlock .detailList tr th {
    border-bottom: none;
}

.bWizardBlock .bPageBlock .detailList .col02 {
    border-right: none;
    padding-right: 20px;
}

.bWizardBlock .bPageBlock .detailList .labelCol,
.bWizardBlock .bPageBlock .detailList .dataCol,
.bWizardBlock .bPageBlock .detailList .data2Col,
.bWizardBlock .bPageBlock .detailList .detailRow,
.bWizardBlock .bRelatedList .bPageBlock .pbBody,
.bWizardBlock .listReport .bPageBlock .pbBody {
    background-color: #f3f2f1;
}

/* Defaults: */
.bWizardBlock .pbWizardTitle,
.bWizardBlock .pbSubheader{
    background-color: black;
}

/* In a pageblock, these are black, in a wizard, these should
 * behave like subblocks TODO: polcari - link palette bg color with FG color*/
.bWizardBlock .pbHeader .pbTitle h2,
.bWizardBlock .pbHeader .pbTitle h3 {
    color: #FFF;
}

.bWizardBlock .bRelatedList .pbHeader .pbTitle h2,
.bWizardBlock .bRelatedList .pbHeader .pbTitle h3 {
    color: #333;
}

.reportTab .bWizardBlock .bRelatedList .pbHeader .pbTitle h2,
.reportTab .bWizardBlock .bRelatedList .pbHeader .pbTitle h3 {
    color: #FFF;
}

/* END Wizard */
/* ----------------------------------- */
/* BEGIN Lookup */
/* subjectSelectionPopup is also mixed in */

div.lookup,
div.invitee,
.popup {
    padding: 10px 10px 0 10px;
}

.popup .bPageBlock .labelCol{
    width: 30%;
}

.lookup .actionColumn {
    width: 1%;
}

.lookup .bPageTitle {
    margin-bottom: 8px;
}

.lookup .pBody {
    padding: 0 30px;
    font-weight: bold;
}

/* Don't need bold text in lookup body text or bottom padding */
.lookup .bDescription{
    font-size: 100%;
    font-weight: normal;
    padding-top: 5px;
}

.lookup .bPageBlock,
.popup .bPageBlock {
    padding-right: 0;
    padding-bottom: 0;
    background-image: none;
    border-bottom-width: 2px;
    border-bottom-style: solid;
}

.lookup .bPageBlock .pbBody,
.lookup .bPageBlock .pbBottomButtons,
.popup .bPageBlock .pbBody,
.popup .bPageBlock .pbBottomButtons {
    margin-right: 0;
}

.TaskOwnerUROGLookup .lookup .pbBottomButtons {
    margin-top: 15px;
    text-align:center;
}

.lookup .bPageBlock .pbHeader,
.lookup .bPageBlock .pbFooter,
.popup .bPageBlock .pbHeader,
.popup .bPageBlock .pbFooter{
    display: none;
}
/* Specific for calendar invitee lookup */
.invitee .bPageTitle h1 {
    font-size: 93%;
}
.invitee .relatedListIcon {
    display: none;
}
.invitee .bPageBlock .pbTitle h3 {
    margin-left: 10px;
}

.lookup .footer {
    margin-top: 20px;
    border-top: 2px solid #D9D9D9;
    padding-top: 0.5em;
    text-align: center;
    color: #878787;
}

.lookup .content h1 {
    margin: 0.5em 0;
}
.lookup .bPageBlock .list .errorMsg {
    color: #C00;
    text-align: center;
    border-bottom: none;
}
/* Remove all bottom padding so there's less change a vertical scrollbar appears */
.lookup,
.lookup .pBody,
.lookup .bDescription {
    padding-bottom: 0;
}

.lookup #division,
.lookup #lksrch,
.lookup #lktp {
    margin: 0 1em;
}

/* New asset in lookup */
.newAssetLookupHeader .step {
    font-weight: bold;
    float: right;
}

.newAssetLookupHeader h2 {
    margin-bottom: 6px;
}

.newAssetLookupHeader p {
    margin: 0;
}

/* subjectSelectionPopup */
.subjectSelectionPopup h1 {
    margin: 0.5em;
}
body.subjectSelectionPopup div.choicesBox {
  width: 90%;
  padding: 0px;
  border-top-width: 5px;
  border-top-style: solid;
  margin-left: auto;
  margin-right: auto;
    background-color:#F3F3EC;
}
.subjectSelectionPopup .footer {
    margin: 20px auto 0 auto;
    border-top: 2px solid #D9D9D9;
    padding-top: 0.5em;
    text-align: center;
    color: #878787;
    font-size: 91%;
    width:90%;
}
.subjectSelectionPopup ul {
  width: 95%;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}
.subjectSelectionPopup li {
  margin: 0;
  padding: 4px;
  border-top: 1px solid #E3DEB8;
  vertical-align : middle;
}
.subjectSelectionPopup li a {
     font-size: 91%;
}
.subjectSelectionPopup li.listItem0 {
  border-top: none;
}
.choicesBox br {
  display:none;
}

.lookupSearch {
    padding: 10px 10px 0;
}

.lookupSearchError {
    padding-left: 40px;
    padding-bottom: 2em;
}
/* END Lookup */
/* ----------------------------------- */
/* BEGIN Specifc Page colors */


body .primaryPalette,
body .primaryPalette a,
body .bPageTitle .secondaryPalette,
body .bPageTitle .secondaryPalette a,
body .secondaryPalette .lbHeader,
body .secondaryPalette .lbHeader a,
body .pbSubheader,
body .pbSubheader a {
    color: #FFF;
}

.homeTab .bPageTitle .ptBody .greeting .pageType {
    font-size: 109%;
    font-weight: bold;
}
.homeTab .bPageTitle .ptBody .greeting .pageDescription{
    font-size: 91%;
    font-weight: normal;
}
.homeTab .bPageTitle .ptBody .greeting h1,
.homeTab .bPageTitle .ptBody .greeting h2 {
    padding-left: 0px;
}



.bMyDashboard .bPageBlock {
    border-top-color: #7E1E14;
}
.bMyDashboard .bPageBlock .pbHeader .pbTitle {
    color:#7E1E14;
}
.bMyDashboard .bPageBlock .pbFooter,
.bMyDashboard .bPageBlock,
.bMyDashboard .bPageBlock .pbHeader .pbTitle .twisty {
    background-color:#7E1E14;
}
.bMyDashboard .bPageBlock .pbSubheader{
    background-color:#7E1E14;
}

body .bDashboard .primaryPalette,
body .bDashboard .secondaryPalette {
    background-color: #861614;
    border-color: #861614;
}

body .bDashboard .tertiaryPalette {
    background-color: #A55647;
    border-color: #A55647;
}
.bWizardBlock .bRelatedList .leadBlock .secondaryPalette .pbHeader {
    border-top-color: #E39321;
}
.bWizardBlock .bRelatedList .leadBlock .secondaryPalette .pbBody {
    border-bottom-color: #E39321;
}


body .bNote .primaryPalette,
.note .primaryPalette {
    background-color: #44A12C;
    border-color: #44A12C;
}

body .bNote .secondaryPalette,
.searchResults .listNote .secondaryPalette,
.note .secondaryPalette {
    background-color: #638658;
    border-color: #638658;
}


.bMyCalendar .primaryPalette,
.bMyCalendar .secondaryPalette,
.bMultiuserCalendar .primaryPalette,
.bMultiuserCalendar .secondaryPalette {
    background-color: #506749;
    border-color: #506749;
}

.bMultiuserCalendar  .pbButton, .bMultiuserCalendar  .pbDescription {
    vertical-align:middle;
}
.bMultiuserCalendar  .pbDescription {
    text-align:right;
}
.bMultiuserCalendar  .pbButton .iconBar {
    margin-top:0px;
    padding:1px 1px 1px 1px;
}
.bMultiuserCalendar  .pbButton .iconBar img {
    margin-right:4px;
    vertical-align:middle;
}
.bMultiuserCalendar  .pbButton .iconBar img.extra {
    margin-right:15px;
}
.bMultiuserCalendar  .pbButton .iconBar img.last {
    margin-right:24px;
}
.bMyCalendar .bPageBlock .pbBody .eventList{
    padding-top:10px;
}

/* blacktab */

.bGeneratedReport .bPageBlock,
.reportTab .csvSetup .bPageBlock {
    border-top-color:#A85548;
}

.bGeneratedReport .bPageBlock .pbFooter,
.bGeneratedReport .bPageBlock,
.bGeneratedReport .bPageBlock .pbHeader .pbTitle .twisty,
.reportTab .csvSetup .bPageBlock,
.reportTab .csvSetup .bPageBlock .pbFooter,
.reportTab .csvSetup .bPageBlock .pbHeader .pbTitle .twisty  {
    background-color:#A85548;
}
.bGeneratedReport .bPageBlock .pbSubheader,
.reportTab .csvSetup .bPageBlock .pbSubheader {
    background-color:#A85548;
}

/* END Specific page colors */
/* -------------------------------- */
/* BEGIN reports */

/* This is here because reports don't have rolodexes on their views */
.reportTab .lbBody .bFilterView {
    margin-bottom: 0px;
}

.reportTab .bFilterView {
    margin-bottom: 15px;
}

.bFilterReport h3 {
    text-align:left;
    font-size: 91%;
    font-weight:normal;
    padding: 8px 10px 0 0;
    display:block;
}
.bFilterReport {
    margin-left: 18px;
}
.reportParameters .row {
    margin-bottom: 15px;
}
.reportParameters .row tr {
    vertical-align: top;
}
.reportParameters .row td {
    padding-right: 10px;
}
.reportParameters label,
.reportParameters .label {
    margin-top: 20px;
    font-size: 91%;
    display:block;
    white-space: nowrap;
}

.reportParameters fieldset label,
.reportParameters fieldset .label {
    margin-top: 0px;
}

/*
 * Selects and text inputs all have quirks on how they're displayed;
 * therefore, we'll strip their top and bottom margins and align them all to the top.
 */
.bFilterReport select,
.bFilterReport input {
    margin-top: 0;
    margin-bottom: 0;
    vertical-align: top;
    font-size: 91%;
}

.bFilterReport .reportActions select,
.bFilterReport .reportActions input{
    vertical-align: baseline;
}

.bFilterReport .menuButton .menuButtonButton {
    margin-right: 2px;
}
/* only these two buttons appear inside of bFilterReport. Add more as needed. */
.bFilterReport input.btn,
.bFilterReport input.btnDisabled {
    font-size: 80%;
}
/* This is to align the second "interval" select box of ReportParameterQuarter */
.reportParameters #timeInterval {
    vertical-align: bottom;
}
.bFilterReport .reportActions {
    white-space: nowrap;
    margin-bottom: 15px;
}

.bGeneratedReport .bPageBlock .pbHeader .pbTitle {
    color:#A85548;
    display:block;
}

.bGeneratedReport .bPageBlock .pbBody {
    padding:5px 20px 0px 20px;
}


/* we want to hide the bPageBlock */
.bGeneratedReport .bPageBlock,
.bGeneratedReport .pbBody {
  border:none;
  background:none;
}

.bGeneratedReport .pbHeader,
.bGeneratedReport .pbFooter  {
  display: none;
}

.bGeneratedReport .pbSubheader {
  margin-bottom: 0px;
}

/* END - we want to hide the bPageBlock */



.reportTab .roleSelector {
    margin-bottom: 15px;
}
.reportTab .roleSelector .drillDownPath,
.reportTab .roleSelector .drillDownOptions {
    margin-left: 18px;
    font-weight: bold;
}
.reportTab .roleSelector .drillDownPath a,
.reportTab .roleSelector .drillDownOptions a {
    font-size: 109%;
}

.reportTab .reportList .folderName {
  margin-bottom: 2px;
    padding-left: 3px;
    font-weight: bold;
    color: #000;
    background-color: #ccc;
}

.reportTab .reportList .entryActions {
  margin-right: 1.2em;
  font-weight: bold;
}

.reportTab .reportList .entryName {
  margin-right: 0.6em;
}

.reportTab .reportList .entryDesc {
  margin-left: 0.6em;
}

.reportTab .reportList .reportListFolder {
  padding: 5px 0;
}
.reportTab .reportList .reportEntry {
    padding: 1px 0;
}
.bGeneratedReport .chartEditLinks {
    padding-bottom: 5px;
}
.bGeneratedReport .chartEditLinks a {
    padding: 0.25em;
}

/* Progress Indicator - BEGIN */
.progressIndicator {
    margin-left: 18px;
    margin-bottom: 15px;
    overflow: hidden;
}

.progressIndicator h2 {
    vertical-align: top;
    float: left;
}

.progressIndicator #status {
    width: 75%;
    vertical-align: top;
    font-size: 91%;
    padding-left: 1em;
    float: left;
}
/* Progress Indicator - END */

/*
 * Report Wizard Page-specific Things
 * ----------------------------------------
 * These are here for now to get the report wizards looking right until we can decide
 * where they should go in the grand scheme of things. These are listed in the order
 * of the steps for a matrix report.
 *
 * These should go into their respecive pages, but ReportWizard is messy.
 */

/* 1. Type Step */
.reportTab .bWizardBlock .typeStep .reportTypeList {
    padding-bottom:15px;
    width:100%;
}

.reportTab .bWizardBlock .typeStep .reportTypeList th,
.reportTab .bWizardBlock .typeStep .reportTypeList td {
    padding:4px 2px 4px 5px;
    color:#333;
}

/* 2. Aggregates Step */
.reportTab .bWizardBlock .aggregatesStep #maxError {
    text-align: center;
    background-color: #F3F3EC;
}

/* 3. Grouping Step */
.reportTab .bWizardBlock .groupingStep  h3 {
    text-align: left;
    display: block;
}

.reportTab .bWizardBlock .groupingStep  .text {
    font-size: 91%;
}

.reportTab .bWizardBlock .groupingStep  .subtotalRow h3 {
    text-align: left;
    font-size: 91%;
    font-weight: normal;
    padding-top: 8px;
    display: block;
}

/* 4. Columns Step */
.reportTab .bWizardBlock .columnsStep .selectReportColumns .action {
    text-align: right;
}
.reportTab .bWizardBlock .columnsStep .selectReportColumns .categoryHeader {
    margin: .5em 0 0 0;
}

/* 5. Order Columns Step */
.reportTab .bWizardBlock .orderColumnsStep .duelingListBox .selectBox .selectTitle {
     font-weight: bold;
     color: #333;
}

/* 6. Criteria Step */
.reportTab .bWizardBlock .criteriaStep .bFilterReport th {
    font-size: 91%;
    font-weight: normal;
}
.reportTab .bWizardBlock .criteriaStep .advancedSettings {
    overflow: hidden;
}
/* At some point, all the fiteredit styles should be merged. */
.reportTab .bWizardBlock .criteriaStep .bPageBlock .textBox {
    font-size: 91%;
    margin: 0 1em;
}
.reportTab .bWizardBlock .criteriaStep .bPageBlock .addRemoveControl {
    font-size: 91%;
}
.reportTab .bWizardBlock .criteriaStep #reportCriteriaAdvancedHints {
    float: right;
    width: 66%;
}
.reportTab .bWizardBlock .criteriaStep #toggleReportDetailsAndPickCurrency .toggleDetails {
    margin-top: 6px;
    font-size: 91%;
    width: 33%;
}

.booleanFilterTopMargin {
  margin-top:10px;
}

/*
 * 7. Chart Step
 */
 /* TODO: Place holder for when we get comps and fully reskin this page */

.reportTab .bPageTitle .ptHeader {
    color:#DCDEE6;
}
.reportTab .bPageTitle .ptHeader a{
    color:#DCDEE6;
    text-decoration:underline;
}

.crtLayoutPreview .selectReportColumns .action {
    text-align: right;
}

.crtLayoutPreview .selectReportColumns .action .disabledLink {
    text-decoration: underline;
}


.crtLayoutPreview .pbHeader .pbTitle h3,
.crtLayoutPreview .pbHeader .pbLinks {
    color: #FFFFFF;
}

/* END reports */

/* begin forecast - used on the forecast pages & on user-setup page (Quotas) */

.forecastListFilter {
    width:70%;
}

.opportunityTab .bPageBlock .pbHeader table.forecastListFilter {
    width:auto;
}
.opportunityTab .bPageBlock .pbHeader table.forecastListFilter input {
    margin-left: -4px;
    margin-top:1px;
}

.opportunityTab .bPageBlock .pbHeader table.forecastListFilter label {
    margin-left: -1em;
}

.forecastListFilter td,
.forecastListFilter th {
    padding:2px;
    white-space:nowrap;
    text-align: center;
}

.forecastListFilter td {
    padding:2px 2px 2px 6px;
}

.forecastListFilter th {
    padding:2px;
}

.forecastTab .forecastListFilter {
    margin-bottom: 10px;
}

/* begin old forecast */
.oldForecast .list .totalRow * {
    font-weight: bold;
}

.oldForecast h4 {
    margin-bottom: .5em;
}

/* END forecast */


/* EMM TODO  Check if necessary */
/* TODO: polcari - use 'dashboard' instead */
/* i believe .bComponentBlock can be replaced with .dashboard */
.bComponentBlock .bPageBlock {
    border-top-color: #7E1D14;
}
.bComponentBlock .bPageBlock .pbHeader .pbTitle {
    color:#7E1D14;
}
.bComponentBlock .bPageBlock .pbFooter,
.bComponentBlock .bPageBlock,
.bComponentBlock .bPageBlock .pbHeader .pbTitle .twisty {
    background-color:#7E1D14;
}
.bComponentBlock .bPageBlock .pbSubheader{
    background-color:#7E1D14;
}

.bComponentBlock .bPageBlock .pbBody {
    padding:5px 20px 0px 20px;
}


/* ---------- Multi-Select List ---------- */

/* Show selected rows in the available block in blue */
.multiSelectList .available .selected {
    background-color: #DEEDFF;
}

/* ---------- General Tree ---------- */
.treeNode .label {
    font-size: 109%;
    font-weight: bold;
}

.treeNode .actions,
.treeNode .actions a {
    margin-left: 4px;
    color: #666;
}

.treeNode .addChild,
.treeNode .addChild a {
    font-weight: bold;
    color: #666;
}

.treeNode .roleHighlight {
    font-weight: bold;
    background-color: #ddd;
}

.treeNode .roleUser {
    color: #22D;
}

.treeNode .roleUserNon {
    font-weight: bold;
    color: #666;
    font-size: 93%;
}

.treeNode .actions a {
    font-size: 93%;
}

.treeNode .actions a.roleAssign {
    color: #D22;
}


/* ---------- Multi-Select Tree ---------- */
.treeMultiSelect div {
    overflow: hidden;
}

.treeMultiSelect .pbTitle {
    width: 190px;
}

.treeMultiSelect .pbHeader {
    padding-top: 2px;
}

.treeMultiSelect .pbBottomButtons {
    padding-top: 2px;
    clear: left;
}

.treeMultiSelect .tmsBlocks {
    width: 100%;
    float: left;
    clear: left;
}

.treeMultiSelect .tmsBlock {
    overflow: auto;
    border-width: 0px;
    margin: 0px;
    padding: 0px 0px 1px 3px;
}

.treeMultiSelect .tmsBlock.v {
    width: 50%;
}

.treeMultiSelect .tmsBlock .pbSubheader {
    font-size: 100%;
}

/* Hide unselected rows in the selections block */
.treeMultiSelect .tmsBlock.selections .selection {
    display: none;
}

/* Display selected rows in the selections block */
.treeMultiSelect .tmsBlock.selections .selection.selected {
    display: block;
}

/* ----------- treeNode used for displaying org heirarchy ----------- */
.treeNode .plusStart {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -182px;width:20px;
	height:16px;
}

.treeNode .minusStart {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -82px;width:20px;
	height:16px;
}

.treeNode .plus {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -142px;width:20px;
	height:16px;
}

.treeNode .minus {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -42px;width:20px;
	height:16px;
}

.treeNode .plusEnd {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -162px;width:20px;
	height:16px;
}

.treeNode .minusEnd {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -62px;width:20px;
	height:16px;
}

.treeNode .node {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -102px;width:20px;
	height:16px;
}

.treeNode .nodeEnd {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -122px;width:20px;
	height:16px;
}

.treeNode .empty {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -22px;width:20px;
	height:16px;
}

.treeNode .chain {
    background-image: url(/img/sprites/tree.gif);
	background-position: 0px -2px;width:20px;
	height:16px;
}

/* ---------- Criteria Detail ---------- */

.criteriaDetail {
    font-family: 'Arial', 'Helvetica', sans-serif;
    color: #333;
}

/* Field */
.criteriaDetail .fld {
    font-size: 105%;
    font-family: "Courier New", 'Courier', mono;
}

/* Operator */
.criteriaDetail .op {
    font-size: 80%;
    text-transform: uppercase;
    padding: .5em;
}

/* Value(s) */
.criteriaDetail .val {
}

/* AND/OR */
.criteriaDetail .lop {
    font-size: 80%;
    text-transform: uppercase;
}

/* Parentheses */
.criteriaDetail .par {
    font-weight: bold;
}

.folderAccess {
    list-style-type: none;
    margin-left: 0px;
    padding-left: 0px;
}

.folderAccess li {
    margin-left: 0px;
}

.packageEdit .actionColumn {
    width: 50px;
}

/* Category Browser */
A.categoryNode {
   font-size: 110%;
   font-family: Arial, Helvetica;
   font-weight: bold;
   text-decoration: underline;
   vertical-align: top;
   margin-right: 0.7em;
}

A.categorySubNode {
   font-size: 100%;
   font-family: Arial, Helvetica;
   font-weight: normal;
   text-decoration: underline;
   vertical-align: top;
}

table.solutionNode {
    margin-bottom:.81em;
    margin-top:.81em;
    width:100%;
    vertical-align:top;
}

table.solutionBrowser {
    margin-left:-16px;
    margin-right:-13px;
    width:100%;
}

table.solutionBrowser td{
    vertical-align:top;
}

table.solutionBrowser .lbHeader {
    display:inline;
}

table.solutionBrowser div.pagetitle {
  display:inline;
}

.solutionHeader{
    margin-left:-16px;
}
table.solutionBrowser td.solutionBrowserHeader img {
    vertical-align:middle;
    margin:2px;;
}
table.solutionBrowser td.solutionBrowserHeader h3{
    vertical-align:middle;
    margin-left:-10px;
}

table.solutionBrowser .solutionFolder{
    vertical-align:top;
}

.solutionSuggestionsPage .solutionBlock .pbTitle {
    white-space: nowrap;
}

/*Special styles for the 'solution search' related list header element */
.solutionSearchHeader .pbTitle {
  white-space: nowrap;
  width:1%;
  padding-right:1em;
}
.solutionSearchHeader .pbTitle .minWidth {
  display: none;
}


/* End Solution Browser Styles */


/*used in import wizards*/

.importWizardTitle {
    font-family: 'Arial','Helvetica', sans-serif;
    width: 100%;
    font-weight: normal;
    font-size: 1em;
    background-color: #690;
    text-decoration: none;
    height: 24px;
    text-align: left;
    vertical-align: middle;
}

.importWizardTitle td {
    color: #fff;
}

.importWizardTitle td h1 {
  padding-right: 5px;
}

/*start genericTable*/

/* DEPRECATED: do not use this style for new development */
table.genericTable {
    border: 1px solid #333;
    background-color:#F3F3EC;
    padding:0.2em;
    margin-top:0.5em;
    border-top: 3px solid #333;

}

.genericTable .numericalColumn {
    text-align: right;
}

/*end genericTable*/


/*start new Infobox */
.infoBox {
  border-bottom: 2px solid #747E96;
  height:99.5%;
  background-color:#FFFFCC;
}

.infoBox h4,
.infoBox h5,
.infoBox h6 {
    font-family: 'Arial', 'Helvetica', sans-serif;
}

.infoBox ul,
.infoBox ol {
    padding-left: 0;
    margin-left: 0;
}

.infoBoxHeader {
    display: block;
    background-color: #747E96;
    font-size: 100%;
    font-weight: bold;
    color: white;
}

.infoBoxSubheader {
    display: block;
    font-size: 100%;
    font-weight: bold;
    border-bottom: 1px solid black;
    padding: 0 0 2px 3px;
}

/*start infoElement*/

.setupTab .infoBoxElement,
.sysAdminTab .infoBoxElement {
  border-bottom: 2px solid #747E96;
  height:99.5%;
  background-color:#FFFFCC;

}
.infoBoxElement table{
  background-color:#FFFFCC;
  padding-left:3px;
}

.infoBoxElement .infoRow .infoHeader {
    font-weight:bold;
    color:white;

}

.infoBoxElement .infoRow {
  background-color:#747E96;
  font-weight:bold;
  text-align:center;
}

.infoBoxElement .blackLine {
    font-weight:bold;
    background-color:#000;
}

.importCampaignMember .header {font-weight:bold;}

/*end infoElement*/

/* Misc */

.bEmailStatus {
    white-space: nowrap;
}

.bRowHilight {
    background-color: #FAEBD7;
}

/* End Misc */


/*start printable View*/

.printableView table.twoCol .fullWidth{
    width:100%;
}

.printableView td {
    vertical-align: top;
}


/*end pritable view*/

.wizBottom {
    border-top: 2px solid #9C0;
    background-color: #036;
    text-align: right;
    font-weight: bold;
    width: 100%;
    height: 23px;
}
.wizBottom a {
    margin-right: 25px;
    color: #FFF;
}

/* Prevent wrapping in the Mass Add Campaign Member wizards */
.massAddCampaignMemberWiz .detailList .labelCol {
    white-space: nowrap;
}




/* --------------------------------------------- */
/*BEGIN Setup Splash*/

.setupSplash {
    border-bottom: 2px solid;
    background: none;
}

.setupSplash .setupSplashBody .bodyDescription {
    text-align: left;
}

.setupTab .setupSplashBody,
.sysAdminTab .setupSplashBody {
    background-color:#F3F3EC;
    padding:1em;
}

.setupTab table.setupSplashBody,
.sysAdminTab table.setupSplashBody {
    width: 100%;
}

.setupTab .setupSplash .splashHeader,
.sysAdminTab .setupSplash .splashHeader {
    font-weight:bold;
    color:#fff;
    padding-left:1em;
}

.setupSplash .splashImage {
    text-align: center;
}

/* encompasses both the don't remind me again checkbox and the continue button */
.splashContinue {
    width: 100%;
    text-align: center;
}

.setupSplashBody ul {
    margin-left: 0;
    padding-left: 0;
}

.setupTab .setupSplashBody div,
.sysAdminTab .setupSplashBody div {
    margin-bottom:1em;
}


.setupTab .customAppSplash { background-image: url(/img/customApps.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .customAppSplash { background-image: url(/img/customApps.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .orgImportImage { background-image: url(/img/import_myorg.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .orgImportImage { background-image: url(/img/import_myorg.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .contactImportImage { background-image: url(/img/import_diagram.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .contactImportImage { background-image: url(/img/import_diagram.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .integrateSalesforce { background-image: url(/img/integrate_pic.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .integrateSalesforce { background-image: url(/img/integrate_pic.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .offlineBriefcase { background-image: url(/img/offline_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .offlineBriefcase { background-image: url(/img/offline_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .avantGoBriefcase { background-image: url(/img/offline_pda_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .avantGoBriefcase { background-image: url(/img/offline_pda_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .outlookSplash { background-image: url(/img/integration.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .outlookSplash { background-image: url(/img/integration.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .syncChartButton { background-image: url(/img/sync_chart_small.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .syncChartButton { background-image: url(/img/sync_chart_small.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .wirelessChart { background-image: url(/img/wireless_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .wirelessChart { background-image: url(/img/wireless_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .wsdlchart { background-image: url(/img/wsdl_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .wsdlchart { background-image: url(/img/wsdl_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .officeSplash { background-image: url(/img/office_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .officeSplash { background-image: url(/img/office_chart.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .leadImportImage { background-image: url(/img/import_leaddata.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .leadImportImage { background-image: url(/img/import_leaddata.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.setupTab .dataExport { background-image: url(/img/weekly_report.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.sysAdminTab .dataExport { background-image: url(/img/weekly_report.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}
.homeTab .campaignImportImage { background-image: url(/img/import_campaigndata.gif);
	background-position: 0px 0px;width:400px;
	height:130px; background-repeat: no-repeat;}


.setupTab .setupSplashBody .alertBox .content,
.sysAdminTab .setupSplashBody .alertBox .content {
    padding:5px 10px;
    background-color:#fff;
    font-size: 109%;
}
/*END  Setup Splash */
/* --------------------------------------------- */
/*BEGIN  Auto Complete Box*/
.autoCompleteBox,  .autoCompleteBoxScrolling {
    padding : 2px;
    display: block;
    position: absolute;
    border: 1px solid #666;
    background: #fff;
    width: 25em;
    z-index: 10;
}

.autoCompleteBox {
    overflow: hidden;
}

.autoCompleteBoxScrolling {
    overflow-x: hidden;
    overflow-y: auto;
}

.autoCompleteMoreRow {
    color: #777;
}

.autoCompleteMoreRow , .autoCompleteRow , .autoCompleteSelectedRow {
    height: 1.5em;
    white-space: nowrap;
}
.autoCompleteRow , .autoCompleteSelectedRow {
    cursor: pointer;
}
.autoCompleteSelectedRow{
    background-color : #aaccff;
}

/*END  Auto Complete Box*/
/* --------------------------------------------- */

/* see RelatedAccountHierarchyList.java */
.bRelatedList .relatedAccountHierarchy .list th.dataCell {
  white-space: nowrap;
}
/* END RelatedAccountHierarchyList.java */

/* see RelatedProcessHistoryList.java */

.bRelatedList .relatedProcessHistory .list .extraRow tr {
    line-height: 16px;
    border-right: none;
    padding-right: 0px;
}
.bRelatedList .relatedProcessHistory .extraRow td.actionColumn .actionLink,
.bRelatedList .relatedProcessHistory .extraRow td,
.bRelatedList .relatedProcessHistory .extraRow th {
    font-weight: bold;
    color: #FFFFFF;
    padding-top: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
}

.bRelatedList .relatedProcessHistory .extraStatus {
    vertical-align: top;
    padding-left: 2px;
    padding-right: 5px;
    padding-top: 2px;
    color: black;
}

.bRelatedList .relatedProcessHistory .extraStatusDiv_P {
    background-color: #ffd74b;
}
.bRelatedList .relatedProcessHistory .extraStatusDiv_R {
    background-color: #fb8a8c;
}
.bRelatedList .relatedProcessHistory .extraStatusDiv_A {
    background-color: #a1f78d;
}
.bRelatedList .relatedProcessHistory .extraStatusDiv_X {
    background-color: #c0bebc;
}
/* END RelatedProcessHistoryList.java */

/* Price editing */
.addEditPrice,
.addEditPrice table {
    width: 100%;
}
.addEditPrice th {
    border-bottom: 1px solid #000;
}

/* used to prevent the related list from wrapping */
body.choosePriceBook .pbHeader .pbTitle {
    white-space: nowrap;
    width: 75%;
}


.skiplink {
    position: absolute;
}

#validationStatus .validStyle {
  color:#090;

}

/* Begin - 142.3 - we want text darker! (but only when its not bold and on top of a background) */

.pbBody td{
   color: #818181;
   background-color:#FFF;
   font-variant:normal;
   font-size:11px;
}
.pbBody td:hover {
   color: #818181;
   background-color:#f3f2f1;
   font-variant:normal;
   font-size:11px;
}

.pbBody {
   color: #FFF;
}
.lbBody a {
   color: #FFF;
   text-decoration:underline;
}
.pbBody a {
   color: #818181;
   text-decoration:underline;
}
.lbBodyDescription{
   color: #FFF;
}

.list .headerRow .noRowsHeader {
   color: #FFF;
}

.reportTab .pbBody .reportEntry .entryActions a {
  color: #818181;
}

/* end - we want text darker */

/* Legacy Styles - DO NOT USE THESE */
/*      These styles are here only so that legacy bold-ness in the label-files */
/* is respected in production.  Please use a <strong> for boldness and <em> for italics */
.bodyBold {
  font-weight: bold;
}
.bodyItalic {
  font-style: italic;
}
.greyBold,
.bodyBoldGrey {
  font-weight: bold;
}
.bodySmall {}
.bodySmallBold {
  font-weight: bold;
}
.bodySuperSmall {}
.bodyBoldWhite {
  font-weight:bold;
}
.redLargeBold {
  color: #900;
  font-weight:bold;
}
/* END Legacy Styles  - DO NOT USE THESE */

/* used for the NO_TABLE_SIDEBAR_HEADER where a sidebar is visible*/
.noTableSidebar {
  position: static;
  width: 195px;
}

.noTableBody {
  padding-right: 10px;
  position: static;
  margin-left: 205px;
}

.noTableFooter {
  clear: both;
  margin-left: 205px;
}
/* end NO_TABLE_SIDEBAR_HEADER */

/* report wizard, grouping step */
.reportRunPage .specifyHeadings H3 {
    border-bottom: 1px solid black;
    padding-bottom: 1px;
    margin-top: 1em;
    margin-bottom: 0.5em;
}

.reportRunPage .orderColumnsStep .duelingListBox TABLE.layout {
    margin-left: auto;
    margin-right: auto;
}

/* BEGIN Hover/Overlays Section */
.hoverContent {
    width: 300px;
}

.hoverInner {
    background-color: #FFF;
    border-width: 0px 0px 0px 1px;
    margin: 0px;
    padding: 0px;
    border-left: 1px solid #BBB;
}

.hoverInner .bPageBlock {
    margin-bottom: 0px;
    padding-bottom: 0px;
    border-top: none;
    padding-bottom: 0px;
}

.hoverInner .bPageBlock .pbHeader {
    margin:0px 0px 0px 0px;
}

.hoverInner .bPageBlock .pbBody {
    margin-right: 0px;
}

.hoverInner .pbFooter {
    display: none;
}

.hoverOuter {
    position:relative;
    right:2px;
    bottom:2px;
    border-style:solid;
    border-width:1px 1px 1px 1px;
    border-color:#000;
    padding: 0px 0px 0px 6px;
}

.hoverOuter.noStatusBar {
    padding: 0px;
}

.hoverDetail {
    display:block;
    margin:0px;
    padding:0px;
    z-index:100;
    position:absolute;
    background-color:#666;
    text-align:center;
}

.hoverDetail .bPageBlock {
    margin-bottom:0px;
}

.hoverDetail .pbSubsection {
    width: 258px;
    overflow: hidden;
}

.hoverDetail .simpleHover {
    text-align: left;
    width: 300px;
    overflow: hidden;
}

.hoverDetail .simpleHover .labelKey {
    font-weight: bold;
}

.hoverDetail .bPageBlock .detailList .labelCol {
    width: 30%;
}

.hoverDetail .bPageBlock .pbTitle {
    text-align: left;
}

.hoverDetail .bPageBlock .pbTitle img.minWidth {
    display:none;
}

.hoverDetail .bPageBlock .pbButton {
    text-align: right;
    white-space: normal;
}
/* END Hover/Overlays Section */

.customButtonDetailSection {
    border: 1px solid #333333;
    background-color: #eeeeee;
}

.bPageBlock .detailList .tdSectionRowHeader th {
    border-bottom: 2px solid #CCC;
    border-top: 2px solid #CCC;
    white-space: nowrap;
    padding-bottom: 6px;
    padding-top: 4px;
}

.pbBody .tdSectionRowHeader div{
    font-weight: bold;
}

.tdTableColumnHeader  {
    width: 20%;
}


.bPageBlock .detailList .tdSectionRow td {
   padding-top: 3px;
   padding-bottom: 2px;
}

.pSearchShowMore {
  font-size:.95em;
  text-align:center;
  white-space: nowrap;
  margin-top:.3em;
}

.pSearchShowMore .itemsRange{
  padding-right:.5em;
  padding-left:.5em;
}


.pSearchShowMore .pShowMore {
  padding:0em;
}

.pSearchShowMore .pShowMoreNoLink {
  padding:0em;
  color: rgb(153, 153, 153);
  text-align:left;

}

.topNavigation .pSearchShowMore .noLink,
.relatedListsearchFooter .pSearchShowMore .noLink,
.relatedListsearchHeader .pSearchShowMore .noLink,
.tagResults .pSearchShowMore .noLink {
  color: #999;
}

.pSearchShowMore .nextArrow,.pSearchShowMore .prevArrow{
  margin-right:.5em;
  margin-left:.5em;
}

.searchColumnSelector {
  background-color: #D9D9D9;
  border: 1px solid #999;
  z-index:50;
  right:-0.5em;
  position:absolute;
  margin-top:.25em;
}

.searchColumnSelectorHolder {
    position:relative;
}

.searchFilterFields .searchFilterHelp {
    white-space: nowrap;
    font-size:.95em;
}

.searchFilterHelp .searchFilterHelpImage{
    vertical-align:bottom;
    display:block;
    margin-top:10px;
}

.searchFilterHelp .searchFilterHelpText{
    vertical-align:bottom;
    display:block;
    margin-top:12px;
}

.searchColumnSelector .selectCell {
    vertical-align:bottom;
}

.searchColumnSelector select {
    width:130px;
}

.searchFilterFields {
  background-color: #D9D9D9;
  border-top: 1px solid #999;
  border-bottom: 1px solid #999;
  z-index:50;
}


.searchFilterFields td input{
    margin-right:.3em;
}

.searchFilterFields td label{
    font-weight:bold;
    vertical-align:bottom;
}

.searchColumnSelector .duelingListBox {
  margin:1em;
}

.searchColumnSelector .selectorHeader {
    font-weight: bold;
    background-color: #666;
    color: #FFF;
    text-align: left;
    padding:3px;
}
.searchFilterFields .filterFieldsHeader{
    text-align: center;
    margin-bottom:.5em;
}
.searchFilterFields .filteredBy {
    font-weight:bold;
    margin-right:.5em;
    margin-left:.5em;
}

.searchFilterFields .summaryRow td {
    text-align:left;
}

.searchFilterFields .customizeFilters {
    float:right;
    font-size:.95em;
}

.searchFilterFields td{
    padding-left:.5em;
}

.searchFilterFields td.rightCell, .searchFilterFields td.leftCell{
    padding:0em;
    margin:0em;
    width:100%;
}

.searchFilterFields .filterFields, .searchFilterFields label{
    white-space: nowrap;
    text-align:left;

}
.bRelatedList .customizeColumns, .bRelatedList .customizeDisplay {
    width:100%;
  padding-right:1em;
  padding-left:1em;
  font-size:.95em;
}

.searchFirstCell {
    white-space:nowrap;
}

.requiredInlineFormulaTable .requiredCell {
    width:0%;
}

.searchColumnSelector .columnSelectorButtons{
  text-align:center;
  padding:.5em;

}
.searchFilterFields .searchFilterButtons {
    margin-top:1em;
    text-align:left;
}

.searchFilterFieldsHolder .searchFilterFields {
    text-align:left;
    padding:.3em;

}

.searchFilterFields .searchFilterButtons {
    padding:0em;
}

.searchFilterFields .filterLink {
    padding-left:1.0em;
    font-size:.95em;
}

.searchFilterFields .clearFilter {
    font-size:.95em;
}

.searchFilterFields .breakFilter {
    padding-right:.5em;
    padding-left:.5em;
}

.searchFilterFieldsHolder {
    margin-top:.2em;
}

.searchFilterFieldsInfo {
    margin-top:.1em;
    padding:0em 0em .2em 0;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    margin-bottom:-2px;
    white-space:nowrap;
}

.searchFilterFieldsInfo td{
    text-align:center;
    font-weight:bold;
    font-size:1.1em;
    color:#fff;
    padding-top:.4em;
}

.searchFilterFieldsInfo td.noShowLink {
    font-weight:normal;
    text-align:right;
    font-size:.9em;
    padding-bottom:.2em;
    padding-top:.2em;
}
.searchFilterFieldsInfo td.noShowLink .separator {
    padding-right:.5em;
}

.searchFilterFieldsInfo td.noShowLink a {
    color:#fff;
    padding-right:.5em;
}
.waitingSearchDiv {
    position:absolute;
    text-align:center;
    top:0px;
    z-index: 20;
    left:0px;
}

.waitingSearchDiv .waitingSearchHolder {
    font-weight:bold;
    font-size:1.20em;
    position:relative;
    padding:0.5em;
    white-space:nowrap;
    margin-left:auto;
    margin-right:auto;
    background-color:#f3f2f1;
    border: 1px solid #333;
}

.waitingSearchDiv .waitingHolder {
    font-weight:bold;
    font-size:1.20em;
    position:relative;
    padding:0.5em;
    white-space:nowrap;
    margin: auto;
    width: 40%;
    top: 45%;
    background-color:#f3f2f1;
    border: 1px solid #333;
}

.waitingSearchDivOpacity {
    /*Mozilla:*/
    opacity: 0.5;
    background-color:#f3f2f1;
}

.waitingSearchDiv .waitingSearchHolder .waitingImage,
.waitingSearchDiv .waitingHolder .waitingImage  {
    vertical-align:bottom;
}

.pageMask {
    height:100%;
    width:100%;
    left:0px;
    top:0px;
    position:absolute;
    z-index:500;
}

.pageMaskWithOpacity {
    background-color:#fff;
    opacity:0.5;
}

.pageMaskWithPosition {
    left:200px;
    top:200px;
    width:500px;
    height:526px;
    background-color:#fff;
    border: 2px solid #000;
}

.pageMaskCancel {
    background: url(/img/search_dismiss.gif) no-repeat scroll 0pt;
    height:18px;
    width:18px;
    margin-left:0px;
    margin-top:0px;
    position:absolute;
    right:6px;
    top:4px;
}

.pageMaskIFrame {
    height: 500px;
    width: 839px;
    border: 0px;
}

.pageMaskHeader {
    background:transparent url(/img/lookup_top.gif) no-repeat scroll 0pt;
    cursor: move;
    color:#fff;
    font-size:1em;
    font-weight:bold;
    margin:0px 0px 0px 0px;
    padding:4px 0px 4px 0px;
    height:18px;
    text-align:left;
    width:100%;
}

.waitingSearchDiv .waitingSearchHolder .waitingDescription {
    padding:0 1.5em 0 0.5em;
}

.waitingSearchDiv .waitingSearchHolder .waitingCancel {
    padding:0em;
    border:0;
    height:13px;
    width:13px;
    cursor:pointer;
    vertical-align:top;
    background: url(/img/search_dismiss.gif) no-repeat;
}

.waitingHeaderSearchDiv {
    position:absolute;
    top:0px;
}


.dhtmlHistoryFrame {
    border: 0px;
    width: 1px;
    height: 1px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    visibility: visible;
}

/* Used in filter lookup (report wizard) and view all pages */
.topButton,
.bottomButton {
    padding: 2px 0;
    text-align: center;
}

.helpOrb {
    background-image: url(/img/help/helpOrbs.gif);
	background-position: 0px 0px;width:20px;
	height:15px;
}

.detailList .helpOrb {
    position: absolute;
    top: 0;
    right: -20px;
}

.editPage .detailList .helpOrb {
    right: -23px;
}

.helpButton,
.helpButtonOn {
    position: relative;
}


.helpButton .helpOrb {
    background-position: top left;
}

.helpButtonOn .helpOrb {
    background-position: top right;
}

.helpText {
    text-decoration: none;
    position: absolute;
    display: none;
    opacity: 0;
    width: 15em;
    z-index:12;
    background-color: #FEFDB9;
    padding:  2px 5px;
    border: 1px solid orange;
    text-align: left;
    white-space: normal;
    font-weight: normal;
    color: #000;
}

.staleValue {
    background-image: url(/img/staleValue.gif);
	background-position: 0px 0px;width:18px;
	height:12px;
    background-position: top right;
    background-repeat: no-repeat;
}

.multiLineItem th {
    font-weight: normal;
}

.multiLineItem .bodyBold {
    font-weight: bold;
}

/* used on the custom field wizard */
.bEditBlock .infoIcon {
    vertical-align: top;
    margin-top: 3px;
}

.codeBlock {
   font-family: "Courier New", 'Courier', mono;
   font-size: 100%;
}

.codePrototype {
    list-style:none;
    font-family:"Courier New","Courier","mono";
    padding-left:0;
}

.codePrototypeMember {
    list-style:none;
    padding:6px 0px;
}


/* preference selection summary info */
.summaryOuter {
    border: 1px dotted #999;
    background-color: #EEE;
    padding: 10px;
    font-weight: bold;
    margin: 10px 0;
}

.summaryInner {
    padding: 8px;
    margin: 10px 0;
    border: 1px solid #999;
    background-color: #FFF;
    font-weight: normal;
}

.summaryOuterNoBackground {
    padding: 10px;
    font-weight: bold;
    margin: 10px 0;
}

.summaryInnerNoBackground {
    background-color: #FFF;
    font-weight: normal;
    border: none;
    padding: 0;
    margin: 0;

}

.summaryInner h2, .summaryInnerNoBackground h2 {
    font-size: 130%;
    font-weight: bold;
    display: block;
    border-bottom: 1px solid #CCC;
}

.summaryInner .summaryNo, .summaryInnerNoBackground .summaryNo {
    font-weight: bold;
    color: #900;
}

.summaryInner .summaryYes, .summaryInnerNoBackground .summaryYes {
    font-weight: bold;
    color: #090;
}

.summaryInner td, .summaryInnerNoBackground td {
    padding-left: 10px;
}

.summaryInner th, .summaryInnerNoBackground th {
    vertical-align: top;
}

.summaryOuter .summaryFooter{
    text-align: center;
 }

.summaryOuterNoBackground .summaryFooter {
    text-align: center;
    padding-top: 5px;
}

/****************************************
 * TODO RPC:
 * Aim to remove everything in here.
 * START
 */

.bWizardBlock .bRelatedList .contactBlock .secondaryPalette .pbHeader {
    border-top-color: #56458C;
}
.bWizardBlock .bRelatedList .contactBlock .secondaryPalette .pbBody {
    border-bottom-color: #56458C;
}

.bWizardBlock .bRelatedList .caseBlock .secondaryPalette .pbHeader {
    border-top-color: #B7A752;
}
.bWizardBlock .bRelatedList .caseBlock .secondaryPalette .pbBody {
    border-bottom-color: #B7A752;
}
/****************************************
 * TODO RPC:
 * END
 */

.listViewport {
    border: 1px solid #D8D8D8;
    margin: 0px;
}

.listViewport .topNav {
    color: #FFF;
    background-repeat: repeat-x;
    background-color: #FFF;
}

.listViewport .topNav a {
    color: #333;
}

.listViewport .topNav .controls {
   padding: 5px;
}

.listViewport .topNav .controls .divisionLabel {
	float: left;
	margin: 0.4em 15px 0px 0px;

}

.listViewport .topNav .title {
    font-size: 120%;
    font-weight: bold;
}

.listViewport .topNav .btn {
    margin-top: 0.3em;
}

.listViewport .topNav .title,
.listViewport .topNav .btn,
.listViewport .topNav .linkBar .filterLinks {
    float: left;
}

.listViewport .topNav .title {
    margin-right: 4px;
}

.listViewport .topNav .linkBar {
    background-color: #f3f3f3;
    color: #333;
    padding: 0 5px 0;
}

.listViewport .topNav .linkBar .filterLinks {
    padding: 3px 0;
}

.listViewport .topNav .linkBar .rolodex {
    padding: 4px 0;
    float: right;
}

.listViewport .topNav .linkBar .rolodex,
.listViewport .topNav .linkBar .rolodex a {
    color: #333;
}

.listViewport .topNav .topNavTab {
    float: right;
    padding-right: 4px;
    margin-top: 3px;
    color: #333;
    white-space: nowrap;
}

.listViewport .topNav .topNavTab .tab {
    cursor: pointer;
    padding: 0px 8px;
    border-right: 1px solid #C2C2C2;
    margin-left: 1px;
}

.listViewport .topNav .topNavTab .tabOver {
    cursor: pointer;
    margin: 0px;
    padding: 0px 8px;
    padding-bottom: 8px;
    background-color: #F9F9F9;
    border: 1px solid #C2C2C2;
    border-bottom: none;
}

.listViewport .topNav .topNavTab img {
    cursor: pointer;
    vertical-align: middle;
    margin-left: 8px;
}

.listViewport .topNav .drawer {
    border: 1px solid #9a9a9a;
    background-color: #f9f9f9;
    background-image: url(/img/topshadow.gif);
    background-repeat: repeat-x;
    margin: 0px 2px 2px;
    text-align: center;
    color: #333;
    overflow: hidden;
}

.listViewport .topNav .drawer a {
    color: #333;
}

.listViewport .listBody {
    background-color: #F3F3EC;
    border-top: 1px solid #C2C2C2;
    border-bottom: 1px solid #D8D8D8;
}

.listViewport .listBody .exception {
    position: absolute;
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 100%;
    background-color: #FFF;
    display: none;
}

.listViewport .listBody .exception .title {
    font-weight: bold;
    font-size: 1.5em;
}

.listViewport .offPageIds {
    display: none;
}

.listViewport .bottomNav {
    padding: 5px;
    background-color: #F3F3F3;
    border-top: 1px solid #FFF;
}

.listViewport .bottomNav a {
    color: #FFF;
}

.listViewport .paginator {

}

.listViewport .ASC,
.listViewport .DESC {
    background: #D6DAE0;
}

.listViewport .ASC .x-grid3-sort-icon {
    background-image:url(/img/colTitle_uparrow.gif);
    display:inline;
}

.listViewport .DESC .x-grid3-sort-icon {
    background-image:url(/img/colTitle_downarrow.gif);
    display:inline;
}

.listViewport .x-grid3-cell-inner,
.listViewport .x-grid3-hd-inner {
    padding-left: 3px;
}

.listViewport .x-grid3-header,
.errorConsole .x-grid3-header {
    background:#F9F9F9 url(/img/colHeader_bg.gif) repeat-x scroll 0 0;
}

.listViewport .x-grid3-hd-row td,
.errorConsole .x-grid3-hd-row td {
    font-weight: bold;
}

.listViewport .x-grid3-hd-row td,
.listViewport .x-grid3-row td,
.listViewport .x-grid3-summary-row td {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 100%;
    line-height: normal;
    -moz-user-select: text;
}


.errorConsole .x-grid3-hd-row td,
.errorConsole .x-grid3-row td {
    font-family: 'Arial', 'Helvetica', sans-serif;
    line-height: normal;
    -moz-user-select: text;
    font-size: 75%;
}

.errorConsole .x-grid3-row td a {
    vertical-align: top;
    margin-left: 4px;
}

.listViewport .x-grid3-row-over,
.errorConsole .x-grid3-row-over {
        background: #fbfbee;
}

.listViewport .x-grid3-row-selected,
.errorConsole .x-grid3-row-selected {
        background: #b0e1fa !important;
}

.listViewport .x-panel-body {
    border: 0px;
}

/* EXT CSS overrides for drag-and-drop on enhanced lists */

.x-dd-drop-icon {
    left: 13px;
    top: 10px;
}

.x-dd-drop-nodrop .x-dd-drop-icon {
    background-image: url(/img/permissions_deny16.gif);
}

.x-dd-drop-ok .x-dd-drop-icon {
    background-image: url(/img/permissions_confirm16.gif);
}

.x-dd-drag-ghost {
    border-width: 1px;
    border-style: solid;
    border-color: #CCC #AAA #AAA #CCC;
    padding: 6px;
    padding-left: 40px;
}

/* used for draggable rows */
.x-dd-drag-ghost .dragElement {
    margin: 0px;
    padding: 3px;
    background: #FFF;
    border: 1px solid #CCC;
    font-size: 110%;
}

.x-dd-drag-proxy .x-grid3-hd-inner {
    background: #FFF;
    border: 1px solid #CCC;
}

#refreshList {
    display: none;
    margin: 4px 0;
}

.errorConsole .errorConsoleHeader {
    font-family: 'Verdana','Geneva',sans-serif;
    padding: 4px 8px;
}

.errorConsole .errorConsoleHeader .errorSummary {
    padding-bottom: 4px;
}

.errorConsole .errorConsoleHeader .errorTitle {
    font-weight: bold;
}

.errorConsole .errorConsoleHeader .errorTitle input {
    margin-left: 8px;
}

.errorConsole .errorConsoleHeader .errorSummary img {
    vertical-align: top;
    margin-right: 6px;
}

.errorConsole .viewedError {
    text-decoration: line-through;
    color: #ccc;
}

.errorConsole .viewedError .errorSmall {
    visibility: hidden;
}

.errorConsole .viewedError a {
    text-decoration: line-through;
    color: #ccc;
}

.paginator {
    margin: 0px;
    white-space: nowrap;
    text-align: center;
    position: relative;
}

.paginator .left {
    position: absolute;
    left: 0px;
}

.paginator .right {
    position: absolute;
    right: 0px;
}

.paginator .pageInput {
    width: 2em;
    margin: 0px 3px;
    font-size:98%;
    height:1em;
    text-align:center;
    vertical-align:middle;
}

.paginator .first{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:0 1px;
    width: 9px;
    height: 10px;
}

.paginator .firstoff{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:0 -10px;
    width: 9px;
    height: 10px;
}

.paginator .prev{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-10px 1px;
    margin:0;
    padding:0;
    width: 9px;
    height: 10px;
}

.paginator .prevoff{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-10px -10px;
    margin:0;
    padding:0;
    width: 9px;
    height: 10px;
}

.paginator .next{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-17px 1px;
    width: 9px;
    height: 10px;
}

.paginator .nextoff{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-17px -10px;
    width: 9px;
    height: 10px;
}

.paginator .last{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-27px 1px;
    width: 9px;
    height: 10px;
}

.paginator .lastoff{
    background-image:url(/img/paginationArrows.gif);
    background-repeat:no-repeat;
    background-position:-27px -10px;
    width: 9px;
    height: 10px;
}

.paginator .prevNextLinks {
    color: #A8A8A8;
}

.paginator .prevNextLinks a {
    color: #333;
    text-decoration: none;
}

.paginator .prevNextLinks .prevNext {
    margin: 0px 3px;
}

.paginator .selectCount {
    margin: 0px 2em;
    padding: 0px 0.3em;
}

.paginator .selectCountHi {
    background-color: #FFE324;
}

.paginator .selectorTarget {
    cursor: pointer;
    position: relative;
}

.paginator .selectArrow {
    background-image: url(/img/func_icons/util/selectArrow12.gif);
    background-position: left;
    background-repeat: no-repeat;
    height: 12px;
    width: 14px;
    position: relative;
    left: 2px;
    top: 1px;
}

.paginator .selector {
    display: none;
    position: absolute;
    bottom: 1.5em;
    left: 0px;
    cursor: pointer;
    border: 2px solid #CCC;
}

.paginator .selectorOpen .selector {
    display: block;
}

.paginator .selectorHover .selectArrow,
.paginator .selectorOpen .selectArrow {
    background-position: -15px 0;
}

.paginator .selector .opt {
    padding: 3px;
}

.paginator .selector .optSelected,
.paginator .selector .optSelected td {
    background-color: #b0e1fa;
    color: #333;
}

.paginator .selector .optSelected td.rppOpt {
    color: #333;
}

.paginator .selector .optUnselected {
    background-color: #DDD;
    color: #DDD;
    white-space: nowrap;
}

.paginator .selector .optHover,
.paginator .selector .optHover td,
.paginator .selector .optHover .rppOpt {
    background-color: #e1f6ff;
    color: #333
}

.paginator .selector .rppOpt {
    background-color: white;
    font-weight: bold;
    color: #333;
    padding: 0px 5px;
}

.paginator .selection {
    text-align: left;
    background-color: #FFF;
    color: #333;
}

.paginator .toolbar {
    display: none;
    position: absolute;
    width: 100%;
    left: 0px;
    top: -2.5em;
    background-color: #333;
    opacity: 0;
    text-align: left;
    padding: 5px 0px;
}

#gTalkSidebar {
    border-style:none;
    width:180px;
}

#gTalkResize {
    background-image: url(/img/google/talk_resize_bar.gif);
    background-position: bottom;
    cursor:s-resize;
    display:block;
    height:8px;
    width:180px;
    background-color: #FFF;
}

#gTalkResize.hidden {
    display:none;
}

.gTalkToggle {
    padding-left:0.5em;
    font-weight:normal;
    cursor:pointer;
}

.gTalkToggle .hidden {
    display:none;
}

#fbGettingStarted {
    text-align: center;
    cursor: pointer;
    width: 180px;
}

#fbGettingStartedTop {
    background-image: url(/img/google/getting_started_button_fatboy_top.gif);
    height: 60px;
}

#fbGettingStartedMid {
    background-image: url(/img/google/getting_started_button_fatboy_middle.gif);
    padding: 0px 15px 8px 15px;
    font-weight: bold;
}

#fbGettingStartedBot {
    background-image: url(/img/google/getting_started_button_fatboy_bottom.gif);
    height: 34px;
    text-decoration: underline;
    line-height: 2.5em;
}

.fbGettingStartedOn div {
    background-position: top right;
}

.fbGettingStartedOff div {
    background-position: top left;
}

.spanningError h4 {
    color: #C00;
    display:block;
}

.spanningError td,
.spanningError th {
    padding-right: 8px;
}
.spanningError #otherFields th {
    font-weight: bold;
    border-bottom: 1px solid black;
}

.spanningError .objectName {
    background-color: #CCC;
    font-weight: bold;
}

.salesTeamDisabledLink{
    color:#AAA;
}


/* BEGIN Custom Field Related List */


.cdtTable .CfLabelCol {
    padding-left: 20px;
}

.cdtFieldLabel {
    vertical-align: top;
}

.cdtSubfieldLabel {
    vertical-align: top;
}

.cdtSubfieldIndent {
    padding-left: 9px;
}

.readonlybanner {
    background: url(/img/readOnlyBannerBG.gif) repeat-x top;
}

.readonlybanner .bannerContentTitle {
   color:#333333;
   font-family: 'Verdana', 'Arial', 'Helvetica', sans-serif;
   font-size: 1.1em;
   font-weight:bold;
   line-height:normal;
   margin:0 auto;
}


.readonlybanner .bannerContentSubtitle {
   color:#000000;
   font-family: 'Verdana', 'Arial', 'Helvetica', sans-serif;
   font-size: 1.1em;
   font-weight:normal;
   line-height:normal;
   margin:0 auto;
}

.readonlybanner .bannerContentSubtitle a {
    color: #000000;
    font-weight: normal;
    text-decoration:underline;
}

.newHelpTraining {
    color: #E26C0A;
    font-size:90%;
    vertical-align: top;
}

A:link.newHelpTraining {
   color: #E26C0A;
   font-size:100%;
}


/* END Custom Field Related List */

.userLinkIconImage {
    margin-right: 3px;
    width: 16px;
    height: 16px;
    vertical-align: top
}

.phoneNumberCategory {
    color: #666666;
}

.loading {
    text-align:center;
    font-weight:bold;
    font-size:1.20em;
    padding:0.5em;
    white-space:nowrap;
    margin-left:auto;
    margin-right:auto;
    background-color:#ffc;
    border: 1px solid #333;
}

.timeStamp {
    color:#777777;
    margin:0 5px;
    white-space: nowrap;
}

.timeStamp, .feedContainer .unsubscribeLink, .commentLink {
    font-size: 88%;
}

.loading img {
    vertical-align: middle;
}

.loading .loadingText {
    padding-left: 4px;
    vertical-align: middle;
}

.feedItem table {
    table-layout: auto;
    width: 99%;
}

.feedItem td {
    padding: 0;
}

.feedItemIconCell {
    width: 16px;
}

.feedItem img {
    float: left;
    margin-right:3px;
}

.feedItemIconCell img {
    height: 16px;
    width: 16px;
    padding-top: 2px;
}

.feedItemText {
    padding-bottom: 2px;
    line-height: 20px;
}

.feedItem ul {
    margin: 0px 0 0;
    padding: 0;
}

.feedItem .toggleHideChanges {
    margin-top: 4px;
    margin-bottom: 4px;
}

.feedItemIconCell {
    vertical-align: top;
}

.feedCommentContainer {
    border-bottom:1px solid #CCCCCC;
    margin-left: 25px;
}

.lastFeedItem {
    border-bottom: none;
}

.feedArrow {
    padding-top: 5px;
}

.expandableFeed .feedArrow {
    background: transparent url("/img/feeds/entityCommentBubble.png") no-repeat scroll 5px 0;
}

.feedCommentIconCell {
    vertical-align: top;
    width: 32px;
}

.expandableFeed .feedComment, .expandableFeed .feedEnterComment, .expandableFeed .feedShowMore {
    background-color: #E5E5E5;
}

.feedEnterComment {
    margin-bottom: 6px;
}

.feedComment, .feedShowMore {
    font-size: 90%;
    margin: 0 0 2px;
}

.feedComment {
    padding: 2px;
    position: relative;
}

.feedShowMore {
    padding: 8px 4px;
}

.feedCommentContainer img {
    /*height: 32px;*/
    width: 32px;
    padding-top: 0px;
}

.inputComment {
    border: 1px solid #C0D0D0;
    color: #666666;
    margin: 0 auto;
    padding-left: 5px;
    width: 98%;
}

.feedCommentContainer textArea {
    height: 32px;
    overflow: auto;
}


.feedCommentDelete {
    background: url("/img/userprofile/userProfileCommentDelete_off.gif") no-repeat;
    display: block;
    position: absolute;
    right: 0px;
    top: 4px;
    height: 16px;
    width: 16px;
}

.feedGroupHeader .secondaryTitle {
    font-weight: normal;
}

.expandableFeed .feedContainer a, .expandableFeed .feedContainer .timeStamp {
    white-space: nowrap;
}

.expandableFeed .feedGroupHeader, .expandoFeedContainer .vfButtonBar {
    background-color:#EDEDED;
    color:#333333;
    font-size:83%;
    font-weight:bold;
    padding:0 5px;
    line-height:22px;
    border-top:1px solid #CCCCCC;
}

.expandoFeedContainer .mainFeed {
    margin-right: 170px;
    padding:5px 15px;
}

.homepage .expandoFeedContainer .mainFeed {
    margin-right: 0px;
}

.expandoFeedContainer .rightBar {
    width: 157px;
    padding:5px 10px;
    float: right;
}

.expandoFeedContainer {
    background:#F3F3EC none repeat scroll 0 0;
    clear:both;
    table-layout:fixed;
    width: 100%;
}

.expandoFeedContainer .rightBar .vfButtonBar a {
    right: 20px
}

.feedItem {
    padding:3px 0;
}

.exElem {
    margin: 20px;
}

.exElem .messageTable .messageCell .messageText a {
    margin: 0px;
    font-size: 100%;
}

.homeTab .bPageTitle .ptBody .content,
.userProfilePage .bPageTitle .ptBody .content{
    width: 65%;
    white-space: normal;
}

.homeTab .bPageTitle .ptBody .links,
.userProfilePage .bPageTitle .ptBody .links {
    width: 20%;
    white-space: normal;
}

.feedContainer .unsubscribeLink a {
    color: #555;
    margin-right: 5px;
}

.feedContainer .commentLink a {
    color: #555;
}

.vfButtonBar a {
    color:#333333;
    font-weight:normal;
    float:right;
    line-height:22px;
    margin-right: 5px;
}

.followerIcon {
    width: 32px;
}

.followersList {
    margin: 10px;
    overflow-x: hidden;
}

.lookupFilterFormula {
    padding-left: 10px;
    padding-top: 5px;
}

.sortAsc {
	background-image: url('img/ascending.png');
	background-repeat:no-repeat;
	background-position: 0 0;
	height:15px;
	vertical-align:text-top;
	width:20px;
}

.sortDesc {
	background-image: url('img/descending.png');
	background-repeat:no-repeat;
	background-position: 0 0;
	height:15px;
	vertical-align:text-top;
	width:20px;
}


]]>
   
</style>
</xsl:template>

<xsl:template name="header">
	<table border="0" width="100%" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left">
				<xsl:apply-templates select="HEAD/following-sibling::IMG[@alt='Salesforce SFA']" />
			</td>
			<td align="right">
				<xsl:apply-templates select="DIV[@class='sidebarModuleHeader']"/>
				<xsl:apply-templates select="DIV[@class='standardSearchElementBody']"/>
			</td>
		</tr>   
	</table>
</xsl:template>


<!-- 
| This is the generic HTML template, do not modify 
-->
<xsl:template match="@*|node()">
	<xsl:copy>
		<xsl:apply-templates select="@*|node()"/>
	</xsl:copy>
</xsl:template>

<xsl:template match="@name">
 		<xsl:attribute name="name"><xsl:value-of select="../@id" /></xsl:attribute>
</xsl:template>



<!-- 
| This removes the checkbox on the searching area (in the header)
 -->
<xsl:template match="DIV[@class='searchScope']" />

<!-- 
| This removes the select on the searching area (in the header)
 -->
<xsl:template match="SELECT[@id='sen']" />

<!-- 
| This removes a button in the home page
 -->
<xsl:template match="INPUT[@class='btn' and @name='whats_new' and @type='button']" /> 						

</xsl:stylesheet>
