import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EventOverviewComponent } from './components/event-overview/event-overview.component';
import { EventRoutingModule } from './event-routing.module';

@NgModule({
    imports: [
        CommonModule,
        EventRoutingModule,
    ],
    declarations: [
        EventOverviewComponent,
    ]
})
export class EventModule {

}
