/*
 * Copyright (c) 2001-2014 Convertigo SA.
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
 * $Revision: 36779 $
 * $Date: 2014-04-11 12:00:49 +0200 (ven., 11 avr. 2014) $
 */

/**
 * Delete all cache Entries
 */
C8O.deleteAllCacheEntries = function() {
	C8O.db.transaction(function(tx){
		tx.executeSql('DELETE FROM cacheIndex', [], function(tx, results) {
			C8O.log.debug("c8o.cach: Delete all entries");
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Error deleting all entries, error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: deleted all entries ok.");
	});
};

/**
 * Delete cacheEntry
 * 
 * @param key, the key to delete.
 */
C8O.deleteCacheEntry = function(key) {
	C8O.db.transaction(function(tx){
		tx.executeSql('DELETE * FROM cacheIndex WHERE key=?', [tKey], function(tx, results) {
			if (results.rows.length == 0) {
				C8O.log.debug("c8o.cach: Delete,  no data found for key : " + tKey);
			} else {
				C8O.log.debug("c8o.cach: Data deleted for key : " + tKey);
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Error deleting a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: deleted a cache entry for: " + tKey);
	});
};

/**
 * Searches a cache Entry for a given key
 * 
 *  @param key the key of cache entry
 *  @param call back a callback routing in the form :
 *  
 *  function(entry) {
 *  }
 *  
 *  Called with entry containing XML DOM data if cache key is found or
 *  entry undefined if not.
 */
C8O.searchCacheEntry = function(key, callback) {
	var searchKey = $.extend(true, {}, key);
	delete searchKey.__localCache;
	var tKey = JSON.stringify(searchKey);
	C8O.log.debug("c8o.cach: search for : " + tKey);
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT data FROM cacheIndex WHERE key=?', [tKey], function(tx, results) {
			if (results.rows.length == 0) {
				C8O.log.debug("c8o.cach: no data found for key : " + tKey);
				return(callback());
			} else {
				C8O.log.debug("c8o.cach: data found for: " + tKey + " Data is : " + results.rows.item(0).data);
				var data = $.parseXML(results.rows.item(0).data);
				return(callback(data));
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Error searching a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: searched a cache entry for: " + tKey);
	});
};


/**
 * Utility routine to pretty print a DOM as XML text
 * 
 *  @param xmlDom the jQuery dom to be returned as a String
 *  @returns a String
 */
C8O.getXmlAsString = function(xmlDom){
    return (typeof XMLSerializer!=="undefined") ? 
         (new window.XMLSerializer()).serializeToString(xmlDom) : 
         xmlDom.xml;
};

/**
 * Inserts a request in the cache
 * 
 * @param key the key for the request
 * @param data the data in XML text format to be stored
 * 
 */
C8O.insertInCache = function(key, data) {
	delete key.__localCache;
	var tKey = JSON.stringify(key);
	var tData = C8O.getXmlAsString(data);
	
	C8O.log.debug("c8o.cach: cached data is : " + tData);
	
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT key FROM cacheIndex WHERE key=?', [tKey], function(tx, results) {
			if (results.rows.length == 0) {
				C8O.log.debug("c8o.cach: create a cache entry for: " + tKey);
				tx.executeSql('INSERT INTO cacheIndex (key, data) VALUES(? , ?)', [tKey, tData]);
			} else {
				C8O.log.debug("c8o.cach: update a cache entry for: " + tKey);
				tx.executeSql('UPDATE cacheIndex SET data=? WHERE key=?', [tData, tKey]);
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Error creating a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: created a cache entry for: " + tKey);
	});
};

/**
 * Hook in the call to intercept the call, search in the cache if this request is
 * In the cache.
 * 
 * If the response is in the cache we return it. If not, we call the server
 *  * 
 * Local cache is controlled with a JSON structure defining cache options :
 * 
 * __localCache = {
 * 	  "enabled": true or false,
 *    "policy" : "priority-local" or "priority-server",
 *    "ttl"    : timetolive in ms"
 * }
 * 
 */
C8O.addHook("call", function (data) {
	// _call looping detection 
	if (C8O._ignoreCacheHook) {
		C8O._ignoreCacheHook = false;
		return true;
	}
	
	if (C8O.isDefined(data.__localCache)) {
		var cacheOptions = JSON.parse(data.__localCache);
		if (cacheOptions.enabled == true) {
			// we have cache options so handle local cache here
			if (cacheOptions.policy == "priority-local") {
				// We have to search for the data in the cache before calling the server
				C8O.log.debug("c8o.cach: Priority local, first search local cache...");
				C8O.searchCacheEntry(data, function(entry) {
					if (C8O.isDefined(entry)) {
						// we found an entry for this key, Create a fake XHR and notify CTF
						// with the data found.
				    	delete data.__localCache;
				    	var fakeXHR = {
								C8O_data: data
						};
						C8O._onCallComplete(fakeXHR, "success");
						C8O._onCallSuccess(entry, "success", fakeXHR);
					} else {
						// No entry, so call the server normally
						C8O._ignoreCacheHook = true; // Set this flag to prevent _call looping
						C8O._call(data);
					}
				});
			} else if (cacheOptions.policy == "priority-server") {
				// Call the server anyway.. If a network error occurs, we will be notified in the 
				// call_error hook. Then, we will get the data from the cache if we have it.
				C8O.log.debug("c8o.cach: Priority server, first call the server...");
				C8O._ignoreCacheHook = true; // Set this flag to prevent _call looping
				C8O._call(data);
			}
			return false;
		}
	}
	return true;
});


C8O.addHook("call_error", function (jqXHR, textStatus, errorThrown, data) {
	// _onError looping detection 
	if (C8O._ignoreCacheHook) {
		C8O._ignoreCacheHook = false;
		return true;
	}
	
	C8O.log.debug("c8o.cach: network error occured for request : " + JSON.stringify(data) + " . Error is : " + JSON.stringify(errorThrown) + "/" + textStatus);
	// seems we do not have network or the server is unreachable.. Lookup in local cache
	if (C8O.isDefined(data.__localCache)) {
		var cacheOptions = JSON.parse(data.__localCache);
		if (cacheOptions.enabled == true) {
			// we have cache options so handle local cache here
			if (cacheOptions.policy == "priority-server") {
				C8O.searchCacheEntry(data, function(entry) {
					if (C8O.isDefined(entry)) {
						// we found an entry for this key, Create a fake XHR and notify CTF
						// with the data found.
				    	delete data.__localCache;
				    	var fakeXHR = {
								C8O_data: data
						};
						C8O._onCallComplete(fakeXHR, "success");
						C8O._onCallSuccess(entry, "success", fakeXHR);
					} else {
						C8O.log.debug("c8o.cach: No data found in cache and no network, notify the error");
						C8O._ignoreCacheHook = true; // Set this flag to prevent _call looping
						C8O._onCallError(jqXHR, textStatus, errorThrown); 
					}
				});
			}
			return false;
		}
	}
	return true;
});


/**
 * Hook in the XML response to store the returned data in the cache.
 */
C8O.addHook("xml_response", function (xml, data) {
	C8O.log.debug("c8o.cach: xml_reponse, request is  " + JSON.stringify(data));
	if (C8O.isDefined(data.__localCache)) {
		var cacheOptions = JSON.parse(data.__localCache);
		if (cacheOptions.enabled) {
			C8O.insertInCache(data, xml);
		}
	}	
	return true;
});

/**
 * Hook in Init finished to create or open the database
 * Also Create the cacheIndex Table if not already created
 * 
 * The database name uses the endpoint to have one database for each app
 */
C8O.addHook("init_finished", function (params) {
	var db = openDatabase('c8oLC_' + C8O.vars.endpoint_url, '1.0', 'Convertigo Local Cache', 2 * 1024 * 1024);
	C8O.log.debug("c8o.cach: SQL database Created/opened : " + "c8oLC_" + C8O.vars.endpoint_url);
	db.transaction(function (tx) {
		  tx.executeSql('CREATE TABLE IF NOT EXISTS cacheIndex (key unique, data)');
	},
	function(error) { // error call back
		C8O.log.error("c8o.cach: Error creating 'cacheIndex' table: " + error);
	},
	function() { // success call back
		C8O.log.debug("c8o.cach: Created 'cacheIndex' table if not already done sucessfully");
	});
	
	C8O.db = db;
	return true;
});
