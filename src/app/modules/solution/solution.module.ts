import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoNavigationModule } from '@treo/components/navigation';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';
import { routes } from './solution-routing.module';
import { SolutionEffects } from './state/solution.effects';
import { SolutionReducer } from './state/solution.reducer';

@NgModule({
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('solutions', SolutionReducer),
        EffectsModule.forFeature([SolutionEffects]),

        // Treo
        TreoCardModule,
        TreoNavigationModule,

        // Material UI
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
    ],
})
export class SolutionModule {

}
