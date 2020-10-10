import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentationOverviewComponent } from './components/documentation-overview.component';
import { DocumentationRoutingModule } from './documentation-routing.module';


@NgModule({
    imports: [
        CommonModule,
        DocumentationRoutingModule,
    ],
    declarations: [
        DocumentationOverviewComponent,
    ]
})
export class DocumentationModule {

}
