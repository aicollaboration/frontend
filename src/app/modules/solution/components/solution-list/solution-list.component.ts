import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SolutionModel } from '../../models/solution.model';
import { loadSolutionsAction } from '../../state/solution.actions';
import { getErrorsSelector, State } from '../../state/solution.reducer';
import { SolutionCreationComponent } from '../solution-creation/solution-creation.component';

@Component({
  selector: 'solutions',
  templateUrl: './solution-list.component.html',
  styleUrls: ['./solution-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionListComponent implements OnInit {
  public solutions: SolutionModel[];
  public errors$: Observable<string[]>;
  public searchForm: FormGroup;

  public constructor(
    private formBuilder: FormBuilder,
    private matDialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<State>,
  ) {
  }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.solutions = data.solutions;
    });

    this.searchForm = this.formBuilder.group({
      projects: new FormControl(),
      branches: new FormControl(),
      problem: new FormControl(),
    });

    this.errors$ = this.store.select(getErrorsSelector);

    this.store.dispatch(loadSolutionsAction());
  }

  public openCreationDialog(): void {
    const dialogRef = this.matDialog.open(SolutionCreationComponent);
  }

  public toggleHelpContainer(): void {
    const helpContainer: HTMLElement = document.getElementById("help-container");
    helpContainer.classList.toggle("hidden");
  }
}
