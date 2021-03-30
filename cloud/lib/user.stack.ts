import { Construct, Stack, StackProps } from '@aws-cdk/core';

export class UserStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

    }
}