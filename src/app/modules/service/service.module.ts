import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
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
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoNavigationModule } from '@treo/components/navigation';
import { SharedModule } from 'app/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentClassificationComponent } from './components/document-classification/document-classification.component';
import { EmptyComponent } from './components/empty/empty.component';
import { GermanQuestionAnsweringComponent } from './components/german-question-answering/german-question-answering.component';
import { PdfAnalyzerComponent } from './components/pdf-analyzer/pdf-analyzer.component';
import { PdfTableOfContentsComponent } from './components/pdf-table-of-contents/pdf-table-of-contents.component';
import { QuestionAnsweringComponent } from './components/question-answering/question-answering.component';
import { ServiceCreationComponent } from './components/service-creation/service-creation.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceLoaderComponent } from './components/service-loader/service-loader.component';
import { ServiceLoaderDirective } from './components/service-loader/service-loader.directive';
import { ServiceEditorComponent } from './components/service-editor/service-editor.component';
import { TextSummarizationComponent } from './components/text-summarization/text-summarization.component';
import { WebsiteAuditComponent } from './components/website-audit/website-audit.component';
import { routes } from './service-routing.module';
import { ServiceEffects } from './state/service.effects';
import { serviceReducer } from './state/service.reducer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        ServiceListComponent,
        ServiceDetailComponent,
        ServiceEditorComponent,
        ServiceLoaderComponent,
        ServiceCreationComponent,
        PdfAnalyzerComponent,
        PdfTableOfContentsComponent,
        QuestionAnsweringComponent,
        GermanQuestionAnsweringComponent,
        TextSummarizationComponent,
        WebsiteAuditComponent,
        DocumentClassificationComponent,

        EmptyComponent,
        ServiceLoaderDirective,
    ],
    entryComponents: [
        PdfAnalyzerComponent,
        EmptyComponent,
    ],
    imports: [
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(routes),

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
        MatTreeModule,

        // Forms
        FormsModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,

       // dropzone
        NgxDropzoneModule,
        DragDropModule,

        StoreModule.forFeature('services', serviceReducer),
        EffectsModule.forFeature([ServiceEffects]),

        PdfViewerModule,

        MatSelectCountryModule,
    ],
})
export class ServiceModule {

}
