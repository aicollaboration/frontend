import { RepositoryModel } from 'app/modules/solution/models/repository.model';
import { CategoryModel } from './category.model';

export class ServiceModel {
    public id: string;
    public name: string;
    public owner: string;
    public image?: string;
    public file?: string;
    public description?: string;
    public api?: string;
    public category?: CategoryModel;
    public repository: RepositoryModel;
    public author: string;
    public template: string;
}
