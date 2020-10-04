import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { UseCaseDetailComponent } from './components/use-case-detail/use-case-detail.component';
import { UseCaseListComponent } from './components/use-case-list/use-case-list.component';
import { useCaseReducer } from './reducers/use-case.reducer';
import { UseCaseEffects } from './state/use-case.effects';
import { routes } from './use-case-routing.module';

@NgModule({
    declarations: [
        UseCaseListComponent,
        UseCaseDetailComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        TreoCardModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('useCases', useCaseReducer),
        EffectsModule.forFeature([UseCaseEffects]),
    ],
})
export class UseCaseModule {

}
