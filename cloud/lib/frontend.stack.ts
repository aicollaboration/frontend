import { CfnOutput, Construct, Stack, StackProps } from '@aws-cdk/core';
import { SPADeploy } from 'cdk-spa-deploy';

export class FrontendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // FRONTEND
    const spaDeploy = new SPADeploy(this, 'aiplatform');
    const deployment = spaDeploy.createSiteFromHostedZone({
      zoneName: 'aiplatform.space',
      indexDoc: 'index.html',
      websiteFolder: `../dist/treo`,
    });

    this.log('domainName', deployment.distribution.distributionDomainName);
    this.log('bucket', deployment.websiteBucket.bucketDomainName);
  }

  private log(key: string, value: string): CfnOutput {
    return new CfnOutput(this, key, { value });
  }
}
