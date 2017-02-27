import { XmlParser } from '@angular/compiler/src/ml_parser/xml_parser';
import { Http, Headers, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { parseString } from 'xml2js/lib/xml2js';

@Injectable()
export class HazardService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    getHazards(lat: number, long: number) {
        let requestUrl = `https://hireme.spatialkey.com/SpatialKeyFramework/api/v1/hazard/18226c009f954220aa254015c85cae2c/${lat}/${long}.xml`;

        return this.http
            .get(requestUrl, { withCredentials: true })
            .map((result:any) => {
                var xmlDocToJson = {};
                parseString(result._body, { explicitArray: false, ignoreAttrs: true }, function (err, xmlDoc) {
                    xmlDocToJson = xmlDoc.sk_analysis.result_values;
                })
                return xmlDocToJson;
            })
            .catch((error:any) => Observable.throw((error || error.json().error || 'Server Error')));
    }
}
