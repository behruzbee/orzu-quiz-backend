import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = typeof data === 'string' ? data : 'Успешно';
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message,
          data: typeof data === 'string' ? null : data,
        };
      }),
    );
  }
}
