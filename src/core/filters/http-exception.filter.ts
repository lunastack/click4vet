import { INTERNAL_SERVER_ERROR } from '@core/constants/internal-server-error.constants';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let exceptionResponse: any = exception;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exceptionResponse = exceptionResponse.getResponse();
    }

    const messageList: string[] = exception.message.split('|');
    const isValidationError: boolean = status === 400;
    const responseObject = {
      statusCode: status,
      message:
        status === 500
          ? INTERNAL_SERVER_ERROR
          : isValidationError
          ? exceptionResponse.message[0].message
          : messageList[0],
      timestamp: new Date().toISOString(),
      path: request.url,
      success: false,
      id: randomUUID(),
      ...(isValidationError && { validationError: exceptionResponse.message }),
    };

    response.status(status).json(responseObject);
    this.logger.error(
      JSON.stringify({
        ...responseObject,
        request: {
          method: request.method,
          body: request.body,
          params: request.params,
        },
        ...(messageList[1] && { moreInfo: JSON.parse(messageList[1]) }),
        ...(status === 500 && { moreInfo: messageList[0] }),
      }),
    );
  }
}
