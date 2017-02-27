import { Http, Headers, Response } from '@angular/http';
import { Location } from '../../core/models/location.class';
import { Injectable } from '@angular/core';
import { LngLat, LngLatBounds } from 'mapbox-gl';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx'

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    geocode(address: string) {
        let requestUrl = `https://hireme.spatialkey.com/SpatialKeyFramework/api/v3/geocode/default.json?combined=${encodeURIComponent(address)}`;
        const viewBoundsCalc = 0.0015;
        return this.http
            .get(requestUrl, { withCredentials: true })
            .map(result => {
                let body = result.json(),
                    location = new Location();
                location.address = `${body[0].properties.street}, ${body[0].properties.city} ${body[0].properties.state} ${body[0].properties.postalCode}`;
                location.latitude = body[0].geometry.coordinates[1];
                location.longitude = body[0].geometry.coordinates[0];
                location.viewBounds = new LngLatBounds(
                    new LngLat(location.longitude - viewBoundsCalc, location.latitude - viewBoundsCalc),
                    new LngLat(location.longitude + viewBoundsCalc, location.latitude + viewBoundsCalc)
                );

                return location;
            })
            .catch((error:any) => Observable.throw((error || error.json().error || 'Server Error')));
    }

    regeocode(lngLat: LngLat) {
        return this.http
          .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lngLat.lat},${lngLat.lng}`)
          .map(res => res.json())
          .map(result => {
            if (result.status !== 'OK' || result.results.length < 1) { throw new Error('unable to geocode lat/lng'); }

            let location = new Location();
            location.address = result.results[0].formatted_address;
            location.latitude = lngLat.lat;
            location.longitude = lngLat.lng;

            return location;
          });
    }
}
