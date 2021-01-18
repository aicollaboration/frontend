import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'admin-overview',
    templateUrl: './admin-overview.component.html',
    styleUrls: ['./admin-overview.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOverviewComponent {
}
