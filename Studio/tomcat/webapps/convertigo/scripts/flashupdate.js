/*

isLocal ?
 yes > isFlashUpdate
 no > getEnv, hasLocal

hasLocal ?
 yes > isLocalNewer
 no > isFlashUpdate

isLocalNewer ?
 yes > redirectLocal
 no > isFlashUpdate

isFlashUpdate ?
 yes > isRemoteNewer
 no > redirectApp
 
isRemoteNewer ?
 yes > doUpdate
 no > redirectApp
 
doUpdate, local ?
  yes > doRemoveUnexisting, downloadFiles
  no > downloadFiles
  
downloadFiles ?
  yes > redirectLocal
  no > redirectApp

*/

var F = {
	reTailUrl: new RegExp("([^#?]*)/.*"),
	local: null,
	currentFiles: null,
	remoteFiles: null,
	fileSystem: null,
	platform: "n/a",
	uuid: "n/a",
	debugStream: "",
	remoteBase: null,
	endPoint: null,
	projectName: null,
	localBase: null,
	timeout: 0,
	firstLaunch: true,
	clickEvent: typeof(document.ontouchstart) == "undefined" ? "click" : "touchstart",
	
	debug: function (msg) {
		F.debugStream += msg + "\n";
	},
	
	error: function (msg, err) {
		if (typeof(err) != "undefined") {
    		var sErr = "" + err;
			try {
				sErr += " " + JSON.stringify(err);
			} catch (e) {}
    		msg += "\nException: " + sErr;
		}
		alert(F.debugStream + "\n" + msg);
	},
	
	init: function () {
		if (F.local == null) {
			if (F.local = window.location.hash.length != 0) {
				var env = window.location.hash.substring(1);
				F.debug("Retrieve env");
				env = JSON.parse(decodeURI(env));
				$.extend(F, env);
			}
			if (F.firstLaunch) {
				$("#main").show();
			}
		}
		if (F.fileSystem == null) {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
				try {
					F.fileSystem = fileSystem;
					F.init();
				} catch (err) {
					F.error("catch init fileSystem", err);
				}
			}, function (err) {
				error("FS failed", err);
			});
		} else if (F.currentFiles == null) {
			var url = window.location.href.replace(F.reTailUrl, "$1/files.json");
			$.ajax({
				dataType: "json",
				url: url,
				success: function (data) {
					try {
						F.currentFiles = data;
						F.init();
					} catch (err) {
						F.error("catch init currentFile", err);
					}
				},
				error: function (xhr, status, err) {
					F.error("failed to retrieve current file list: " + url, err);
				}
			});
		} else {
			try {
				F.platform = device.platform;
				F.uuid = device.uuid;
			} catch (err) {
				// device feature disabled in config.xml
			}
			
			F.isLocal();
		}
	},
	
	isLocal: function () {
		F.debug("isLocal");
		
		if (F.local) {
			F.isFlashUpdate();
		} else {
			F.getEnv();
		}
	},
	
	getEnv: function () {
		F.debug("getEnv");
		
		var url = window.location.href.replace(F.reTailUrl, "$1/env.json");
		$.ajax({
			dataType: "json",
			url: url,
			success: function (data) {
				try {
					$.extend(F, data);
					F.remoteBase = F.endPoint + "/projects/" + F.projectName + "/_private/flashupdate";
					
					if (device.platform == "Android") {
						F.localBase = "/data/data/" + F.applicationId + "/flashupdate";
					} else {
						F.localBase = F.fileSystem.root.fullPath + "/flashupdate"
					}
					
					F.hasLocal();
				} catch (err) {
					F.error("catch init env", err);
				}
			},
			error: function (xhr, status, err) {
				F.error("failed to retrieve current file list: " + url, err);
			}
		});
	},
	
	hasLocal: function () {
		F.debug("hasLocal");
		
		$.ajax({
			dataType: "json",
			url: "file://" + F.localBase + "/files.json",
			success: function (data) {
				try {
					F.isLocalNewer(data);
				} catch (err) {
					F.error("catch hasLocal success", err);
				}
			},
			error: function (xhr, status, err) {
				try {
					F.isFlashUpdate();
				} catch (err) {
					F.error("catch hasLocal error", err);
				}
			}
		});
	},
	
	isLocalNewer: function (files) {
		F.debug("isLocalNewer");
		
		if (F.currentFiles.date < files.date) {
			F.redirectLocal();
		} else {
			F.isFlashUpdate();
		}
	},
	
	redirectLocal: function () {
		F.debug("redirectLocal");
		
		var env = {
			remoteBase: F.remoteBase,
			endPoint: F.endPoint,
			projectName: F.projectName,
			localBase: F.localBase,
			firstLaunch: F.firstLaunch
		};
		
		if (F.local) {
			window.location.href = "file://" + F.localBase + "/index.html#" + encodeURI(JSON.stringify(env));
			window.location.reload();
		} else {
			var url = window.location.href.replace(F.reTailUrl, "$1/cordova.js");
			$.ajax({
				dataType: "text",
				url: url,
				success: function (text) {
					try {
						F.write(F.localBase + "/cordova.js", text, function () {
							F.debug("cordova.js writen");
							window.location.href = "file://" + F.localBase + "/index.html#" + encodeURI(JSON.stringify(env));
						}, function (err) {
							F.error("write failed", err);
						});
					} catch (err) {
						F.error("catch redirectLocal success", err);
					}
				},
				error: function (xhr, status, err) {
					F.error("failed cordova.js", err);
				}
			});			
		}
	},
	
	isFlashUpdate: function () {
		F.debug("isFlashUpdate");
		
		$("#checkingUpdate").show();
		
		if (F.remoteFiles == null) {
			$(".dataProjectName").text(F.projectName);
			
			$.ajax({
				dataType: "json",
				url: F.endPoint + "/admin/services/mobiles.GetResources",
				data: {
					application: F.projectName,
					platform: F.platform,
					uuid: F.uuid
				},
				success: function (data) {
					try {
						F.remoteFiles = data;
						F.isFlashUpdate();
					} catch (err) {
						F.error("catch isFlashUpdate success", err);
					}
				},
				error: function (xhr, status, err) {
					F.debug("error: mobiles.GetResources " + err);
					F.redirectApp();
				},
				timeout: F.timeout
			});
		} else {
			$("#checkingUpdate").hide();
			
			if (F.currentFiles.lightBuild) {
				if (F.remoteFiles.flashUpdateEnabled) {
					F.doUpdate();
				} else {
					F.error("Application is in light build mode and the flashupdate is disabled !")
				}
			} else if (F.remoteFiles.flashUpdateEnabled) {
				F.isRemoteNewer();
			} else {
				F.redirectApp();
			}
		}
	},
	
	isRemoteNewer: function () {
		F.debug("isRemoteNewer currentFiles: " + F.currentFiles.date + " remoteFiles: " + F.remoteFiles.date);
		
		if (F.currentFiles.date < F.remoteFiles.date) {
			if (!F.firstLaunch) {
				$("#main").show();
			} else {
				F.firstLaunch = false;
			}
			if (F.remoteFiles.requireUserConfirmation) {
				F.requireUserConfirmation();
			} else {
				F.doUpdate();
			}
		} else {
			F.redirectApp();
		}
	},
	
	requireUserConfirmation: function () {
		F.debug("requireUserConfirmation");
		
		$("#requireUserConfirmation").one(F.clickEvent, "#requireUserConfirmationYes, #requireUserConfirmationNo", function () {
			try {
				if ($(this).val() == "yes") {
					$("#requireUserConfirmation").hide();
					F.doUpdate();
				} else {
					F.redirectApp();
				}
			} catch (err) {
				F.error("catch requireUserConfirmation", err);
			}
		}).show();
	},
	
	doUpdate: function () {
		F.debug("doUpdate");
		
		if (F.local) {
			F.doRemoveUnexisting();
		} else {
			F.downloadFiles();
		}
	},
	
	redirectApp: function () {
		F.debug("redirectApp");
		
		window.location.href = window.location.href.replace(F.reTailUrl, "$1/app.html");
	},
	
	filesIndexer: function (files) {
		var i, file;
		var indexedFiles = {};
		for (i = 0; i < files.length; i++) {
			file = files[i];
			indexedFiles[file.uri] = file;
		}
		return indexedFiles;
	},
	
	doRemoveUnexisting: function () {
		F.debug("doRemoveUnexisting");
		
		var indexedFiles = F.filesIndexer(F.remoteFiles.files);
		var i, curFile = 0;
		
		var checkDone = function () {
			try {
				if ((curFile++) == F.currentFiles.files.length) {
					F.downloadFiles();
				}
			} catch (err) {
				F.error("catch doRemoveUnexisting checkDone", err);
			}
		}
		
		for (i = 0; i < F.currentFiles.files.length; i++) {
			var file = F.currentFiles.files[i];
			var remoteFile = indexedFiles[file.uri];
			if (typeof(remoteFile) == "undefined") {
				var filePath = F.localBase + file.uri;
				F.debug("try delete " + file.uri);
				F.fileSystem.root.getFile(filePath, {create: false, exclusive: false}, function (fileEntry) {
					F.debug("delete file " + file.uri);
					try {
						fileEntry.remove(function () {
							F.debug("delete DONE " + file.uri);
							checkDone();
						}, function () {
							F.debug("delete FAIL " + file.uri);
							checkDone();
						});
					} catch (err) {
						F.debug("delete DONE (" + err + ") " + file.uri);
						checkDone();
					}
				}, function () {
					F.debug("not existing " + filePath);
					checkDone();
				});
			} else {
				checkDone();
			}
		}
		checkDone();
	},
	
	downloadFiles: function () {
		F.debug("downloadFiles");
		
		var indexedFiles = F.filesIndexer(F.currentFiles.files);
		var curFile = 0, nbTransfert = 0, totalSize = 0, curSize = 0;
		
		$("#progress").show();
		
		var $canvas = $("#progressGauge");
		var context = $canvas[0].getContext("2d");
		context.lineWidth = 30;
		context.strokeStyle = $("#progressGaugeColor1").css("color");
		
		context.beginPath();
		context.arc(100, 100, 70, 0, 2 * Math.PI, false);
		context.stroke();
		
		context.strokeStyle = $("#progressGaugeColor2").css("color");
		
		var checkDone = function (file) {
			try {
				if (typeof(file) != "undefined") {
					curSize += file.size;
					$("#progressCur").text(Math.floor(curSize / 1000));
					context.beginPath();
					context.arc(100, 100, 70, 1.5 * Math.PI, (2 * curSize / totalSize + 1.5) * Math.PI, false);
					context.stroke();
				}
				if ((curFile++) == F.remoteFiles.files.length) {
					$("#progress").hide();
					F.downloadFinished(nbTransfert);
				}
			} catch (err) {
				F.error("catch downloadFile checkDone", err);
			}
		}
		
		$.each(F.remoteFiles.files, function (index, file) {
			var localFile = indexedFiles[file.uri];
			if (!F.local || (!localFile || file.date > localFile.date || file.size != localFile.size)) {
				F.debug("FileTransfer " + file.uri);
				
				nbTransfert++;
				totalSize += file.size;
		    	new FileTransfer().download(
			    	encodeURI(F.remoteBase + file.uri),
			    	F.localBase + file.uri,
			    	function () {
			    		checkDone(file);
			    	},
			    	function (err) {
		    			F.error("failed to FileTransfer ", err);
			    		checkDone(file);
			    	}
		    	);
			} else {
				checkDone();
			}
		});
		$("#progressTotal").text(Math.floor(totalSize / 1000));
		checkDone();
	},
	
	downloadFinished: function (nbTransfert) {
		F.debug("downloadFinished");
		
		F.write(F.localBase + "/files.json", JSON.stringify(F.remoteFiles), function () {
			F.debug("files.json writen");
			
			try {
				if (nbTransfert) {
					F.redirectLocal();
				} else {
					F.redirectApp();
				}
			} catch (err) {
				F.error("catch downloadFinished", err);
			}
		}, function (err) {
			F.error(err);
		});
	},
	
	write: function (filePath, content, success, error) {
		F.fileSystem.root.getFile(filePath, {create: true, exclusive: false}, function (fileEntry) {
			fileEntry.createWriter(function (writer) {
				writer.onwrite = success;
				writer.write(content);
			}, function (err) {
				error("createWriter failed", err);
			});
		}, function (err) {
			error("getfile failed", err);
		});
	},
	
	message: function (message) {
		$("<div/>").add("message").text(message).prependTo("#messages");
	}
};

$(function () {
	if (typeof(cordova) == "undefined") {
		F.redirectApp();
	} else {
		document.addEventListener("deviceready", function() {
			try {
				F.init();
			} catch (err) {
				F.error("catch deviceready", err);
			}
		});
	}
});