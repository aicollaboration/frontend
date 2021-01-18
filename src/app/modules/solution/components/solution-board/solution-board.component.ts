import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { BoardColumnModel } from '../../models/board-column.model';
import { BoardModel } from '../../models/board.model';
import { SolutionModel } from '../../models/solution.model';

@Component({
    selector: 'solution-board',
    templateUrl: './solution-board.component.html',
    styleUrls: [
        './solution-board.component.scss',
    ],
})
export class SolutionBoardComponent {
    public board: BoardModel = new BoardModel('test', [
        new BoardColumnModel('Inbox', [
            new SolutionModel(),
        ]),
        new BoardColumnModel('Inbox', [
            new SolutionModel(),
        ]),
        new BoardColumnModel('Inbox', [
            new SolutionModel(),
        ]),
    ]);

    public drop(event: CdkDragDrop<string[]>): void {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }
}
