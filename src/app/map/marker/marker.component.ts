import { Component } from '@angular/core';
import { GeocodingService } from '../../shared/services/geocoding.service';
import { MapService } from '../../shared/services/map.service';
import { Location } from '../../core/models/location.class';
import { MapMouseEvent, Popup } from 'mapbox-gl';

@Component({
    selector: 'marker',
    template: require<any>('./marker.component.html'),
    styles: [
        require<any>('../../../styles/main.less'),
        require<any>('./marker.component.less')
    ],
    providers: []
})
export class MarkerComponent {
    editing: boolean;

    constructor(private mapService: MapService, private geocoder: GeocodingService) {
        this.editing = false;
    }

    Initialize() {
        this.mapService.map.on('click', (e: MapMouseEvent) => {
            if (this.editing) {
                this.geocoder.regeocode(e.lngLat)
                .subscribe(location => {
                  let marker = new Popup()
                    .setHTML(`${location.address}<br />[${this.roundLatLong(location.latitude)},${this.roundLatLong(location.longitude)}]`)
                    .setLngLat(e.lngLat)
                    .addTo(this.mapService.map);
                }, error => console.error(error));
            }
        });
    }

    private roundLatLong(num): number {
        return Math.round(num * 10000) / 10000;
    }

    toggleEditing() {
        this.editing = !this.editing;
    }
}
