import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TreoCardModule } from '@treo/components/card';
import { TreoMessageModule } from '@treo/components/message';
import { TreoNavigationModule } from '@treo/components/navigation';
import { SharedModule } from 'app/shared/shared.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { DocumentClassificationComponent } from './components/document-classification/document-classification.component';
import { DynamicModule } from './components/dynamic';
import { DynamicChildComponent } from './components/dynamic-child/dynamic-child.component';
import { EmptyComponent } from './components/empty/empty.component';
import { GermanQuestionAnsweringComponent } from './components/german-question-answering/german-question-answering.component';
import { PdfAnalyzerComponent } from './components/pdf-analyzer/pdf-analyzer.component';
import { PdfTableOfContentsComponent } from './components/pdf-table-of-contents/pdf-table-of-contents.component';
import { QuestionAnsweringComponent } from './components/question-answering/question-answering.component';
import { ServiceCreationComponent } from './components/service-creation/service-creation.component';
import { ServiceDetailAnalyticsComponent } from './components/service-detail-analytics/service-detail-analytics.component';
import { ServiceDetailDefinitionBodyComponent } from './components/service-detail-definition-body/service-detail-definition-body.component';
import { ServiceDetailDefinitionComponent } from './components/service-detail-definition/service-detail-definition.component';
import { ServiceDetailOverviewComponent } from './components/service-detail-overview/service-detail-overview.component';
import { ServiceDetailDefinitionParamsComponent } from './components/service-detail-definition-params/service-detail-definition-params.component';
import { ServiceDetailTestingComponent } from './components/service-detail-testing-component/service-detail-testing-component.component';
import { ServiceDetailDefinitionHedaersComponent } from './components/service-detail-definition-headers/service-detail-definition-headers.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceEditorComponent } from './components/service-editor/service-editor.component';
import { ServiceEndpointComponent } from './components/service-endpoint/service-endpoint.component';
import { ServiceImportComponent } from './components/service-import/service-import.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { ServiceLoaderComponent } from './components/service-loader/service-loader.component';
import { ServiceLoaderDirective } from './components/service-loader/service-loader.directive';
import { TextSummarizationComponent } from './components/text-summarization/text-summarization.component';
import { WebsiteAuditComponent } from './components/website-audit/website-audit.component';
import { InputSelectComponent } from './forms/input-select/input-select.component';
import { InputTextComponent } from './forms/input-text/input-text.component';
import { routes } from './service-routing.module';
import { ServiceEffects } from './state/service.effects';
import { serviceReducer } from './state/service.reducer';

@NgModule({
    declarations: [
        ServiceListComponent,
        ServiceDetailComponent,
        ServiceDetailOverviewComponent,
        ServiceDetailDefinitionComponent,
        ServiceDetailDefinitionHedaersComponent,
        ServiceDetailDefinitionBodyComponent,
        ServiceDetailDefinitionParamsComponent,
        ServiceEditorComponent,
        ServiceLoaderComponent,
        ServiceCreationComponent,
        ServiceEndpointComponent,
        ServiceImportComponent,
        ServiceDetailTestingComponent,
        ServiceDetailAnalyticsComponent,
        PdfAnalyzerComponent,
        PdfTableOfContentsComponent,
        QuestionAnsweringComponent,
        GermanQuestionAnsweringComponent,
        TextSummarizationComponent,
        WebsiteAuditComponent,
        DocumentClassificationComponent,

        EmptyComponent,
        ServiceLoaderDirective,
        DynamicChildComponent,
        InputTextComponent,
        InputSelectComponent,
    ],
    entryComponents: [
        PdfAnalyzerComponent,
        EmptyComponent,
        InputTextComponent,
        InputSelectComponent,
        MatDialogModule,
    ],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,

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
        //   MatSort,
        MatSnackBarModule,
        MatButtonToggleModule,

        // jsonviwer
        NgxJsonViewerModule,

        // Forms
        FormsModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        // dropzone
        NgxDropzoneModule,
        DragDropModule,

        RouterModule.forChild(routes),
        StoreModule.forFeature('services', serviceReducer),
        EffectsModule.forFeature([ServiceEffects]),

        PdfViewerModule,

        DynamicModule.withComponents([InputTextComponent]),
    ],
})
export class ServiceModule {

}
