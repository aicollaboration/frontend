import { Certificate } from '@aws-cdk/aws-certificatemanager';
import { ContainerImage } from '@aws-cdk/aws-ecs';
import { ApplicationLoadBalancedEc2Service } from '@aws-cdk/aws-ecs-patterns';
import { HostedZone } from '@aws-cdk/aws-route53';
import { Construct, Stack } from '@aws-cdk/core';
import { BackendProps } from './backend.stack';

export class TextSummarizationStack extends Stack {
    constructor(scope: Construct, id: string, props?: BackendProps) {
        super(scope, id, props);

        const cluster = props?.cluster;
        if (cluster) {
            const certificateARN = 'arn:aws:acm:eu-central-1:507200175629:certificate/5606fa3c-9833-4526-b61c-7397d2ca49e7';
            const fargateService = new ApplicationLoadBalancedEc2Service(this, 'Service', {
                cluster,
                domainName: 'text-summarization.service.aiplatform.space',
                domainZone: HostedZone.fromHostedZoneAttributes(this, 'aiplatform.space', {
                    hostedZoneId: 'Z0563199160P33R2F1FOY',
                    zoneName: 'aiplatform.space',
                }),
                memoryLimitMiB: 3800,
                cpu: 2000,
                taskImageOptions: {
                    image: ContainerImage.fromRegistry('docker.io/5elementsofai/text-summarization'),
                    containerPort: 5000,
                },
                redirectHTTP: true,
                certificate: Certificate.fromCertificateArn(this, 'certificate', certificateARN)
            });
            fargateService.targetGroup.configureHealthCheck({
                path: '/api/1.0/ping',
            });
            console.log(`assignPublicIp: ${fargateService.loadBalancer.loadBalancerArn}`);
        }
    }
}

