import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { GetStartedComponent } from 'app/modules/landing/get-started/get-started.component';
import { GetStartedRoutes } from 'app/modules/landing/get-started/get-started.routing';

@NgModule({
    declarations: [
        GetStartedComponent
    ],
    imports     : [
        RouterModule.forChild(GetStartedRoutes),
        MatButtonModule,
        SharedModule
    ]
})
export class LandingGetStartedModule
{
}
