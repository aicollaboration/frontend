import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LearnOverviewComponent } from './components/learn-overview.component';
import { LearnRoutingModule } from './learn-routing.module';


@NgModule({
    imports: [
        CommonModule,
        LearnRoutingModule,
    ],
    declarations: [
        LearnOverviewComponent,
    ]
})
export class LearnModule {

}
