import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     *
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(private authService: AuthService, private router: Router) {
    }

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private check(redirectURL: string): boolean {
        // Check the authentication status
        console.log('AuthGuard: check');
        const authenticated = this.authService.check();

        if (!authenticated) {
            // Redirect to the sign-in page
            this.router.navigate(['sign-in'], { queryParams: { redirectURL } });

            // Prevent the access
            return false;
        }

        // Allow the access
        return true;
    }

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let redirectUrl = state.url;

        if (redirectUrl === '/sign-out') {
            redirectUrl = '/';
        }

        return this.check(redirectUrl);
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let redirectUrl = state.url;

        if (redirectUrl === '/sign-out') {
            redirectUrl = '/';
        }

        return this.check(redirectUrl);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.check('/');
    }
}
