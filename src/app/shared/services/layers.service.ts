import { Injectable } from '@angular/core';

@Injectable()
export class LayersService {

    constructor() {

    }

    getAddressesLayer(): Promise<any> {
        return Promise.resolve({
                id: "riskAssessmentPoints",
                type: "symbol",
                source: {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: [{
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [-104.994127, 39.750406]
                            },
                            properties: {
                                title: "1201 18th Street, Suite 250 Denver, CO 80202",
                                icon: "circle"
                            }
                        }, {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [-84.280632, 30.438122]
                            },
                            properties: {
                                title: "400 S Monroe St, Tallahassee, FL 32399",
                                icon: "circle"
                            }
                        }, {
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [-122.086546, 37.423471]
                            },
                            properties: {
                                title: "1600 Amphitheatre Parkway Mountain View, CA 94043",
                                icon: "circle"
                            }
                        }]
                    }
                },
                layout: {
                    "icon-image": "{icon}-15",
                    "text-field": "{title}",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-size": 12,
                    "text-transform": "uppercase",
                    "text-offset": [0, 1.0],
                    "text-anchor": "top"
                },
                paint: {
                    "text-color": "#fff"
                }
            });
    }

    getTerrainLayer(): Promise<any> {
        return Promise.resolve({
                id: 'terrain-data',
                type: 'line',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.mapbox-terrain-v2'
                },
                'source-layer': 'contour'
            });
    }

}
