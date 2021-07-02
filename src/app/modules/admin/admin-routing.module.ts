import { Route } from '@angular/router';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AdminPaymentComponent } from './components/admin-payment/admin-payment.component';
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: '',
        component: AdminOverviewComponent,
        children: [
            {
                path: 'dashboard',
            },
            {
                path: 'users',
                component: AdminUserManagementComponent,
            },
            {
                path: 'payment',
                component: AdminPaymentComponent,
            },
        ],
    },
];
