import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionsAction } from '../../state/solution.actions';
import { getErrors, getSolutions, State } from '../../state/solution.reducer';

@Component({
  selector: 'solutions',
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionListComponent implements OnInit {
  public solutions$: Observable<SolutionModel[]>;
  public errors$: Observable<string[]>;

  public constructor(private store: Store<State>) {
  }

  public ngOnInit(): void {
    this.solutions$ = this.store.select(getSolutions);
    this.errors$ = this.store.select(getErrors);

    this.store.dispatch(loadSolutionsAction());
  }
}
