import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';
import { MyCompanyLogFormatter } from './formatter';

const logger = new Logger({ logFormatter: new MyCompanyLogFormatter()});

export class Handler{

  public async handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    
    logger.debug('handler invoked', { event: event });

    try {
      const body = { message: 'Go Serverless v4! Your function executed successfully!' };

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(body),
      };

      logger.info('handler completed', { statusCode: response.statusCode });
      logger.debug('handler error', new Error('test error'));

      return response;
    } catch (err: any) {
      logger.error('handler error', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  }
}

module.exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
  const handlerInstance = new Handler();
  return await handlerInstance.handler(event, context);
}
