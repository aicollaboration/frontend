import { Route } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import { GithubCallbackComponent } from './github-callback.component';

export const authSignInRoutes: Route[] = [
    {
        path: '',
        component: AuthSignInComponent,
    },
    {
        path: 'github',
        component: GithubCallbackComponent,
    }
];
