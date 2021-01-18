import { BoardColumnModel } from './board-column.model';

export class BoardModel {
    constructor(public name: string, public columns: BoardColumnModel[]) { }
}
