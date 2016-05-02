/*
 * Copyright (c) 2001-2011 Convertigo SA.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see<http://www.gnu.org/licenses/>.
 *
 * $URL: http://sourceus/svn/convertigo/CEMS_opensource/trunk/Studio/tomcat/webapps/convertigo/scripts/7.1.0/c8o.core.js $
 * $Author: nicolasa $
 * $Revision: 35844 $
 * $Date: 2013-12-05 10:59:39 +0100 (jeu., 05 déc. 2013) $
 */

/**
 * An Angular.js adapter to define a c8o.services module to Angular.js
 * 
 *  c8o.core.js must be included before this.
 *  
 *  This service may be use in a standard AngularJS controller in this form :
 *
 *  myApp.controller('MyController', function ($scope, c8oService) {
 *		  c8oService.call(
 *			  requestable,
 *			  payload,
 *			  additionalQueryString
 *		  ).then(function (data) {
 *			  $scope.data = data.returnedData;
 * 		  });
 *	});
 *
 *  Where requestable is a String representing Convertigo Sequence or Transaction in the form :
 *  
 *    <project>.<sequence> or
 *    <project>.<connector>.<transaction>
 *    
 *    Project can be left empty (.<sequence> or .<connector>.<transaction>)
 *    In this case, the default Convertigo project will be used.
 *    
 *  Where payload is a Object sent in the http body as payload.
 *    Payloads can be retreived in a sequence using a Sequence_JS step of this form :
 *    
 *    	var Payload = JSON.parse(
 *			org.apache.commons.io.IOUtils.toString(context.httpServletRequest.getInputStream(),
 *			"UTF-8")
 * 		);
 *
 *  Where additionalQueryString is an jSON object of this form :
 *  	{
 *  		"key1":"value1",
 *  		"key2":"value2",
 *  		"key3":"value3",
 *  		....
 *  	}
 *    These key values will be used in the QueryString to COnvertigo server and will automatically be
 *    mapped to sequence variables.  
 */

angular.module('c8o.services', []).
	service('c8oService', function($http, $q) {
		this.call  = function(requestable, body, calldata) {
			// Compute Convertigo Server's reserved parameters
			var c8oCallParams = {};
			var matches = requestable.match(C8O.re_requestable);
			
			if (matches != null) {
				if (matches[1].length) {
					c8oCallParams["__project"] = matches[1];
				}
				if (C8O.isDefined(matches[2])) {
					c8oCallParams["__sequence"] = matches[2];
				} else {
					c8oCallParams["__connector"] = matches[3];
					c8oCallParams["__transaction"] = matches[4];
				}
			} else {
				C8O.log.error("c8o.angular: requestable'" + c8oCall + "' is not valid");
				return false;
			}
			
			// Add to the call all the input variables...
			C8O.appendValues(c8oCallParams, calldata);
			
			// Also pass the $deferred and the $http AngularJS object..
			$deferred = $q.defer();
			c8oCallParams["$http"] = $http;
			c8oCallParams["$deferred"] = $deferred;
			c8oCallParams["$body"] = body;
			
			// Now execute the call.
			C8O.call(c8oCallParams);
			
			// and return the promise.
			return($deferred.promise);
		}
	}
);

$.extend(true, C8O, {
	/**
	 * Define a RegExp to extract C8O reserved parameters from the requestable
	 */
	re_requestable: new RegExp("^([^.]*)\\.(?:([^.]+)|(?:([^.]+)\\.([^.]+)))$"), // 1: project ; 2: sequence ; 3: connector ; 4: transaction > 1+2 | 1+3+4
	
	
	/**
	 * Override the standard c8o.core _getCallUrl as we interact with Convertigo server in JSON not in XML
	 */
	_getCallUrl: function () {
		return C8O.vars.endpoint_url + C8O.vars.requester_prefix + ".json";
	},

	_buildQueryString: function(obj) {
        var str = [];				  // So we convert the netData object to this format here.
        for(var p in obj)
        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
	},
	
	/**
	 * Override the standard c8o.core _call as we use the AngularJS $http object instead of the standard jQuery's Ajax 
	 * Also, exchanges with Convertigo Server are done in JSON not in XML.
	 */
	_call: function (data) {
		C8O._define.last_call_params = data;
		
		// AS the $http and $scope are passed in the data object, get them and remove them from the object to 
		// get the real data.
		var $http = data.$http;
		var $deferred = data.$deferred;
		var $body = data.$body;
		
		delete data['$http'];
		delete data['$deferred'];
		delete data['$body'];
				
		// Do normal C8O call process.
		if (C8O._hook("call", data)) {
			var netData = C8O._hook("_call_rsa", data);
			if (typeof netData != "object") {
				netData = data;
			}
			var url = C8O._getCallUrl();
			if (C8O.canLog("trace")) {
				C8O.log.trace("c8o.angular.js: call " + C8O.toJSON(netData) + " " + C8O.toJSON($body) + " " + C8O.vars.ajax_method + " " + url);
			}
			
			// Use the AngularJS's $http Object to interact with Convertigo Server.
			$http({
			    method: 'POST',
			    url: url + "?" + C8O._buildQueryString(netData), 
			    data: $body,
			    headers: {'Content-Type': 'application/json'}
			}).success(function(data, status, headers, config) {
				C8O._define.pendingXhrCpt--;
				$deferred.resolve(data);
			}).error(function(data, status, headers, config) {
				C8O._define.pendingXhrCpt--;
				$deferred.reject(data);
			});
			
			C8O._define.pendingXhrCpt++;
		}
	}
});
