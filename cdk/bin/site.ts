#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SiteStack } from '../lib/site-stack';

const app = new cdk.App();
new SiteStack(app, 'SiteStack-dev', {
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  env: { account: '446708209687', region: 'us-east-1' },
  description: 'dev',
});

new SiteStack(app, 'SiteStack-prod', {
  env: { account: '446708209687', region: 'us-east-1' },
  description: 'prod',
});