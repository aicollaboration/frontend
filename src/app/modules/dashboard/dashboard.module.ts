import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { TreoMessageModule } from '@treo/components/message';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardComponent } from './components/dashboard.component';

const routes: Routes = [{
    path: '',
    component: DashboardComponent,
}];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        TreoMessageModule,
    ],
})
export class DashboardModule {

}
