import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoNavigationModule } from '@treo/components/navigation';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProblemSubmitterComponent } from './components/problem-submitter/problem-submitter.component';
import { SolutionCreationComponent } from './components/solution-creation/solution-creation.component';
import { SolutionDetailOverviewComponent } from './components/solution-detail-overview/solution-detail-overview.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';
import { routes } from './solution-routing.module';
import { SolutionEffects } from './state/solution.effects';
import { solutionReducer } from './state/solution.reducer';

@NgModule({
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
        SolutionDetailOverviewComponent,
        SolutionCreationComponent,
        ProblemSubmitterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,

        // Treo
        TreoCardModule,
        TreoNavigationModule,

        // Material UI
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSidenavModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        MatRadioModule,
        MatTabsModule,

        // Forms
        FormsModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,

        RouterModule.forChild(routes),
        StoreModule.forFeature('solutions', solutionReducer),
        EffectsModule.forFeature([SolutionEffects]),

        // dropzone
        NgxDropzoneModule,
        DragDropModule,
    ],
})
export class SolutionModule {

}