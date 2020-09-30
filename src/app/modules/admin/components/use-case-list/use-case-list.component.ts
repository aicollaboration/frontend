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
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Lifetime value',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Churn analytics',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Cross selling',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Upselling',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Market basket analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Product bundling',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Recommendation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Next best action',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Sentiment analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Voice of customer',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ]
  }, {
    title: 'Marketing analytics',
    useCases: [
      {
        title: 'Customer segmentation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Customer profile',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Personalization',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Customer driven marketing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Marketing Mix',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Return on Invest',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Attribution modeling',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Performance attribution',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Product portfolio management',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Brand equity',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Marketing research',
    useCases: [
      {
        title: 'Marketing sizing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Forecasting',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Market opportunity analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Trend analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Market news',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Needs assessment',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Value chain analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Pricing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Market entry strategy',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Competitor analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Survey analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Market segmentation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Customer loyality',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Brand equity',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Product development',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Web analytics',
    useCases: [
      {
        title: 'A/B Testing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Multivariate testing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Conversion rate optimization',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Attribution modeling',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Performance attribution',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Website audit',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Mobile & Website Tracking',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'eCommerce analytics',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Lead generation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Search engine optimization',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Analytics setup & implementation',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Social media analytics',
    useCases: [
      {
        title: 'Opinion mining',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Sentiment analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Brand monitoring',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Competitive analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Lead generation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Trend analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Text analytics',
    useCases: [
      {
        title: 'Text summarization',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Question answering',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Sales analytics',
    useCases: [
      {
        title: 'Dynamic pricing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Promotional pricing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Profitability analysis',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Value based pricing',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Supply chain analytics',
    useCases: [
      {
        title: 'Demand forecasting',
        image: '/assets/segmentation.png',
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
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Order picking optimization',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Fraud & Risk',
    useCases: [
      {
        title: 'Fraud detection',
        image: '/assets/segmentation.png',
        description: `Health, Bank, Insurance`,
      },
      {
        title: 'Credit risk management',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Internet of things',
    useCases: [
      {
        title: 'Smart cities',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Smart manufacturing',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Smart healthcare',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Predictive maintenance',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Smart aviation',
        image: '/assets/segmentation.png',
        description: ``,
      },
      {
        title: 'Smart transportation',
        image: '/assets/segmentation.png',
        description: ``,
      },
    ],
  }, {
    title: 'Visualizations',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'HR analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'Retail analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'Healthcare analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'Pharam & life sciences analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'Sports analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }, {
    title: 'Financial services analytics',
    useCases: [
      {
        title: 'title',
        image: '/assets/segmentation.png',
        description: ``,
      }
    ],
  }];
}
