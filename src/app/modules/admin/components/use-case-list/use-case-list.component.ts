import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'use-cases',
  templateUrl: './use-case-list.component.html',
  styleUrls: ['./use-case-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UseCaseListComponent {
  public categories: CategoryModel[] = [{
    title: 'Customer analytics',
    useCases: [
      {
        title: 'Segmentation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Lifetime value',
        image: 'assets/images/cases/image_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Churn analytics',
        image: 'assets/images/cases/question_answering.jpg',
        description: ``,
      },
      {
        title: 'Cross selling',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Upselling',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Market basket analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Product bundling',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Recommendation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Next best action',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Sentiment analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Voice of customer',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ]
  }, {
    title: 'Marketing analytics',
    useCases: [
      {
        title: 'Customer segmentation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Customer profile',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Personalization',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Customer driven marketing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Marketing Mix',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Return on Invest',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Attribution modeling',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Performance attribution',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Product portfolio management',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Brand equity',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Marketing research',
    useCases: [
      {
        title: 'Marketing sizing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Forecasting',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Market opportunity analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Trend analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Market news',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Needs assessment',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Value chain analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Pricing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Market entry strategy',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Competitor analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Survey analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Market segmentation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Customer loyality',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Brand equity',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Product development',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Web analytics',
    useCases: [
      {
        title: 'A/B Testing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Multivariate testing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Conversion rate optimization',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Attribution modeling',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Performance attribution',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Website audit',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Mobile & Website Tracking',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'eCommerce analytics',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Lead generation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Search engine optimization',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Analytics setup & implementation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Social media analytics',
    useCases: [
      {
        title: 'Opinion mining',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Sentiment analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Brand monitoring',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Competitive analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Lead generation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Trend analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Text analytics',
    useCases: [
      {
        title: 'Text summarization',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Question answering',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Sales analytics',
    useCases: [
      {
        title: 'Dynamic pricing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Promotional pricing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Profitability analysis',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Value based pricing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Supply chain analytics',
    useCases: [
      {
        title: 'Demand forecasting',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Inventory management',
    useCases: [],
  }, {
    title: 'Logistics',
    useCases: [
      {
        title: 'Transport logistics',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Order picking optimization',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Fraud & Risk',
    useCases: [
      {
        title: 'Fraud detection',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: `Health, Bank, Insurance`,
      },
      {
        title: 'Credit risk management',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Internet of things',
    useCases: [
      {
        title: 'Smart cities',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Smart manufacturing',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Smart healthcare',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Predictive maintenance',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Smart aviation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
      {
        title: 'Smart transportation',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      },
    ],
  }, {
    title: 'Visualizations',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'HR analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'Retail analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'Healthcare analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'Pharam & life sciences analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'Sports analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }, {
    title: 'Financial services analytics',
    useCases: [
      {
        title: 'title',
        image: 'assets/images/cases/customer_segmentation.jpg',
        description: ``,
      }
    ],
  }];
}