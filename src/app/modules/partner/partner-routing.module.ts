import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerOverviewComponent } from './components/partner-overview.component';

const routes: Routes = [{
    path: '',
    component: PartnerOverviewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class PartnerRoutingModule {

}
