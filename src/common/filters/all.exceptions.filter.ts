import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { MulterError } from 'multer';

interface HttpErrorResponse {
  code: string;
  message: string;
  errors?: Array<any>;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  handleHttpException(
    exception: HttpException,
    httpAdapter: AbstractHttpAdapter,
    ctx: HttpArgumentsHost,
    isProduction,
  ) {
    console.error(exception);
    const statusCode = exception.getStatus();
    const res = exception.getResponse() as HttpErrorResponse;
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        message: res.message,
        code: isProduction ? res.code : (res.code ||= res.message),
        errors: (res.errors ||= null),
      },
      statusCode,
    );
  }
  handleMulterException(
    exception: MulterError,
    httpAdapter: AbstractHttpAdapter,
    ctx: HttpArgumentsHost,
    isProduction,
  ) {
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        code: exception.code,
        message: isProduction ? exception.message : exception.code,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isProduction = process.env.NODE_ENV === 'production';
    if (exception instanceof HttpException) {
      return this.handleHttpException(
        exception,
        httpAdapter,
        ctx,
        isProduction,
      );
    }
    if (exception instanceof MulterError) {
      return this.handleMulterException(
        exception,
        httpAdapter,
        ctx,
        isProduction,
      );
    }
    // otherwise
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        message: isProduction
          ? 'INTERNAL_SERVER_ERROR'
          : (exception as Error).message + (exception as Error).stack,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
