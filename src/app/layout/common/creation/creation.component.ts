import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'creation',
    templateUrl: './creation.component.html',
    styleUrls: ['./creation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'creation'
})
export class CreationComponent {

}
