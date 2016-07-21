import { Injectable } from '@angular/core';
import {Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ConvertigoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
/********************C8oBase********************/
export class C8oBase {
    /*HTTP*/

    protected _timeout: number = -1;
    protected _trustAllCertificates: boolean = false;
    protected _cookies : {[key : string] : String} = {};


    /*Log*/

    protected _logRemote: boolean = true;
    protected _logLevelLocal: C8oLogLevel = C8oLogLevel.NONE;
    protected _logC8o: boolean = true;
    //protected logOnFail : C8oOnFail = null;

    /* FullSync */

    protected _defaultDatabaseName: String = null;
    protected _authenticationCookieValue: String = null;
    protected _fullSyncLocalSuffix: String = null;
    protected _fullSyncServerUrl: String = "http://localhost:5984";
    protected _fullSyncUsername: String;
    protected _fullSyncPassword: String;

    /* Encryption */

    protected _useEncryption: boolean = false;
    protected _disableSSL: boolean = false;
    //protected keyStoreInputStream :InputStream ;
    protected _keyStorePassword: String;
    //protected trustStoreInputStream :InputStream;
    protected _trustStorePassword: String;

    public get timeout():number
    {
        return this._timeout;
    }

    public get trustAllCertificates():boolean
    {
        return this._trustAllCertificates;
    }

    public get cookies():{[key : string] : String}
    {
        return this._cookies;
    }

    public get logRemote():boolean
    {
        return this._logRemote;
    }

    public get logLevelLocal():C8oLogLevel
    {
        return this._logLevelLocal;
    }


    public get logC8o():boolean
    {
        return this._logC8o;
    }

    /*public get logOnfail() : ??{
     return this._
     }*/

    public get defaultDatabaseName(): String
    {
        return this._defaultDatabaseName;
    }

    public get authenticationCookieValue(): String
    {
        return this._authenticationCookieValue;
    }

    public get fullSyncLocalSuffix(): String
    {
        return this._fullSyncLocalSuffix;
    }

    public get fullSyncServerUrl(): String
    {
        return this._fullSyncServerUrl;
    }

    public get fullSyncUsername(): String
    {
        return this._fullSyncUsername;
    }

    public get fullSyncPassword(): String
    {
        return this._fullSyncPassword;
    }

    protected copy(c8oBase: C8oBase) {

        /*HTTP*/

        this._timeout = c8oBase._timeout;
        this._trustAllCertificates = c8oBase._trustAllCertificates;
        /*if (this.cookies == null) {
         //cookies = [String : String]();
         }
         if (c8oBase.cookies != null) {
         cookies.putAll(c8oBase.cookies);
         }*/

        /* Log */

        this.logRemote = c8oBase.logRemote;
        this.logLevelLocal = c8oBase.logLevelLocal;
        this.logC8o = c8oBase.logC8o;
        //this.logOnFail = c8oBase.logOnFail;

        /* FullSync */

        this.defaultDatabaseName = c8oBase.defaultDatabaseName;
        this.authenticationCookieValue = c8oBase.authenticationCookieValue;
        this.fullSyncLocalSuffix = c8oBase.fullSyncLocalSuffix;
    }
}
/********************C8outils********************/
export class C8outils {

    public static isValidUrl(url: String): boolean {
        var valid = /^(http|https):\/\/[^ "]+$/.test(url.toString());
        return valid;
    }

    public static getNewGUIDString() {
        // your favourite guid generation function could go here
        // ex: http://stackoverflow.com/a/8809472/188246
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

}
/********************C8o********************/
@Injectable()
export class C8o extends C8oBase {

    private static RE_REQUESTABLE = new RegExp('^([^.]*)\\.(?:([^.]+)|(?:([^.]+)\\.([^.]+)))$');
    /*The regex used to get the part of the endpoint before '/projects/...'*/
    regex : RegExp = /^[1-9]\d{0,2}$/g;
    private static RE_ENDPOINT = /^(https?:\/\/([^:]+)(:[0-9]+)?\/?.*?)\/projects\/([^\/]+)$/gi


    /* Engine reserved parameters */
    static ENGINE_PARAMETER_PROJECT: String = "__project";
    static ENGINE_PARAMETER_SEQUENCE: String = "__sequence";
    static ENGINE_PARAMETER_CONNECTOR: String = "__connector";
    static ENGINE_PARAMETER_TRANSACTION: String = "__transaction";
    static ENGINE_PARAMETER_ENCODED: String = "__encoded";
    static ENGINE_PARAMETER_DEVICE_UUID: String = "__uuid";
    static ENGINE_PARAMETER_PROGRESS: String = "__progress";

    static FS_POLICY: String = "_use_policy";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This is the default post policy that don't alter the document before the CouchbaseLite's insertion.
     */
    static FS_POLICY_NONE: String = "none";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy remove the "_id" and "_rev" of the document before the CouchbaseLite's insertion.
     */
    static FS_POLICY_CREATE: String = "create";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy inserts the document in CouchbaseLite even if a document with the same "_id" already exists.
     */
    static FS_POLICY_OVERRIDE: String = "override";
    /**
     Use it with "fs://.post" and C8o.FS_POLICY.

     This post policy merge the document with an existing document with the same "_id" before the CouchbaseLite's insertion.
     */
    static FS_POLICY_MERGE: String = "merge";
    /**
     Use it with "fs://.post". Default value is ".".

     This key allow to override the sub key separator in case of document depth modification.
     */
    static FS_SUBKEY_SEPARATOR: String = "_use_subkey_separator";

    /* Local cache keys */

    static LOCAL_CACHE_DOCUMENT_KEY_RESPONSE: String = "response";
    static LOCAL_CACHE_DOCUMENT_KEY_RESPONSE_TYPE: String = "responseType";
    static LOCAL_CACHE_DOCUMENT_KEY_EXPIRATION_DATE: String = "expirationDate";

    static LOCAL_CACHE_DATABASE_NAME: String = "c8olocalcache";

    /* Response type */

    static RESPONSE_TYPE_XML: String = "pxml";
    static RESPONSE_TYPE_JSON: String = "json";

    /* Static configuration */
    static defaultUiDispatcher: Object;// ACTION<ACTION>?
    static deviceUUID: String = C8outils.getNewGUIDString();

    /**
     Returns the current version of the SDK as "x.y.z".
     - returns: Current version of the SDK as "x.y.z".
     */
    static getSdkVersion() : String {
        return "2.0.4";
    }

    /* Attributes */

    private _endpoint: String;
    private _endpointConvertigo: String;
    private _endpointIsSecure: boolean;
    private _endpointHost: String;
    private _endpointPort: String;
    private _endpointProject: String;

    /* Used to run HTTP requests.*/
    //internal httpInterface: C8oHttpInterface;

    /* Allows to log locally and remotely to the Convertigo server.*/
    c8oLogger: C8oLogger;

    /* Allows to make fullSync calls. */
    //c8oFullSync: C8oFullSync;

    private data: any;
    private sequencePrefix: String;

    public addCookie(name: String, value: String){

    }

    public get logC8o():boolean
    {
        return this._logC8o;
    }

    public set logC8o(value:boolean)
    {
        this._logC8o = value;
    }

    public get logRemote():boolean
    {
        return this._logRemote;
    }

    public set logRemote(value:boolean)
    {
        this._logRemote = value;
    }

    public get logLevelLocal():C8oLogLevel
    {
        return this._logLevelLocal;
    }

    public set logLevelLocal(value:C8oLogLevel)
    {
        this._logLevelLocal = value;
    }

    public get log():C8oLogger
    {
        return this.c8oLogger;
    }

    public toString():String
    {
        return "C8o[" + this._endpoint + "]";
    }

    public get endpoint():String
    {
        return this._endpoint;
    }
    public set endpoint(value:String)
    {
        this._endpoint = value;
    }

    public get endpointConvertigo():String
    {
        return this._endpointConvertigo;
    }
    public set endpointConvertigo(value:String)
    {
        this._endpointConvertigo = value;
    }

    public get endpointIsSecure():boolean{
        return this._endpointIsSecure;
    }
    public set endpointIsSecure(value:boolean)
    {
        this._endpointIsSecure = value;
    }
    //
    public get endpointHost():String{
        return this._endpointHost;
    }
    public set endpointHost(value:String)
    {
        this._endpointHost = value;
    }
    public get endpointPort():String{
        return this._endpointPort;
    }
    public set endpointPort(value:String)
    {
        this._endpointPort = value;
    }
    public get endpointProject():String{
        return this._endpointProject;
    }
    public set endpointProject(value:String)
    {
        this._endpointProject = value;
    }
    public get deviceUUID():String{
        return this.deviceUUID;
    }
    /*public get cookieStore():String{
        return this._endpointIsSecure;
    }*/

    constructor(private http: Http) {
        super();
        this.data = null;
        this.sequencePrefix = "/.json?__sequence=";
        var _thiss = this;

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
                        let remoteBase = data.remoteBase.toString();
                        let n = remoteBase.indexOf("/_private");
                        this.endpoint = remoteBase.substring(0, n);
                        resolve(this.data);
                    });
            }

        }).then( () => {
            if (!C8outils.isValidUrl(this.endpoint.toString())) {
                return new TypeError(C8oExceptionMessage.illegalArgumentInvalidURL(this.endpoint).toString());
            }
            var matches = C8o.RE_ENDPOINT.exec(this.endpoint.toString());
            this.endpointConvertigo = matches[0];
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

    public callJsonDictionary(requestable: String, callData: { [id: string]: any; }) {
        this.c8oLogger.logMethodCall("Call", callData);
        var _this2 = this;
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);

        }
        let params: URLSearchParams = new URLSearchParams();
        if (callData != undefined) {
            for (var item in callData) {
                params.set(item, callData[item].valueOf());
            }
        }
        return new Promise(resolve => {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            var get = this.endpoint.toString() + this.sequencePrefix.toString() + requestable.toString();
            this.http.get(get, {
                search: params
            })
                .map(res => res.json())
                .subscribe(data => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    public callJsonAny(requestable: String, ...parameters: any[]) {
        return this.callJsonDictionary(requestable, C8o.toParameters(parameters));
    }


    public static toParameters(parameters: any): { [id: string]: any; } {
        var newParameters: { [id: string]: any; } = {};
        if (parameters != undefined) {
            if (parameters.lenght % 2 != 0) {
                throw new Error("Invalid parameter Exception");
            }
            for (var i = 0; i < parameters.lenght; i += 2) {
                newParameters[parameters[i]] = parameters[i + 1];
            }
        }
        return newParameters;

    }
}
/********************C8oExceptionMessage********************/
export class C8oExceptionMessage {
    public static illegalArgumentInvalidURL(urlStr: String): String {
        return "'" + urlStr + "' is not a valid URL";
    }
}

/********************C8oLogger********************/

export class C8oLogger {

    // *** Constants ***//
    private static LOG_TAG : String = "c8o";
    private static LOG_INTERNAL_PREFIX: String = "[c8o] ";

    static REMOTE_LOG_LIMIT: number = 100;

    private static JSON_KEY_REMOTE_LOG_LEVEL: String = "remoteLogLevel";
    private static JSON_KEY_TIME: String = "time";
    private static JSON_KEY_LEVEL: String = "level";
    private static JSON_KEY_MESSAGE: String = "msg";
    private static JSON_KEY_LOGS: String = "logs";
    private static JSON_KEY_ENV: String = "env";
	
    /** Attributes */

    private remoteLogUrl: String;
    private remoteLogs: Queue<JSON>;
    private alreadyRemoteLogging: boolean[];
    private remoteLogLevel: C8oLogLevel;
    private uidRemoteLogs: String;
    private startTimeRemoteLog: Date;

    private c8o: C8o

    private env: String
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
        this.uidRemoteLogs = new Date().toString();
        var obj: any = {"uid" : this.uidRemoteLogs, "uuid" : C8o.deviceUUID, "project" : c8o.endpointProject};
        let envJson : JSON = <JSON>obj;
        this.env = envJson.toString();
	}

	private isLoggableRemote(logLevel : C8oLogLevel) : boolean{
	    return this.c8o.logRemote && logLevel != null && C8oLogLevel.TRACE.priority <= this.remoteLogLevel.priority && this.remoteLogLevel.priority <= logLevel.priority;
    }

    private isLoggableConsole (logLevel: C8oLogLevel) : boolean {
        return logLevel != null && C8oLogLevel.TRACE.priority <= this.c8o.logLevelLocal.priority && this.c8o.logLevelLocal.priority <= logLevel.priority;
}

    public canLog(logLevel: C8oLogLevel):boolean{
        return this.isLoggableConsole(logLevel) || this.isLoggableRemote(logLevel);
    }

    public get isFatal():boolean{
        return this.canLog(C8oLogLevel.FATAL);
    }
    public get isError():boolean{
        return this.canLog(C8oLogLevel.ERROR);
    }
    public get isWarn():boolean{
        return this.canLog(C8oLogLevel.WARN);
    }
    public get isInfo():boolean{
        return this.canLog(C8oLogLevel.INFO);
    }
    public get isDebug():boolean{
        return this.canLog(C8oLogLevel.DEBUG);
    }
    public get isTrace():boolean{
        return this.canLog(C8oLogLevel.TRACE);
    }

    private log(logLevel: C8oLogLevel, messsage: String, exception: Error) {
        var message = message;
        let isLogConsole : boolean = this.isLoggableConsole(logLevel);
        let isLogRemote : boolean = this.isLoggableRemote(logLevel);

        if (isLogConsole || isLogRemote) {
            if(exception != null)
            {
                message += "\n"+ exception.toString();
            }

            let time : String = ((new Date().getTime()) - (this.startTimeRemoteLog.getTime())).toString();

            if(isLogRemote)
            {
                var jsonKT = C8oLogger.JSON_KEY_TIME;
                var jsonKL = C8oLogger.JSON_KEY_LEVEL;
                var jsonKM = C8oLogger.JSON_KEY_MESSAGE;
                var obj: any = {jsonKT : time, jsonKL : logLevel.name, jsonKM: message};
                let objJson : JSON = <JSON>obj;
                this.remoteLogs.push(objJson);
                this.logRemote();
            }

            if(isLogConsole){
                console.log("(" + time + ") [" + logLevel.name + "] " + message);
            }
        }
    }

    public fatal(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.FATAL, message, exceptions);
    }

    public error(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.ERROR, message, exceptions);
    }

    public warn(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.WARN, message, exceptions);
    }

    public info(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.INFO, message, exceptions);
    }

    public debug(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.DEBUG, message, exceptions);
    }

    public trace(message: String, exceptions: Error = null) {
        this.log(C8oLogLevel.TRACE, message, exceptions);
    }

    private _log(logLevel: C8oLogLevel, messages: String, exceptions: Error = null) {
    if (this.c8o.logC8o) {
        this.log(logLevel, C8oLogger.LOG_INTERNAL_PREFIX.toString() + messages.toString(), exceptions);
    }
}

    private _fatal(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.FATAL, message,  exceptions);
    }

    private _error(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.ERROR,  message,  exceptions);
    }

    private _warn(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.WARN,  message,  exceptions);
    }

    private _info(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.INFO,  message,  exceptions);
    }

    private _debug(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.DEBUG,  message,  exceptions);
    }

    private _trace(message: String, exceptions: Error = null) {
        this._log(C8oLogLevel.TRACE,  message,  exceptions);
    }

    logRemote(){

        var canLog : boolean = false;
        if(canLog){
            this.alreadyRemoteLogging[0] = true;
        }

        if(canLog){

                // We're using Angular Http provider to request the data,
                // then on the response it'll map the JSON data to a parsed JS object.
                // Next we process the data and resolve the promise with the new data.
                //"/admin/services/logs.Add";
                var url = this.c8o.endpointConvertigo.toString() + "/admin/services/logs.Add";
                let params: URLSearchParams = new URLSearchParams();
                var count : number = 0;
                let listSize : number = <number>this.remoteLogs.count.valueOf();
                var logsArray = new Array<JSON>();
                while(count < listSize && count < C8oLogger.REMOTE_LOG_LIMIT){
                    logsArray.push(this.remoteLogs.pop());
                    count += 1;
                }
                var uuidS : String = "{\"uid\":\"" + this.uidRemoteLogs + "{\"uid\":\"";
                params.set(C8oLogger.JSON_KEY_LOGS.toString(), logsArray.toString());
                params.set(C8oLogger.JSON_KEY_ENV.toString(), this.env.toString());
                params.set(C8o.ENGINE_PARAMETER_DEVICE_UUID.toString(), this.c8o.deviceUUID.toString());
                var jsonKL = C8oLogger.JSON_KEY_LOGS;
                var jsonKE = C8oLogger.JSON_KEY_ENV;
                var jsonPDU = C8o.ENGINE_PARAMETER_DEVICE_UUID.toString();
                let headers = new Headers({ "x-convertigo-sdk": C8o.getSdkVersion(),
                                            "User-Agent": "Convertigo Client SDK " + C8o.getSdkVersion()});
                let body = {jsonKL : logsArray.toString(),
                            jsonKE : this.env.toString(),
                            jsonPDU : this.c8o.deviceUUID.toString()};
                let options = new RequestOptions({ headers: headers });
                var jsonResponse : JSON
            new Promise(resolve => {
                this.http.post(url, body.toString(), options)
                    .map(res => res.json())
                    .subscribe(data => {
                        // we've got back the raw data, now generate the core schedule data
                        // and save the data for later reference
                        jsonResponse = data;
                        console.log(data.toString());
                        resolve();
                    });
            }).then(function() {
                var logLevelResponse = jsonResponse[C8oLogger.JSON_KEY_REMOTE_LOG_LEVEL.toString()];
                if(logLevelResponse != null){
                    let logLevelResponseStr : String = logLevelResponse.toString();
                    let c8oLogLevel = C8oLogLevel.getC8oLogLevel(logLevelResponseStr);

                    if(c8oLogLevel != null){
                        this.remoteLogLevel = c8oLogLevel;
                    }

                    this.alreadyRemoteLogging[0] = false;
                    this.logRemote();
                }
            });

        }
    }


    logMethodCall(methodName: String, parameters: any = null){
        if (this.c8o.logC8o && this.isDebug) {
            var methodCallLogMessage: String = "Method call : " + methodName
            if (this.isTrace && parameters.length > 0) {
                methodCallLogMessage += "\n" + String(parameters)
                this._trace(methodCallLogMessage);

            } else {
                 this._debug(methodCallLogMessage);
            }
        }
    }

    logC8oCall(url: String, parameters: any){
        if (this.c8o.logC8o && this.isDebug) {
            var c8oCallLogMessage: String = "C8o call : " + url;

            if (parameters.lenght > 0) {
                c8oCallLogMessage += "\n" + String(parameters);
            }

            this._debug(c8oCallLogMessage);
        }
    }


    logC8oCallJSONResponse(response: JSON, url: String, parameters: any){
        this.logC8oCallResponse(JSON.stringify(response), "JSON", url, parameters);
    }

    logC8oCallResponse(responseStr: String, responseType: String, url: String, parameters: any)
    {
        if (this.c8o.logC8o && this.isTrace) {
            var c8oCallResponseLogMessage: String;
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

/********************C8oLogger********************/

export class C8oLogLevel{
    private static JSON_KEY_REMOTE_LOG_LEVEL: String = "remoteLogLevel";

    public static NULL: C8oLogLevel = new C8oLogLevel("", 0);
    public static NONE: C8oLogLevel = new C8oLogLevel("none", 1);
    public static TRACE: C8oLogLevel = new C8oLogLevel("trace", 2);
    public static DEBUG: C8oLogLevel = new C8oLogLevel("debug", 3);
    public static INFO: C8oLogLevel = new C8oLogLevel("info", 4);
    public static WARN: C8oLogLevel = new C8oLogLevel("warn", 5);
    public static ERROR: C8oLogLevel = new C8oLogLevel("error", 6);
    public static FATAL: C8oLogLevel = new C8oLogLevel("fatal", 7);

    static C8O_LOG_LEVELS = [C8oLogLevel.NULL, C8oLogLevel.NONE, C8oLogLevel.TRACE, C8oLogLevel.DEBUG, C8oLogLevel.INFO, C8oLogLevel.WARN, C8oLogLevel.ERROR, C8oLogLevel.FATAL];

    public name: String;
    public priority: number;

    constructor(name: String, priority: number) {
        this.name = name;
        this.priority = priority;
    }

    static getC8oLogLevel(name: String) : C8oLogLevel{
        for(var i =0; i <= C8oLogLevel.C8O_LOG_LEVELS.length; i++){
            if(C8oLogLevel.C8O_LOG_LEVELS[i].name == name){
                return C8oLogLevel.C8O_LOG_LEVELS[i];
            }
        }
    }
}

class Queue<T> {
    _store: T[] = [];
    push(val: T) {
        this._store.push(val);
    }
    pop(): T {
        return this._store.shift();
    }
    count(): number{
        return this._store.length;
    }
}
