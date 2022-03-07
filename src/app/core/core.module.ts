import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
})
export class CoreModule {
    /**
     * Constructor
     *
     * @param {DomSanitizer} domSanitizer
     * @param {MatIconRegistry} matIconRegistry
     * @param parentModule
     */
    constructor(
        private domSanitizer: DomSanitizer,
        private matIconRegistry: MatIconRegistry,
        @Optional()
        @SkipSelf()
        parentModule?: CoreModule
    ) {
        // Do not allow multiple injections
        if (parentModule) {
            throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
        }

        // Register icon sets
        this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-twotone.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('mat_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/material-outline.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('iconsmind', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/iconsmind.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('dripicons', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/dripicons.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('feather', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/feather.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('heroicons_outline', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-outline.svg'));
        this.matIconRegistry.addSvgIconSetInNamespace('heroicons_solid', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons-solid.svg'));
    }
}
