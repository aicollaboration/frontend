import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceCreationComponent } from './components/service-creation/service-creation.component';
import { ServiceDetailAnalyticsComponent } from './components/service-detail-analytics/service-detail-analytics.component';
import { ServiceDetailDefinitionComponent } from './components/service-detail-definition/service-detail-definition.component';
import { ServiceDetailOverviewComponent } from './components/service-detail-overview/service-detail-overview.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceEditorComponent } from './components/service-editor/service-editor.component';
import { ServiceEndpointComponent } from './components/service-endpoint/service-endpoint.component';
import { ServiceImportComponent } from './components/service-import/service-import.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceResolver } from './resolvers/service.resolver';
import { ServicesResolver } from './resolvers/services.resolver';

export const routes: Routes = [
    {
        path: '',
        component: ServiceListComponent,
        resolve: {
            services: ServicesResolver,
        }
    },
    {
        path: 'detail/:id',
        component: ServiceDetailComponent,
        resolve: {
            service: ServiceResolver,
        },
        children: [
            {
                path: '',
                component: ServiceDetailOverviewComponent,
            },
            {
                path: 'definition',
                component: ServiceDetailDefinitionComponent,
            },
            {
                path: 'testing',
                component: ServiceEndpointComponent,
            },
            {
                path: 'analytics',
                component: ServiceDetailAnalyticsComponent,
            }
        ]
    },
    {
        path: 'create',
        component: ServiceCreationComponent,
    },
    {
        path: 'import',
        component: ServiceImportComponent,
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
