import { Component } from '@angular/core';

@Component({
    selector: 'footer-component',
    template: require<any>('./footer.component.html'),
    styles: [
        require<any>('./footer.component.less')
    ],
    providers: []
})
export class FooterComponent {
    name = 'Rebecca McElrath';
}
