import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PartnerOverviewComponent } from './components/partner-overview.component';
import { PartnerRoutingModule } from './partner-routing.module';


@NgModule({
    imports: [
        CommonModule,
        PartnerRoutingModule,
    ],
    declarations: [
        PartnerOverviewComponent,
    ],
})
export class PartnerModule {

}
