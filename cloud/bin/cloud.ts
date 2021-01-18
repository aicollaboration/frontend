#!/usr/bin/env node
import { App } from '@aws-cdk/core';
import 'source-map-support/register';
import { BackendStack } from '../lib/backend.stack';
import { FrontendStack } from '../lib/frontend.stack';
import { TextSummarizationStack } from '../lib/text-summarization.stack';
import { UserStack } from '../lib/user.stack';

const app = new App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'eu-central-1'
};
const props = {
  env
};

const frontend = new FrontendStack(app, 'FrontendStack', props);
console.log(`stack with env: ${frontend.environment}`);

const backend = new BackendStack(app, 'BackendStack', props);
console.log(`backend with env: ${backend.environment}`);

const textSummarization = new TextSummarizationStack(app, 'TextSummarizationStack', { env, cluster: backend.cluster });
console.log(`textSummarization with env: ${textSummarization.environment}`);

const user = new UserStack(app, 'UserStack', props);
console.log(`textSummarization with env: ${user.environment}`);