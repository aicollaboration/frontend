import { SolutionModel } from './solution.model';

export class BoardColumnModel {
    constructor(public name: string, public solutions: SolutionModel[]) { }
}
