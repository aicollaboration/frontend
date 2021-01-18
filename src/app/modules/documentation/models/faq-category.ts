import { FaqModel } from './faq.model';

export interface FaqCategoryModel {
    id: string;
    slug: string;
    title: string;
    faqs?: FaqModel[];
}
