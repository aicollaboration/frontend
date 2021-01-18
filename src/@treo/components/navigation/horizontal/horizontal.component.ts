import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TreoAnimations } from '@treo/animations';
import { TreoNavigationItem } from '@treo/components/navigation/navigation.types';
import { TreoNavigationService } from '@treo/components/navigation/navigation.service';

@Component({
    selector: 'treo-horizontal-navigation',
    templateUrl: './horizontal.component.html',
    styleUrls: [
        './horizontal.component.scss',
    ],
    animations: TreoAnimations,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'treoHorizontalNavigation'
})
export class TreoHorizontalNavigationComponent implements OnInit, OnDestroy {
    public onRefreshed: BehaviorSubject<boolean | null>;

    // Name
    @Input()
    public name: string;

    // Private
    private _navigation: TreoNavigationItem[];
    private unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} changeDetectorRef
     * @param {TreoNavigationService} treoNavigationService
     */
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private treoNavigationService: TreoNavigationService
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();

        // Set the defaults
        this.onRefreshed = new BehaviorSubject(null);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for data
     */
    @Input()
    set navigation(value: TreoNavigationItem[]) {
        // Store the value
        this._navigation = value;

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    get navigation(): TreoNavigationItem[] {
        return this._navigation;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Register the navigation component
        this.treoNavigationService.registerComponent(this.name, this);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Deregister the navigation component from the registry
        this.treoNavigationService.deregisterComponent(this.name);

        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Refresh the component to apply the changes
     */
    refresh(): void {
        // Mark for check
        this.changeDetectorRef.markForCheck();

        // Execute the observable
        this.onRefreshed.next(true);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
