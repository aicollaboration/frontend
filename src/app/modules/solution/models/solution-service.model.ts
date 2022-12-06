import { ServiceModel } from "app/modules/service/models/service.model";
import { SolutionModel } from "./solution.model";

export class SolutionServiceModel {
    public id: string; 
    public name: string;
    public solution: SolutionModel;
    public solutionId: string;
    public service: ServiceModel;
    public config: any;
    public author: string;
    public public: boolean;
}