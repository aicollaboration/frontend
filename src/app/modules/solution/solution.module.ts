import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { EditableModule } from '@ngneat/edit-in-place';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoMessageModule } from '@treo/components/message';
import { TreoNavigationModule } from '@treo/components/navigation';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
import { SolutionCreationComponent } from './components/solution-creation/solution-creation.component';
import { SolutionDeletionComponent } from './components/solution-deletion/solution-deletion.component';
import { SolutionDesignComponent } from './components/solution-design/solution-design.component';
import { SolutionDetailHomeComponent } from './components/solution-detail-home/solution-detail-home.component';
import { SolutionDetailComponent } from './components/solution-detail/solution-detail.component';
import { SolutionEditorComponent } from './components/solution-editor/solution-editor.component';
import { SolutionListComponent } from './components/solution-list/solution-list.component';
import { SolutionServiceCreationComponent } from './components/solution-service-creation/solution-service-creation.component';
import { SolutionServiceDetailComponent } from './components/solution-service-detail/solution-service-detail.component';
import { SolutionServiceListComponent } from './components/solution-service-list/solution-service-list.component';
import { SolutionUserListComponent } from './components/solution-users/solution-user-list.component';
import { SolutionResolver } from './resolvers/solution.resolver';
import { routes } from './solution-routing.module';
import { SolutionEffects } from './state/solution.effects';
import { solutionReducer } from './state/solution.reducer';

@NgModule({
    declarations: [
        SolutionListComponent,
        SolutionDetailComponent,
        SolutionCreationComponent,
        SolutionEditorComponent,
        SolutionServiceCreationComponent,
        SolutionServiceDetailComponent,
        SolutionServiceListComponent,
        SolutionDetailHomeComponent,
        SolutionDeletionComponent,
        SolutionUserListComponent,
        SolutionDesignComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    imports: [
        CommonModule,
        FormsModule,

        // Treo
        TreoCardModule,
        TreoNavigationModule,
        TreoMessageModule,

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
        MatTreeModule,
        MatTableModule,
        MatSnackBarModule,
        MatRippleModule,
        MatChipsModule,

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

        // editable
        EditableModule,

        ImageCropperModule,
        ColorPickerModule,
        MatExpansionModule,
    ],
})
export class SolutionModule {

}
