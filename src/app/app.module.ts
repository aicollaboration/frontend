import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TreoModule } from '@treo';
import { TreoMockApiModule } from '@treo/lib/mock-api';
import { TreoConfigModule } from '@treo/services/config';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { appConfig } from 'app/core/config/app.config';
import { CoreModule } from 'app/core/core.module';
import { mockDataServices } from 'app/data/mock';
import { LayoutModule } from 'app/layout/layout.module';
import { environment } from 'environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MarkdownModule } from 'ngx-markdown';
import { DynamicModule } from './modules/service/components/dynamic';

const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
};

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Treo & Treo Mock API
        TreoModule,
        TreoConfigModule.forRoot(appConfig),
        TreoMockApiModule.forRoot(mockDataServices),

        // Core
        CoreModule,

        // Layout
        LayoutModule,

        // 3rd party modules
        MarkdownModule.forRoot({}),

        // ngrx
        StoreModule.forRoot({}),
        StoreDevtoolsModule.instrument({
            name: 'AI Platform',
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([]),

        // dynami
        DynamicModule,
        
        // Forms
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,

        MatSelectCountryModule.forRoot('de'),

        // dropzone
        NgxDropzoneModule,
    ],
    bootstrap: [
        AppComponent,
    ],

})
export class AppModule {
}
