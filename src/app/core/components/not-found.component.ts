import { Component } from '@angular/core';

@Component({
    selector: 'not-found',
    template: require<any>('./not-found.component.html'),
    styles: [require<any>('./not-found.component.less')]
})
export class PageNotFoundComponent {

}
