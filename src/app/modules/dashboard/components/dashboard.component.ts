import { Component } from '@angular/core';
@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss',
    ],
})
export class DashboardComponent {

   public items = [{ title: 'Slide 1' }, { title: 'Slide 2' }, { title: 'Slide 3' }];
}
