import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as any)?.message || 'Internal server error';

    // Отправляем ошибку в Sentry
    Sentry.captureException(exception, {
      user: {
        ip_address: request.ip,
      },
      extra: {
        method: request.method,
        url: request.url,
        body: request.body,
      },
    });

    response.status(status).json({
      statusCode: status,
      message:
        typeof message === 'string' ? message : (message as any)?.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
