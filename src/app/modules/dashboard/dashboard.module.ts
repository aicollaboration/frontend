import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { TreoMessageModule } from '@treo/components/message';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';
import { CarouselItemElementDirective } from './components/carousel/carousel-item-element.directive';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [{
    path: '',
    component: DashboardComponent,
}
];


@NgModule({
    declarations: [ DashboardComponent, CarouselComponent, CarouselItemDirective, CarouselItemElementDirective ],
    imports: [
        SharedModule,

        RouterModule.forChild(routes),

        MatGridListModule,
        MatTabsModule,
        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TreoMessageModule,
    ],
    bootstrap:    [ DashboardComponent ]
})
export class DashboardModule {

}
