import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { TreoMessageModule } from '@treo/components/message';
import { DocumentationOverviewComponent } from './components/documentation-overview.component';
import { routes } from './documentation-routing.module';

@NgModule({
    declarations: [
        DocumentationOverviewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TreoMessageModule,
    ],
})
export class DocumentationModule {

}
