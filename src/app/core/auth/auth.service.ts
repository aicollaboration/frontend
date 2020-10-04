import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthService {
    // Private
    private authenticated: boolean;

    /**
     * Constructor
     *
     * @param {HttpClient} httpClient
     */
    constructor(private httpClient: HttpClient) {
        // Set the defaults
        this.authenticated = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    get accessToken(): string {
        return localStorage.getItem('access_token');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     *
     * @param credentials
     */
    public signIn(credentials: { email: string, password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this.authenticated) {
            return throwError('User is already logged in.');
        }

        return this.httpClient.post('api/auth/sign-in', credentials).pipe(switchMap((response: any) => {

            // Store the access token in the local storage
            this.accessToken = response.access_token;

            // Set the authenticated flag to true
            this.authenticated = true;

            // Return a new observable with the response
            return of(response);
        }));
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Renew token
        return this.httpClient.post('api/auth/refresh-access-token', { access_token: this.accessToken }).pipe(
            catchError(() => {

                // Return false
                return of(false);
            }),
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this.authenticated = true;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    public signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('access_token');

        // Set the authenticated flag to false
        this.authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Check the authentication status
     */
    public check(): Observable<boolean> {
        // Check if the user is logged in
        if (this.authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
