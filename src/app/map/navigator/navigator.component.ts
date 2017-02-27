import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GeocodingService } from '../../shared/services/geocoding.service';
import { MapService } from '../../shared/services/map.service';
import { Location } from '../../core/models/location.class';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
    selector: 'navigator',
    template: require<any>('./navigator.component.html'),
    styles: [
        require<any>('../../../styles/main.less'),
        require<any>('./navigator.component.less')
    ],
    providers: []
})
export class NavigatorComponent {
    @Input()
    isMarker: boolean;

    @Output('update')
    change: EventEmitter<Location> = new EventEmitter<Location>();

    private address: string;
    private latLong: any;
    private map: Map;

    constructor(private geocoder: GeocodingService,
                private mapService: MapService) {
        this.address = '';
        this.isMarker = false;
    }

    ngOnInit() {
        this.map = this.mapService.map;
    }

    goto() {
        if (!this.address) { return; }

        this.geocoder.geocode(this.address)
            .subscribe(location => {
                this.map.fitBounds(location.viewBounds, {});
                this.address = location.address.trim();
                this.latLong = [location.longitude, location.latitude];
                this.change.emit(location);
                if(this.isMarker) { 
                    this.addMarker(); 
                }
            }, error => console.error(error));
    }

    addMarker() {
        let marker = document.createElement('div');
        marker.className = 'marker';
        marker.style.backgroundImage = 'url(images/marker.png)';
        marker.style.width = '40px';
        marker.style.height = '40px';
        new Marker(marker, {offset: [-20, -20]})
            .setLngLat(this.latLong)
            .addTo(this.map);
    }

}

