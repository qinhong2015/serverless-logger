import { LogFormatter, LogItem } from '@aws-lambda-powertools/logger';
import type {
  LogAttributes,
  UnformattedAttributes,
} from '@aws-lambda-powertools/logger/types';

// Replace this line with your own type
type MyCompanyLog = LogAttributes;

class MyCompanyLogFormatter extends LogFormatter {
  public formatAttributes(
    attributes: UnformattedAttributes,
    additionalLogAttributes: LogAttributes
  ): LogItem {
    const baseAttributes: MyCompanyLog = {
      logLevel: attributes.logLevel,
      message: attributes.message,
      xRayTraceId: attributes.xRayTraceId,
    };

    const logItem = new LogItem({ attributes: baseAttributes });
    logItem.addAttributes(additionalLogAttributes); // add any attributes not explicitly defined

    return logItem;
  }
}

export { MyCompanyLogFormatter };