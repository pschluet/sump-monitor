import type { AWS } from '@serverless/typescript';

import phoneHome from '@functions/phoneHome';
import createLevelState from '@functions/createLevelState';

export const levelStateTableName = 'LevelState';
export const phoneHomeTableName = 'PhoneHome';
export const region = 'us-east-1';

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
    region,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ['sump-monitor-api'],
    },
    logRetentionInDays: 14,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      LEVEL_STATE_TABLE_NAME: levelStateTableName,
      PHONE_HOME_TABLE_NAME: phoneHomeTableName,
    },
    lambdaHashingVersion: '20201221',
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['dynamodb:PutItem'],
            Resource: [
              `arn:aws:dynamodb:${region}:*:table/${levelStateTableName}`,
              `arn:aws:dynamodb:${region}:*:table/${phoneHomeTableName}`,
            ],
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { phoneHome, createLevelState },
  resources: {
    Resources: {
      LevelStateTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [
            { AttributeName: 'date', AttributeType: 'S' },
            { AttributeName: 'timestamp', AttributeType: 'N' },
          ],
          KeySchema: [
            { AttributeName: 'date', KeyType: 'HASH' },
            { AttributeName: 'timestamp', KeyType: 'RANGE' },
          ],
          BillingMode: 'PAY_PER_REQUEST',
          TableName: levelStateTableName,
        },
      },
      PhoneHomeTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
          KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
          BillingMode: 'PAY_PER_REQUEST',
          TableName: phoneHomeTableName,
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
