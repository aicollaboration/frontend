import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'landing-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LandingHomeComponent implements OnInit {
    /**
     * Constructor
     */
    constructor() {
    }

    ngOnInit(): void {
    }
}
