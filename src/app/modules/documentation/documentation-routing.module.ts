import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentationOverviewComponent } from './components/documentation-overview.component';

export const routes: Routes = [{
    path: '',
    component: DocumentationOverviewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class DocumentationRoutingModule {

}
