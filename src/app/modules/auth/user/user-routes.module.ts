import { Route } from '@angular/router';
import { UserProfileComponent } from 'app/modules/auth/user/user-profile/user-profile.component';

export const userRoutes: Route[] = [
    {
        path: 'profile',
        component: UserProfileComponent,
    }
];
