import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from 'app/core/auth/auth.service';



@Component({
    selector: 'auth-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
    countdown: number;
    countdownMapping: any;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AuthService} authService
     * @param {Router} router
     */
    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        // Set the private default
        this.unsubscribeAll = new Subject();

        // Set the defaults
        this.countdown = 5;
        this.countdownMapping = {
            '=1': '# second',
            'other': '# seconds'
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Sign out
        this.authService.signOut();

        // Get the duration
        const duration = this.countdown;

        // Redirect after the countdown
        interval(1000).pipe(
            take(duration),
            takeUntil(this.unsubscribeAll)
        ).subscribe(() => {
            this.countdown--;
        },
            () => {
            },
            () => {
                this.router.navigate(['sign-in']);
            }
        );
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }


    signOut() {
        // signing out with Backendless API
        Backendless.UserService.logout()
            .then(() => {
            })
            .catch((err) => {
            });

    }
}
