import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CreationComponent } from './creation.component';

@NgModule({
    declarations: [
        CreationComponent,
    ],
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        SharedModule,
        RouterModule,
    ],
    exports: [
        CreationComponent,
    ]
})
export class CreationModule {
}
