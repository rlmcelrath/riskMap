import { Component } from '@angular/core';
import { MapService } from '../shared/services/map.service';
import { GeocodingService } from '../shared/services/geocoding.service';
import { HazardService } from '../shared/services/hazard.service';
import { Location } from '../core/models/location.class';
import { LngLat, Map } from 'mapbox-gl';

@Component({
    selector: 'report-component',
    template: require<any>('./report.component.html'),
    styles: [
        require<any>('./report.component.less')
    ],
    providers: []
})
export class ReportComponent {
    private title: string;
    private hazards: any;

    constructor(private mapService: MapService, 
                private geocoder: GeocodingService,
                private hazardService: HazardService) {
        this.title = 'Risk Report';
        this.hazards = {};
    }

    ngOnInit() {
        let map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 6,
            center: [-104.9903, 39.7392],
            interactive: false
        });

        this.mapService.map = map;
    }

    getHazard(location: Location) {
        this.hazardService.getHazards(location.latitude, location.longitude)
            .subscribe(hazards => {
                this.hazards = hazards;
            }, error => console.error(error));
    }

    locationChange(event) {
        this.getHazard(event);
    }
}
