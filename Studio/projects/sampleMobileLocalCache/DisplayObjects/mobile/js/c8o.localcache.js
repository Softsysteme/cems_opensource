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
 * c8o.localcache.js
 * 
 * Implements LocalCache feature for Convertigo local apps.
 * 
 * Local cache stores automatically Convertigo server response in a local device database. In this way, if the
 * network is not available, data can still be displayed to the user.
 * 
 * To use local cache feature :
 * 
 * - include the the c8o.localcache.js in your app.html. Be sure this is AFTER your custom.js
 * - Each time you want to cache a server response, add a __localCache variable to your call.
 *   The __localCache is a JSON structure of this form :
 *   
 *   {
 *   	"enabled": true, 				// or false, enables or disables cache for this c8o call.
 *   	"policy" : "priority-server", 	// The app will try to get data from the server first, if no network, it will lookup
 *										// in the cache. If data is found in the cache it is returned. If not, a network error occurs.
 * 		"policy" : "priority-local",	// The app will try to get data from the local cache first. If data is not found in the cache,
 *   									// the app will try to call the server. If The is not network, a network error is returned.
 *   	"ttl"	 : value				// A time to live value in milliseconds. After this time, data will be discarded from cache/
 *	 }   
 *    
 *    
 *  When the data is returned, an localcache attribute is set to true on the document node. This enables the app to display messages
 *  when the data is returned from the cache.
 *  
 *  Any resource referenced in the response by an url starting by http:// or https:// will be also downloaded. This download process
 *  will be done in background task. If a network errors occurs while downloading, the target resources will be ignored.
 *  
 *  When all the resources have been downloaded (Or skipped because of network error) the cache response is updated with local reference
 *  instead of the original network reference. In this way, resources can be used off line.  
 *     
 */


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
 * AddtoDownloadQueue
 * 
 * Queues a resource to be downloaded.
 * 
 * @param xml, the xml referencing this resource
 * @param node, the node to be modified once the resource is downloaded
 * @param url, the resource url
 * @param last, true if this is the last resource to be downloaded for this xml.
 * @param callback, the callback to execute when the last resource is downloaded
 *  
 */
C8O.addToDownloadQueue = function(xml, node, url, last, callback) {
	var downloadJob = {
		"xml": xml,
		"node": node,
		"url":url,
		"last": last,
		"callback":callback
	};
	C8O.downloadQueue.push(downloadJob);
};


/**
 * execudeDownloadQueue
 * 
 * Pulls out of the queue downloads to be done and execute the downloads.
 * 
 * Downloads are executed 10 x 10 do avoid server saturation. Each time a
 * download is done, we update the resource reference in the reference xml.
 * 
 * When a download is finished for a resource marked as last, we
 * trigger a cache update with the modified reference xml.
 * 
 */
C8O.executeDownloadQueue = function() {
	var haveToDownload = 0;
	for (i=0; i< 10; i++) {
		(function() {
			var downloadJob = C8O.downloadQueue.shift();
			if (C8O.isDefined(downloadJob)) {
				var fileTransfer = new FileTransfer();
				var uri  = encodeURI(downloadJob.url);
				var dest = C8O.cacheFileSystem.root.toURL() + "r_" + uri;
				C8O.log.trace("c8o.cach: Start download resources from : " + uri + " to : " + dest);
				fileTransfer.download(
					uri,
					dest,
					function(entry) {
						C8O.log.debug("c8o.cach: Download resource complete : " + entry.toURL() + " remaining : " + haveToDownload);
						downloadJob.node.text(entry.toURL());
						if (downloadJob.last) {
							C8O.log.debug("c8o.cach: last download, callback");
							downloadJob.callback(downloadJob.xml);
						}
							
						if (--haveToDownload === 0)
							setTimeout(function() {
								C8O.executeDownloadQueue();
							},
							500);
					},
					function(error) {
						C8O.log.error("c8o.cach: Download resources error : " + error.source + "," + error.target + "," + error.code);
						if (downloadJob.last) {
							C8O.log.debug("c8o.cach: error, last download, callback");
							downloadJob.callback(downloadJob.xml);
						}
						
						if (--haveToDownload === 0)
							setTimeout(function() {
								C8O.executeDownloadQueue();
							},
							500);
					},
					true
				);
				haveToDownload++;
			}
		})();
	}
}


/**
 * downloadAttachements
 * 
 * Downloads all attachments found in an XML response. An attachment is any node starting
 * by an url pattern such as http:// or https://
 * 
 * @param xml, the xml dom response
 * @callback, "function(xml) {}" called back when all downloads are finished with updated xml as argument
 * @param notifications, a notification "function(remaining){}" called when each download is completed with
 *                       the remaining downloads.
 */
C8O.downloadAttachments = function(xml, callback, notifications) {
	
	//Filter elements containing URLs..
	var $set = $('*', xml).filter(function (index) {
		var txt = $(this)[0].childNodes[0].nodeValue;
		if(txt.indexOf("http://") === 0  || txt.indexOf("https://") === 0)
			return true;
		else
			return false;
	});
	
	// Add these in the download queue, mark last one
	var len = $set.length -1;
	C8O.log.debug("c8o.cach: download Attachments, Nb of attachments to download : " + (len+1)*1);
	$set.each(function (index) {
		var txt = $(this)[0].childNodes[0].nodeValue;
		C8O.log.trace("c8o.cach: Add to download Queue url:" + txt + " index:" + index);
		C8O.addToDownloadQueue(xml, $(this), txt, index == len ? true:false, callback);
	});
	C8O.executeDownloadQueue();
};


/**
 * handleExpired
 * 
 * Check for expired cache entries and remove them.
 */
C8O.handleExpired = function() {
	var now = new Date().getTime();
	C8O.log.debug("c8o.cach: handle cache entries expired after : " + new Date(now).toISOString());
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT * FROM cacheIndex WHERE expirydate < ?', [now], function(tx, results) {
			for (i =0; i < results.rows.length ; i++) {
				C8O.log.debug("c8o.cach: Expired , delete entry : " + results.rows.item(i).key + " Data:" + results.rows.item(i).data + " Expires:" + new Date(results.rows.item(i).expirydate).toISOString());
				C8O.deleteCacheEntry(results.rows.item(i).key);
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: handle expired, error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: handeled all expired entries");
	});
};

/**
 * Delete all cache Entries
 */
C8O.deleteAllCacheEntries = function() {
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT *  FROM cacheIndex', [], function(tx, results) {
			for (i =0; i < results.rows.length ; i++) {
				C8O.log.debug("c8o.cach: Delete entry : " + results.rows.item(i).key + " Data:" + results.rows.item(i).data + " Expires:" + new Date(results.rows.item(i).expirydate).toISOString());
				C8O.deleteCacheEntry(results.rows.item(i).key);
			}
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
 * 
 * The SQL entry and the data on the file system will be deleted.
 * 
 */
C8O.deleteCacheEntry = function(key) {
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT data FROM cacheIndex WHERE key=?', [key], function(tx, results) {
			if (results.rows.length == 0) {
				C8O.log.error("c8o.cach: delete cache entry, no data found for key : " + key);
			} else {
				C8O.log.trace("c8o.cach: delete cache entry, data found for: " + key + " Data is : " + results.rows.item(0).data);
				var fileName = results.rows.item(0).data.substring(results.rows.item(0).data.lastIndexOf("/") + 1);
				C8O.log.debug("c8o.cach: delete cache entry, file to delete is : " + fileName);
				C8O.cacheFileSystem.root.getFile(
					fileName,
					null,
					function(fileEntry) {
						fileEntry.remove(
							function (entry) {
								C8O.log.trace("c8o.cach: delete cache entry, file removed : " + JSON.stringify(fileEntry));
								C8O.db.transaction(function(tx){
									tx.executeSql('DELETE FROM cacheIndex WHERE key=?', [key], function(tx, results) {
										C8O.log.debug("c8o.cach: Delete,  data deleted for : " + key);
									});
								}, function(error) {
									C8O.log.error("c8o.cach: Error deleting a cache entry for: " + key + " error is : " + JSON.stringify(error));
								}, function() {
									C8O.log.trace("c8o.cach: deleted a cache entry for: " + key);
								});
							},
							function (error) {
								C8O.log.error("c8o.cach: delete cache entry, error removing file entry : " + error);
							}
						);
					},
					function (error) {
						C8O.log.error("c8o.cach: delete cache entry, error getting file entry : " + error);
					}
				);
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Delete cache entry, Error searching a cache entry for: " + key + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.trace("c8o.cach: Delete cache entry searched a cache entry for: " + key);
	});	
};


/**
 * Update cacheEntry
 * 
 * @param key, the key to update
 * @param xml, the new xml data 
 * 
 * The SQL entry and the data on the file system will be deleted.
 * 
 */
C8O.updateCacheEntry = function(key, xml) {
	C8O.db.transaction(function(tx){
		tx.executeSql('SELECT data FROM cacheIndex WHERE key=?', [key], function(tx, results) {
			if (results.rows.length == 0) {
				C8O.log.error("c8o.cach: update cache entry, no data found for key : " + key);
			} else {
				C8O.log.trace("c8o.cach: update cache entry, data found for: " + key + " Data is : " + results.rows.item(0).data);
				var fileName = results.rows.item(0).data.substring(results.rows.item(0).data.lastIndexOf("/") + 1);
				C8O.log.debug("c8o.cach: update cache entry, file to update is : " + fileName);
				C8O.cacheFileSystem.root.getFile(
					fileName,
					null,
					function(fileEntry) {
						fileEntry.createWriter(
							function (writer) {
								C8O.log.debug("c8o.cach: update cache entry, writer created");
								writer.onwrite = function(evt) {
									C8O.log.debug("c8o.cach: update cache entry, file is updated");
								};
								writer.write(C8O.getXmlAsString(xml));
							},
							function (error) {
								C8O.log.error("c8o.cach: update cache entry, error creating writer : " + error);
							}
						);
					},
					function (error) {
						C8O.log.error("c8o.cach: update cache entry, error getting file entry : " + error);
					}
				);
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: update cache entry, Error searching a cache entry for: " + key + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.trace("c8o.cach: update cache entry searched a cache entry for: " + key);
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
				$.ajax({
					cache: false,
					dataType: "xml",
					url: results.rows.item(0).data,
					success: function (xml) {
						if (C8O.canLog("trace"))
							C8O.log.trace("c8o.cach: data read from cache : " + C8O.getXmlAsString(xml));
						callback(xml);
					},
					error: function (xhr, status, err) {
						C8O.log.error("c8o.cach: errr reading data from cache : " + status + " error is : " + err);
						callback();
					}
				});
			}
		});
	}, function(error) {
		C8O.log.error("c8o.cach: Error searching a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
	}, function() {
		C8O.log.debug("c8o.cach: searched a cache entry for: " + tKey);
	});
};



/**
 * Inserts a request in the cache
 * 
 * @param key the key for the request
 * @param data the data XML dom to be stored
 * 
 */
C8O.insertInCache = function(key, data) {
	var cacheOptions = JSON.parse(key.__localCache);
	delete key.__localCache;
	var tKey = JSON.stringify(key);
	var tData = C8O.getXmlAsString(data);
	
	// Compute expiry date
	if (cacheOptions.ttl)
		var expDate = cacheOptions.ttl + new Date().getTime();
	else
		var expDate = new Date("3000-01-01").getTime();
	
	C8O.log.debug("c8o.cach: data to cache is : " + tData);
	C8O.log.debug("c8o.cach: expirydate : " + expDate + " (" + new Date(expDate).toISOString()+")");
	
	if (C8O.cacheFileSystem) {
		C8O.cacheFileSystem.root.getFile(
			"data" + new Date().getTime() + ".cache", 
			{create: true, exclusive: false},
			function(fileEntry) {
				C8O.log.debug("c8o.cach: fileCreated: " + JSON.stringify(fileEntry));
				fileEntry.createWriter(
					function(writer) {
						C8O.log.debug("c8o.cach: writer Created: " + JSON.stringify(writer));
						writer.onwrite = function(evt) {
							C8O.log.debug("c8o.cach: write done: " + JSON.stringify(evt));
							C8O.db.transaction(function(tx){
								tx.executeSql('SELECT data FROM cacheIndex WHERE key=?', [tKey], function(tx, results) {
									// We do not have this cache entry, so create a new one..
									if (results.rows.length == 0) {
										C8O.log.debug("c8o.cach: create a cache entry for: " + tKey);
										tx.executeSql('INSERT INTO cacheIndex (key, data, expirydate) VALUES(? , ?, ?)', [tKey, writer.localURL, expDate]);
									} else {
										// We have a cache entry for this key, delete the old one and update the entry with the new file.
										C8O.log.debug("c8o.cach: Insert in cache, Update a cache entry for " + tKey + " fileName: " + results.rows.item(0).data);
										var fileName = results.rows.item(0).data.substring(results.rows.item(0).data.lastIndexOf("/") + 1);
										C8O.cacheFileSystem.root.getFile(
												fileName,
												null,
												function(fileToRemoveEntry) {
													fileEntry.remove(
															function (fileToRemoveentry) {
																C8O.log.debug("c8o.cach: Insert in cache, file removed : " + JSON.stringify(fileEntry));
																C8O.db.transaction(function(tx){
																	tx.executeSql('UPDATE cacheIndex SET data=? , expirydate=? WHERE key=?', [writer.localURL, expDate, key], function(tx, results) {
																		C8O.log.debug("c8o.cach: Insert in cache, updated cache entry : " + tKey);
																	});
																}, function(error) {
																	C8O.log.error("c8o.cach: Insert in cache, Error updating a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
																}, function() {
																	C8O.log.trace("c8o.cach: Insert in cache, updated a cache entry for: " + tKey);
																});
															},
															function (error) {
																C8O.log.error("c8o.cach: Insert in cache, error removing file entry : " + error);
															}
														);
												},
												function (error) {
													C8O.log.error("c8o.cach: insert in cache, error getting fileEntry : " + error);
												}
											);										
									}
								});
							}, function(error) {
								C8O.log.error("c8o.cach: Error creating a cache entry for: " + tKey + " error is : " + JSON.stringify(error));
							}, function() {
								C8O.log.debug("c8o.cach: created a cache entry for: " + tKey);
								C8O.downloadAttachments(data, function(xml) {
									C8O.log.debug("c8o.cach: Attachments are downloaded for: " + tKey);
									C8O.log.debug("c8o.cach: Update XML in cache: " + C8O.getXmlAsString(xml));
									C8O.updateCacheEntry(tKey, xml);
								});
							});
						};
						writer.write(tData);
					}, function(error) {
						C8O.log.error("c8o.cach: Error creating writer: "  + error);
					}
				);
			}, function(error) {
				C8O.log.error("c8o.cach: error creating file: " + error);
			}
		);
	}
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
 *    "ttl"    : timetolive in ms", Infinite if not provided
 * }
 * 
 */
C8O.addHook("call", function (data) {
	// _call looping detection 
	if (C8O._ignoreCacheHook) {
		C8O._ignoreCacheHook = false;
		return true;
	}
	
	C8O.handleExpired();
	
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
				    	
				    	// add LocalCache attribute to response
				    	$(entry).find("document").attr("localcache", "true");
				    	
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
				    	
				    	// add LocalCache attribute to response
				    	$(entry).find("document").attr("localcache", "true");
				    	
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
	var db = openDatabase("c8oLC", "1.0", "Convertigo Local Cache", 2 * 1024 * 1024);
	C8O.log.debug("c8o.cach: SQL database Created/opened : " + JSON.stringify(db));
	db.transaction(function (tx) {
		  tx.executeSql('CREATE TABLE IF cacheIndex (key unique, data, expirydate)');
	},
	function(error) { // error call back
		C8O.log.error("c8o.cach: Error creating 'cacheIndex' table: " + error);
	},
	function() { // success call back
		C8O.log.debug("c8o.cach: Created 'cacheIndex' table if not already done sucessfully");
	});
	
	C8O.db = db;
	
	if (window.requestFileSystem) {
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
		    function(fileSystem) {
	    		C8O.log.debug("c8o.cach: FileSystem is :" + JSON.stringify(fileSystem));
	    		C8O.cacheFileSystem = fileSystem;
		    }, function (error) {
	    		C8O.log.error("c8o.cach: Error getting file system : " + error);
		    }
		);
	}
	
	// Prepare the download queue...
	C8O.downloadQueue = new Array();
	return true;
});
