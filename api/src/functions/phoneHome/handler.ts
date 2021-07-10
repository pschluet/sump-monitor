import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { logger } from '@libs/logger';

const phoneHome: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  const time = new Date();
  logger.info({time})
  return formatJSONResponse({
    message: time,
    event,
  });
};

export const main = middyfy(phoneHome);
