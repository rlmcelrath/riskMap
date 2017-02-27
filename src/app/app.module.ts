import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';
import { NavigatorComponent } from './map/navigator/navigator.component';
import { MarkerComponent } from './map/marker/marker.component';
import { PageNotFoundComponent } from './core/components/not-found.component';
import { ReportComponent } from './report/report.component';

import { AuthenticationService } from './core/services/authentication.service';
import { HazardService } from './shared/services/hazard.service';
import { GeocodingService } from './shared/services/geocoding.service';
import { LayersService } from './shared/services/layers.service';
import { MapService } from './shared/services/map.service';

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        MapComponent,
        MarkerComponent,
        NavigatorComponent,
        PageNotFoundComponent,
        ReportComponent
    ],
    providers: [
        AuthenticationService,
        MapService,
        GeocodingService,
        HazardService,
        LayersService
    ]
})

export class AppModule {}