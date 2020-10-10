import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreoMediaWatcherService } from '@treo/services/media-watcher';
import { TreoNavigationService } from '@treo/components/navigation';

@Component({
    selector: 'modern-layout',
    templateUrl: './modern.component.html',
    styleUrls: [
        './modern.component.scss',
    ],
    encapsulation: ViewEncapsulation.None,
})
export class ModernLayoutComponent implements OnInit, OnDestroy {
    public data: any;
    public isScreenSmall: boolean;

    @HostBinding('class.fixed-header')
    public fixedHeader: boolean;

    @HostBinding('class.fixed-footer')
    public fixedFooter: boolean;

    // Private
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} activatedRoute
     * @param {TreoMediaWatcherService} treoMediaWatcherService
     * @param {TreoNavigationService} treoNavigationService
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private treoMediaWatcherService: TreoMediaWatcherService,
        private treoNavigationService: TreoNavigationService
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();

        // Set the defaults
        this.fixedHeader = true;
        this.fixedFooter = false;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    public ngOnInit(): void {
        // Subscribe to the resolved route data
        this.activatedRoute.data.subscribe((data: Data) => {
            this.data = data.initialData;
        });

        // Subscribe to media changes
        this.treoMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(({ matchingAliases }) => {

                // Check if the breakpoint is 'lt-md'
                this.isScreenSmall = matchingAliases.includes('lt-md');
            });
    }

    /**
     * On destroy
     */
    public ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param key
     */
    public toggleNavigation(key: string): void {
        // Get the navigation
        const navigation = this.treoNavigationService.getComponent(key);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
