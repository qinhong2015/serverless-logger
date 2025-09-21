import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'sampleapi'});

export class Handler{
  // instance-level logger can be used, but we keep module logger for sampling
  private logger = logger;

  public async handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
    this.logger.addContext(context);
    this.logger.debug('handler invoked', { requestContext: event.requestContext });

    try {
      const body = { message: 'Go Serverless v4! Your function executed successfully!' };

      const response: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(body),
      };

      this.logger.info('handler completed', { statusCode: response.statusCode });
      this.logger.error('handler error', new Error('test error'));

      return response;
    } catch (err: any) {
      this.logger.error('handler error', err);
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
