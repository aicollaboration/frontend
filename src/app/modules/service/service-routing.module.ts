import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCreationComponent } from './components/service-creation/service-creation.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceListComponent } from './components/service-list/service-list.component';

export const routes: Routes = [
    {
        path: '',
        component: ServiceListComponent,
    },
    {
        path: 'detail/:id',
        component: ServiceDetailComponent,
    },
    {
        path: 'create',
        component: ServiceCreationComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ]
})
export class ServiceRoutingModule {

}
