import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { logger } from '@libs/logger';

const createLevelState: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event,
) => {
  logger.info({body: event.body})
  return formatJSONResponse({
    message: event.body,
    event,
  });
};

export const main = middyfy(createLevelState);
