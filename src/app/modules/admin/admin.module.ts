import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { routes } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminPaymentComponent } from './components/admin-payment/admin-payment.component';
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';
import { GithubRepositoriesComponent } from './components/github-repositories/github-repositories.component';
import { GithubUserComponent } from './components/github-user/github-user.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
    declarations: [
        AdminDashboardComponent,
        AdminPaymentComponent,
        AdminOverviewComponent,
        AdminUserManagementComponent,
        ProjectSelectorComponent,
        GithubRepositoriesComponent,
        GithubUserComponent,
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
        MatButtonModule,

        NgxStripeModule.forChild('pk_test_uu6rP8kI9MfqqcntVYYbndvG00jaTtZbmD'),
    ],
})
export class AdminModule {
}
