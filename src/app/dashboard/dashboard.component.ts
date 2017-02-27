import { Component } from '@angular/core';

@Component({
    selector: 'dashboard-component',
    template: require<any>('./dashboard.component.html'),
    styles: [
        require<any>('./dashboard.component.less')
    ],
    providers: []
})
export class DashboardComponent {
    title = 'RiskMap Dashboard';
}
