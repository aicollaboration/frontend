import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { UseCaseModel } from '../models/use-case.model';

@Injectable({
  providedIn: 'root'
})
export class UseCaseService {
  public customerAnalyticsCategory: CategoryModel = {
    title: 'Customer analytics',
    slug: `customer-analytics`,
  };
  public userAnalyticsCategory: CategoryModel = {
    title: 'User analytics',
    slug: `user-analytics`,
  };
  public textAnalyticsCategory: CategoryModel = {
    title: 'Text analytics',
    slug: `text-analytics`,
  };
  public marketingResearchCategory: CategoryModel = {
    title: 'Marketing research',
    slug: `marketing-research`,
  };
  public fraudRiskCategory: CategoryModel = {
    title: 'Fraud & Risk',
    slug: 'fraud-risk',
  };
  public salesAnalyticsCategory: CategoryModel = {
    title: 'Sales analytics',
    slug: 'sales-analytics',
  };
  public webAnalyticsCategory: CategoryModel = {
    title: 'Web analytics',
    slug: 'web-analytics',
  };
  public logisticsCategory: CategoryModel = {
    title: 'Logistics',
    slug: 'logistics',
  };
  public iotCategory: CategoryModel = {
    title: 'Internet of things',
    slug: 'internet-of-things',
  };

  public useCases: UseCaseModel[] = [{
    id: 1,
    title: 'Customer Segmentation',
    image: 'assets/images/cases/customer_segmentation.jpg',
    description: `Customer segmentation is the practice of dividing a company's customers into groups that reflect similarity among customers in each group. `,
    category: this.customerAnalyticsCategory,
  }, {
    id: 2,
    title: 'Image Segmentation',
    image: 'assets/images/cases/image_segmentation.jpg',
    description: ``,
    category: this.userAnalyticsCategory,
  }, {
    id: 3,
    title: 'Question answering',
    image: 'assets/images/cases/question_answering.jpg',
    description: ``,
    category: this.textAnalyticsCategory,
  }, {
    id: 4,
    title: 'Churn analytics',
    image: 'assets/images/cases/churn_analytics.jpg',
    description: ``,
    category: this.customerAnalyticsCategory,
  }, {
    id: 5,
    title: 'Competitor analysis',
    image: 'assets/images/cases/competitor_analysis.jpg',
    description: ``,
    category: this.marketingResearchCategory,
  }, {
    id: 6,
    title: 'Credit risk management',
    image: 'assets/images/cases/credit_risk_management.jpg',
    description: ``,
    category: this.fraudRiskCategory,
  }, {
    id: 7,
    title: 'Cross selling & upselling',
    image: 'assets/images/cases/cross_selling_upselling.jpg',
    description: ``,
    category: this.customerAnalyticsCategory,
  }, {
    id: 8,
    title: 'Customer upselling',
    image: 'assets/images/cases/customer_upselling.jpg',
    description: ``,
    category: this.fraudRiskCategory,
  }, {
    id: 9,
    title: 'Dynamic pricing',
    image: 'assets/images/cases/dynamic_pricing.jpg',
    description: ``,
    category: this.salesAnalyticsCategory,
  }, {
    id: 10,
    title: 'Fraud detection',
    image: 'assets/images/cases/fraud_detection.jpg',
    description: ``,
    category: this.fraudRiskCategory,
  }, {
    id: 11,
    title: 'Lead generation',
    image: 'assets/images/cases/lead_generation.jpg',
    description: ``,
    category: this.webAnalyticsCategory,
  }, {
    id: 12,
    title: 'Market basket analysis',
    image: 'assets/images/cases/market_basket_analysis.jpg',
    description: ``,
    category: this.customerAnalyticsCategory,
  }, {
    id: 13,
    title: 'Market segmentation',
    image: 'assets/images/cases/market_segmentation.jpg',
    description: ``,
    category: this.marketingResearchCategory,
  }, {
    id: 14,
    title: 'Order picking optimization',
    image: 'assets/images/cases/order_picking_optimization.jpg',
    description: ``,
    category: this.logisticsCategory,
  }, {
    id: 15,
    title: 'Predictive maintenance',
    image: 'assets/images/cases/predictive_maintenance.jpg',
    description: ``,
    category: this.iotCategory,
  }, {
    id: 16,
    title: 'Product development',
    image: 'assets/images/cases/product_development.jpg',
    description: ``,
    category: this.marketingResearchCategory,
  }, {
    id: 17,
    title: 'Product portfolio',
    image: 'assets/images/cases/product_portfolio.jpg',
    description: ``,
    category: this.marketingResearchCategory,
  }, {
    id: 18,
    title: 'Recommendation',
    image: 'assets/images/cases/recommendation.jpg',
    description: ``,
    category: this.customerAnalyticsCategory,
  }, {
    id: 19,
    title: 'Smart cities',
    image: 'assets/images/cases/smart_cities.jpg',
    description: ``,
    category: this.iotCategory,
  }, {
    id: 20,
    title: 'Website audit',
    image: 'assets/images/cases/website_audit.jpg',
    description: ``,
    category: this.webAnalyticsCategory,
  }, {
    id: 21,
    title: 'Text summarization',
    image: 'assets/images/cases/text_summarization.jpg',
    description: ``,
    category: this.textAnalyticsCategory,
  }];

  public getUseCases(): Observable<UseCaseModel[]> {
    return of(this.useCases);
  }

  public getUseCase(useCaseId: number): Observable<UseCaseModel> {
    const useCaseOfUndefined = this.useCases.find(useCase => useCase.id == useCaseId);

    if (useCaseOfUndefined) {
      return of(useCaseOfUndefined);
    }

    throw new Error(`Use case with id ${useCaseId} not available`);
  }
}
