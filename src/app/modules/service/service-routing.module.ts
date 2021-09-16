import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCreationComponent } from './components/service-creation/service-creation.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceEditorComponent } from './components/service-editor/service-editor.component';
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
    {
        path: 'edit/:id',
        component: ServiceEditorComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ]
})
export class ServiceRoutingModule {

}
