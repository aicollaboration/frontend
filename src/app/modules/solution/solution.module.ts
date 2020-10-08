import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';
import { SolutionEffects } from './state/solution.effects';
import { SolutionReducer } from './state/solution.reducer';
import { routes } from './solution-routing.module';

@NgModule({
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        TreoCardModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('solutions', SolutionReducer),
        EffectsModule.forFeature([SolutionEffects]),
    ],
})
export class SolutionModule {

}
