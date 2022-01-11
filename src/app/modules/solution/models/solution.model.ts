import { RepositoryModel } from "./repository.model";

export class SolutionModel {
  public id: number;
  public name: string;
  public owner: string;
  public file?: string;
  public image?: string;
  public description?: string;
  public template: string;
  public author: string;
  public visiblity: string;
  public repository: RepositoryModel;
}
