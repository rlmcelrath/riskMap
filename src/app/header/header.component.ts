import { Component } from '@angular/core';

@Component({
    selector: 'header-component',
    template: require<any>('./header.component.html'),
    styles: [
        require<any>('./header.component.less')
    ],
    providers: []
})
export class HeaderComponent {
    title = 'Header';

    constructor() {

    }
}

