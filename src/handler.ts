import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'sampleapi'});

export class Handler{
  // instance-level logger can be used, but we keep module logger for sampling
  private logger = logger;

  @logger.injectLambdaContext()
  public async handler(event: APIGatewayProxyEvent, context?: unknown): Promise<APIGatewayProxyResult> {
    this.logger.debug('handler invoked', { path: event.path, method: event.httpMethod });

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
      this.logger.error('handler error', { message: err?.message || String(err), stack: err?.stack });
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  }
}

module.exports.handler = async (event: APIGatewayProxyEvent, context: unknown) => {
  const handlerInstance = new Handler();
  return await handlerInstance.handler(event, context);
}
