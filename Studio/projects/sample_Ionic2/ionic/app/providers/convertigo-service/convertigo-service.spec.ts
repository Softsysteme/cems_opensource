/// <reference path="../../../node_modules/angular2/ts/typings/jasmine/jasmine.d.ts" />
//import {beforeEachProviders, it, describe, expect, inject, injectAsync, beforeEach} from 'angular2/testing';
import {C8o} from './convertigo-service';
/*import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response, Http} from 'angular2/http';
import {provide, Injector} from 'angular2/core';
import {MockBackend, MockConnection} from 'angular2/http/testing';
import {fakeAsync} from "@angular/core/testing/fake_async";
import {RequestMethod} from "@angular/http";*/
//import {beforeEachProviders, inject, beforeEach, it} from 'angular2/testing';
/*import {
    Http, BaseRequestOptions, Response, BaseResponseOptions, ResponseOptions, HTTP_PROVIDERS,
    RequestMethod
} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {provide} from 'angular2/core';
import {fakeAsync} from "@angular/core/testing/fake_async";


const mockHttpProvider = {
    deps: [ MockBackend, BaseRequestOptions ],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
    }
}

describe('QuoteService', () => {
    beforeEachProviders(() => {
        return [
            MockBackend,
            BaseRequestOptions,
            provide(Http, mockHttpProvider)
        ];
    });

    it('should use an HTTP call to obtain a quote',
        inject(
            [C8o, MockBackend],
            fakeAsync((service: C8o, backend: MockBackend) => {
                backend.connections.subscribe((connection: MockConnection) => {

                    expect(connection.request.method).toBe(RequestMethod.Get);
                    expect(connection.request.url).toBe(
                        'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand');
                });

                return service.callJson(".Ping").then(data => {
                    expect("hh").toEqual("hh");
                });
            })));
});*/

/*
 describe('ConvertigoSDK TEST', () => {
let mockbackend, service;

     beforeEachProviders(() => [
             C8o,
             MockBackend,
             BaseRequestOptions,
             provide(Http, {
                 useFactory : (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                     return new Http(backend, defaultOptions);
                 },
                 deps: [ MockBackend, BaseRequestOptions]
         })
 ]);

     beforeEach(inject([MockBackend], (_mockbackend) => {
         mockbackend = _mockbackend;
         /*mockbackend = _mockbackend;
         const baseResponse = new Response((new ResponseOptions()))*/
     /*}))

     it('should works',
     inject([C8o], (c8o : C8o) => {
         return c8o.callJson(".Ping").then(data => {
             expect("hh").toEqual("hh");
         });
     }))*/
     /*beforeEach(inject([C8o], c =>{
      c8o = c;
      }));*/

     /*it('should works',inject([C8o, MockBackend],
         fakeAsync((service: C8o, backend: MockBackend) =>{
             backend.connections.suscribe((connection: MockConnection) =>{
                 expect(connection.request.method).toBe(RequestMethod.Get);
                 expect(connection.request.url).toBe(
                     'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand');
                 });
             })));

*/


     /*, (mockBackend, c8o) => {
            return c8o.callJson(".Ping").then(data => {
                expect("hh").toEqual("hh");

            });
     }));*/
      /*c8o.callJson(".Ping").then(data => {
      //expect("hh").toEqual("hh");
      done();
      });
      });
      });*/


     /*it('should be true', injectAsync( [C8o], ( c8o ) => {
      return c8o.callJson(".Ping").then(data => {
      expect("ab").toBe("ab");
      });
      //expect("hhh").toBe("hhh");
      }) );*/

     /*it('should return available languages', () => {
         expect("abc").toBe("abc");

     });
 //});*/