import { ContainerImage } from '@aws-cdk/aws-ecs';
import { ApplicationLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';
import { HostedZone } from '@aws-cdk/aws-route53';
import { Construct, Stack } from '@aws-cdk/core';
import { BackendProps } from './backend.stack';

export class FlaskStack extends Stack {
    constructor(scope: Construct, id: string, props?: BackendProps) {
        super(scope, id, props);

        const cluster = props?.cluster;
        if (cluster) {
            const fargateService = new ApplicationLoadBalancedEc2Service(this, 'Service', {
                cluster,
                domainName: 'flask.service.aiplatform.space',
                domainZone: HostedZone.fromHostedZoneAttributes(this, 'aiplatform.space', {
                    hostedZoneId: 'Z0563199160P33R2F1FOY',
                    zoneName: 'aiplatform.space',
                }),
                memoryLimitMiB: 1024,
                cpu: 512,
                taskImageOptions: {
                    image: ContainerImage.fromRegistry('docker.io/worstcaseffm/flaskserver:v1'),
                    containerPort: 5000,
                },
            });
            console.log(`assignPublicIp: ${fargateService.loadBalancer.loadBalancerArn}`);
        }
    }
}

