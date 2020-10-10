import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnOverviewComponent } from './components/learn-overview.component';

const routes: Routes = [{
    path: '',
    component: LearnOverviewComponent,
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
})
export class LearnRoutingModule {

}
