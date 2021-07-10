import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { logger } from '@libs/logger';
import {DynamoDB} from 'aws-sdk';
import { format } from 'date-fns';

const db = new DynamoDB.DocumentClient({ region: 'us-east-1' });

const createLevelState: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const now = new Date();

  try {
    await db
      .put({
        TableName: 'LevelState', // TODO: env var
        Item: {
          date: format(now, 'yyyy-MM-dd'),
          timestamp: now.getTime(),
          ...event.body,
        },
      })
      .promise();

    logger.info({ msg: 'Stored level state!', body: event.body });
    return formatJSONResponse({
      ...event.body
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

export const main = middyfy(createLevelState);
