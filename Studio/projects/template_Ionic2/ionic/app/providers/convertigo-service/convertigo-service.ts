import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {isUndefined} from "ionic-angular/util/util";
//DONE import PouchDB works... however by adding manually a typings lib ... cmd line not works
var PouchDB = require('pouchdb');
//import * as PouchDB from 'pouchdb';


//DONE class C8oBase
@Injectable()
export class C8oBase {
    /*HTTP*/

    protected _timeout: number = -1;
    protected _trustAllCertificates: boolean = false;
    protected _cookies: { [key: string]: string } = {};
    /*Log*/

    protected _logRemote: boolean = true;
    protected _logLevelLocal: C8oLogLevel = C8oLogLevel.NONE;
    protected _logC8o: boolean = true;
    //protected logOnFail : C8oOnFail = null;

    /* FullSync */

    protected _defaultDatabaseName: string = null;
    protected _authenticationCookieValue: string = null;
    protected _fullSyncLocalSuffix: string = null;
    protected _fullSyncServerUrl: string = "http://localhost:5984";
    protected _fullSyncUsername: string;
    protected _fullSyncPassword: string;

    /* Encryption */

    protected _useEncryption: boolean = false;
    protected _disableSSL: boolean = false;
    //protected keyStoreInputStream :InputStream ;
    protected _keyStorePassword: string;
    //protected trustStoreInputStream :InputStream;
    protected _trustStorePassword: string;

    public get timeout(): number {
        return this._timeout;
    }

    public get trustAllCertificates(): boolean {
        return this._trustAllCertificates;
    }

    public get cookies(): { [key: string]: string } {
        return this._cookies;
    }

    public get logRemote(): boolean {
        return this._logRemote;
    }

    public get logLevelLocal(): C8oLogLevel {
        return this._logLevelLocal;
    }


    public get logC8o(): boolean {
        return this._logC8o;
    }

    /*public get logOnfail() : ??{
     return this._
     }*/

    public get defaultDatabaseName(): string {
        return this._defaultDatabaseName;
    }

    public get authenticationCookieValue(): string {
        return this._authenticationCookieValue;
    }

    public get fullSyncLocalSuffix(): string {
        return this._fullSyncLocalSuffix;
    }

    public get fullSyncServerUrl(): string {
        return this._fullSyncServerUrl;
    }

    public get fullSyncUsername(): string {
        return this._fullSyncUsername;
    }

    public get fullSyncPassword(): string {
        return this._fullSyncPassword;
    }

    protected copy(c8oBase: C8oBase) {

        /*HTTP*/;
        this._timeout = c8oBase._timeout;
        this._trustAllCertificates = c8oBase._trustAllCertificates;
        /*if (this.cookies == null) {
         //cookies = [string : string]();
         }
         if (c8oBase.cookies != null) {
         cookies.putAll(c8oBase.cookies);
         }*/

        /* Log */

        this._logRemote = c8oBase.logRemote;
        this._logLevelLocal = c8oBase.logLevelLocal;
        this._logC8o = c8oBase.logC8o;
        //this.logOnFail = c8oBase.logOnFail;

        /* FullSync */

        this._defaultDatabaseName = c8oBase.defaultDatabaseName;
        this._authenticationCookieValue = c8oBase.authenticationCookieValue;
        this._fullSyncLocalSuffix = c8oBase.fullSyncLocalSuffix;
    }
}

//DONE class C8outils
@Injectable()
export class C8outils {
    private static USE_PARAMETER_IDENTIFIER : string = "_use_";

    data : JSON;
    public constructor(private http : Http){
        this.http = http;
    }

    public geocode(address : string, apiKey : string){
        let params:URLSearchParams = new URLSearchParams();
        params.set("address", address);
        params.set("key", apiKey);
        let url : string = "https://maps.googleapis.com/maps/api/geocode/json";
        return this.http.get(url, {
            search: params
        }).toPromise()
            .then(this.extractData);

    }

    static getObjectClassName(obj: any){
        return typeof obj;
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log("body ::::::");
        console.log(JSON.stringify(body));
        return body;
    }
    public static isValidUrl(url: string): boolean {
        var valid = /^(http|https):\/\/[^ "]+$/.test(url.toString());
        return valid;
    }


    public static getNewGUIDString() : string {

        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    public static getParameter(parameters: Dictionary, name : string, useName : boolean) : any{
        for(var p in parameters){
            let parameterName = p[0];
            if(name == parameterName || useName && name == this.USE_PARAMETER_IDENTIFIER + parameterName){
                return p;
            }
        }
        return null;
    }
    public static getParameterStringValue(parameters: Dictionary, name : string, useName : boolean) : string{
        let parameter : Dictionary = C8outils.getParameter(parameters, name, useName);
        if(parameter != null){
            return "" + parameter.toString();
        }
        return null;
    }

    public static peekParameterStringValue(parameters: Dictionary, name : string, exceptionIfMissing : boolean) : string{
        let value : string = this.getParameterStringValue(parameters, name, false);

        if(value == null){
            if(exceptionIfMissing)
            {
                throw new Error("The parameter '" + name + "' is missing");
            }
        }
        else{
            parameters[name].pop();
        }
        return value;
    }

    /*public static getParameterJsonValue(parameter: Dictionary) : Array<any>{
        for(var i=0; i < parameter.keys().length; i++){

        }
    }*/

}

//DONE class C8o
@Injectable()
export class C8o extends C8oBase {

    private static RE_REQUESTABLE = /^([^.]*)\.(?:([^.]+)|(?:([^.]+)\.([^.]+)))$/;
    /*The regex used to get the part of the endpoint before '/projects/...'*/
    regex: RegExp = /^[1-9]\d{0,2}$/;
    private static RE_ENDPOINT = /^(https?:\/\/([^:]+)(:[0-9]+)?\/?.*?)\/projects\/([^\/]+)$/;


    /* Engine reserved parameters */
    static ENGINE_PARAMETER_PROJECT: string = "__project";
    static ENGINE_PARAMETER_SEQUENCE: string = "__sequence";
    static ENGINE_PARAMETER_CONNECTOR: string = "__connector";
    static ENGINE_PARAMETER_TRANSACTION: string = "__transaction";
    static ENGINE_PARAMETER_ENCODED: string = "__encoded";
    static ENGINE_PARAMETER_DEVICE_UUID: string = "__uuid";
    static ENGINE_PARAMETER_PROGRESS: string = "__progress";

    static FS_POLICY: string = "_use_policy";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This is the default post policy that don't alter the document before the CouchbaseLite's insertion.
     */
    static FS_POLICY_NONE: string = "none";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy remove the "_id" and "_rev" of the document before the CouchbaseLite's insertion.
     */
    static FS_POLICY_CREATE: string = "create";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy inserts the document in CouchbaseLite even if a document with the same "_id" already exists.
     */
    static FS_POLICY_OVERRIDE: string = "override";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy merge the document with an existing document with the same "_id" before the CouchbaseLite's insertion.
     */
    static FS_POLICY_MERGE: string = "merge";
    /**
     Use it with "fs://.post". Default value is ".".

     This key allow to override the sub key separator in case of document depth modification.
     */
    static FS_SUBKEY_SEPARATOR: string = "_use_subkey_separator";

    /* Local cache keys */

    static LOCAL_CACHE_DOCUMENT_KEY_RESPONSE: string = "response";
    static LOCAL_CACHE_DOCUMENT_KEY_RESPONSE_TYPE: string = "responseType";
    static LOCAL_CACHE_DOCUMENT_KEY_EXPIRATION_DATE: string = "expirationDate";

    static LOCAL_CACHE_DATABASE_NAME: string = "c8olocalcache";

    /* Response type */

    static RESPONSE_TYPE_XML: string = "pxml";
    static RESPONSE_TYPE_JSON: string = "json";

    /* Static configuration */
    static defaultUiDispatcher: Object;// ACTION<ACTION>?
    static deviceUUID: string = C8outils.getNewGUIDString();

    /**
     Returns the current version of the SDK as "x.y.z".
     - returns: Current version of the SDK as "x.y.z".
     */
    static getSdkVersion(): string {
        return "2.0.4";
    }

    /* Attributes */

    private _endpoint: string;
    private _endpointConvertigo: string;
    private _endpointIsSecure: boolean;
    private _endpointHost: string;
    private _endpointPort: string;
    private _endpointProject: string;

    /* Used to run HTTP requests.*/
    //internal httpInterface: C8oHttpInterface;

    /* Allows to log locally and remotely to the Convertigo server.*/
    c8oLogger: C8oLogger;

    /* Allows to make fullSync calls. */
    //c8oFullSync: C8oFullSync;

    private data: any;
    private sequencePrefix: string;
    private _http : Http;

    public addCookie(name: string, value: string) {

    }

    public get logC8o(): boolean {
        return this._logC8o;
    }

    public set logC8o(value: boolean) {
        this._logC8o = value;
    }

    public get logRemote(): boolean {
        return this._logRemote;
    }

    public set logRemote(value: boolean) {
        this._logRemote = value;
    }

    public get logLevelLocal(): C8oLogLevel {
        return this._logLevelLocal;
    }

    public set logLevelLocal(value: C8oLogLevel) {
        this._logLevelLocal = value;
    }

    public get log(): C8oLogger {
        return this.c8oLogger;
    }

    public toString(): string {
        return "C8o[" + this._endpoint + "]";
    }

    public get endpoint(): string {
        return this._endpoint;
    }
    public set endpoint(value: string) {
        this._endpoint = value;
    }

    public get endpointConvertigo(): string {
        return this._endpointConvertigo;
    }
    public set endpointConvertigo(value: string) {
        this._endpointConvertigo = value;
    }

    public get endpointIsSecure(): boolean {
        return this._endpointIsSecure;
    }
    public set endpointIsSecure(value: boolean) {
        this._endpointIsSecure = value;
    }
    //
    public get endpointHost(): string {
        return this._endpointHost;
    }
    public set endpointHost(value: string) {
        this._endpointHost = value;
    }
    public get endpointPort(): string {
        return this._endpointPort;
    }
    public set endpointPort(value: string) {
        this._endpointPort = value;
    }
    public get endpointProject(): string {
        return this._endpointProject;
    }
    public set endpointProject(value: string) {
        this._endpointProject = value;
    }
    public get deviceUUID(): string {
        return C8o.deviceUUID;
    }

    public get httpPublic() : Http {
        return this._http;
    }
    /*public get cookieStore():string{
     return this._endpointIsSecure;
     }*/

    constructor(private http: Http) {
        super();
        this._http = http;
        this.data = null;
        this.sequencePrefix = "/.json?";

        new Promise(resolve => {
            //if project is running into web browser
            //get the url from window.location
            if (window.location.href.startsWith('http')) {
                let n = window.location.href.indexOf("/Display");
                this.endpoint = window.location.href.substring(0, n);
                resolve(this.data);
            }
            //if project is running on device
            //get the uri from env.json
            else if (window.location.href.startsWith('file')) {
                var uri = window.location.href.replace('app.html', 'env.json');
                this.http.get(uri)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.data = data;
                        //noinspection TypeScriptUnresolvedVariable
                        let remoteBase = data.remoteBase.toString();
                        let n = remoteBase.indexOf("/_private");
                        this.endpoint = remoteBase.substring(0, n);
                        resolve(this.data);
                    });
            }
        }).then(() => {
            if (!C8outils.isValidUrl(this.endpoint)) {
                //return new TypeError(C8oExceptionMessage.illegalArgumentInvalidURL(this.endpoint).toString());
            }
            var matches = C8o.RE_ENDPOINT.exec(this.endpoint.toString());
            let n = matches[0].indexOf("/projects");
            this.endpointConvertigo = matches[0].substring(0, n);
            this.endpointIsSecure = matches[1] != null;
            this.endpointHost = matches[2];
            this.endpointPort = matches[3];
            this.endpointProject = matches[4];

            /*console.log('endpointConvertigo :' + this.endpointConvertigo.toString());
             console.log('endpointIsSecure :' + this.endpointIsSecure.toString());
             console.log('endpointHost :' + this.endpointHost.toString());
             console.log('endpointPort :' + this.endpointPort.toString());
             console.log('endpointProject :' + this.endpointProject.toString());*/
            this.c8oLogger = new C8oLogger(this);
            this.c8oLogger.logMethodCall("C8o Constructor");
        });

    }

    public call(requestable: string, parameters: Dictionary){
        try{
            if(requestable == null || isUndefined(requestable)){
                throw new Error("requestable must be not null");
            }
            if(parameters == null || isUndefined(parameters)){

            }
            else {

            }
            let regex = C8o.RE_REQUESTABLE.exec(requestable);
            if(regex[0] == null || isUndefined(regex)){
                throw new Error(this._endpoint + "is not a valid Convertigo endpoint");
            }
            if(regex[1] != ""){
                parameters[C8o.ENGINE_PARAMETER_PROJECT.toString()] = regex[1];
            }
            if(regex[2] != null){
                parameters[C8o.ENGINE_PARAMETER_SEQUENCE.toString()] = regex[2];
            }
            else{
                parameters[C8o.ENGINE_PARAMETER_CONNECTOR.toString()] = regex[3];
                parameters[C8o.ENGINE_PARAMETER_TRANSACTION.toString()] = regex[4];
            }
            return this._callJson(parameters);
        }
        catch(error) {

        }
    }

    private _callJson(parameters: Dictionary) {
        this.c8oLogger.logMethodCall("CallJSON", parameters);
        this.data = null;
        if (this.data != null) {
            // already loaded data
            console.log("la");
            return Promise.resolve(this.data);
        }
        let params:URLSearchParams = new URLSearchParams();
        if (parameters != undefined && JSON.stringify(parameters) != "{}") {
            for (var item in parameters) {
                params.set(item, parameters[item].valueOf());
            }
        }

		var headers = new Headers();
      	headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return new Promise(resolve => {
            var eurl = this.endpoint.toString() + this.sequencePrefix.toString();
            this.http.post(eurl, params.toString(), {
            	headers: headers
            }).map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    return resolve(this.data);
                });
        });

    }

    public callJson(requestable: string, ...parameters: any[]) {
        return this.call(requestable.toString(), C8o.toParameters(parameters));
    }

    public static toParameters(parameters: any): Dictionary {
        var newParameters: Dictionary = new Dictionary();
        var alreadyDone = false;
        if (parameters != undefined) {
            if (0 != parameters.length % 2) {
                if (parameters.length == 1 && parameters.constructor === Array) {
                    alreadyDone = true;
                    for(var item in parameters[0]){
                        newParameters[item] = parameters[0][item];
                    }
                }
                else{
                    throw new Error("Invalid parameter Exception");
                }
            }
            if(!alreadyDone){
                for (var i = 0; i < parameters.length; i += 2) {
                    newParameters[parameters[i]] = parameters[i + 1];
                }
            }
        }
        return newParameters;

    }

}

//DOING class C8oFullSync
export class C8oFullSync {
    private static FULL_SYNC_URL_PATH : string = "/fullsync/";
    /**
     * The project requestable value to execute a fullSync request.
     */
    public static FULL_SYNC_PROJECT  : string= "fs://";
    public static FULL_SYNC__ID  : string = "_id";
    public static FULL_SYNC__REV  : string = "_rev";
    public static FULL_SYNC__ATTACHMENTS : string = "_attachments";

    protected c8o : C8o;
    protected fullSyncDatabaseUrlBase : string;
    protected localSuffix : string;

    public constructor(c8o : C8o){
        this.c8o = c8o;
        this.fullSyncDatabaseUrlBase = c8o.endpointConvertigo + C8oFullSync.FULL_SYNC_URL_PATH;
        this.localSuffix = (c8o.fullSyncLocalSuffix != null) ? c8o.fullSyncLocalSuffix : "_device";
    }

    //TODO class C8oFullSync: function handleFullSyncRequest
    public handleFullSyncRequest(parameters : Dictionary) : any{
        let projectParameterValue : string = C8outils.peekParameterStringValue(parameters, C8o.ENGINE_PARAMETER_PROJECT, true);

        if(!projectParameterValue.startsWith(C8oFullSync.FULL_SYNC_PROJECT)){
            //TODO ERROR
            throw new Error("TODO");
        }

        let fullSyncRequestableValue : string = C8outils.peekParameterStringValue(parameters, C8o.ENGINE_PARAMETER_PROJECT, true);
        let fullSyncRequestable : FullSyncRequestable

    }

}

//DOING class C8oFullSyncCbl
export class C8oFullSyncCbl extends C8oFullSync{
    private static ATTACHMENT_PROPERTY_KEY_CONTENT_URL : string = "content_url"
    //private  manager : PouchDB
    private fullSyncDatabases: Dictionary;

    constructor(c8o : C8o){
        super(c8o);
    }

    //DONE class C8oFullSyncCbl: function getOrCreateFullSyncDatabase => ok
    private getOrCreateFullSyncDatabase(databaseName : string) : C8oFullSyncDatabase{
        let localDatabaseName : string = databaseName + this.localSuffix;

        if(this.fullSyncDatabases[localDatabaseName] == null){
            this.fullSyncDatabases[localDatabaseName] = new C8oFullSyncDatabase(this.c8o, databaseName, this.fullSyncDatabaseUrlBase, this.localSuffix)
        }
        return this.fullSyncDatabases[localDatabaseName];
     }

     //DOING class C8oFullSyncCbl: function handleFullSyncResponse
    handleFullSyncResponse(response: any, listener: C8oResponseListener) : any{
        //response = super.handleFullSync

        if(typeof(response) == 'void' ){
            return response
        }

    }

    //DONE class C8oFullSyncCbl: function handleGetDocumentRequest
    handleGetDocumentRequest(fullSyncDatabaseName: string, docid: string, paramaeters: Dictionary) : any{
        var fullSyncDatabase : C8oFullSyncDatabase = null
        var dictDoc : Dictionary = new Dictionary();

        fullSyncDatabase = this.getOrCreateFullSyncDatabase(fullSyncDatabaseName);
        return new Promise(function (resolve) {
            fullSyncDatabase.getdatabase().get(docid,{
                _attachment : true
            }).then(function (document) {
                if(document != null){

                    var attachments : Dictionary = document[C8oFullSync.FULL_SYNC__ATTACHMENTS] as Dictionary;
                    if(attachments != null){
                        //TOTEST check that it's the good revision

                        for(var attachmentName in attachments.keys()){
                            //TOTEST check that properties are well named
                            let attachement = attachments[attachmentName]
                            let url = attachments['url']
                            var attachementDesc: Dictionary = attachments[attachmentName]
                            //TOTEST Remove by percent encoding
                            attachementDesc[C8oFullSyncCbl.ATTACHMENT_PROPERTY_KEY_CONTENT_URL] = url.toString()
                            var dictAny : Dictionary = new Dictionary();
                            dictAny[attachmentName] = attachementDesc
                            dictDoc[C8oFullSyncCbl.FULL_SYNC__ATTACHMENTS] = dictAny
                        }
                    }
                }
                else{
                    throw new C8oRessourceNotFoundException((C8oExceptionMessage.ressourceNotFound("requested document \"" + docid + "\"")));
                }
                if(dictDoc == null){
                    dictDoc = new Dictionary()
                }

                resolve(dictDoc)
            })

        })
    }
    //DONE class C8oFullSyncCbl: function handleDeleteDocumentRequest
    handleDeleteDocumentRequest(DatabaseName : string, docid : string, parameters : Dictionary) : any{
        var fullSyncDatabase : C8oFullSyncDatabase = null;
        var document : any
        fullSyncDatabase = this.getOrCreateFullSyncDatabase(DatabaseName);
        let revParameterValue : string = C8outils.getParameterStringValue(parameters, FullSyncDeleteDocumentParameter.REV.name, false)
        let documentRevision : string
        return new Promise(function (resolve) {
            fullSyncDatabase.getdatabase().get(docid).then(function(doc) {
                if(doc == null){
                    throw new C8oRessourceNotFoundException(C8oExceptionMessage.toDo());
                }
                documentRevision = document._rev
                return fullSyncDatabase.getdatabase().remove(doc);
            }).then(function (result) {
                resolve(new FullSyncDocumentOperationResponse(docid, documentRevision, result.ok));
            }).catch(function (err) {
                throw new C8oException(C8oExceptionMessage.couchRequestDeleteDocument(), err);
            });
        })
    }

    //DONE class C8oFullSyncCbl: function handlePostDocumentRequest
    handlePostDocumentRequest(databaseName: string, fullSyncPolicy: FullSyncPolicy, parameters: Dictionary) : any {
        var fullSyncDatabase : C8oFullSyncDatabase = null
        try{
            fullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName);
        }
        catch(error){

        }

        var subkeySeparatorParameterValue: string = C8outils.getParameterStringValue(parameters, C8o.FS_SUBKEY_SEPARATOR, false)
        if (subkeySeparatorParameterValue == null) {
            subkeySeparatorParameterValue = "."
        }

        var newProperties = new Dictionary();
        for(var parameter in parameters){
            var parameterName: string = parameter[0];

            if(!parameterName.startsWith("__") && !parameterName.startsWith("_use_")){
                //TODO maybe have to translate to Object type for objectparameterValue
                var objectparameterValue : any = parameter[1]
                //TODO test split and find an equivalent to pattern.quote if necessary
                let paths : Array<string> = parameterName.split(subkeySeparatorParameterValue);
                if(paths.length > 1){
                    parameterName = paths[0]

                    let count = paths.length - 1

                    while(count>0){
                        let tmpObject : Dictionary = new Dictionary()
                        tmpObject.add(paths[count], objectparameterValue);
                        objectparameterValue = tmpObject
                        count --
                    }
                    let existProperty = newProperties[parameterName]
                    if(existProperty != null && typeof existProperty ==  'Dictionary'){
                        C8oFullSyncCbl.mergeProperties(objectparameterValue, existProperty);
                    }
                }

                newProperties.add(parameterName, objectparameterValue);
            }
        }
        var db = fullSyncDatabase.getdatabase()
        var createdDocument = fullSyncPolicy.action.doClosure(db,  newProperties)
        var documentId =  createdDocument.documentId
        var currentRevision = createdDocument.rev

        return new FullSyncDocumentOperationResponse(documentId, currentRevision, false);

    }

    //DONE class C8oFullSyncCbl: function handlePutAttachmentRequest
    handlePutAttachmentRequest(databaseName : string, docid : string, attachmentName : string, attachmentType : string, attachmentContent : MSStream) : any {
        var document : any = null
        var newRev : any = null
        let fullSyncDatabase : C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)

        return new Promise(function (resolve) {
            fullSyncDatabase.getdatabase().get(docid).then(function (result) {
                document = result;

                if(document != null){
                    fullSyncDatabase.getdatabase().putAttachment(docid, attachmentName, attachmentContent, attachmentType)
                        .then(function (result) {
                            // handle result
                        }).catch(function (err) {
                        throw new C8oCouchBaseLiteException("Unable to put the attachment " + attachmentName + " to the document " + docid + ".", err)
                    });

                }else{
                    throw new C8oRessourceNotFoundException(C8oExceptionMessage.toDo())
                }
                resolve(new FullSyncDocumentOperationResponse(document._id,document._rev, true));
            })
        })


    }

    //DONE class C8oFullSyncCbl: function handleDeleteAttachmentRequest
    handleDeleteAttachmentRequest(databaseName: string, docid: string, attachmentName: string) : any{
        var document : any = null
        var newRev : any = null
        let fullSyncDatabase : C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        
        return new Promise(function (resolve) {
            fullSyncDatabase.getdatabase().get(docid).then(function (result) {
                document = result
            }).then(function () {
                if(document != null){
                    fullSyncDatabase.getdatabase().removeAttachment(docid, attachmentName, document._rev).catch(function (err) {
                        throw new C8oCouchBaseLiteException("Unable to delete the attachment " + attachmentName + " to the document " + docid + ".", err)
                    })
                }
                else{
                    throw new C8oRessourceNotFoundException(C8oExceptionMessage.toDo())
                }
                resolve(new FullSyncDocumentOperationResponse(document._id, document._rev, true));
            })
        })
    }

    //DONE class C8oFullSyncCbl: function handleAllDocumentsRequest
    public handleAllDocumentsRequest(databaseName: string, parameters: Dictionary) : any{
        var fullSyncDatabase = null
        var query = null
        var result = null

        fullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        fullSyncDatabase.getDatabase()
            .allDocs(parameters.toArray()
            ).then(function (res) {
                result = res;
        })
        return result;
    }

    //DONE class C8oFullSyncCbl: function handleGetViewRequest
    handleGetViewRequest(databaseName : string, ddocName : string, viewName: string, parameters: Dictionary){
        var fullSyncDatabase = null
        let view = null
        fullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        console.log("la")

        return new Promise(function (resolve) {
            fullSyncDatabase.query(ddocName + "/"  + viewName, parameters.toArray())
                .then(function (result) {
                    resolve(result)
                }).catch(function (err) {
                throw new C8oException(C8oExceptionMessage.couchRequestGetView())
            })
        })

    }
    //TODO add C8oResponseListener
    //DONE class C8oFullSyncCbl: function handleSyncRequest
    handleSyncRequest(databaseName: string, parameters : Dictionary) : void {
        let fullSyncDatabase :  C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        fullSyncDatabase.startAllReplications(parameters)
    }
        //TODO add C8oResponseListener
    //DONE class C8oFullSyncCbl: function handleReplicatePullRequest
    handleReplicatePullRequest(databaseName: string, parameters: Dictionary) : void{
        let fullSyncDatabase :  C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        fullSyncDatabase.startPullReplication(parameters)
    }

    //TODO add C8oResponseListener
    //DONE class C8oFullSyncCbl: function handleReplicatePushRequest
    handleReplicatePushRequest(databaseName: string, parameters: Dictionary) : void {
        let fullSyncDatabase :  C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        fullSyncDatabase.startPushReplication(parameters)
    }

    //DONE class C8oFullSyncCbl: function handleResetDatabaseRequest
    handleResetDatabaseRequest(databaseName : string) : FullSyncDefaultResponse{
        this.getOrCreateFullSyncDatabase(databaseName)
        return this.handleCreateDatabaseRequest(databaseName)
    }

    //DONE class C8oFullSyncCbl: function handleCreateDatabaseRequest
    handleCreateDatabaseRequest(databaseName : string): FullSyncDefaultResponse{
        this.getOrCreateFullSyncDatabase(databaseName)
        return new FullSyncDefaultResponse(true)
    }

    //DONE class C8oFullSyncCbl: function handleCreateDatabaseRequest
    handleDestroyDatabaseRequest(databaseName: string): FullSyncDefaultResponse{
        let localDatabaseName = databaseName + this.localSuffix
        if(this.fullSyncDatabases[localDatabaseName] !=  null){
            this.fullSyncDatabases.remove(localDatabaseName)
        }
        try{
            let db = new PouchDB(localDatabaseName)
            db.destroy()
        }
        catch(err){
            throw new C8oException("TODO", err)
        }
        return new FullSyncDefaultResponse(true)
    }

    //LATER class C8oFullSyncCbl: function compileView
    private compileView(db: any, viewName: string, viewProps: Dictionary): any{
        throw new Error("TODO: class C8oFullSyncCbl: function compileView")
    }

    //LATER class C8oFullSyncCbl: function checkAndCreateJavaScriptView
    private checkAndCreateJavaScriptView(database: any, ddocName: string, viewName: string): any{
        throw new Error("TODO: C8oFullSyncCbl: function checkAndCreateJavaScriptView")
    }

    //LATER class C8oFullSyncCBL: function addParametersToQuery
    private static addParametersToQuery(query: any, parameters : Dictionary){
        throw new Error("TODO: C8oFullSyncCbl: function addParametersToQuery")
    }

    //DONE class C8oFullSyncCBL-> mergeProperties
    static mergeProperties(newProperties: Dictionary, oldProperties: Dictionary){
        for(var old in oldProperties){
            let oldPropertyKey : any = old[0]
            let oldPropertyValue : any = old[1]

            if(newProperties[oldPropertyKey] != null && typeof newProperties[oldPropertyKey] == 'Dictionary' && typeof oldPropertyValue == 'Dictionary'){
                C8oFullSyncCbl.mergeProperties(newProperties[oldPropertyKey], oldPropertyValue)
                newProperties[oldPropertyKey] = newProperties[oldPropertyKey]
            }
            else if(typeof newProperties[oldPropertyKey] == 'any' && typeof oldPropertyValue == 'any'){
                C8oFullSyncCbl.mergeProperties(newProperties[oldPropertyKey], oldPropertyValue);
            }
            else{
                newProperties[oldPropertyKey] = oldPropertyValue
            }
        }

    }
    //DONE class C8oFullSyncCBL-> mergeArrayProperties
    static mergeArrayProperties( newArray : any, oldArray: any){
        let newArraySize = newArray.length
        let oldArraySize = oldArray.length
        for(var i=0; i< oldArraySize; i++){
            var newArrayValue : any = null
            if(i< newArraySize){
                newArrayValue = newArray[i]
            }
            let oldArrayValue = oldArray[i]

            if(newArrayValue != null){
                if(typeof newArrayValue == 'Dictionary' && typeof oldArrayValue == 'Dictionary'){
                    C8oFullSyncCbl.mergeProperties(newArrayValue, oldArrayValue)

                }
                else if(typeof newArrayValue == 'Array' && typeof oldArrayValue == 'Array'){
                    C8oFullSyncCbl.mergeArrayProperties(newArrayValue, oldArrayValue)
                }
                else{

                }
            }
            else{
                newArray.add(oldArrayValue)
            }
        }
    }

    //DONE class C8oFullSyncCBL->getDocucmentFromDatabase
    getDocucmentFromDatabase(c8o: C8o, databaseName: string, documentId: string) : any{
        var c8oFullSyncDatabase: C8oFullSyncDatabase
        try {
                c8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        }
        catch(err){
            throw new C8oException(C8oExceptionMessage.fullSyncGetOrCreateDatabase(databaseName))
        }

        return new Promise(function (resolve) {
            c8oFullSyncDatabase.getdatabase().get(documentId).then(function (result) {
                resolve(result);
            })
        })
    }

    //DONE class C8oFullSyncCBL->overrideDocument but change sign cause need databaseName
    overrideDocument(document: any, properties: Dictionary, databaseName){
        //TOTEST verify the content of properties and if we have not to add _id from document etc...
        properties.add(C8oFullSync.FULL_SYNC__REV, document._rev)
        var c8oFullSyncDatabase: C8oFullSyncDatabase
        try {
            c8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(databaseName)
        }
        catch(err){
            throw new C8oException(C8oExceptionMessage.fullSyncGetOrCreateDatabase(databaseName))
        }


        c8oFullSyncDatabase.getdatabase().put(properties.toArray()).catch(function (err) {
            throw new C8oException("TODO");
        })

    }

    //DONE class C8oFullSyncCBL->getResponseFromLocalCache
    getResponseFromLocalCache(c8oCallRequestIdentifier: string): any {

        let fullSyncDatabase = this.getOrCreateFullSyncDatabase(C8o.LOCAL_CACHE_DATABASE_NAME)
        var localCacheDocument = null
        return new Promise(function (resolve) {
            fullSyncDatabase.getdatabase().get(c8oCallRequestIdentifier).then(function (result) {
                localCacheDocument = result
                if (localCacheDocument == null) {
                    throw new C8oUnavailableLocalCacheException(C8oExceptionMessage.localCacheDocumentJustCreated())
                }

                let response = localCacheDocument.get(C8o.LOCAL_CACHE_DOCUMENT_KEY_RESPONSE)
                let responseType = localCacheDocument.get(C8o.LOCAL_CACHE_DOCUMENT_KEY_RESPONSE_TYPE)
                let expirationDate = localCacheDocument.get(C8o.LOCAL_CACHE_DOCUMENT_KEY_EXPIRATION_DATE)

                var responseString: string = null
                var responseTypeString: string = null
                var expirationDateNumber: number = -1

                if (response != null) {
                    if (typeof response == 'string') {
                        responseString = response
                    }
                    else {
                        throw new C8oException(C8oExceptionMessage.InvalidLocalCacheResponseInformation())
                    }
                }
                if (responseType != null) {
                    if (typeof responseType == 'string') {
                        responseTypeString = responseType
                    }
                    else {
                        throw new C8oException(C8oExceptionMessage.InvalidLocalCacheResponseInformation())
                    }
                }
                if (expirationDate != null) {
                    if (typeof expirationDate == 'number') {
                        expirationDateNumber = expirationDate
                        let currentTime = new Date().getTime()
                        if (expirationDateNumber < currentTime) {
                            throw new C8oUnavailableLocalCacheException(C8oExceptionMessage.timeToLiveExpired())
                        }
                    }
                    else {
                        throw new C8oException(C8oExceptionMessage.InvalidLocalCacheResponseInformation())
                    }
                }
                resolve(new C8oLocalCacheResponse(responseString, responseTypeString, expirationDateNumber))
            })
        })


    }

    //DONE class C8oFullSyncCBL->saveResponseToLocalCache
    saveResponseToLocalCache(c8oCallRequestIdentifier: string, localCacheResponse: C8oLocalCacheResponse){
        let fullSyncDatabase : C8oFullSyncDatabase = this.getOrCreateFullSyncDatabase(C8o.LOCAL_CACHE_DATABASE_NAME)
        fullSyncDatabase.getdatabase().get(c8oCallRequestIdentifier).then(function (localCacheDocument) {
            var properties = new Dictionary();
            properties.add(C8o.LOCAL_CACHE_DOCUMENT_KEY_RESPONSE, localCacheResponse.getResponse())
            properties.add(C8o.LOCAL_CACHE_DOCUMENT_KEY_RESPONSE_TYPE, localCacheResponse.getResponseType())
            if(localCacheResponse.getExpirationDate() > 0){
                properties.add(C8o.LOCAL_CACHE_DOCUMENT_KEY_EXPIRATION_DATE, localCacheResponse.getExpirationDate())
            }
            let currentRevision = localCacheDocument._rev
            if(currentRevision != null){
                properties.add(C8oFullSyncCbl.FULL_SYNC__REV, currentRevision)
            }
            //TOTEST this
            fullSyncDatabase.getdatabase().put(properties.toArray())

        })
    }
}
//DONE class C8oLocalCacheResponse
class C8oLocalCacheResponse{
    private response : string
    private responseType: string
    private expirationDate : number

    constructor(response: string, responseType: string, expirationDate: number){
        this.response = response
        this.responseType = responseType
        this.expirationDate = expirationDate
    }

    isExpired() : boolean{
        if(this.expirationDate <= 0){
            return false
        }
        else{
            let currentDate = new Date().getTime()
            return this.expirationDate < currentDate
        }
    }

    getResponse() : string{
        return this.response
    }

    getResponseType() : string{
        return this.responseType
    }

    getExpirationDate() : number{
        return this.expirationDate
    }
}

//DONE class FullSyncGetViewParameter
export class FullSyncGetViewParameter {
    public static VIEW: FullSyncGetViewParameter = new FullSyncGetViewParameter("view")
    public static DDOC: FullSyncGetViewParameter = new FullSyncGetViewParameter("ddoc")

    public name: string

    constructor(name: string) {
        this.name = name
    }
}

//DONE class FullSyncGetDocumentParameter
export class FullSyncGetDocumentParameter {
    public static DOCID: FullSyncGetDocumentParameter = new FullSyncGetDocumentParameter("docid")

    public name: string

    constructor(name: string) {
        this.name = name
    }

}

//DONE class FullSyncDeleteDocumentParameter
export class FullSyncDeleteDocumentParameter {
    public static DOCID: FullSyncDeleteDocumentParameter = new FullSyncDeleteDocumentParameter("docid")
    public static REV: FullSyncDeleteDocumentParameter = new FullSyncDeleteDocumentParameter("rev")

    public name: string

    constructor(name: string) {
        this.name = name
    }
}
//DONE class FullSyncAttachmentParameter
export class FullSyncAttachmentParameter{
    public static DOCID : FullSyncAttachmentParameter = new FullSyncAttachmentParameter("docid")
    public static NAME : FullSyncAttachmentParameter = new FullSyncAttachmentParameter("name")
    public static CONTENT_TYPE : FullSyncAttachmentParameter = new FullSyncAttachmentParameter("content_type")
    public static CONTENT : FullSyncAttachmentParameter = new FullSyncAttachmentParameter("content")

    public name : string

    constructor (name : string){
        this.name = name
    }
}

//DONE class FullSyncPostDocumentParameter
export class FullSyncPostDocumentParameter {
    public static POLICY: FullSyncPostDocumentParameter = new FullSyncPostDocumentParameter(C8o.FS_POLICY)
    public static SUBKEY_SEPARATOR: FullSyncPostDocumentParameter = new FullSyncPostDocumentParameter(C8o.FS_SUBKEY_SEPARATOR)

    public name: string

    constructor(name: string) {
        this.name = name
    }

    public static values() : FullSyncPostDocumentParameter[] {
    let array: [FullSyncPostDocumentParameter] = [this.POLICY, this.SUBKEY_SEPARATOR]
    return array
}

}

//DOING class FullSyncRequestable
export class FullSyncRequestable{
    /*protected static GET : FullSyncRequestable = new FullSyncRequestable("get", function (c8oFullSync : C8oFullSyncCbl, databaseName : string, parameters :Dictionary, c8oResponseListener: C8oResponseListener) : HanfleFullSyncrequestOp {
        return {
            doClosure : function() {
                let docid : string = C8outils.peekParameterStringValue(parameters, FullSyncGetDocumentParameter.DOCID.name, true);
                return c8oFullSync.han
            }
        }

    } );*/

    private value : string;
    private  hanfleFullSncrequestOp: HanfleFullSyncrequestOp;
    constructor(value: string, hanfleFullSncrequestOp: any){
        this.value = value;
        this.hanfleFullSncrequestOp = hanfleFullSncrequestOp;
    }

    //(c8oFullSync: C8oFullSyncCbl, databaseNameName: string, parameters: Dictionary, c8oResponseListner: C8oResponseListener)
}

//DOING interface HanfleFullSyncrequestOp
interface HanfleFullSyncrequestOp{
    doClosure(c8oFullSyncCbl: C8oFullSyncCbl, string: string, dictionnary: Dictionary, c8oResponseListener: C8oResponseListener) : any;
}

//DOING class FullSyncPolicy
export class FullSyncPolicy{
    public static NONE: FullSyncPolicy = new FullSyncPolicy(C8o.FS_POLICY_NONE, function (database : any, newProperties : Dictionary) : IAction{
        return{
            doClosure : function () {
                var createdDocument : any
                var documentId = C8outils.getParameterStringValue(newProperties, C8oFullSync.FULL_SYNC__ID, false)
                try{
                    newProperties.remove(C8oFullSync.FULL_SYNC__ID)
                    if(documentId == ""){
                        documentId = null
                    }
                    if(documentId == null){
                        //FIXME this maight produce error
                        createdDocument = database.put();
                    }
                    else{
                        createdDocument = database.get(documentId)
                    }
                    createdDocument.put(newProperties);
                }
                catch(error){
                    throw new C8oCouchBaseLiteException(C8oExceptionMessage.fullSyncPutProperties(newProperties), error);
                }
                return createdDocument;
            }
        }
    });
    public static CREATE: FullSyncPolicy = new FullSyncPolicy(C8o.FS_POLICY_CREATE, function (database : any, newProperties : Dictionary) : IAction{
        return{
            doClosure : function () {
                var createdDocument : any;
                try{
                    newProperties.remove(C8oFullSync.FULL_SYNC__ID)
                    newProperties.remove(C8oFullSync.FULL_SYNC__REV)
                    //FIXME this maight produce error
                    createdDocument = database.put()
                    createdDocument.put(newProperties)
                }
                catch (error){
                    throw new C8oCouchBaseLiteException(C8oExceptionMessage.fullSyncPutProperties(newProperties), error)
                }
                return createdDocument;
            }
        }
    });
    public static OVERRIDE: FullSyncPolicy = new FullSyncPolicy(C8o.FS_POLICY_OVERRIDE, function (database : any, newProperties : Dictionary) : IAction{
        return{
            doClosure : function () {
                var createdDocument : any;
                try{
                    let documentId : string = C8outils.getParameterStringValue(newProperties, C8oFullSync.FULL_SYNC__ID, false)
                    newProperties.remove(C8oFullSync.FULL_SYNC__ID)
                    newProperties.remove(C8oFullSync.FULL_SYNC__REV)

                    if(documentId == null){
                        //FIXME this maight produce error
                        createdDocument = database.put()
                    }
                    else {
                        database.get(documentId).then(function (doc) {
                            createdDocument = doc;
                        })
                        var currentRevision = createdDocument.rev;
                        if(currentRevision == null){
                            //TODO test...
                            newProperties[C8oFullSync.FULL_SYNC__REV] = currentRevision.rev.id;
                        }
                    }
                    createdDocument.put(newProperties);

                }
                catch(error){
                    throw new C8oCouchBaseLiteException(C8oExceptionMessage.fullSyncPutProperties(newProperties), error)
                }
                return createdDocument;
            }
        }
    });

    public static MERGE: FullSyncPolicy = new FullSyncPolicy(C8o.FS_POLICY_OVERRIDE, function (database : any, newProperties : Dictionary) : IAction {
        return {
            doClosure: function () {
                var createdDocument : any;
                try {
                    let documentId: string = C8outils.getParameterStringValue(newProperties, C8oFullSync.FULL_SYNC__ID, false)
                    newProperties.remove(C8oFullSync.FULL_SYNC__ID)
                    newProperties.remove(C8oFullSync.FULL_SYNC__REV)
                    if (documentId == null) {
                        //FIXME this maight produce error
                        createdDocument = database.put()
                    } else {
                        database.get(documentId).then(function (doc) {
                            createdDocument = doc;
                        })
                    }
                    //TODO to test...
                    var oldProperties = createdDocument.properties
                    if(oldProperties!= null){
                        //C8oFullSyncCbl
                    }
                }
                catch(error){

                }
            }
        }
    });

    value: string
    action : IAction
    constructor(value: string, action : any){
        this.value = value
        this.action = action
    }
}

//DOING interface action
export interface IAction{
    doClosure(PouchDb, Dictionary) : any
}

//DOING class C8oFullSyncDatabase
export class C8oFullSyncDatabase{
    private static AUTHENTICATION_COOKIE_NAME: string = "SyncGatewaySession"
    private c8o: C8o;
    private databaseName: string;
    private c8oFullSyncDatabaseUrl: string;
    private database = null;
    private localDatabase = null
    private pullFullSyncReplication : FullSyncReplication = new FullSyncReplication(true);
    private pushFullSyncReplication : FullSyncReplication = new FullSyncReplication(false);


    constructor(c8o : C8o, databaseName: string, fullSyncDatabases : string, localSuffix:string ){
        this.c8o = c8o;
        this.c8oFullSyncDatabaseUrl = fullSyncDatabases + databaseName;
        this.databaseName = databaseName + localSuffix;
        try{
            this.database = new PouchDB(databaseName);
        }
        catch(error){
            throw error;
        }
    }

    //FIXME class C8oFullSyncDatabase: function getReplication => can't hold CBLreplication object in pouchdb
    private getReplication(fsReplication : FullSyncReplication) : any{
        //TODO class C8oFullSyncDatabase: function getReplication => remove observer and replication


    }

    //DOING class C8oFullSyncDatabase: function startAllReplications => implement and add c8oResponseListener parameter
    public startAllReplications(parameters : Dictionary){
        this.startReplication(this.pullFullSyncReplication, parameters);
        this.startReplication(this.pushFullSyncReplication, parameters);
    }

    //DOING class C8oFullSyncDatabase: function startPullReplication => implement and add c8oResponseListener parameter
    public startPullReplication(parameters : Dictionary){
        this.startReplication(this.pullFullSyncReplication, parameters);
    }

    //DOING class C8oFullSyncDatabase: function startPushReplication => implement and add c8oResponseListener parameter
    public startPushReplication(parameters : Dictionary){
        this.startReplication(this.pushFullSyncReplication, parameters);
    }

    //TODO class C8oFullSyncDatabase: function startReplication => add c8oResponseListener parameter
    private startReplication(fullSyncReplication: FullSyncReplication, parameters : Dictionary){
        var continuous : boolean = false;
        var cancel : boolean = false;
        if(parameters["continuous"] != null || parameters["continuous"] != undefined){
            if(parameters["continuous"] as boolean == true){
                continuous = true;
            }
            else{
                continuous = false;
            }
        }

        if(parameters["cancel"] != null || parameters["cancel"] != undefined){
            if(parameters["cancel"] as boolean == true){
                cancel = true;
            }
            else{
                cancel = false;
            }
        }

        //TODO class C8oFullSyncDatabase: function startReplication =>  think about adding CBLReplication...

        //DOING class C8oFullSyncDatabase: implementing C8oFullSyncDatabase.startReplication
        let progress = new C8oProgress();
        var _progress : Array<C8oProgress> = new Array<C8oProgress>();
        /*progress.raw = rep;
         progress.pull = rep.p*/


        //DONE class C8oFullSyncDatabase: Searching to maps listeners....
        this.database
            .changes({
                since:'now'
            })
            .on('change', function (change) {
                //TODO class C8oFullSyncDatabase: function startReplication =>  test to handle change properties
                console.log('change');
            })
            .on('complete', function (info) {
                console.log('complete');
            }).on('error', function (err) {
                console.log('err');
        });

        //


        //DOING class C8oFullSyncDatabase: function startReplication =>  implement start & concat getReplication function
        let remoteDB: any;
        for (var cookie in this.c8o.cookies){
            let name = cookie['name'];
            let value = cookie['value'];
            let path = cookie['path'];
            let expirationDate = cookie['expirationDate'];
            let secure = cookie['secure'];
            remoteDB = new PouchDB(this.c8oFullSyncDatabaseUrl, {headers: {'name' : name, 'value' : value, 'path' : path, 'expirationDate' : expirationDate, 'secure' : secure}});
        }
        fullSyncReplication.pull ? this.database.replicate.from(remoteDB) :  this.database.replicate.to(remoteDB);

    }

    //TODO class C8oFullSyncDatabase: function replicationProgress
    replicationProgress(){
    }

    public get getdatabseName(): string {
        return this.databaseName;
    }

    public get getdatabase() : any{
        return this.database;
    }

    /*public destroyReplications(){
        if(this.pullFullSyncReplication.)
    }*/
}

//DOING class FullSyncReplication
export class FullSyncReplication{
     pull : boolean
     replication : any
//FIXME class FullSyncReplication => can't hold CBLreplication in pouchdb
    constructor(pull: boolean){
         this.pull = pull;
    }
}

//DONE class implement class C8oResponseListener
export interface C8oResponseListener{
}

//DONE class C8oProgress
export class C8oProgress{
    private  _changed: boolean = false;
    private  _continuous: boolean = false;
    private  _finished: boolean = false;
    private  _pull: boolean = true;
    private  _current: number = -1;
    private  _total: number = -1;
    private  _status: string = "";
    private  _taskInfo: string = "";
    private  _raw: any;

    //Constructor overload in typescript...
    constructor();
    constructor(progress: C8oProgress);
    constructor(progress?: any){
        if(progress instanceof C8oProgress){
            this._changed = false;
            this._continuous = progress._continuous
            this._finished = progress._finished
            this._pull = progress._pull
            this._current = progress._current
            this._total = progress._total
            this._status = progress._status
            this._taskInfo = progress._taskInfo
            this._raw = progress._raw
        }
        else{
            if(progress === undefined){
                this._raw == null;
            }
            else{
                throw new Error(`Expected C8oProgress or empty constructor, got '${progress}'.`);
            }

        }

    }
    public get changed(): boolean {
        return this._changed;
    }

    public set changed(value: boolean) {
        this._changed = value;
    }

    public get continuous(): boolean {
        return this._continuous;
    }

    public set continuous(value: boolean) {
        this._continuous = value;
        this._changed = true
    }

    public get finished(): boolean {
        return this._finished;
    }

    public set finished(value: boolean) {
        this._finished = value;
        this._changed = true
    }

    public get pull(): boolean {
        return this._pull;
    }

    public set pull(value: boolean) {
        this._pull = value;
        this._changed = true
    }

    public get push(): boolean {
        return !this._pull;
    }

    public get current(): number {
        return this._current;
    }

    public set current(value: number) {
        this._current = value;
        this._changed = true
    }

    public get total(): number {
        return this._total;
    }

    public set total(value: number) {
        this._total = value;
        this._changed = true
    }

    public get direction(): string {
        return this._pull ? C8oFullSyncTranslator.FULL_SYNC_RESPONSE_VALUE_DIRECTION_PULL : C8oFullSyncTranslator.FULL_SYNC_RESPONSE_VALUE_DIRECTION_PUSH;
    }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._changed = true;
        this._status = value;
    }

    public get taskInfo(): string {
        return this._taskInfo;
    }

    public set taskInfo(value: string) {
        this._changed = true;
        this._taskInfo = value;
    }

    public get raw(): any {
        return this._raw;
    }

    public set raw(value: any) {
        this._changed = true;
        this._raw = value;
    }

    public toString() :string{
        return this.direction + ": " + this.current + "/" +this.total + " (" + (this.finished ?(this.continuous ? "live" : "done") : "running") +")";
    }
}

//DOING class C8oFullSyncTranslator
export class C8oFullSyncTranslator{
    static  FULL_SYNC_RESPONSE_KEY_COUNT: string = "count";
    static  FULL_SYNC_RESPONSE_KEY_ROWS: string = "rows";
    static  FULL_SYNC_RESPONSE_KEY_CURRENT: string = "current";
    static  FULL_SYNC_RESPONSE_KEY_DIRECTION: string = "direction";
    static  FULL_SYNC_RESPONSE_KEY_TOTAL: string = "total";
    static  FULL_SYNC_RESPONSE_KEY_OK: string = "ok";
    static  FULL_SYNC_RESPONSE_KEY_STATUS: string = "status";

    static  FULL_SYNC_RESPONSE_VALUE_DIRECTION_PUSH: string = "push";
    static  FULL_SYNC_RESPONSE_VALUE_DIRECTION_PULL: string = "pull";

    static  XML_KEY_DOCUMENT: string = "document";
    static  XML_KEY_COUCHDB_OUTPUT: string = "couchdb_output";
}

//DONE class FullSyncResponse
export class FullSyncResponse{
    private static fullSyncResponsesInstance: FullSyncResponse = new FullSyncResponse();

    static RESPONSE_KEY_OK: string = "ok";

    static RESPONSE_KEY_DOCUMENT_ID: string = "id";

    static RESPONSE_KEY_DOCUMENT_REVISION: string = "rev";
}

//DONE class FullSyncAbstractResponse
export class FullSyncAbstractResponse{
    private operationStatus: boolean;
    constructor(operationStatus: boolean){
        this.operationStatus = operationStatus;
    }

    getProperties() :any{
        var properties : Dictionary = new Dictionary();
        properties[FullSyncResponse.RESPONSE_KEY_OK] = this.operationStatus;
        return properties;
    }
}

//DONE class FullSyncDefaultResponse
export class FullSyncDefaultResponse extends FullSyncAbstractResponse{
    constructor(operationStatus: boolean){
        super(operationStatus);
    }
}

//DONE class FullSyncDocumentOperationResponse
export class FullSyncDocumentOperationResponse extends FullSyncAbstractResponse{
    documentId : string
    documentRevision : string

    constructor(documentId: string, documentRevision: string, operationStatus: boolean){
        super(operationStatus);
        this.documentId = documentId;
        this.documentRevision = documentRevision;
    }

    getProperties() : Dictionary{
        var properties : Dictionary = super.getProperties()
        properties[FullSyncResponse.RESPONSE_KEY_DOCUMENT_ID] = this.documentId
        properties[FullSyncResponse.RESPONSE_KEY_DOCUMENT_REVISION] = this.documentRevision
        return properties;
    }

}

//DONE class C8oExceptionMessage
export class C8oExceptionMessage {

    static notImplementedFullSyncInterface(): string {
        return "You are using the default FullSyncInterface which is not implemented"
    }

    static invalidParameterValue(parameterName: string, details: string = null): string {
        var errorMessage: string = "The parameter '" + parameterName + "' is invalid"
        if (details != null) {
            errorMessage += ", " + details
        }
        return errorMessage
    }

    static  missingValue(valueName: string) : string {
        return "The " + valueName + " is missing"
    }

    static  unknownValue(valueName: string, value: string) : string {
        return "The " + valueName + " value " + value + " is unknown"
    }

    static  unknownType(variableName: string, variable: Object) : string {
        return "The " + variableName + " type " + C8outils.getObjectClassName(variable) + "is unknown"
    }

     static  ressourceNotFound(ressourceName: string) : string {
        return "The " + ressourceName + " was not found"
    }

     static  toDo() : string {
        return "TODO"
    }

    /** TAG Illegal argument */

     static  illegalArgumentInvalidFullSyncDatabaseUrl(fullSyncDatabaseUrlStr: string) : string {
        return "The fullSync database url '" + fullSyncDatabaseUrlStr + "' is not a valid url"
    }

     static  FullSyncDatabaseInitFailed(databaseName: string) : string {
        return "Failed to initialize the FullSync database '" + databaseName + "'"
    }

     static  MissParameter(parameterName: string) : string {
        return "The parameter '" + parameterName + "' is missing"
    }

    private static  illegalArgumentInvalidParameterValue(parameterName: string, parameterValue: string) : string {
        return "'" + parameterValue + "' is not a valid value for the parameter '" + parameterName + "'"
    }

    static illegalArgumentInvalidURL(urlStr: string): string {
        return "'" + urlStr + "' is not a valid URL";
    }

     static  InvalidArgumentInvalidURL(urlStr: string) : string {
        return "'" + urlStr + "' is not a valid URL"
    }

     static  UnknownFullSyncPolicy(policy: any) : string {
        // return "Unknown the FullSync policy '" + policy + "'"
        return ""
    }

     static InvalidArgumentInvalidEndpoint(endpoint: string) : string {
        return "'" + endpoint + "' is not a valid Convertigo endpoint"
    }

     static  InvalidRequestable(requestable: string) : string {
        return "'" + requestable + "' is not a valid requestable."
    }

     static  InvalidParameterType(parameterName: string, wantedParameterType: string, actualParameterType: string) : string {
        return "The parameter '" + parameterName + "' must be of type '" + wantedParameterType + "' and not '" + actualParameterType + "'"
    }

     static  illegalArgumentIncompatibleListener(listenerType: string, responseType: string) : string {
        return "The listener type '" + listenerType + "' is incompatible with the response type '" + responseType + "'"
    }

     static  InvalidArgumentNullParameter(parameterName: string) : string {
        return parameterName + " must be not null"
    }

    /** TAG Initialization */
     static  InitError() : string {
        return "Unable to initialize "
    }

     static  InitRsainternalKey() : string {
        return "Unable to initialize the RSA internal key"
    }

     static  InitCouchManager() : string {
        return "Unable to initialize the fullSync databases manager"
    }

     static  InitSslSocketFactory() : string {
        return "Unable to initialize the ssl socket factory"
    }

     static  InitDocumentBuilder() : string {
        return "Unable to initialize the XML document builder"
    }

    /** TAG Parse */

     static  ParseStreamToJson() : string {
        return "Unable to parse the input stream to a json document"
    }

     static  ParseStreamToXml() : string {
        return "Unable to parse the input stream to an xml document"
    }

     static  parseInputStreamToString() : string {
        return "Unable to parse the input stream to a string"
    }

     static  parseXmlToString() : string {
        return "Unable to parse the xml document to a string"
    }

     static  parseRsainternalKey() : string {
        return "Unable to parse the RSA internal key"
    }

     static  parseQueryEnumeratorToJson() : string {
        return "Unable to parse the query to a json document"
    }

     static  parseLogsToJson() : string {
        return "Unable to parse logs to a json document"
    }

     static  parseLogsStreamToJson() : string {
        return "Unable to parse stream containing logs response to a json document"
    }

     static  parseC8oReplicationResultToJson() : string {
        return "Unable to parse the replication result to a json document"
    }

     static  parseFullSyncDefaultResponseToJson() : string {
        return "Unable to parse the default fullSync result to a json document"
    }

     static  parseFullSyncPostDocumentResponseToJson() : string {
        return "Unable to parse the post document fullSync result to a json document"
    }

     static  parseStringToJson() : string {
        return "Unable to parse the string to a JSON document"
    }

     static  ParseStringToObject(type: any/*type*/) : string {
        return "Unable to parse the string (JSON):string to an object of type " // + type
    }

     static  StringToJsonValue(str: string) : string {
        return "Unable to translate the string '" + str + "' to a JSON value"
    }

    /** TAG HTTP */

     static  retrieveRsainternalKey() : string {
        return "Error during http request to get the RSA internal key"
    }

     static  httpLogs() : string {
        return "Error during http request to send logs to the Convertigo server"
    }

    /** TAG Couch */

     static  couchRequestGetView() : string {
        return "Unable to run the view query"
    }

     static  couchRequestAllDocuments() : string {
        return "Unable to run the all query"
    }

     static  couchRequestResetDatabase() : string {
        return "Unable to run the reset query"
    }

     static  couchRequestDeleteDocument() : string {
        return "Unable to run the delete document query"
    }

     static  couchRequestInvalidRevision() : string {
        return "The revision is invalid"
    }

     static  couchRequestPostDocument() : string {
        return "Unable to run the post document query"
    }

     static  unableToGetFullSyncDatabase(databaseName: string) : string {
        return "Unable to get the fullSync database '" + databaseName + "' from the manager"
    }

     static  couchNullResult() : string {
        return "An error occured during the fullSync request, its result is null"
    }

     static  couchFullSyncNotActive() : string {
        return "Unable to use fullSync because it was not activated at the initialization"
    }

     static  CouchDeleteFailed() : string {
        return "Delete the Couch document failed"
    }

     static  fullSyncPutProperties(properties: Dictionary) : string {
        return "Unable to put the following properties in the fullSync Document : " + properties
    }

     static  fullSyncGetOrCreateDatabase(databaseName: string) : string {
        return "Unable to get or create the fullSync database '" + databaseName + "'"
    }

     static  fullSyncHandleResponse() : string {
        return "Error while handling the fullSync response"
    }

    /** TAG Certificate */

     static  loadKeyStore() : string {
        return "Failed to load key store"
    }

     static  trustAllCertificates() : string {
        return "Unable to load a key store trusting all certificates"
    }

     static  clientKeyStore() : string {
        return "Unable to load the client key store"
    }

     static  serverKeyStore() : string {
        return "Unable to load the server key store"
    }

    /** TAG Not found */

     static  illegalArgumentNotFoundFullSyncView(viewName: string, databaseName: string) : string {
        return "Cannot found the view '" + viewName + "' in database '" + databaseName + "'"
    }

    /** TAG Other */

     static  unhandledResponseType(responseType: string) : string {
        return "The response type '" + responseType + "' is not handled"
    }

     static  unhandledListenerType(listenerType: string) : string {
        return "The listener type '" + listenerType + "' is not handled"
    }

     static  WrongListener(c8oListener: C8oResponseListener) : string {
        return "" // "The C8oListener class " + C8oUtils.GetObjectClassName(c8oListener) + " is not handled"
    }

     static  wrongResult(result: any) : string {
        return "The response class " + C8outils.getObjectClassName(result) + " is not handled"
    }

     static  todo() : string {
        return "todo"
    }

     static  unhandledFullSyncRequestable(fullSyncRequestableValue: string) : string {
        return "The fullSync requestable '" + fullSyncRequestableValue + "' is not handled"
    }

     static  closeInputStream() : string {
        return "Unable to close the input stream"
    }

     static  deserializeJsonObjectFromString(str: string) : string {
        return "Unable to deserialize the JSON object from the following string : '" + str + "'"
    }

     static  postDocument() : string {
        return "Unable to post document"
    }

     static  getNameValuePairObjectValue(name: string) : string {
        return "Unable to get the object value from the NameValuePair named '" + name + "'"
    }

     static  queryEnumeratorToJSON() : string {
        return "Unable to parse the QueryEnumerato to a JSON document"
    }

     static  queryEnumeratorToXML() : string {
        return "Unable to parse the QueryEnumerato to a XML document"
    }

     static  addparametersToQuery() : string {
        return "Unable to add parameters to the fullSync query"
    }

     static  putJson() : string {
        return "Failed to put data in JSON ..."
    }

     static  changeEventToJson() : string {
        return "Failed to parse ChangeEvent to JSON document"
    }

     static  initC8oSslSocketFactory() : string {
        return "Failed to initialize C8oSslSocketFactory"
    }

     static  createSslContext() : string {
        return "failed to create a new SSL context"
    }

     static  keyManagerFactoryInstance() : string {
        return "Failed to instanciate KeyManagerFactory"
    }

     static  initKeyManagerFactory() : string {
        return "Failed to initialize the key manager factory"
    }

     static  InitHttpInterface() : string {
        return "Failed to initialize the secure HTTP Interface"
    }

     static  trustManagerFactoryInstance() : string {
        return "Failed to instanciate KeyManagerFactory"
    }

     static  initTrustManagerFactory() : string {
        return "Failed to initialize the key manager factory"
    }

     static  initSslContext() : string {
        return "Failed to initialize the SSL context"
    }

     static  initCipher() : string {
        return "Failed to initialize the cipher"
    }

     static  urlEncode() : string {
        return "Failed to URL encode prameters"
    }

     static  getParametersStringBytes() : string {
        return "Failed to get parameters string bytes"
    }

     static  encodeParameters() : string {
        return "Failed to encode parameters"
    }

     static  RunHttpRequest() : string {
        return "Failed to run the HTTP request"
    }

     static  generateRsainternalKey() : string {
        return "Failed to generate RSA internal key"
    }

     static  keyFactoryInstance() : string {
        return "Failed to get KeyFactory instance"
    }

     static  getCipherInstance() : string {
        return "Failed to get Cipher instance"
    }

     static  entryNotFound(entryKey: string) : string {
        return "Entry key '" + entryKey + "' not found"
    }

     static  c8oCallRequestToJson() : string {
        return "Failed to parse c8o call request to JSON"
    }

     static  getJsonKey(key: string) : string {
        return "Failed to get the JSON key '" + key + "'"
    }

     static  jsonValueToXML() : string {
        return "Failed to parse JSON value to XML"
    }

     static  inputStreamToXML() : string {
        return "Failed to parse InputStream to an XML document"
    }

     static  inputStreamReaderEncoding() : string {
        return "Failed to instanciate the InputStreamReader"
    }

     static  readLineFromBufferReader() : string {
        return "Failed to read line from the BufferReader"
    }

     static  GetLocalCacheParameters() : string {
        return "Failed to get local cache parameters"
    }

     static  GetLocalCachePolicy(policy: string) : string {
        return "Failed to get local cache policy: " + policy
    }

     static  fullSyncJsonToXML() : string {
        return "Failed to translate full sync JSON to XML"
    }

     static  takeLog() : string {
        return "Failed to take a log line in the list"
    }

     static  remoteLogHttpRequest() : string {
        return "Failed while running the HTTP request sending logs to the Convertigo server"
    }

     static  getInputStreamFromHttpResponse() : string {
        return "Failed to get InputStream from the HTTP response"
    }

     static  inputStreamToJSON() : string {
        return "Failed to translate the input stream to a JSON document"
    }

     static  httpInterfaceInstance() : string {
        return "Failed to instanciate the HTTP interface"
    }

     static  FullSyncInterfaceInstance() : string {
        return "Failed to instanciate the FullSync interface"
    }

     static  getDocumentFromDatabase(documentId: string) : string {
        return "Failed to get fullSync document '" + documentId + "' from the database"
    }

     static  FullSyncReplicationFail(databaseName: string, way: string) : string {
        return "Failed to '" + way + "' replicate the '" + databaseName + "' database"
    }

     static  localCachePolicyIsDisable() : string {
        return "Depending to the network state the local cache is disabled"
    }

     static  localCacheDocumentJustCreated() : string {
        return "The local cache document is just created (empty):string"
    }

     static  illegalArgumentInvalidLocalCachePolicy(localCachePolicyString: string) : string {
        return "The local cache policy '" + localCachePolicyString + "' is invalid"
    }

     static  timeToLiveExpired() : string {
        return "The time to live expired"
    }

     static  InvalidLocalCacheResponseInformation() : string {
        return "Local cache response informations are invalid"
    }

     static  overrideDocument() : string {
        return "Failed to override the fullSync document"
    }

     static  handleFullSyncRequest() : string {
        return "Failed while running the fullSync request"
    }

     static  serializeC8oCallRequest() : string {
        return "Failes to serialize the Convertigo call request"
    }

     static  getResponseFromLocalCache() : string {
        return "Failed to get response from the local cache"
    }

     static  getResponseFromLocalCacheDocument() : string {
        return "Failed to get response form the local cache document"
    }

     static  handleC8oCallRequest() : string {
        return "Failed while running the c8o call request"
    }

     static  saveResponseToLocalCache() : string {
        return "Failed to save the response to the local cache"
    }

     static  RemoteLogFail() : string {
        return "Failed to send log to the Convertigo server: disabling remote logging"
    }

     static  FullSyncRequestFail() : string {
        return "Failed to process the fullsync request"
    }

     static  MissingLocalCacheResponseDocument() :string {
        return "Missing local cache response document"
    }
}

//DONE class C8oException
export class C8oException extends Error{

    private static handleGetDocumentRequest : string = '6749024586350969208L';

    constructor(message:string);
    constructor(message:string, cause:Error);
    constructor(message:string, cause:Error = null){
        if(cause == null){
            super(message);
        }
        else{
            super(C8oException.filterMessage(message, cause));
            //this.protype
            //LATER C8oException->constructor implement filter cause maybe with Error.prototype
        }
    }

    private static filterMessage(message: string, cause: Error): string{
        if(typeof cause == 'C8oException'){
            message = cause.message + " | " + message;
        }
        return message;
    }

    private static filterCause(cause: Error): Error{
        if(typeof cause == 'C8oException'){
            return null;
        }
        return cause;
    }
}

//DONE class C8oCouchBaseLiteException
export class C8oCouchBaseLiteException extends C8oException{
    private static serialVersionUID : string = '-565811361589019533L';
    //public cause : C8oCouchBaseLiteException = super

    constructor(message: string, cause: C8oCouchBaseLiteException){
        super(message, cause);
    }

    //LATER C8oCouchBaseLiteException->getCause()
}

//DONE class C8oHttpRequestException
export class C8oHttpRequestException extends Error{
    private static serialVersionUID : string = '-2154357228873794455L';

    //LATER C8oHttpRequestException->constructor cause
    constructor(message: string, cause: Error){
        super(message);
    }
}

//DONE class C8oRessourceNotFoundException
export class C8oRessourceNotFoundException extends C8oException {
    private static serialVersionUID : string = '-565811502989019533L';
    constructor(message: string);
    constructor(message: string, cause:Error);
    constructor(message: string, cause:Error=null){
        if(cause == null){
            super(message);
        }
        else{
            //LATER C8oRessourceNotFoundException->constructor cause
            super(message);
        }
    }
}

//DONE class C8oUnavailableLocalCacheException
export class C8oUnavailableLocalCacheException extends Error{
    private static serialVersionUID : string = '5428876605265700709L';

    constructor(detailMessage: string);
    constructor(detailMessage: string, throwable:Error);
    constructor(detailMessage: string, throwable : Error=null){
        //LATER C8oUnavailableLocalCacheException->constructor throwable
        super(detailMessage);
    }
}

//DONE class C8oLogger
@Injectable()
export class C8oLogger {

    // *** Constants ***//
    private static LOG_TAG: string = "c8o";
    private static LOG_INTERNAL_PREFIX: string = "[c8o] ";

    static REMOTE_LOG_LIMIT: number = 100;

    private static JSON_KEY_REMOTE_LOG_LEVEL: string = "remoteLogLevel";
    private static JSON_KEY_TIME: string = "time";
    private static JSON_KEY_LEVEL: string = "level";
    private static JSON_KEY_MESSAGE: string = "msg";
    private static JSON_KEY_LOGS: string = "logs";
    private static JSON_KEY_ENV: string = "env";

    /** Attributes */

    private remoteLogUrl: string;
    private remoteLogs: Queue<JSON>;
    private alreadyRemoteLogging: boolean[];
    private remoteLogLevel: C8oLogLevel;
    private uidRemoteLogs: string;
    private startTimeRemoteLog: Date;

    private c8o: C8o

    private env: string
    private http: Http;
    constructor(c8o: C8o) {
        this.c8o = c8o;

        this.remoteLogUrl = c8o.endpointConvertigo + "/admin/services/logs.Add"
        this.remoteLogs = new Queue<JSON>();
        this.alreadyRemoteLogging = new Array<boolean>();
        this.alreadyRemoteLogging.push(false);

        this.remoteLogLevel = C8oLogLevel.TRACE;
        let currentTime = Date();
        this.startTimeRemoteLog = new Date();
        this.uidRemoteLogs =  Math.round((new Date().getTime() * Math.random())).toString(36);
        var obj = {};
        obj["uid"] = this.uidRemoteLogs.toUpperCase();
        obj["uuid"] = C8o.deviceUUID.toUpperCase();
        obj["project"] = encodeURIComponent(c8o.endpointProject.toString());
        this.env = JSON.stringify(obj);
    }

    private isLoggableRemote(logLevel: C8oLogLevel): boolean {
        return this.c8o.logRemote && logLevel != null && C8oLogLevel.TRACE.priority <= this.remoteLogLevel.priority && this.remoteLogLevel.priority <= logLevel.priority;
    }

    private isLoggableConsole(logLevel: C8oLogLevel): boolean {
        return logLevel != null && C8oLogLevel.TRACE.priority <= this.c8o.logLevelLocal.priority && this.c8o.logLevelLocal.priority <= logLevel.priority;
    }

    public canLog(logLevel: C8oLogLevel): boolean {
        return this.isLoggableConsole(logLevel) || this.isLoggableRemote(logLevel);
    }

    public get isFatal(): boolean {
        return this.canLog(C8oLogLevel.FATAL);
    }
    public get isError(): boolean {
        return this.canLog(C8oLogLevel.ERROR);
    }
    public get isWarn(): boolean {
        return this.canLog(C8oLogLevel.WARN);
    }
    public get isInfo(): boolean {
        return this.canLog(C8oLogLevel.INFO);
    }
    public get isDebug(): boolean {
        return this.canLog(C8oLogLevel.DEBUG);
    }
    public get isTrace(): boolean {
        return this.canLog(C8oLogLevel.TRACE);
    }

    private log(logLevel: C8oLogLevel, message: string, exception: Error) {
        let isLogConsole: boolean = this.isLoggableConsole(logLevel);
        let isLogRemote: boolean = this.isLoggableRemote(logLevel);

        if (isLogConsole || isLogRemote) {
            if (exception != null) {
                message += "\n" + exception.toString();
            }

            let time: string = ((new Date().getTime()) - (this.startTimeRemoteLog.getTime())).toString();
            if (isLogRemote) {
                var obj = {};
                obj[(C8oLogger.JSON_KEY_TIME.valueOf())] =  time;
                obj[(C8oLogger.JSON_KEY_LEVEL.valueOf())] =  logLevel.name;
                obj[(C8oLogger.JSON_KEY_MESSAGE.valueOf())] =  encodeURIComponent(message.toString());
                let objJson: JSON = <JSON>obj;
                this.remoteLogs.push(objJson);
                this.logRemote();

            }
            if (isLogConsole) {
                console.log("(" + time + ") [" + logLevel.name + "] " + message);
            }
        }
    }

    public fatal(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.FATAL, message, exceptions);
    }

    public error(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.ERROR, message, exceptions);
    }

    public warn(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.WARN, message, exceptions);
    }

    public info(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.INFO, message, exceptions);
    }

    public debug(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.DEBUG, message, exceptions);
    }

    public trace(message: string, exceptions: Error = null) {
        this.log(C8oLogLevel.TRACE, message, exceptions);
    }

    private _log(logLevel: C8oLogLevel, messages: string, exceptions: Error = null) {
        if (this.c8o.logC8o) {
            this.log(logLevel, C8oLogger.LOG_INTERNAL_PREFIX.toString() + messages.toString(), exceptions);
        }
    }

    private _fatal(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.FATAL, message, exceptions);
    }

    private _error(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.ERROR, message, exceptions);
    }

    private _warn(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.WARN, message, exceptions);
    }

    private _info(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.INFO, message, exceptions);
    }

    private _debug(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.DEBUG, message, exceptions);
    }

    private _trace(message: string, exceptions: Error = null) {
        this._log(C8oLogLevel.TRACE, message, exceptions);
    }

    logRemote() {

        var canLog: boolean = false;
        canLog =  this.remoteLogs.count() > 0; //!this.alreadyRemoteLogging[0] &&
        if (canLog) {
            this.alreadyRemoteLogging[0] = true;
        }

        if (canLog) {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            //"/admin/services/logs.Add";
            var url = this.c8o.endpoint.toString() + "/admin/services/logs.Add";
            var count: number = 0;
            let listSize: number = <number>this.remoteLogs.count();
            var logsArray = new Array<JSON>();
            while (count < listSize && count < C8oLogger.REMOTE_LOG_LIMIT) {
                logsArray.push(this.remoteLogs.pop());
                count += 1;
            }
            let headers = new Headers({
                "x-convertigo-sdk": C8o.getSdkVersion(),
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
                //"User-Agent": "Convertigo Client SDK " + C8o.getSdkVersion()
            });

            let body = C8oLogger.JSON_KEY_LOGS.valueOf() +'=['+ JSON.stringify(logsArray[0]) + ']&'+ C8o.ENGINE_PARAMETER_DEVICE_UUID.valueOf() +'="' + this.c8o.deviceUUID +'"&'+ C8oLogger.JSON_KEY_ENV.valueOf() +'='+ this.env;
            let options = new RequestOptions({ headers: headers });
            var jsonResponse: JSON;
            new Promise(resolve => {
                this.c8o.httpPublic.post(this.remoteLogUrl.toString(), body.toString(), options)

                    .map(res => res.json())
                    .subscribe(data => {
                        // we've got back the raw data, now generate the core schedule data
                        // and save the data for later reference
                        jsonResponse = data;
                        resolve();
                    });
            }).then(() => {
                var logLevelResponse = jsonResponse[C8oLogger.JSON_KEY_REMOTE_LOG_LEVEL.toString()];
                if (logLevelResponse != null) {
                    let logLevelResponseStr: string = logLevelResponse.toString();
                    let c8oLogLevel = C8oLogLevel.getC8oLogLevel(logLevelResponseStr);

                    if (c8oLogLevel != null) {
                        this.remoteLogLevel = c8oLogLevel;
                    }

                    this.alreadyRemoteLogging[0] = false;
                    this.logRemote();
                }
            });

        }
    }


    logMethodCall(methodName: string, parameters: any = null) {
        if (this.c8o.logC8o && this.isDebug) {
            var methodCallLogMessage: string = "Method call : " + methodName
            if(parameters == null){
                this._debug(methodCallLogMessage);
            }
            else{
                if (this.isTrace && parameters.length > 0) {
                    methodCallLogMessage += "\n" + String(parameters)
                    this._trace(methodCallLogMessage);

                } else {
                    this._debug(methodCallLogMessage);
                }
            }

        }
    }

    logC8oCall(url: string, parameters: any) {
        if (this.c8o.logC8o && this.isDebug) {
            var c8oCallLogMessage: string = "C8o call : " + url;

            if (parameters.length > 0) {
                c8oCallLogMessage += "\n" + String(parameters);
            }

            this._debug(c8oCallLogMessage);
        }
    }


    logC8oCallJSONResponse(response: JSON, url: string, parameters: any) {
        this.logC8oCallResponse(JSON.stringify(response), "JSON", url, parameters);
    }

    logC8oCallResponse(responseStr: string, responseType: string, url: string, parameters: any) {
        if (this.c8o.logC8o && this.isTrace) {
            var c8oCallResponseLogMessage: string;
            if (url == null) {
                c8oCallResponseLogMessage = "C8o call " + responseType + " response : ";
            } else {
                c8oCallResponseLogMessage = "C8o call " + responseType + " response : " + url;
            }

            if (parameters.count > 0) {
                c8oCallResponseLogMessage += "\n" + parameters.toString();
            }

            c8oCallResponseLogMessage += "\n" + responseStr;

            this._trace(c8oCallResponseLogMessage);
        }
    }
}

//DONE class C8oLogLevel
export class C8oLogLevel {
    private static JSON_KEY_REMOTE_LOG_LEVEL: string = "remoteLogLevel";

    public static NULL: C8oLogLevel = new C8oLogLevel("", 0);
    public static NONE: C8oLogLevel = new C8oLogLevel("none", 1);
    public static TRACE: C8oLogLevel = new C8oLogLevel("trace", 2);
    public static DEBUG: C8oLogLevel = new C8oLogLevel("debug", 3);
    public static INFO: C8oLogLevel = new C8oLogLevel("info", 4);
    public static WARN: C8oLogLevel = new C8oLogLevel("warn", 5);
    public static ERROR: C8oLogLevel = new C8oLogLevel("error", 6);
    public static FATAL: C8oLogLevel = new C8oLogLevel("fatal", 7);

    static C8O_LOG_LEVELS = [C8oLogLevel.NULL, C8oLogLevel.NONE, C8oLogLevel.TRACE, C8oLogLevel.DEBUG, C8oLogLevel.INFO, C8oLogLevel.WARN, C8oLogLevel.ERROR, C8oLogLevel.FATAL];

    public name: string;
    public priority: number;

    constructor(name: string, priority: number) {
        this.name = name;
        this.priority = priority;
    }

    static getC8oLogLevel(name: string): C8oLogLevel {
        for (var i = 0; i <= C8oLogLevel.C8O_LOG_LEVELS.length; i++) {
            if (C8oLogLevel.C8O_LOG_LEVELS[i].name == name) {
                return C8oLogLevel.C8O_LOG_LEVELS[i];
            }
        }
    }
}



//DONE class Queue
class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }
    pop(): T {
        return this._store.shift();
    }
    count(): number {
        return this._store.length;
    }
}

//DONE interface IDictionary
interface IDictionary {
    add(key: string, value: any): void;
    remove(key: string): void;
    containsKey(key: string): boolean;
    keys(): string[];
    values(): any[];
}

//DONE class Dictionary
export class Dictionary {

    _keys: string[] = new Array<string>();
    _values: any[] = new Array<any>();

    /*constructor(init: { key: string; value: any; }[]) {
        for (var x = 0; x < init.length; x++) {
            this[init[x].key] = init[x].value;
            this._keys.push(init[x].key);
            this._values.push(init[x].value);
        }
    }*/

    constructor(){

    }

    toArray(): Object{
        let value = {}
        for(var j=0;j<this._keys.length; j++){
            value[this._keys[j]] = this._values[j];
        }
        return value;
    }
    add(key: string, value: any) {
        this[key] = value;
        this._keys.push(key);
        this._values.push(value);
    }

    remove(key: string) {
        var index = this._keys.indexOf(key, 0);
        this._keys.splice(index, 1);
        this._values.splice(index, 1);

        delete this[key];
    }

    keys(): string[] {
        return this._keys;
    }

    values(): any[] {
        return this._values;
    }

    containsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
        }

        return true;
    }

    toLookup(): IDictionary {
        return this;
    }
}
