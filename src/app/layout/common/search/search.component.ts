import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { TreoAnimations } from '@treo/animations/public-api';
import { ServiceService } from 'app/modules/service/services/service.service';
import { SolutionService } from 'app/modules/solution/services/solution.service';
import { Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'treoSearch',
    animations: TreoAnimations
})
export class SearchComponent implements OnInit, OnDestroy {
    public results: any[] | null;
    public searchControl: FormControl;

    // Debounce
    @Input()
    public debounce: number;

    // Min. length
    @Input()
    public minLength: number;

    // Search
    @Output()
    public search: EventEmitter<any>;

    // Private
    private _appearance: 'basic' | 'bar';
    private _opened: boolean;
    private unsubscribeAll: Subject<any>;

    constructor(
        private elementRef: ElementRef,
        private renderer2: Renderer2,
        private serviceService: ServiceService,
        private solutionService: SolutionService,
    ) {
        // Set the private defaults
        this.unsubscribeAll = new Subject();

        // Set the defaults
        this.appearance = 'basic';
        this.debounce = this.debounce || 300;
        this.minLength = this.minLength || 2;
        this.opened = false;
        this.results = null;
        this.searchControl = new FormControl();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for appearance
     *
     * @param value
     */
    @Input()
    set appearance(value: 'basic' | 'bar') {
        // If the value is the same, return...
        if (this._appearance === value) {
            return;
        }

        // Make sure the search is closed, before
        // changing the appearance to prevent issues
        this.close();

        let appearanceClassName;

        // Remove the previous appearance class
        appearanceClassName = 'search-appearance-' + this.appearance;
        this.renderer2.removeClass(this.elementRef.nativeElement, appearanceClassName);

        // Store the value
        this._appearance = value;

        // Add the new appearance class
        appearanceClassName = 'search-appearance-' + this.appearance;
        this.renderer2.addClass(this.elementRef.nativeElement, appearanceClassName);
    }

    get appearance(): 'basic' | 'bar' {
        return this._appearance;
    }

    /**
     * Setter & getter for opened
     *
     * @param value
     */
    set opened(value: boolean) {
        // If the value is the same, return...
        if (this._opened === value) {
            return;
        }

        // Store the value
        this._opened = value;

        // If opened...
        if (value) {
            // Add opened class
            this.renderer2.addClass(this.elementRef.nativeElement, 'search-opened');
        }
        else {
            // Remove opened class
            this.renderer2.removeClass(this.elementRef.nativeElement, 'search-opened');
        }
    }

    get opened(): boolean {
        return this._opened;
    }

    /**
     * Setter & getter for search input
     *
     * @param value
     */
    @ViewChild('searchInput')
    set searchInput(value: MatFormField) {
        // Return if the appearance is basic, since we don't want
        // basic search to be focused as soon as the page loads
        if (this.appearance === 'basic') {
            return;
        }

        // If the value exists, it means that the search input
        // is now in the DOM and we can focus on the input..
        if (value) {
            // Give Angular time to complete the change detection cycle
            setTimeout(() => {

                // Focus to the input element
                value._inputContainerRef.nativeElement.children[0].focus();
            });
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the search field value changes
        this.searchControl.valueChanges.pipe(
            debounceTime(this.debounce),
            takeUntil(this.unsubscribeAll),
            map((value) => {

                // Set the search results to null if there is no value or
                // the length of the value is smaller than the minLength
                // so the autocomplete panel can be closed
                if (!value || value.length < this.minLength) {
                    this.results = null;
                }

                // Continue
                return value;
            }),
            filter((value) => {

                // Filter out undefined/null/false statements and also
                // filter out the values that are smaller than minLength
                return value && value.length >= this.minLength;
            })
        ).subscribe(async (query) => {
            const solutionResults = await this.solutionService.findSolutions(query);
            const serviceResults = await this.serviceService.findServices(query);
            const re = new RegExp('(' + query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'ig');

            this.results = [
                ...solutionResults.map((result) => {
                    return {
                        title: result.name.replace(re, '<mark>$1</mark>'),
                        resultType: 'solution',
                        link: `/solutions/detail/${result.id}`,
                    }
                }),
                ...serviceResults.map((result) => {
                    return {
                        title: result.name.replace(re, '<mark>$1</mark>'),
                        resultType: 'service',
                        link: `/services/detail/${result.id}`,
                    }
                })
            ]

        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On keydown of the search input
     *
     * @param event
     */
    onKeydown(event): void {
        // Listen for escape to close the search
        // if the appearance is 'bar'
        if (this.appearance === 'bar') {
            // Escape
            if (event.keyCode === 27) {
                // Close the search
                this.close();
            }
        }
    }

    /**
     * Open the search
     * Used in 'bar'
     */
    open(): void {
        // Return, if it's already opened
        if (this.opened) {
            return;
        }

        // Open the search
        this.opened = true;
    }

    /**
     * Close the search
     * * Used in 'bar'
     */
    close(): void {
        // Return, if it's already closed
        if (!this.opened) {
            return;
        }

        // Clear the search input
        this.searchControl.setValue('');

        // Close the search
        this.opened = false;
    }

    public onSearchFocus() {
        this.renderer2.addClass(this.elementRef.nativeElement, 'search-focus');
    }

    public onSearchBlur() {
        this.renderer2.removeClass(this.elementRef.nativeElement, 'search-focus');
    }
}
