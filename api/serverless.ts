import type { AWS } from '@serverless/typescript';

import phoneHome from '@functions/phoneHome';

const serverlessConfiguration: AWS = {
  service: 'sump-monitor-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        'sump-monitor-api'
      ]
    },
    logRetentionInDays: 14,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { phoneHome },
};

module.exports = serverlessConfiguration;
