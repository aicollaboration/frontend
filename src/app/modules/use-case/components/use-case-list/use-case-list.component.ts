import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UseCaseModel } from '../../models/use-case.model';
import { getShow, getUseCases, State } from '../../reducers/use-case.reducer';
import { loadUseCases, toggleUseCaseAction } from '../../state/use-case.actions';

@Component({
  selector: 'use-cases',
  templateUrl: './use-case-list.component.html',
  styleUrls: ['./use-case-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseListComponent implements OnInit {
  public useCases$: Observable<UseCaseModel[]>;

  public constructor(private store: Store<State>) {
  }

  public ngOnInit(): void {
    this.useCases$ = this.store.select(getUseCases);

    this.store.dispatch(loadUseCases());

    this.store.select(getShow).subscribe(show => {
      console.log(show);
    });
  }

  public toggle(): void {
    this.store.dispatch(toggleUseCaseAction());
  }
}
