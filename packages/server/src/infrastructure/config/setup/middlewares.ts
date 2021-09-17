import * as morganBody from 'morgan-body';
import { NestApplication } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';

export function setupMiddlewares(app: NestApplication) {
  setupSecurityMiddlewares(app);
  setupLoggerMiddleware(app);
}

function setupSecurityMiddlewares(app: NestApplication) {
  app.enableCors();
  app.use(helmet());
}

function setupLoggerMiddleware(app: NestApplication) {
  const logger = app.get(Logger);
  (morganBody as any)(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        logger.log(message.replace('\n', ''));
        return true;
      },
    },
  });
}
