import morganBody from 'morgan-body';
import { NestApplication } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';

export function setupMiddlewares(app: NestApplication) {
  setupSecurityMiddlewares(app);
  setupLoggerMiddleware(app);
}

function setupSecurityMiddlewares(app: NestApplication) {
  app.enableCors();
  app.use(helmet());
  app.use(csurf());
}

function setupLoggerMiddleware(app: NestApplication) {
  const logger = app.get(Logger);
  morganBody(app.getHttpAdapter().getInstance(), {
    stream: {
      write: (message: string) => {
        logger.log(message.replace('\n', ''));
        return true;
      },
    },
  });
}
