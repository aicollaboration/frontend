import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { WebLayoutComponent } from './web.component';

@NgModule({
    declarations: [
        WebLayoutComponent,
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    exports: [
        WebLayoutComponent,
    ]
})
export class WebLayoutModule {
}
