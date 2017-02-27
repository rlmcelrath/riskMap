import { LayersService } from '../shared/services/layers.service';
import { Component, ViewChild } from '@angular/core';
import { NavigatorComponent } from './navigator/navigator.component';
import { MarkerComponent } from './marker/marker.component';
import { MapService } from '../shared/services/map.service';
import { GeocodingService } from '../shared/services/geocoding.service';
import { Location } from '../core/models/location.class';
import { LngLat, Map } from 'mapbox-gl';

@Component({
    selector: 'map-component',
    template: require<any>('./map.component.html'),
    styles: [
        require<any>('./map.component.less')
    ],
    providers: []
})
export class MapComponent {
    @ViewChild(MarkerComponent) markerComponent: MarkerComponent;

    isLayerVisible: boolean;

    constructor(private mapService: MapService, private geocoder: GeocodingService, private layers: LayersService) {
        this.isLayerVisible = true;
    }

    ngOnInit() {
        let map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/satellite-v9',
            zoom: 3,
            center: [-98.6916, 37.2899] //[-121.3153, 44.0582]
        });

        map.on('load', () => {
            this.layers.getAddressesLayer().then((addressPoints: any) => {
                map.addLayer(addressPoints);
            });
        })

        this.mapService.map = map;
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }

    toggleLayer(event) {
        let clickedLayer = 'riskAssessmentPoints',
            visibility = this.mapService.map.getLayoutProperty(clickedLayer, 'visibility') || 'visible';
            
        this.mapService.map.setLayoutProperty(clickedLayer, 'visibility', (visibility==='visible') ? 'none' : 'visible');
        this.isLayerVisible = (visibility === 'none');
    }
}
