import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './core/components/not-found.component';
import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [
    { path: 'report', component: ReportComponent },
    { path: 'map', component: MapComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}