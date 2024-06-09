import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    switch (exception.code) {
      case 11000:
        response.status(status).json({
          statusCode: status,
          message: 'Duplicate key error',
        });
      default:
        response.status(status).json({
          statusCode: status,
          message: 'An error occurred',
        });
    }
  }
}
