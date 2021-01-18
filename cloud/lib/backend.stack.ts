import { InstanceType, Vpc } from '@aws-cdk/aws-ec2';
import { Cluster } from '@aws-cdk/aws-ecs';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

export interface BackendProps extends StackProps {
    cluster: Cluster;
}

export class BackendStack extends Stack {
    readonly cluster: Cluster;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        this.cluster = this.createCluster();
    }

    private createCluster(): Cluster {
        const vpc = new Vpc(this, 'AiPlatformVpc', {
            natGateways: 1,
        });
        const cluster = new Cluster(this, 'AiPlatformCluster', {
            vpc,
        });
        cluster.addCapacity('AiPlatformClusterScaling', {
            instanceType: new InstanceType('t3a.large'),
            desiredCapacity: 1
        });

        return cluster;
    }
}
