import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { logger } from '@libs/logger';
import { DynamoDB } from 'aws-sdk';

const db = new DynamoDB.DocumentClient({region: 'us-east-1'});

const phoneHome: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const now = new Date();

  try {
    await db
      .put({
        TableName: process.env.PHONE_HOME_TABLE_NAME,
        Item: {
          id: 1,
          timestamp: now.getTime(),
        },
      })
      .promise();

  logger.info({ msg: 'Sensor phoned home!' });
  return formatJSONResponse({
    now,
  });
  } catch (error) {
    logger.error({error});
    return formatJSONResponse({
      error,
    }, 500);
  }
  

};

export const main = middyfy(phoneHome);
