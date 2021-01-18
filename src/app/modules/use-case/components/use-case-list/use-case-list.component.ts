import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UseCaseModel } from '../../models/use-case.model';
import { loadUseCasesAction } from '../../state/use-case.actions';
import { getErrors, getUseCases, State } from '../../state/use-case.reducer';

@Component({
  selector: 'use-cases',
  templateUrl: './use-case-list.component.html',
  styleUrls: ['./use-case-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseListComponent implements OnInit {
  public useCases$: Observable<UseCaseModel[]>;
  public errors$: Observable<string[]>;

  public constructor(private store: Store<State>) {
  }

  public ngOnInit(): void {
    this.useCases$ = this.store.select(getUseCases);
    this.errors$ = this.store.select(getErrors);

    this.store.dispatch(loadUseCasesAction());
  }
}
