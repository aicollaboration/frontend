import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LearnOverviewComponent } from './components/learn-overview.component';
import { routes } from './learn-routing.module';


@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        LearnOverviewComponent,
    ]
})
export class LearnModule {

}
