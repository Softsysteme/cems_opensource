//globals variables
var isIE, ajax, totalTime, requestTime, benchTime, ready;
var MSXMLVersion;
var xsltMode = "client";
var autoMode = true;

// Scriptlib initialization routine, must be called prior to any other script lib function
function twsInit() {
	isIE = navigator.userAgent.indexOf('Gecko') == -1 ? true: false;
	ready = false;
	benchTime = false;
	
	if(benchTime){
		requestTime	= new gTime("requestTime");
		totalTime = new gTime("totalTime");
	}
	makeWaitDiv();
	
	var scripts = document.getElementsByTagName('script');
	for(var i=0;i<scripts.length;i++) scripts.item(i).setAttribute("eval","");
	ajax = getXmlHttpRequest();
}

/***************\
| Begin : Tools |
\***************/

// check if a variable existe
function isDefine(variable){
	return (typeof variable != "undefined")
}

// set style of an element
function setStyle(element, value){
 	if(isIE) element.style.cssText = value;
 	else element.setAttribute("style", value);
}
 
// make the page waiting
function makeWaitDiv(){
 	var parent = document.getElementsByTagName("body").item(0);
 
 	var	div = document.createElement("div");
 	setStyle(div, "position:absolute;top:50%;left:50%;z-index:99999");
 	
 	var bigDiv = document.createElement("div");
 	setStyle(bigDiv, "position:absolute;top:0;left:0; width:100%; height:100%;background-color: #B5D3E7;filter:alpha(opacity=20);-moz-opacity:0.2;opacity: 0.2;z-index:99998");
 	
 	var img = document.createElement("img");
 	img.setAttribute("src","./img/loading.gif");
 	
 	div.appendChild(img);

 	parent.appendChild(bigDiv);
 	parent.appendChild(div);
}

function XSLT_transformation(xmlDocument, xslDocument){
	if(window.XSLTProcessor){ 
	// Mozilla based
		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xslDocument);
		fragment = xsltProcessor.transformToFragment(xmlDocument, xmlDocument);
		
		var bodyElement = document.getElementsByTagName("body").item(0);
		var parentNode  = bodyElement.parentNode;
		parentNode.removeChild(bodyElement);
		parentNode.appendChild(fragment);
	}else{
	// IE based
		strResult = xmlDocument.transformNode(xslDom);
		document.body.innerHTML = strResult;
	}
}

function setTextResult(codeHTML){
	document.body.innerHTML = "<pre>"+escapeXML(codeHTML)+"</pre>";
	// other code doing the same
	// hack IE for force style computing
	//document.body.innerHTML = (isIE?"&nbsp;":"") + codeHTML;
}

function escapeXML(xml){
	var LT = new RegExp("<", "g");
	var GT = new RegExp(">", "g");
	var AMP = new RegExp("&", "g");
	var TAB = new RegExp("\t", "g");
	return xml.replace(AMP,"&amp;").replace(LT, "&lt;").replace(GT, "&gt;").replace(TAB, "    ");
}

//************************************************************************************************/
// Gets the style sheet URI from an XML processing intruction
// returns null if no stylesheet found
//************************************************************************************************/
function getStyleSheetURI(xmlDOM) {
	var pi;
	var i=0;
	do{
		pi = xmlDOM.childNodes[i];
		i++;
	}while(pi != null && pi.nodeName != "xml-stylesheet");
	
	try {
		start = pi.nodeValue.indexOf('href="') + 6;
		styleSheetURI = pi.data.substring(start, pi.nodeValue.length -1);
	} catch (e) {
		return null;
	}
	return(styleSheetURI);
}

// set the content of the page
function setContent(ajax){
	var Dom = ajax.responseXML
	xslUri = getStyleSheetURI(Dom);
	if (xslUri != null) {
	// ajax got an XML result of a convertigo transaction with associated XSL
		if (xsltMode == "client") {
		// client xsl transformation
			// get the xsl stylesheet  synchronously
			ajax.onreadystatechange = function () {};
			ajax.open("GET", xslUri, false);
			ajax.send(null);
				
			xslDom = ajax.responseXML;
			XSLT_transformation(Dom, xslDom)
		} else {
		// server xsl transformation
			if(window.XSLTProcessor){ 
			// Mozilla based
				var rng = document.createRange();
				var bodyElement = document.getElementsByTagName("body").item(0);
				var parentNode  = bodyElement.parentNode;
				var el = bodyElement;
				rng.setStartBefore(el);
				var htmlFrag = rng.createContextualFragment(codeHTML);
				while (el.hasChildNodes())
					el.removeChild(el.lastChild);
				el.appendChild(htmlFrag);
			}else{
			// IE based
				setTextResult(ajax.responseText);
			}
		}
	} else { 
	// ajax got an XML result of a convertigo transaction without XSL
		setTextResult(ajax.responseText);
	}
}

/*************************** Class gTime ****************************/

function gTime(name,autoStart){
	this.t_start			= null;
	this.t_stop				= null;
	this.name					= name;
	if(autoStart){
		var dat = new Date();
		this.t_start = dat.getTime();
	}
}

gTime.prototype.start = function(name){
	if(name)this.name = name;
	var dat = new Date();
	this.t_start = dat.getTime();
	return this.t_start;
}

gTime.prototype.stop = function(autoStatus){
	var dat = new Date();
	this.t_stop = dat.getTime();
	if(autoStatus)this.dif(true);
	return this.t_stop;
}

gTime.prototype.dif = function(autoStatus){
	var res = " ["+this.name+":"+(this.t_stop-this.t_start)+"ms]";
	if(benchTime && autoStatus)window.status += res;
	return res;
}

/*********************** Fin Class gTime ****************************/

/*************\
| End : Tools |
\*************/

/*******************************************\
| Begin : Events attachements and listeners |
\*******************************************/

function hasTwsId(element){
	return element.getAttribute("twsid") != null;
}

// listener
function eventHandler(event, element, eventType){
	if (!hasTwsId(element))
		return true;
	if(ready){
		ready = false;
		makeWaitDiv();
		
		var elt = element;
		var evtType = eventType;
		if(eventType=="submit"){ // Simulate click on submit button if necessary
			elt = isIE?document.activeElement:event.explicitOriginalTarget;
			if(isIE && elt.type!="submit"){
				elt = null;
				for(var i=0; i<element.length && elt==null; i++){
					formElt = element.elements[i]; 
					if(formElt.nodeName=="INPUT" && formElt.type=="submit") elt = formElt;
				}
			}
			if(elt==null) elt = element;
			else evtType = "click";
		} 
		var queryString = "__event_action=" + evtType + twsFormatEvent(event, elt);

		if(eventType=="click") queryString += serializeInputs();
		else if(eventType=="submit") queryString += serializeForm(element);
		ajaxXmlPostData(ajax, queryString);
	}
	return false;
}

// elements filters
function checkForm(element){
	if(hasTwsId(element)){
		element.onsubmit = function(){return false;};
		return true;
	}else return false;
}

function checkA(element){
	return hasTwsId(element);
}

function checkInput(element){
	return hasTwsId(element) && (element.getAttribute('type') == 'button' || element.getAttribute('type') == 'image' || element.getAttribute('type') == 'submit');
}

// events attachement routines
function ie_addEventListener(element, eventType){
	element.attachEvent("on"+eventType, function(event){return eventHandler(event, element, eventType);});
}

function moz_addEventListener(element, eventType){
	element.addEventListener(eventType, function(event){return eventHandler(event, element, eventType);}, false);
}

// attachement loop
function twsAddListeners(){
	var row, tag, events = [
		['submit',
			[
				['FORM', checkForm]
			]
		],
		['click',
			[
				['A', checkA],
				['INPUT', checkInput]
			]
		]
	];
	var addEventListener = isIE ? ie_addEventListener : moz_addEventListener;
	while(isDefine(row = events.shift())){										//['click',[['A', checkA], ['INPUT', checkInput]]]
		while(isDefine(tag = row[1].shift())){									//['A', checkA]
			var elements = document.getElementsByTagName(tag[0]);				//'A'
			for(var i=0;i<elements.length;i++)
				if(tag[1](elements[i])) addEventListener(elements[i], row[0]);	//checkA & 'click'
		}
	}
}

/*****************************************\
| End : Events attachements and listeners |
\*****************************************/


/***********************************\
| Begin : Cliplet Menu handlers      |
\***********************************/

function goPrevious()
{				
	// Simply refresh the page with the current URI and remove the __transaction 
	// argument. This will result in launching the default transaction to refresh the clipped page.
	
	startPos = window.location.href.indexOf("&__transaction");
	if (startPos != -1) {
		refreshUrl = window.location.href.substring(0,startPos);
		window.location.href =  refreshUrl;
	} else {
		window.location.reload(false);
	}		
}

function goRefresh(context)
{
	makeWaitDiv();
	ajaxXmlPostDataContext(ajax, "", context);
}


function goReconnect()
{				
	window.location.reload(false);
}
					
/***********************************\
| End   : Cliplet Menu handlers      |
\***********************************/


/***********************************\
| Begin : Making and sending events |
\***********************************/

/**
* Serialize a form into a format which can be sent as a GET string or a POST 
* content. It correctly ignores disabled fields, maintains order of the fields 
* as in the elements[] array. The 'file' input type is not supported, as 
* its content is not available to Javascript. This method is used internally
* by the submit class method.
*/

//Serialize all the INPUTS in this page
function formatField(name, value){
	return "&" + encodeURIComponent("__field_"+name) + "=" + encodeURIComponent(value);
}
 
function serializeInputs(){
	var query = serializeFields(document.getElementsByTagName('INPUT'));
	query += serializeFields(document.getElementsByTagName('SELECT'));
	query += serializeFields(document.getElementsByTagName('TEXTAREA'));
	return query;
}

function serializeForm(theform){
	return serializeFields(theform.elements);
}

function serializeFields(fields){
	var queryString = "";
 	for(var i=0; i<fields.length; i++) {
		var el = fields[i];
		var id = el.getAttribute("twsid");
		if (!el.disabled) {
			switch(el.type) {
				case 'text': case 'password': case 'hidden': case 'textarea': 
					queryString += formatField(id,el.value);
					break;
				case 'select-one':
					if (el.selectedIndex>=0) {
						queryString += formatField(id,el.selectedIndex);
					}
					break;
				case 'select-multiple':
					var selected = "";
					for (var j=0; j<el.options.length; j++) {
						if (el.options[j].selected) selected += j+";";
					}
					if(selected.length>0) selected = selected.substring(0,selected.length-1);
					queryString += formatField(id,selected);
					break;
				case 'checkbox': case 'radio':
					queryString += formatField(id,el.checked?"true":"false");
					break;
			}
		}
 	}
 	return queryString;
}

function twsFormatEvent(event, element){
	var data = "&__event_srcid=" + element.getAttribute("twsid");	
	var attribut, attributs = ["altKey", "ctrlKey", "metaKey", "shiftKey", "clientX", "clientY", "screenX", "screenY", "layerX", "layerY" , "pageX", "pageY", "button"];
	while(isDefine(attribut = attributs.shift())){
		var code = "if(isDefine(event."+attribut+")){";
		code += "data += '&__event_"+attribut+"=' + event."+attribut+";}";
		eval(code);
	}
	return data;
}

/*********************************\
| End : Making and sending events |
\*********************************/

/***********************\
| Begin : AJAX routines |
\***********************/

// This is the Main AJAX Event handler, when the request is completed, this routine will get called
function ajaxReadyStateListener() {
	if(ajax.readyState == 4) {
		if(benchTime) window.status="";
		
		var xmlDom = ajax.responseXML;		
		var t_tot = null;

		if (MSXMLVersion == 6) {
			xmlDom.resolveExternals = true;
		}

		if(benchTime){
			t_tot = new gTime("TotalPros",true);
			requestTime.stop(true);
		}
		
		setContent(ajax);
		
		try{
			var scripts = document.getElementsByTagName('script');
			for(var i=0;i<scripts.length;i++){
				if(scripts.item(i).getAttribute("eval")==null){
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.text = scripts.item(i).text;
					script.setAttribute("eval","");
					scripts.item(i).parentNode.removeChild(scripts.item(i));
					document.getElementsByTagName('head')[0].appendChild(script);
				}
			}
		}catch(e){
			//alert(e);
		}
		twsAddListeners();
		
		resizeCliplet();
		
		if(benchTime){
			t_tot.stop(true);
			totalTime.stop(true);
		}
		
		ready = true;
	}
}

function ajaxXslReadyStateListener() {
	if(ajax.readyState == 4) {
		if(benchTime) window.status="";
		
		var xmlDom = ajax.responseXML;		
		var t_tot = null;

		if (MSXMLVersion == 6) {
			xmlDom.resolveExternals = true;
		}

		if(benchTime){
			t_tot = new gTime("TotalPros",true);
			requestTime.stop(true);
		}
		
		if(benchTime){
			t_tot.stop(true);
			totalTime.stop(true);
		}
		
		ready = true;
	}
}

// Implements the XML  Ajax POST
function ajaxXmlPostData(xmlRequester, data) {
	if (xmlRequester) {
	   	if(benchTime) totalTime.start();
	   	
	   	// Hack for IE to prevent a JSCRIPT.DLL Trap
	   	if(isIE){
	   		xmlRequester.onreadystatechange = function () {}
	   		xmlRequester.abort();
	   	}
	   	
	   	if(benchTime) requestTime.start();
	   	
	   	// set the ajax receive handler
	   	xmlRequester.onreadystatechange = ajaxReadyStateListener;
	   	
	   	// build and send the request
	   	var page = "";
	   	if (xsltMode == "client") {
	   		// client xsl transformation
	   		page = ".xml";
	   	} else {
	   		// server xsl transformation
	   		page = ".cxml";
	   	}
	   	xmlRequester.open("POST", page, true);
	   	xmlRequester.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=utf-8');
	   	xmlRequester.send(data);
	}   
}

// Gets the Ajax Http request object
function getXmlHttpRequest() {
	/*@cc_on @*/
	/*@if (@_jscript_version >= 5)
	// JScript gives us Conditional compilation, we can cope with old IE versions.
	// and security blocked creation of the objects.
	var aObject;
	
	try{ 
		aObject = new ActiveXObject("Msxml2.XMLHTTP.6.0"); 
		window.status = "Using MSXML 6"; 
		MSXMLVersion = 6;
		if (autoMode)
			xsltMode = "client";
		return (aObject);
	}catch(e){
		try{ 
			aObject = new ActiveXObject("Msxml2.XMLHTTP.5.0"); 
			window.status = "Using MSXML 5"; 
			MSXMLVersion = 5;
			if (autoMode)
				xsltMode = "client";
			return (aObject);
		}catch(e1){
			try{ 
				aObject = new ActiveXObject("Msxml2.XMLHTTP.4.0"); 
				window.status = "Using MSXML 4"; 
				MSXMLVersion = 4;
				if (autoMode)
					xsltMode = "client";
				return (aObject);
			}catch(e2){
				try{ 
					aObject = new ActiveXObject("Msxml2.XMLHTTP.3.0"); 
					window.status = "Using MSXML 3"; 
					MSXMLVersion = 3;
					if (autoMode)
						xsltMode = "server";
					return (aObject);
				}catch(e3){
					try{ 
						aObject = new ActiveXObject("Msxml2.XMLHTTP.2.0"); 
						window.status = "Using MSXML 2"; 
						MSXMLVersion = 2;
						if (autoMode)
							xsltMode = "server";
						return (aObject);
					}catch(e4){
						try{          
				            var bInstallMSXML = confirm("WARNING : Your browser does not support MSXML object.\nWould you like to install MSXML right now ?");
				            if (bInstallMSXML==true) 
				            	document.location.href = "installxml.jsp";
				            else 
				            	document.location.href = "http://www.twinsoft.fr";
			        	}catch(e5){
			        	}
			        }
		        }
			}
		}
	}
	@end @*/
	
	if(isDefine(XMLHttpRequest)) {
		try{ return new XMLHttpRequest();
		}catch(e){}
	}
	
	if(window.createRequest){
		try{ return window.createRequest();
		}catch(e){}
	}
}

/*********************\
| End : AJAX routines |
\*********************/

/*************************\
| Begin : Admin functions |
\*************************/

// launch the cliplet with default values in an iframe on the index.jsp page
function launchCliplet(formName) {
	var uri = 'index.jsp?__connector=' + document.forms[formName].connectorName.value + '&__transaction=' + document.forms[formName].transactionName.value;
	// variables
	var elements = document.getElementsByName(formName+"_input");
	// alert(elements[0]);
	for (var i = 0; i < elements.length; i++) {
		elt = elements[i];
		//alert('var : '+elt.getAttribute("variable"));
		//alert('value : '+elt.value);
		uri = uri + '&' + elt.getAttribute("variable") + '=' + elt.value;
	}
	document.getElementById('clipletDiv').style.visibility = 'visible';
	document.getElementById('iFrameDiv').src = uri;
}

// launch the sequence with default values in an iframe on the index.jsp page
function launchSequence(formName) {
	var uri = 'index.jsp?__sequence=' + document.forms[formName].sequenceName.value;
	// variables
	var elements = document.getElementsByName(formName+"_input");
	// alert(elements[0]);
	for (var i = 0; i < elements.length; i++) {
		elt = elements[i];
		//alert('var : '+elt.getAttribute("variable"));
		//alert('value : '+elt.value);
		uri = uri + '&' + elt.getAttribute("variable") + '=' + elt.value;
	}
	document.getElementById('clipletDiv').style.visibility = 'visible';
	document.getElementById('iFrameDiv').src = uri;
}

/***********************\
| End : Admin functions |
\***********************/


/******************************************************************\
| This is the actual resizing routine                              |
\******************************************************************/
function doResize()
{
	body  = document.getElementsByTagName('body').item(0);
	divs  = document.getElementsByTagName('div');
	spans = document.getElementsByTagName('span');
	
	var lowest = 0;
	if (body != null)
		lowest = body.offsetHeight;

	for (i=0; i< divs.length ; i++) {
		var elt = divs.item(i);
		var bottom = elt.offsetTop + elt.offsetHeight;
		if (bottom > lowest)
			lowest = bottom;
	}
	
	for (i=0; i< spans.length ; i++) {
		elt = spans.item(i);
		bottom = elt.offsetTop + elt.offsetHeight;
		if (bottom > lowest)
			lowest = bottom;
	}
		
	if (isIE) {
		window.frameElement.height = lowest + 32;
	}
	else {
		window.frameElement.height = lowest +32;
	}
}

/******************************************************************\
| Resize Cliplet if contained in an IFrame. This routine may fail  |
| if The frame is held by a different domain than the cliplet.     |
\******************************************************************/
function resizeCliplet() {
	try {
		if (window.frameElement != null) {
			window.setTimeout(doResize, 750);
		}
	} catch (error) {
		window.status = "noResize: " + error;
	}
}
