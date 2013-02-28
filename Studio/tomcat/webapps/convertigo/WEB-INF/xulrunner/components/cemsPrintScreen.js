/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is the Update Service.
 *
 * The Initial Developer of the Original Code is Ben Goodger.
 * Portions created by the Initial Developer are Copyright (C) 2004
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *  Darin Fisher <darin@meer.net>
 *  Daniel Veditz <dveditz@mozilla.com>
 *  Manish Singh <manish@flock.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const Cc = Components.classes;
const Ci = Components.interfaces;
const Cr = Components.results;
const Cu = Components.utils;

Cu.import("resource://gre/modules/XPCOMUtils.jsm");

function CemsPrintScreen() {
	this._init();
}

CemsPrintScreen.prototype = {
  _JSON: null,
  _init: function () {
	  this._JSON = Cc["@mozilla.org/dom/json;1"].createInstance(Ci.nsIJSON); 
  },
  notifyCertProblem: function(interfaceRequestor, sslStatus, json) {
    try {
      var webBrowser = interfaceRequestor.getInterface(Ci.nsIWebBrowser);
      var window = webBrowser.contentDOMWindow;
      var documentElement = window.document.documentElement;

      json = this._JSON.decode(json);
      json.scale = 1.0 * json.scale;
      
      if (json.left < 0 || json.width <= 0) {
    	  json.left = 0;
    	  json.width = documentElement.scrollWidth;
      }
      
      if (json.top < 0 || json.height <= 0) {
    	  json.top = 0;
    	  json.height = documentElement.scrollHeight;
      }
      
      var canvas = window.document.createElement("canvas");
      canvas.width = Math.round(json.width * json.scale);
      canvas.height = Math.round(json.height * json.scale);
      
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(json.scale, json.scale);
      ctx.drawWindow(window, json.left, json.top, json.width, json.height, "rgb(255,255,255)");
      ctx.restore();
      var response = {
        image: canvas.toDataURL(),
        height: canvas.height,
        width: canvas.width
      };
      window.document.documentElement.setAttribute("cemsPrintScreen", this._JSON.encode(response));
      return true;
    } catch (ex) {}
    return false;
  },

  // nsISupports
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIBadCertListener2]),

  classDescription: "Convertigo Print Screen",
  classID:          Components.ID("{fbaf2f02-7ff1-11e2-b14d-15896188709b}"),
  contractID:       "@convertigo.com/cemsPrintScreen;1"
};

function NSGetModule(aCompMgr, aFileSpec) {
  return XPCOMUtils.generateModule([CemsPrintScreen]);
}
