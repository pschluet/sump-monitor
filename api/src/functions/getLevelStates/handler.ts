import 'source-map-support/register';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { logger } from '@libs/logger';
import {DynamoDB} from 'aws-sdk';
import { region } from '../../libs/constants';
import { APIGatewayEvent } from 'aws-lambda';

const db = new DynamoDB.DocumentClient({ region });

const getLevelStates = async (
  event: APIGatewayEvent,
) => {
  try {
    const result = await db
      .query({
        TableName: process.env.LEVEL_STATE_TABLE_NAME,
        KeyConditionExpression: '#date = :date',
        ExpressionAttributeNames: {
          '#date': 'date'
        },
        ExpressionAttributeValues: {
          ':date': event.queryStringParameters.date
        },
        ScanIndexForward: true,
      })
      .promise();
    return formatJSONResponse(result.Items);
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

export const main = middyfy(getLevelStates);
