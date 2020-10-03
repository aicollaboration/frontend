import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UseCaseModel } from '../../models/use-case.model';

@Component({
    selector: 'use-cases',
    templateUrl: './use-case-detail.component.html',
    styleUrls: ['./use-case-detail.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseDetailComponent {
    public useCase: UseCaseModel = {
        title: 'Segmentation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
    };
}
