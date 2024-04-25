import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { responseResult } from 'src/utils';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();
    const status = exception.getStatus();

    let message = exception.message;

    const exeResponse: any = exception.getResponse();
    if (
      exeResponse.hasOwnProperty('message') &&
      Array.isArray(exeResponse.message)
    ) {
      message = exeResponse.message[0];
    }

    // 设置响应头
    response.header('Content-Type', 'application/json; charset=utf-8');

    // 设置响应状态码
    response.status(status);

    // 返回错误信息
    response.send(responseResult(null, message, -1));
  }
}
