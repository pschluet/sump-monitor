import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import { logger } from '@libs/logger';
import {DynamoDB} from 'aws-sdk';
import { format } from 'date-fns';
import { region } from '../../libs/constants';

const db = new DynamoDB.DocumentClient({ region });

const createLevelState: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const now = new Date();
  const levels = {
    mainPumpSensor1Underwater: event.body.mainPumpSensor1Underwater,
    mainPumpSensor2Underwater: event.body.mainPumpSensor2Underwater,
    backupPumpSensor1Underwater: event.body.backupPumpSensor1Underwater,
    backupPumpSensor2Underwater: event.body.backupPumpSensor2Underwater,
    floodAlarmSensor1Underwater: event.body.floodAlarmSensor1Underwater,
    floodAlarmSensor2Underwater: event.body.floodAlarmSensor2Underwater,
  };

  try {
    await db
      .put({
        TableName: process.env.LEVEL_STATE_TABLE_NAME,
        Item: {
          date: format(now, 'yyyy-MM-dd'),
          timestamp: now.getTime(),
          ...levels
        },
      })
      .promise();

    logger.info({ msg: 'Stored level state!', body: event.body });
    return formatJSONResponse({
      ...levels
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
