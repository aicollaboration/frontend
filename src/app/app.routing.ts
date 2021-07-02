import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [
    {
        path: 'signed-in-redirect',
        pathMatch: 'full',
        redirectTo: 'admin'
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'web'
        },
        children: [
            {
                path: '',
                loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)
            },
        ]
    },

    // Auth routes (guest)
    {
        path: '',
        canActivate: [
            NoAuthGuard,
        ],
        canActivateChild: [
            NoAuthGuard,
        ],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)
            }
        ]
    },

    // Auth routes (logged in)
    {
        path: '',
        canActivate: [
            AuthGuard,
        ],
        canActivateChild: [
            AuthGuard,
        ],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)
            }
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [
            AuthGuard,
        ],
        canActivateChild: [
            AuthGuard,
        ],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('app/modules/dashboard/dashboard.module').then(m => m.DashboardModule),
            },
            {
                path: 'admin',
                loadChildren: () => import('app/modules/admin/admin.module').then(m => m.AdminModule),
            },
            {
                path: 'solutions',
                loadChildren: () => import('app/modules/solution/solution.module').then(module => module.SolutionModule),
            },
            {
                path: 'services',
                loadChildren: () => import('app/modules/service/service.module').then(module => module.ServiceModule),
            },
            {
                path: 'docs',
                loadChildren: () => import('app/modules/documentation/documentation.module').then(module => module.DocumentationModule),
            },
            {
                path: 'learn',
                loadChildren: () => import('app/modules/learn/learn.module').then(module => module.LearnModule),
            },
            {
                path: 'partners',
                loadChildren: () => import('app/modules/partner/partner.module').then(module => module.PartnerModule),
            },
            {
                path: 'events',
                loadChildren: () => import('app/modules/event/event.module').then(module => module.EventModule),
            },

            // 404 & Catch all
            /*
            {
                path: '404-not-found', 
                pathMatch: 'full', 
                loadChildren: () => import('app/modules/admin/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
            },
            {
                path: '**', 
                redirectTo: '404-not-found'
            }
            */
        ]
    },
];
