import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import Backendless from 'backendless';

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
    public signIn(credentials: { email: string, password: string }): Promise<any> {
        // Throw error, if the user is already logged in
        if (this.authenticated) {
            throw new Error('User is already logged in.');
        }

        return new Promise((resolve, reject) => {
            Backendless.UserService.login(credentials.email, credentials.password)
                .then((value) => {
                    this.accessToken = value['user-token'];

                    resolve(value);
                })
                .catch(reject)
        });
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
        // if (AuthUtils.isTokenExpired(this.accessToken)) {
        //    return of(false);
        // }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
