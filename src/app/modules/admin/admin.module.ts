import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { routes } from './admin-routing.module';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminPaymentComponent } from './components/admin-payment/admin-payment.component';
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';

@NgModule({
    declarations: [
        AdminPaymentComponent,
        AdminOverviewComponent,
        AdminUserManagementComponent,
        ProjectSelectorComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        CommonModule,

        MatIconModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
        MatTabsModule,
        MatSortModule,
        MatTableModule,

        NgxPayPalModule,
    ],
})
export class AdminModule {
}
