import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { logger } from '@libs/logger';
import {DynamoDB} from 'aws-sdk';
import { region } from '../../libs/constants';

const db = new DynamoDB.DocumentClient({ region });

const getLastPhoneHomeTime = async () => {
  try {
    const result = await db
      .get({
        TableName: process.env.PHONE_HOME_TABLE_NAME,
        Key: {
          'id': 1
        }
      })
      .promise();
    return formatJSONResponse({
      timestamp: result.Item.timestamp
    });
  } catch (error) {
    logger.error({ error });
    return formatJSONResponse(
      {
        error,
      },
      500,
    );
  }
};

export const main = middyfy(getLastPhoneHomeTime);
