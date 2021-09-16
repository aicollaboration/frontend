import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any> {
    /**
     * Constructor
     *
     * @param {HttpClient} httpClient
     */
    constructor(private authService: AuthService, private httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Load messages
     *
     * @private
     */
    private loadMessages(): Observable<any> {
        return this.httpClient.get('api/common/messages');
    }

    /**
     * Load navigation data
     *
     * @private
     */
    private loadNavigation(): Observable<any> {
        return this.httpClient.get('api/common/navigation');
    }

    /**
     * Load notifications
     *
     * @private
     */
    private loadNotifications(): Observable<any> {
        return this.httpClient.get('api/common/notifications');
    }

    /**
     * Load shortcuts
     *
     * @private
     */
    private loadShortcuts(): Observable<any> {
        return this.httpClient.get('api/common/shortcuts');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return forkJoin([

            // Messages
            this.loadMessages(),

            // Navigation data
            this.loadNavigation(),

            // Notifications
            this.loadNotifications(),

            // Shortcuts
            this.loadShortcuts(),
        ]).pipe(map((data) => {
            return {
                messages: data[0].messages,
                navigation: {
                    compact: data[1].compact,
                    default: data[1].default,
                    futuristic: data[1].futuristic,
                    horizontal: data[1].horizontal
                },
                notifications: data[2].notifications,
                shortcuts: data[3].shortcuts,
                user: this.authService.user,
            };
        }));
    }
}
