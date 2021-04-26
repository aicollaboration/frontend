import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';

const routes: Routes = [{
    path: '',
    component: EventOverviewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class EventRoutingModule {

}
